/**
 * PraveshDesk — website lead inbox and automation (Google Sheets + Apps Script)
 *
 * Note: leads now carry "Wants automated" (the interest field on the website form),
 * so an enquiry about fees, attendance or a job of their own arrives already sorted.
 * The allowed values are the group ids in src/lib/automations.ts, plus custom/not-sure.
 *
 * The website is fully static, so the browser posts each form straight to this web app.
 * This script is therefore the only "server": it validates, filters spam and scores
 * every lead before saving it.
 *
 * What it does
 *   1. Checks the form (required fields, Indian mobile number, consent), spam traps,
 *      Cloudflare Turnstile (if configured) and hourly limits, then scores the lead A/B/C.
 *   2. Appends it to the "Leads" tab. Idempotent on Lead ID, so double-clicks never duplicate.
 *   3. Emails you instantly with the lead's grade, answers and one-tap WhatsApp/call links.
 *   4. Sends the lead a short auto-reply if they gave an email address.
 *   5. Hourly: reminds you about "New" leads not contacted within 2 hours (09:00–21:00 IST).
 *   6. Daily 08:00: digest of yesterday's leads and follow-ups due today.
 *   7. Monday 09:00: weekly summary by area, source page and grade, with response time.
 *   8. Stamps "First contacted at" when you change a lead's Status away from "New".
 *
 * Setup: see README.md > "Lead inbox". Script Properties:
 *   OWNER_EMAIL       where alerts go (defaults to your account)
 *   FOUNDER_NAME      used in the prefilled WhatsApp message
 *   WHATSAPP_NUMBER   your business WhatsApp, digits only with country code (e.g. 919000000000)
 *   TURNSTILE_SECRET  Cloudflare Turnstile secret key (optional but recommended)
 */

const CONFIG = {
  SHEET_NAME: 'Leads',
  BRAND: 'PraveshDesk',
  TIMEZONE: 'Asia/Kolkata',
  WORK_START_HOUR: 9,
  WORK_END_HOUR: 21,
  REMIND_AFTER_HOURS: 2,
  DUPLICATE_WINDOW_DAYS: 30,
  MIN_FILL_MS: 2500,          // faster than this is almost certainly a bot
  MAX_LEADS_PER_HOUR: 30,     // across the whole site
  MAX_PER_PHONE_PER_HOUR: 3,
};

// Keep in sync with src/lib/cities.ts on the website.
const CITIES = {
  dombivli: 'Dombivli', kalyan: 'Kalyan', thane: 'Thane', ulhasnagar: 'Ulhasnagar',
  ambernath: 'Ambernath', badlapur: 'Badlapur', 'navi-mumbai': 'Navi Mumbai', other: 'Other',
};

const HEADERS = [
  'Received at', 'Lead ID', 'Status', 'Grade', 'Score', 'Name', 'Role', 'Institute', 'Area',
  'Phone', 'Email', 'Students', 'Enquiries / month', 'Current method', 'Wants automated', 'Best time', 'Message',
  'Score reasons', 'Calculator', 'Form', 'Page', 'UTM source', 'UTM medium', 'UTM campaign',
  'Referrer', 'Next follow-up', 'Notes', 'First contacted at', 'Reminder sent', 'Duplicate of',
];

const STATUSES = ['New', 'Contacted', 'Demo booked', 'Demo done', 'Proposal sent', 'Won', 'Lost', 'Not a fit'];
const CLOSED = ['Won', 'Lost', 'Not a fit'];

const LABELS = {
  role: { owner: 'Owner/director', admin: 'Admin/reception', counsellor: 'Counsellor', other: 'Other' },
  students: { 'not-sure': 'Not said', 'under-100': '<100', '100-300': '100–300', '300-600': '300–600', '600-plus': '600+' },
  enquiries: { 'not-sure': 'Not sure', 'under-20': '<20', '20-50': '20–50', '50-150': '50–150', '150-plus': '150+' },
  method: { '': '', register: 'Paper register', excel: 'Excel/Sheets', whatsapp: 'WhatsApp chats', software: 'Software/app', other: 'Other' },
  interest: {
    admissions: 'Admissions & follow-up', fees: 'Fees & collections', attendance: 'Attendance & batches',
    tests: 'Tests, marks & report cards', parents: 'Parent communication', staff: 'Staff & daily admin',
    documents: 'Paperwork & documents', owner: 'Owner reports', growth: 'Getting more students',
    custom: 'SOMETHING ELSE — read the message', 'not-sure': 'Not sure yet',
  },
};
const SOURCES = ['home', 'demo', 'contact', 'calculator', 'city', 'pricing', 'automations'];

