// Prices.
//
// Everything here is a real number you can quote on a call. The logic behind
// them: an automation is worth building when it pays for itself inside a year,
// so the bands are anchored to what a job costs a business to keep doing by
// hand (see /calculator), not to what it costs me to build.
//
// One price list for companies and institutes. Smaller institutes land at the
// bottom of each band and larger companies at the top, which is honest and
// saves maintaining two sets of numbers.

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Step 1: the audit. Sold separately so nobody has to trust me with a big
// number first, and so I never quote a build I have not seen.
// ---------------------------------------------------------------------------

export const audit = {
  name: "Automation audit",
  price: 9999,
  duration: "Half a day with your team, on site or on a call",
  deliverable: "A written report within three working days",
  includes: [
    "We walk three to five processes end to end, with the people who actually do them",
    "Each one costed: hours a week, who does it, what it costs you a year",
    "What can be automated, what should not be, and what to fix without code",
    "Effort and a price band for each, ranked by payback",
    "Yours to keep, and to take to anyone else for a second quote",
  ],
  creditNote:
    "The full ₹9,999 comes off your first build if you go ahead within 60 days. If you do not, you still keep the report.",
};

// ---------------------------------------------------------------------------
// Step 2: the build. Fixed price per job, quoted after the audit.
// ---------------------------------------------------------------------------

export type BuildBand = {
  id: "quick" | "module" | "system";
  name: string;
  from: number;
  /** null = open-ended, quoted with a schedule. */
  to: number | null;
  time: string;
  shape: string;
  examples: string[];
  highlight?: boolean;
};

export const buildBands: BuildBand[] = [
  {
    id: "quick",
    name: "Quick win",
    from: 18000,
    to: 45000,
    time: "Ready in 3 to 7 working days",
    shape: "One process, one output, one owner. The thing somebody does every week that should simply arrive instead.",
    examples: [
      "A weekly report that builds and sends itself",
      "A daily file picked up, checked and loaded",
      "Invoices, receipts or certificates generated from a record",
      "Idle cloud resources stopped on a schedule",
      "Expiry and threshold alerts that reach a person in time",
    ],
    highlight: true,
  },
  {
    id: "module",
    name: "Connected module",
    from: 60000,
    to: 180000,
    time: "Two to four weeks",
    shape:
      "A whole workflow across several tools, with validation, logging, error handling and alerts — built to survive bad input and a bad day.",
    examples: [
      "A deployment pipeline with environments and a tested rollback",
      "Reconciliation between two systems, exceptions only to a human",
      "Joiner and leaver access across every tool you use",
      "Fees end to end: dues, receipts, reminders, reporting",
      "Monitoring and alert routing that someone can actually be on call for",
    ],
  },
  {
    id: "system",
    name: "System",
    from: 250000,
    to: null,
    time: "Staged, with a schedule agreed up front",
    shape:
      "Several modules sharing one source of truth, so nothing is entered twice. Built in stages you can stop between, each useful on its own.",
    examples: [
      "Operations, finance and reporting on one data layer",
      "A full platform setup: environments, pipelines, secrets, monitoring, backups",
      "Multi-branch or multi-entity consolidation and reporting",
    ],
  },
];

export const buildPriceNote =
  "Every build is one fixed price, agreed in writing before anything starts, and it does not move once we begin. Half to start, half a week after it is running on your real data.";

// ---------------------------------------------------------------------------
// Step 3: keeping it running. Optional, and genuinely optional — the handover
// includes the code and the access, so you can maintain it yourself.
// ---------------------------------------------------------------------------

export type CarePlan = {
  id: "watch" | "standard" | "priority";
  name: string;
  monthly: number;
  forWhom: string;
  includes: string[];
  highlight?: boolean;
};

export const carePlans: CarePlan[] = [
  {
    id: "watch",
    name: "Watch",
    monthly: 4999,
    forWhom: "One or two automations you would rather not think about.",
    includes: [
      "Failures monitored and fixed",
      "Up to 2 hours of small changes a month",
      "Reply within one working day",
      "Runs on your own accounts, always",
    ],
  },
  {
    id: "standard",
    name: "Standard",
    monthly: 9999,
    forWhom: "A few automations that the business now depends on.",
    highlight: true,
    includes: [
      "Everything in Watch",
      "Up to 6 hours of changes a month",
      "A 30-minute review each month, with what ran and what nearly broke",
      "Version upgrades and credential rotation handled",
    ],
  },
  {
    id: "priority",
    name: "Priority",
    monthly: 19999,
    forWhom: "Automations that stop work when they stop.",
    includes: [
      "Everything in Standard",
      "Up to 15 hours of changes a month",
      "Same-day response during support windows",
      "A standing slot each month for whatever is next",
    ],
  },
];

export const dayRate = {
  day: 12000,
  week: 50000,
  note:
    "For work that cannot be scoped as a fixed price yet: an unfamiliar system, a migration, or sitting with your team while they learn the thing I built.",
};

export const extras = [
  { item: "First call, and telling you a job is not worth automating", price: "Free" },
  { item: "Handover: code, credentials and written notes", price: "Included, always" },
  { item: "Taking over an automation somebody else built", price: "Audit first, then quoted" },
  { item: "Emergency work outside support windows", price: "Day rate, 1.5×" },
  { item: "Travel beyond Thane district", price: "Quoted with the job" },
];

export const startingOffer = {
  name: "First five clients",
  seats: 5,
  body: "The audit is free instead of ₹9,999, and the first build is priced at the bottom of its band.",
  terms:
    "In return I ask for one thing once it has run a month: permission to describe what was built and the hours it saved, with your name on it only if you are happy for it to be.",
};

export const capacityNote = `I take on two builds at a time. That is a real limit, not a sales line — I do this alongside a full-time DevOps job, and a build I cannot finish properly is worth nothing to either of us.`;

export const paymentNote =
  "Payment by UPI or bank transfer against an invoice. The audit is paid up front. Builds are half to start and half a week after go-live. Care plans are monthly, in advance, and you can stop with 15 days' notice.";

// Keep this true only while you are below the GST registration threshold.
// If you register for GST, change the note (and your prices) accordingly.
export const gstNote = "No GST is added to these prices.";
