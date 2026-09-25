#!/usr/bin/env node
/**
 * Kaamless demo — "the Monday report that builds itself"
 *
 * Run it in front of a prospect:
 *
 *     node run.js
 *     node run.js --explain     show every cleaning decision it made
 *
 * It reads every CSV in ./inbox, which is what four branches actually send:
 * three date formats, branch names typed differently, amounts with rupee signs
 * and thousands separators, one invoice sent twice, and a row with no branch.
 *
 * It writes ./out/report.html — open it, that is the thing a person used to
 * spend Monday morning assembling.
 *
 * No dependencies, no install, no network. Node 18 or newer.
 * Keep the rules here in step with src/lib/demo-pipeline.ts on the website.
 */

'use strict';

const fs = require('fs');
const path = require('path');

const INBOX = path.join(__dirname, 'inbox');
const OUT = path.join(__dirname, 'out');
const EXPLAIN = process.argv.includes('--explain');

// --- the rules ------------------------------------------------------------

/** Branch names arrive in whatever case and spacing the sender felt like. */
function normaliseBranch(value) {
  const trimmed = String(value || '').trim().replace(/\s+/g, ' ');
  if (!trimmed) return '';
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/** Three date formats in one folder is normal, not unusual. */
function normaliseDate(value) {
  const v = String(value || '').trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{2})[/-](\d{2})[/-](\d{4})$/.exec(v);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return null;
}

/**
 * Money arrives with currency symbols, thousands separators and stray spaces.
 * "16.800" is the one that matters: a full stop used as a thousands separator.
 * parseFloat turns that into 16.8 without complaining, and the report is then
 * quietly wrong by ₹16,783 — the kind of error nobody finds for months.
 */
function normaliseAmount(value) {
  const v = String(value || '').trim().replace(/[₹\s]/g, '');
  if (!v) return null;
  const withoutCommas = v.replace(/,/g, '');
  const thousandsDot = /^\d+\.\d{3}$/.test(withoutCommas);
  const n = Number(thousandsDot ? withoutCommas.replace('.', '') : withoutCommas);
  return Number.isFinite(n) ? n : null;
}

const inr = (n) =>
  '₹' + Number(Math.round(n)).toLocaleString('en-IN');

// --- the pipeline ---------------------------------------------------------

function collect() {
  if (!fs.existsSync(INBOX)) {
    console.error(`No inbox folder at ${INBOX}`);
    process.exit(1);
  }
  const files = fs.readdirSync(INBOX).filter((f) => f.toLowerCase().endsWith('.csv')).sort();
  return files.map((file) => ({
    file,
    lines: fs
      .readFileSync(path.join(INBOX, file), 'utf8')
      .split(/\r?\n/)
      .filter((l) => l.trim().length > 0),
  }));
}