// ---------------------------------------------------------------------------
// One-time setup: run this from the editor.
// ---------------------------------------------------------------------------
function setup() {
  const p = PropertiesService.getScriptProperties();
  if (!p.getProperty('OWNER_EMAIL')) p.setProperty('OWNER_EMAIL', Session.getEffectiveUser().getEmail());
  p.setProperty('SPREADSHEET_ID', SpreadsheetApp.getActiveSpreadsheet().getId());

  const sheet = getSheet_();
  formatSheet_(sheet);

  ScriptApp.getProjectTriggers().forEach((t) => ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger('remindUncontacted').timeBased().everyHours(1).create();
  ScriptApp.newTrigger('dailyDigest').timeBased().everyDays(1).atHour(8).inTimezone(CONFIG.TIMEZONE).create();
  ScriptApp.newTrigger('weeklySummary').timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(9)
    .inTimezone(CONFIG.TIMEZONE).create();

  if (!p.getProperty('TURNSTILE_SECRET')) {
    console.warn('TURNSTILE_SECRET is not set: the form works, but spam protection is weaker.');
  }
  console.log('Setup complete. Now deploy as a web app (Deploy > New deployment).');
}

// ---------------------------------------------------------------------------
// Web app endpoints
// ---------------------------------------------------------------------------
function doGet() {
  return json_({ ok: true, service: 'lead-inbox' });
}

function doPost(e) {
  let body;
  try {
    body = JSON.parse((e && e.postData && e.postData.contents) || '');
  } catch (err) {
    return json_({ ok: false, message: 'The request could not be read.' });
  }
  if (!body || typeof body !== 'object') return json_({ ok: false, message: 'The request could not be read.' });

  // Spam traps: answer "ok" so bots learn nothing, but save nothing.
  const tooFast = typeof body.startedAt === 'number' && Date.now() - body.startedAt < CONFIG.MIN_FILL_MS;
  if (body.website || tooFast) return json_({ ok: true });

  const checked = validate_(body);
  if (Object.keys(checked.errors).length) {
    return json_({ ok: false, message: 'Check the highlighted fields.', errors: checked.errors });
  }

  if (!verifyTurnstile_(body.turnstileToken)) {
    return json_({ ok: false, message: 'The spam check failed. Please try again, or message us on WhatsApp.' });
  }

  if (rateLimited_(checked.lead.phone)) {
    return json_({ ok: false, message: 'We are receiving a lot of requests right now. Please message us on WhatsApp.' });
  }

  const lead = checked.lead;
  const s = score_(lead);
  lead.score = s.score;
  lead.grade = s.grade;
  lead.reasons = s.reasons;

  try {
    return json_(handleLead_(lead));
  } catch (err) {
    console.error('handleLead_ failed', err);
    return json_({ ok: false, message: 'Your request could not be saved. Please message us on WhatsApp.' });
  }
}

// ---------------------------------------------------------------------------
// Validation, scoring and spam protection
// ---------------------------------------------------------------------------
function str_(v, max) {
  return typeof v === 'string' ? v.trim().slice(0, max) : '';
}

function normalizePhone_(raw) {
  let d = String(raw || '').replace(/\D/g, '');
  if (d.length === 12 && d.indexOf('91') === 0) d = d.slice(2);
  if (d.length === 11 && d.indexOf('0') === 0) d = d.slice(1);
  return d;
}

function validate_(b) {
  const errors = {};
  const pick = (v, allowed, fallback) => (allowed.indexOf(v) !== -1 ? v : fallback);

  const lead = {
    id: str_(b.id, 64),
    receivedAt: new Date().toISOString(),
    name: str_(b.name, 80),
    role: pick(b.role, Object.keys(LABELS.role), 'owner'),
    institute: str_(b.institute, 120),
    city: str_(b.city, 40),
    phone: normalizePhone_(b.phone),
    email: str_(b.email, 120),
    students: pick(b.students, Object.keys(LABELS.students), 'not-sure'),
    enquiries: pick(b.enquiries, Object.keys(LABELS.enquiries), 'not-sure'),
    method: pick(b.method, Object.keys(LABELS.method), ''),
    interest: pick(b.interest, Object.keys(LABELS.interest), 'not-sure'),
    preferredTime: str_(b.preferredTime, 80),
    message: str_(b.message, 1000),
    source: pick(b.source, SOURCES, 'home'),
    pagePath: str_(b.pagePath, 200),
    referrer: str_(b.referrer, 300),
    utm: {},
    calculator: null,
  };

  if (!/^[A-Za-z0-9-]{8,64}$/.test(lead.id)) errors.form = 'Reload the page and try again.';
  if (lead.name.length < 2) errors.name = 'Enter your name';
  if (lead.institute.length < 2) errors.institute = "Enter your institute's name";
  if (!CITIES[lead.city]) errors.city = 'Choose your area';
  if (!/^[6-9]\d{9}$/.test(lead.phone)) errors.phone = 'Enter a 10-digit mobile number';
  if (lead.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(lead.email)) errors.email = 'Enter a valid email, or leave it blank';
  if (b.consent !== true) errors.consent = 'Tick the box so we can contact you about your request';

  lead.cityName = CITIES[lead.city] || 'Other';
  lead.consentAt = lead.receivedAt;

  const u = b.utm && typeof b.utm === 'object' ? b.utm : {};
  ['source', 'medium', 'campaign', 'term', 'content'].forEach((k) => { lead.utm[k] = str_(u[k], 100); });

  const c = b.calculator;
  if (c && typeof c === 'object') {
    const n = (v, max) => (typeof v === 'number' && isFinite(v) && v >= 0 && v <= max ? v : 0);
    lead.calculator = {
      enquiriesPerMonth: n(c.enquiriesPerMonth, 10000),
      followUpRate: n(c.followUpRate, 100),
      joinRate: n(c.joinRate, 100),
      averageFee: n(c.averageFee, 10000000),
      missedPerMonth: n(c.missedPerMonth, 10000),
      yearlyValue: n(c.yearlyValue, 10000000000),
    };
  }
  return { lead, errors };
}

/**
 * Transparent 0–100 score. Every point has a reason, shown in the alert and the sheet.
 * A = call today, B = call within 2 days, C = reply on WhatsApp.
 */
function score_(lead) {
  let score = 0;
  const reasons = [];
  const add = (points, reason) => { score += points; reasons.push((points > 0 ? '+' : '') + points + ' ' + reason); };

  if (lead.role === 'owner') add(15, 'decision maker');
  else if (lead.role === 'admin' || lead.role === 'counsellor') add(5, 'front-desk contact');

  const students = { '100-300': [20, '100–300 students'], '300-600': [25, '300–600 students'],
    '600-plus': [10, '600+ students (may need a bigger system)'], 'not-sure': [5, 'size unknown'] }[lead.students];
  if (students) add(students[0], students[1]);

  const enquiries = { '20-50': [15, '20–50 enquiries/month'], '50-150': [25, '50–150 enquiries/month'],
    '150-plus': [20, '150+ enquiries/month'], 'under-20': [-5, 'under 20 enquiries/month'] }[lead.enquiries];
  if (enquiries) add(enquiries[0], enquiries[1]);

  if (['register', 'excel', 'whatsapp'].indexOf(lead.method) !== -1) add(15, 'tracks enquiries manually');
  else if (lead.method === 'software') add(-10, 'already uses software');

  if (lead.city !== 'other') add(15, 'inside service area');
  else add(-5, 'outside service area');

  if (lead.interest === 'custom') add(10, 'named a job of their own to automate');
  else if (lead.interest && lead.interest !== 'not-sure' && lead.interest !== 'admissions') {
    add(5, 'wants more than admissions');
  }

  if (lead.message.length >= 20) add(5, 'wrote a message');
  if (lead.calculator) add(5, 'used the calculator');

  score = Math.max(0, Math.min(100, score));
  return { score, grade: score >= 60 ? 'A' : score >= 35 ? 'B' : 'C', reasons };
}

function verifyTurnstile_(token) {
  const secret = PropertiesService.getScriptProperties().getProperty('TURNSTILE_SECRET');
  if (!secret) return true; // not configured: rely on the other spam checks
  if (!token || typeof token !== 'string') return false;
  try {
    const res = UrlFetchApp.fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'post',
      payload: { secret: secret, response: token },
      muteHttpExceptions: true,
    });
    return JSON.parse(res.getContentText()).success === true;
  } catch (err) {
    console.error('Turnstile verification error', err);
    return false;
  }
}

/** Apps Script can't see the visitor's IP, so limits are per phone number and site-wide. */
function rateLimited_(phone) {
  const cache = CacheService.getScriptCache();
  const hourKey = 'global-' + Utilities.formatDate(new Date(), 'UTC', 'yyyyMMddHH');
  const phoneKey = 'phone-' + phone;
  const globalCount = Number(cache.get(hourKey) || 0);
  const phoneCount = Number(cache.get(phoneKey) || 0);
  if (globalCount >= CONFIG.MAX_LEADS_PER_HOUR || phoneCount >= CONFIG.MAX_PER_PHONE_PER_HOUR) return true;
  cache.put(hourKey, String(globalCount + 1), 3600);
  cache.put(phoneKey, String(phoneCount + 1), 3600);
  return false;
}

function handleLead_(lead) {
  const lock = LockService.getScriptLock();
  lock.waitLock(20000);
  let rowNumber;
  let duplicateOf = '';
  try {
    const sheet = getSheet_();
    const col = headerIndex_(sheet);
    const data = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, HEADERS.length).getValues()
      : [];

    // Idempotency: a retried request carries the same Lead ID.
    if (data.some((r) => r[col['Lead ID']] === lead.id)) {
      return { ok: true, duplicateRequest: true };
    }

    duplicateOf = findRecentByPhone_(data, col, lead.phone);
    sheet.appendRow(rowFromLead_(lead, duplicateOf));
    rowNumber = sheet.getLastRow();
  } finally {
    lock.releaseLock();
  }

  try { notifyOwner_(lead, rowNumber, duplicateOf); } catch (err) { console.error('notifyOwner_ failed', err); }
  try { if (lead.email) sendAutoReply_(lead); } catch (err) { console.error('sendAutoReply_ failed', err); }

  return { ok: true, row: rowNumber };
}