function process_(sources) {
  const clean = [];
  const rejected = [];
  const notes = [];
  const seen = new Map();
  let duplicates = 0;

  for (const source of sources) {
    for (const raw of source.lines.slice(1)) {
      // Split on every comma, then rejoin the tail: the amount field
      // legitimately contains commas ("24,500"), so a fixed field split would
      // silently truncate it to 24.
      const parts = raw.split(',');
      const [dateRaw = '', branchRaw = '', invoiceRaw = '', qtyRaw = ''] = parts;
      const amountRaw = parts.slice(4).join(',');
      const invoice = invoiceRaw.trim();
      const where = `${source.file}`;

      const branch = normaliseBranch(branchRaw);
      if (!branch) {
        rejected.push({ invoice, where, reason: 'No branch on the row' });
        continue;
      }
      if (branchRaw !== branch) notes.push(`${invoice}: branch "${branchRaw}" read as "${branch}"`);

      const date = normaliseDate(dateRaw);
      if (!date) {
        rejected.push({ invoice, where, reason: `Date "${dateRaw.trim()}" is not a date I recognise` });
        continue;
      }
      if (dateRaw.trim() !== date) notes.push(`${invoice}: date "${dateRaw.trim()}" read as ${date}`);

      const qty = Number(String(qtyRaw).trim());
      if (!Number.isFinite(qty) || qty <= 0) {
        rejected.push({ invoice, where, reason: `Quantity is ${String(qtyRaw).trim() || 'empty'}` });
        continue;
      }

      const amount = normaliseAmount(amountRaw);
      if (amount === null || amount <= 0) {
        rejected.push({ invoice, where, reason: `Amount "${amountRaw.trim()}" could not be read` });
        continue;
      }
      if (amountRaw.trim() !== String(amount)) {
        notes.push(`${invoice}: amount "${amountRaw.trim()}" read as ${amount}`);
      }

      if (seen.has(invoice)) {
        duplicates += 1;
        notes.push(`${invoice}: duplicate of the row already taken from ${seen.get(invoice)}`);
        continue;
      }
      seen.set(invoice, where);

      clean.push({ date, branch, invoice, qty, amount });
    }
  }

  const totals = new Map();
  for (const row of clean) {
    const t = totals.get(row.branch) || { invoices: 0, qty: 0, amount: 0 };
    t.invoices += 1;
    t.qty += row.qty;
    t.amount += row.amount;
    totals.set(row.branch, t);
  }
  const byBranch = [...totals.entries()]
    .map(([branch, t]) => Object.assign({ branch }, t))
    .sort((a, b) => b.amount - a.amount);

  return {
    clean,
    rejected,
    notes,
    duplicates,
    byBranch,
    total: clean.reduce((n, r) => n + r.amount, 0),
    totalQty: clean.reduce((n, r) => n + r.qty, 0),
    days: new Set(clean.map((r) => r.date)).size,
  };
}

// --- the report -----------------------------------------------------------

function esc(v) {
  return String(v).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
}

function html(result, sources, ms) {
  const rows = result.byBranch
    .map(
      (b) => `<tr>
        <th scope="row">${esc(b.branch)}</th>
        <td class="n">${b.invoices}</td>
        <td class="n">${b.qty}</td>
        <td class="n">${esc(inr(b.amount))}</td>
      </tr>`,
    )
    .join('\n');

  const exceptions = result.rejected
    .map((r) => `<li><strong>${esc(r.invoice || '(no invoice number)')}</strong> — ${esc(r.reason)} <span class="muted">(${esc(r.where)})</span></li>`)
    .join('\n');

  return `<!doctype html>
<html lang="en-IN">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Weekly branch report</title>
<style>
  :root { --ink:#1d2e6e; --deep:#121d4a; --rule:#cbd7ef; --paper:#fbfcfe; --reg:#f1f5fc;
          --margin:#c7303b; --stamp:#1c7a4d; --muted:#646b85; --hi:#ffe6a0; }
  * { box-sizing: border-box; }
  body { margin:0; padding:2rem 1.25rem; background:var(--paper); color:#3d4460;
         font:16px/1.6 "Segoe UI", system-ui, -apple-system, sans-serif; }
  .sheet { max-width:52rem; margin:0 auto; background:#fff; border:1px solid var(--rule);
           border-radius:8px; padding:2rem; }
  h1 { color:var(--deep); font-size:1.75rem; margin:0 0 .25rem; }
  h2 { color:var(--deep); font-size:1.15rem; margin:2rem 0 .5rem; }
  .sub { color:var(--muted); margin:0 0 1.5rem; }
  .headline { font-size:1.15rem; border-left:3px solid var(--ink); padding-left:1rem; margin:1.5rem 0; }
  mark { background:var(--hi); padding:0 .2rem; }
  table { border-collapse:collapse; width:100%; margin-top:.5rem; }
  th, td { text-align:left; padding:.55rem .5rem; border-bottom:1px solid var(--rule); }
  thead th { color:var(--deep); border-bottom:2px solid var(--ink); }
  td.n, th.n { text-align:right; font-variant-numeric:tabular-nums; }
  tfoot th, tfoot td { border-top:2px solid var(--ink); border-bottom:none; color:var(--deep); font-weight:700; }
  ul { padding-left:1.1rem; }
  li { margin:.35rem 0; }
  .muted { color:var(--muted); font-size:.9rem; }
  .stamp { display:inline-block; border:2px solid var(--stamp); color:var(--stamp); border-radius:3px;
           padding:.05rem .5rem; font-size:.75rem; font-weight:800; letter-spacing:.08em;
           text-transform:uppercase; transform:rotate(-6deg); }
  footer { margin-top:2rem; padding-top:1rem; border-top:1px solid var(--rule); color:var(--muted); font-size:.9rem; }
  @media print { body { padding:0; background:#fff; } .sheet { border:none; } }
</style>
</head>
<body>
<div class="sheet">
  <span class="stamp">Automated</span>
  <h1>Weekly branch report</h1>
  <p class="sub">Generated ${esc(new Date().toLocaleString('en-IN'))} from ${sources.length} branch files. Nobody assembled this.</p>

  <p class="headline">
    <strong>${result.clean.length}</strong> invoices across <strong>${result.byBranch.length}</strong> branches and
    <strong>${result.days}</strong> days, totalling <mark><strong>${esc(inr(result.total))}</strong></mark>.
  </p>

  <h2>By branch</h2>
  <table>
    <thead><tr><th>Branch</th><th class="n">Invoices</th><th class="n">Qty</th><th class="n">Amount</th></tr></thead>
    <tbody>
${rows}
    </tbody>
    <tfoot>
      <tr><th>Total</th><td class="n">${result.clean.length}</td><td class="n">${result.totalQty}</td><td class="n">${esc(inr(result.total))}</td></tr>
    </tfoot>
  </table>

  <h2>Needs a human — ${result.rejected.length + (result.duplicates ? 1 : 0)} things</h2>
  <p class="muted">The automation does not guess. Anything it cannot trust is set aside and named, so it can be fixed in a minute instead of found in an audit.</p>
  <ul>
${exceptions}
${result.duplicates ? `    <li><strong>${result.duplicates} duplicate invoice</strong> dropped automatically — same number and amount, sent twice.</li>` : ''}
  </ul>

  <footer>
    Built by Kaamless. The work above took ${ms.toFixed(1)} ms. Doing it by hand takes about three hours, every week.
  </footer>
</div>
</body>
</html>
`;
}