// ---------------------------------------------------------------------------
// Sheet helpers
// ---------------------------------------------------------------------------
function getSheet_() {
  const id = PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID');
  const ss = id ? SpreadsheetApp.openById(id) : SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  if (!sheet) {
    sheet = ss.insertSheet(CONFIG.SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  }
  return sheet;
}

function formatSheet_(sheet) {
  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS])
    .setFontWeight('bold').setBackground('#1d2e6e').setFontColor('#ffffff');
  sheet.setFrozenRows(1);
  sheet.setFrozenColumns(6);

  const col = headerIndex_(sheet);
  const rows = sheet.getMaxRows() - 1;
  const colRange = (name) => sheet.getRange(2, col[name] + 1, rows, 1);

  colRange('Status').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(STATUSES, true).setAllowInvalid(false).build());
  colRange('Next follow-up').setDataValidation(
    SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build()).setNumberFormat('dd mmm yyyy');
  colRange('Received at').setNumberFormat('dd mmm yyyy, h:mm am/pm');
  colRange('First contacted at').setNumberFormat('dd mmm yyyy, h:mm am/pm');
  colRange('Reminder sent').setNumberFormat('dd mmm yyyy, h:mm am/pm');
  colRange('Phone').setNumberFormat('@');

  const grade = colRange('Grade');
  const rule = (text, bg) => SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo(text).setBackground(bg).setRanges([grade]).build();
  sheet.setConditionalFormatRules([rule('A', '#cdeedb'), rule('B', '#fff1c2'), rule('C', '#eceff5')]);

  sheet.setColumnWidth(col['Received at'] + 1, 150);
  sheet.setColumnWidth(col['Name'] + 1, 150);
  sheet.setColumnWidth(col['Institute'] + 1, 200);
  sheet.setColumnWidth(col['Message'] + 1, 260);
  sheet.setColumnWidth(col['Score reasons'] + 1, 260);
}

function headerIndex_(sheet) {
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn() || HEADERS.length).getValues()[0];
  const map = {};
  HEADERS.forEach((h) => {
    const i = header.indexOf(h);
    if (i === -1) throw new Error('Missing column in sheet header: ' + h + '. Run setup() again.');
    map[h] = i;
  });
  return map;
}

function rowFromLead_(lead, duplicateOf) {
  const utm = lead.utm || {};
  const calc = lead.calculator
    ? `${lead.calculator.enquiriesPerMonth}/mo, ${lead.calculator.followUpRate}% followed up, ` +
      `${lead.calculator.joinRate}% join, fee ₹${lead.calculator.averageFee}, est. ₹${lead.calculator.yearlyValue}/yr`
    : '';
  const values = {
    'Received at': new Date(lead.receivedAt),
    'Lead ID': lead.id,
    'Status': 'New',
    'Grade': lead.grade,
    'Score': lead.score,
    'Name': lead.name,
    'Role': LABELS.role[lead.role] || lead.role,
    'Institute': lead.institute,
    'Area': lead.cityName,
    'Phone': formatPhone_(lead.phone),
    'Email': lead.email || '',
    'Students': LABELS.students[lead.students] || lead.students,
    'Enquiries / month': LABELS.enquiries[lead.enquiries] || lead.enquiries,
    'Current method': LABELS.method[lead.method || ''] || lead.method || '',
    'Wants automated': LABELS.interest[lead.interest] || lead.interest || '',
    'Best time': lead.preferredTime || '',
    'Message': lead.message || '',
    'Score reasons': (lead.reasons || []).join('; '),
    'Calculator': calc,
    'Form': lead.source,
    'Page': lead.pagePath || '',
    'UTM source': utm.source || '',
    'UTM medium': utm.medium || '',
    'UTM campaign': utm.campaign || '',
    'Referrer': lead.referrer || '',
    'Next follow-up': '',
    'Notes': '',
    'First contacted at': '',
    'Reminder sent': '',
    'Duplicate of': duplicateOf,
  };
  return HEADERS.map((h) => sanitize_(values[h]));
}

/** Stop user input being interpreted as a spreadsheet formula. */
function sanitize_(v) {
  if (typeof v === 'string' && /^[=+\-@\t\r]/.test(v)) return "'" + v;
  return v === undefined || v === null ? '' : v;
}

function formatPhone_(tenDigits) {
  const d = String(tenDigits).replace(/\D/g, '').slice(-10);
  return d.slice(0, 5) + ' ' + d.slice(5);
}

function findRecentByPhone_(data, col, phone) {
  const target = formatPhone_(phone);
  const cutoff = Date.now() - CONFIG.DUPLICATE_WINDOW_DAYS * 24 * 3600 * 1000;
  for (let i = data.length - 1; i >= 0; i--) {
    const r = data[i];
    const received = r[col['Received at']];
    if (received instanceof Date && received.getTime() < cutoff) continue;
    if (String(r[col['Phone']]) === target) return 'Row ' + (i + 2);
  }
  return '';
}

function readRows_() {
  const sheet = getSheet_();
  const col = headerIndex_(sheet);
  const last = sheet.getLastRow();
  const rows = last > 1 ? sheet.getRange(2, 1, last - 1, HEADERS.length).getValues() : [];
  return { sheet, col, rows };
}

// ---------------------------------------------------------------------------
// Emails
// ---------------------------------------------------------------------------
function props_() {
  const p = PropertiesService.getScriptProperties();
  return {
    owner: p.getProperty('OWNER_EMAIL') || Session.getEffectiveUser().getEmail(),
    founder: p.getProperty('FOUNDER_NAME') || 'the team',
    whatsapp: p.getProperty('WHATSAPP_NUMBER') || '',
  };
}