// --- run ------------------------------------------------------------------

function main() {
  const started = process.hrtime.bigint();
  const sources = collect();
  const result = process_(sources);
  const ms = Number(process.hrtime.bigint() - started) / 1e6;

  fs.mkdirSync(OUT, { recursive: true });
  const reportPath = path.join(OUT, 'report.html');
  fs.writeFileSync(reportPath, html(result, sources, ms), 'utf8');

  const line = (label, value) => console.log('  ' + String(label).padEnd(22) + value);

  console.log('');
  console.log('  Kaamless demo — weekly branch report');
  console.log('  ' + '-'.repeat(52));
  sources.forEach((s) => line('read', `${s.file} (${s.lines.length - 1} rows)`));
  console.log('');
  line('rows accepted', result.clean.length);
  line('rows set aside', result.rejected.length);
  line('duplicates dropped', result.duplicates);
  line('branches', result.byBranch.length);
  line('total', inr(result.total));
  console.log('');
  result.byBranch.forEach((b) => line(b.branch, `${String(b.invoices).padStart(2)} invoices   ${inr(b.amount)}`));
  console.log('');
  result.rejected.forEach((r) => line('needs a human', `${r.invoice || '(no invoice)'} — ${r.reason}`));

  if (EXPLAIN) {
    console.log('');
    console.log('  Every decision it made:');
    result.notes.forEach((n) => console.log('    · ' + n));
  }

  console.log('');
  console.log('  ' + '-'.repeat(52));
  line('time taken', ms.toFixed(1) + ' ms');
  line('by hand', 'about 3 hours, every week');
  console.log('');
  console.log('  Report written to: ' + reportPath);
  console.log('  Open it in a browser to show the client what lands in their inbox.');
  console.log('');
}

main();