function waLinkTo_(phone, text) {
  const d = String(phone).replace(/\D/g, '').slice(-10);
  return 'https://wa.me/91' + d + '?text=' + encodeURIComponent(text);
}

function sheetLink_(row) {
  const ss = SpreadsheetApp.openById(PropertiesService.getScriptProperties().getProperty('SPREADSHEET_ID'));
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME);
  return ss.getUrl() + '#gid=' + sheet.getSheetId() + (row ? '&range=A' + row : '');
}

function notifyOwner_(lead, row, duplicateOf) {
  const p = props_();
  const first = String(lead.name).split(/\s+/)[0];
  const waText = `Namaste ${first}, this is ${p.founder} from ${CONFIG.BRAND}. Thank you for your request for ` +
    `${lead.institute}. When would be a good time for a 10-minute call this week?`;
  const rows = [
    ['Grade', `${lead.grade} (${lead.score}/100)`],
    ['Name', `${lead.name} — ${LABELS.role[lead.role] || lead.role}`],
    ['Institute', `${lead.institute}, ${lead.cityName}`],
    ['Phone', formatPhone_(lead.phone)],
    ['Email', lead.email || '—'],
    ['Students', LABELS.students[lead.students] || lead.students],
    ['Enquiries / month', LABELS.enquiries[lead.enquiries] || lead.enquiries],
    ['Current method', LABELS.method[lead.method || ''] || '—'],
    ['Wants automated', LABELS.interest[lead.interest] || '—'],
    ['Best time', lead.preferredTime || '—'],
    ['Message', lead.message || '—'],
    ['Why this grade', (lead.reasons || []).join('; ')],
    ['Came from', [lead.source + ' form', lead.pagePath, lead.utm && lead.utm.source].filter(Boolean).join(', ')],
  ];
  if (duplicateOf) rows.unshift(['Note', `Same phone number as ${duplicateOf} in the last ${CONFIG.DUPLICATE_WINDOW_DAYS} days`]);

  const html =
    `<div style="font-family:Arial,sans-serif;font-size:15px;color:#1d2e6e">` +
    `<p style="margin:0 0 12px">New ${esc_(lead.source)} request from <b>${esc_(lead.institute)}</b>.</p>` +
    `<p style="margin:0 0 16px">` +
    button_(waLinkTo_(lead.phone, waText), `WhatsApp ${first}`, '#1c7a4d') + ' ' +
    button_('tel:+91' + String(lead.phone).slice(-10), 'Call', '#1d2e6e') + ' ' +
    button_(sheetLink_(row), 'Open in sheet', '#646b85') +
    `</p><table cellpadding="6" style="border-collapse:collapse">` +
    rows.map(([k, v]) => `<tr><td style="color:#646b85;vertical-align:top">${esc_(k)}</td><td>${esc_(v)}</td></tr>`).join('') +
    `</table><p style="color:#646b85;font-size:13px">Grade A: call today. B: within 2 days. C: reply on WhatsApp.</p></div>`;

  const plain = rows.map(([k, v]) => `${k}: ${v}`).join('\n') + `\n\nWhatsApp: ${waLinkTo_(lead.phone, waText)}`;

  const options = {
    to: p.owner,
    subject: `[${lead.grade}] New lead: ${lead.institute}, ${lead.cityName}`,
    body: plain,
    htmlBody: html,
    name: CONFIG.BRAND + ' website',
  };
  if (lead.email) options.replyTo = lead.email;
  MailApp.sendEmail(options);
}

function sendAutoReply_(lead) {
  const p = props_();
  const first = String(lead.name).split(/\s+/)[0];
  const wa = p.whatsapp
    ? `https://wa.me/${p.whatsapp}?text=${encodeURIComponent('Hi, I just sent a request on the ' + CONFIG.BRAND + ' website.')}`
    : '';
  const plain =
    `Hi ${first},\n\n` +
    `Thanks for your request for ${lead.institute}. ${p.founder} will call or WhatsApp you within one working day ` +
    `to fix a time for a short demo.\n\n` +
    (wa ? `If you'd rather talk now, message us on WhatsApp: ${wa}\n\n` : '') +
    `${p.founder}\n${CONFIG.BRAND}\n\n` +
    `You received this because you submitted a form on our website. We will not add you to any mailing list.`;

  MailApp.sendEmail({
    to: lead.email,
    subject: `We've got your request — ${CONFIG.BRAND}`,
    body: plain,
    replyTo: p.owner,
    name: CONFIG.BRAND,
  });
}

function button_(href, label, color) {
  return `<a href="${esc_(href)}" style="display:inline-block;padding:9px 14px;margin:0 6px 6px 0;background:${color};` +
    `color:#fff;text-decoration:none;border-radius:5px;font-weight:bold">${esc_(label)}</a>`;
}

function esc_(s) {
  return String(s === undefined || s === null ? '' : s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function fmt_(d) {
  return Utilities.formatDate(d, CONFIG.TIMEZONE, 'dd MMM, h:mm a');
}

// ---------------------------------------------------------------------------
// Time-driven automations
// ---------------------------------------------------------------------------
function remindUncontacted() {
  const hour = Number(Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'H'));
  if (hour < CONFIG.WORK_START_HOUR || hour >= CONFIG.WORK_END_HOUR) return;

  const { sheet, col, rows } = readRows_();
  const now = Date.now();
  const due = [];
  rows.forEach((r, i) => {
    const received = r[col['Received at']];
    if (r[col['Status']] !== 'New' || r[col['Reminder sent']] || !(received instanceof Date)) return;
    if (now - received.getTime() < CONFIG.REMIND_AFTER_HOURS * 3600 * 1000) return;
    due.push({ row: i + 2, r });
  });
  if (!due.length) return;

  const lines = due.map(({ r }) =>
    `${r[col['Grade']]} | ${r[col['Name']]}, ${r[col['Institute']]} (${r[col['Area']]}) | ${r[col['Phone']]} | ` +
    `waiting since ${fmt_(r[col['Received at']])}`);
  MailApp.sendEmail({
    to: props_().owner,
    subject: `${due.length} lead${due.length > 1 ? 's' : ''} waiting for a first call`,
    body: lines.join('\n') + `\n\nOpen the sheet: ${sheetLink_()}`,
    name: CONFIG.BRAND + ' website',
  });

  const stamp = new Date();
  due.forEach(({ row }) => sheet.getRange(row, col['Reminder sent'] + 1).setValue(stamp));
}

function dailyDigest() {
  const { col, rows } = readRows_();
  const tz = CONFIG.TIMEZONE;
  const today = Utilities.formatDate(new Date(), tz, 'yyyy-MM-dd');
  const yesterday = Utilities.formatDate(new Date(Date.now() - 24 * 3600 * 1000), tz, 'yyyy-MM-dd');
  const day = (d) => (d instanceof Date ? Utilities.formatDate(d, tz, 'yyyy-MM-dd') : '');

  const newYesterday = rows.filter((r) => day(r[col['Received at']]) === yesterday);
  const stillNew = rows.filter((r) => r[col['Status']] === 'New');
  const dueToday = rows.filter((r) => {
    const next = day(r[col['Next follow-up']]);
    return next && next <= today && CLOSED.indexOf(r[col['Status']]) === -1;
  });

  if (!newYesterday.length && !stillNew.length && !dueToday.length) return;

  const line = (r) => `${r[col['Grade']]} | ${r[col['Name']]}, ${r[col['Institute']]} (${r[col['Area']]}) | ` +
    `${r[col['Phone']]} | ${r[col['Status']]}`;
  const grades = ['A', 'B', 'C'].map((g) => `${g}: ${newYesterday.filter((r) => r[col['Grade']] === g).length}`).join(', ');

  const body = [
    `New leads yesterday: ${newYesterday.length} (${grades})`,
    '',
    `Follow-ups due today or overdue (${dueToday.length}):`,
    ...(dueToday.length ? dueToday.map(line) : ['None']),
    '',
    `Not contacted yet (${stillNew.length}):`,
    ...(stillNew.length ? stillNew.map(line) : ['None']),
    '',
    `Open the sheet: ${sheetLink_()}`,
  ].join('\n');

  MailApp.sendEmail({
    to: props_().owner,
    subject: `Daily leads: ${dueToday.length} follow-ups due, ${stillNew.length} not contacted`,
    body,
    name: CONFIG.BRAND + ' website',
  });
}

function weeklySummary() {
  const { col, rows } = readRows_();
  const weekAgo = Date.now() - 7 * 24 * 3600 * 1000;
  const monthAgo = Date.now() - 30 * 24 * 3600 * 1000;
  const recent = rows.filter((r) => r[col['Received at']] instanceof Date && r[col['Received at']].getTime() >= weekAgo);

  const countBy = (list, name) => {
    const counts = {};
    list.forEach((r) => { const k = r[col[name]] || '(none)'; counts[k] = (counts[k] || 0) + 1; });
    return Object.keys(counts).sort((a, b) => counts[b] - counts[a]).map((k) => `  ${k}: ${counts[k]}`);
  };

  const pipeline = STATUSES.map((s) => `  ${s}: ${rows.filter((r) => r[col['Status']] === s).length}`);

  const hours = rows
    .filter((r) => r[col['Received at']] instanceof Date && r[col['First contacted at']] instanceof Date &&
      r[col['Received at']].getTime() >= monthAgo)
    .map((r) => (r[col['First contacted at']].getTime() - r[col['Received at']].getTime()) / 3600000)
    .sort((a, b) => a - b);
  const median = hours.length ? hours[Math.floor(hours.length / 2)].toFixed(1) + ' hours' : 'no data yet';

  const body = [
    `Leads in the last 7 days: ${recent.length}`,
    '',
    'By area:', ...(recent.length ? countBy(recent, 'Area') : ['  none']),
    '',
    'By page:', ...(recent.length ? countBy(recent, 'Page') : ['  none']),
    '',
    'By grade:', ...(recent.length ? countBy(recent, 'Grade') : ['  none']),
    '',
    'All-time pipeline:', ...pipeline,
    '',
    `Median time to first contact (last 30 days): ${median}`,
    '',
    `Open the sheet: ${sheetLink_()}`,
  ].join('\n');

  MailApp.sendEmail({
    to: props_().owner,
    subject: `Weekly leads summary: ${recent.length} new`,
    body,
    name: CONFIG.BRAND + ' website',
  });
}

// Simple trigger: runs automatically when you edit the sheet.
function onEdit(e) {
  const sheet = e.range.getSheet();
  if (sheet.getName() !== CONFIG.SHEET_NAME || e.range.getRow() < 2) return;
  const header = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  const statusCol = header.indexOf('Status') + 1;
  const contactedCol = header.indexOf('First contacted at') + 1;
  if (e.range.getColumn() !== statusCol || e.range.getNumColumns() !== 1) return;
  if (e.value && e.value !== 'New') {
    const cell = sheet.getRange(e.range.getRow(), contactedCol);
    if (!cell.getValue()) cell.setValue(new Date());
  }
}

// ---------------------------------------------------------------------------
// Utilities
// ---------------------------------------------------------------------------
function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}

/** Run from the editor to check emails and the sheet without the website. */
function testLead() {
  handleLead_({
    id: Utilities.getUuid(),
    receivedAt: new Date().toISOString(),
    name: 'Test Owner',
    role: 'owner',
    institute: 'Test Classes',
    city: 'dombivli',
    cityName: 'Dombivli',
    phone: '9876543210',
    email: '',
    students: '100-300',
    enquiries: '50-150',
    method: 'register',
    interest: 'fees',
    preferredTime: 'after 7 pm',
    message: 'This is a test lead from testLead().',
    source: 'demo',
    pagePath: '/demo',
    referrer: '',
    utm: { source: '', medium: '', campaign: '', term: '', content: '' },
    score: 80,
    grade: 'A',
    reasons: ['+15 decision maker', '+20 100–300 students'],
  });
}
