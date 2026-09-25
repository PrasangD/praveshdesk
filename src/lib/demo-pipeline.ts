// The demo on /demo.
//
// This is a real pipeline, not an animation: the numbers on the page are
// computed from the messy rows below, every time you press the button. That
// matters — a demo that only pretends to work is exactly the thing this
// business is supposed to be the opposite of.
//
// The scenario is the most common first build there is: four branches email a
// daily sheet, somebody spends Monday morning making them agree, and the
// report goes out late and occasionally wrong.
//
// A standalone version of this runs on a laptop with plain node, in
// demo-pack/. Keep the two in step if you change the rules.

/** Deliberately messy: every defect here is one I have actually been handed. */
export const RAW_ROWS: string[] = [
  "date,branch,invoice,qty,amount",
  "2026-09-14,Dombivli,INV-1001,12,  24,500 ",
  "14/09/2026,dombivli ,INV-1002,4,8200",
  "2026-09-14,Ambernath,INV-1003,9,₹18,900",
  "15-09-2026,AMBERNATH,INV-1004,7,14700",
  "2026-09-15,Kalyan,INV-1005,15,31500",
  "2026-09-15,Kalyan,INV-1005,15,31500",
  "2026-09-15,Thane,INV-1006,6,12600",
  "2026-09-16,,INV-1007,3,6300",
  "2026-09-16,Dombivli,INV-1008,0,0",
  "16/09/2026,Thane ,INV-1009,11,23100",
  "2026-09-17,Kalyan,INV-1010,8,16.800",
  "2026-09-17,Ambernath,INV-1011,-2,4200",
  "2026-09-18,Dombivli,INV-1012,14,29400",
  "2026-09-18,Thane,INV-1013,5,10500",
  "2026-09-19,Kalyan,INV-1014,10,21000",
];

export type CleanRow = { date: string; branch: string; invoice: string; qty: number; amount: number };
export type Rejection = { invoice: string; reason: string; raw: string };

/** Branch names arrive in whatever case and spacing the sender felt like. */
function normaliseBranch(value: string): string {
  const trimmed = value.trim().replace(/\s+/g, " ");
  if (!trimmed) return "";
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1).toLowerCase();
}

/** Three date formats in one folder is normal, not unusual. */
function normaliseDate(value: string): string | null {
  const v = value.trim();
  let m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(v);
  if (m) return `${m[1]}-${m[2]}-${m[3]}`;
  m = /^(\d{2})[/-](\d{2})[/-](\d{4})$/.exec(v);
  if (m) return `${m[3]}-${m[2]}-${m[1]}`;
  return null;
}

/**
 * Money arrives with currency symbols, thousands separators and stray spaces.
 * "16.800" is the interesting one: a full stop used as a thousands separator,
 * which silently becomes 16.8 if you just call parseFloat on it.
 */
function normaliseAmount(value: string): number | null {
  const v = value.trim().replace(/[₹\s]/g, "");
  if (!v) return null;
  const withoutCommas = v.replace(/,/g, "");
  // A single dot followed by exactly three digits is a thousands separator here,
  // never paise: no invoice in this business is quoted to three decimal places.
  const thousandsDot = /^\d+\.\d{3}$/.test(withoutCommas);
  const n = Number(thousandsDot ? withoutCommas.replace(".", "") : withoutCommas);
  return Number.isFinite(n) ? n : null;
}

export type PipelineResult = {
  clean: CleanRow[];
  rejected: Rejection[];
  duplicates: number;
  byBranch: { branch: string; invoices: number; qty: number; amount: number }[];
  total: number;
  totalQty: number;
  days: number;
};

export function runPipeline(rows: string[] = RAW_ROWS): PipelineResult {
  const body = rows.slice(1).filter((r) => r.trim().length > 0);
  const clean: CleanRow[] = [];
  const rejected: Rejection[] = [];
  const seen = new Set<string>();
  let duplicates = 0;

  for (const raw of body) {
    // Split on every comma, then rejoin the tail: the amount field legitimately
    // contains commas ("24,500"), so a split with a field limit would silently
    // truncate it to 24 and the report would be quietly, catastrophically wrong.
    const parts = raw.split(",");
    const [dateRaw = "", branchRaw = "", invoiceRaw = "", qtyRaw = ""] = parts;
    const amountRaw = parts.slice(4).join(",");
    const invoice = invoiceRaw.trim();

    const branch = normaliseBranch(branchRaw);
    if (!branch) {
      rejected.push({ invoice, reason: "No branch on the row", raw });
      continue;
    }

    const date = normaliseDate(dateRaw);
    if (!date) {
      rejected.push({ invoice, reason: `Date "${dateRaw.trim()}" is not a date I recognise`, raw });
      continue;
    }

    const qty = Number(qtyRaw.trim());
    if (!Number.isFinite(qty) || qty <= 0) {
      rejected.push({ invoice, reason: `Quantity is ${qtyRaw.trim() || "empty"}`, raw });
      continue;
    }

    const amount = normaliseAmount(amountRaw);
    if (amount === null || amount <= 0) {
      rejected.push({ invoice, reason: `Amount "${amountRaw.trim()}" could not be read`, raw });
      continue;
    }

    if (seen.has(invoice)) {
      duplicates += 1;
      continue;
    }
    seen.add(invoice);

    clean.push({ date, branch, invoice, qty, amount });
  }

  const totals = new Map<string, { invoices: number; qty: number; amount: number }>();
  for (const row of clean) {
    const current = totals.get(row.branch) ?? { invoices: 0, qty: 0, amount: 0 };
    current.invoices += 1;
    current.qty += row.qty;
    current.amount += row.amount;
    totals.set(row.branch, current);
  }

  const byBranch = [...totals.entries()]
    .map(([branch, t]) => ({ branch, ...t }))
    .sort((a, b) => b.amount - a.amount);

  return {
    clean,
    rejected,
    duplicates,
    byBranch,
    total: clean.reduce((n, r) => n + r.amount, 0),
    totalQty: clean.reduce((n, r) => n + r.qty, 0),
    days: new Set(clean.map((r) => r.date)).size,
  };
}

/** The steps, in the order the page plays them. Timings are measured, not faked. */
export const PIPELINE_STEPS = [
  { id: "collect", label: "Collect", detail: "Read the four branch files" },
  { id: "normalise", label: "Normalise", detail: "Dates, branch names and amounts into one shape" },
  { id: "validate", label: "Validate", detail: "Reject what cannot be trusted, and say why" },
  { id: "dedupe", label: "De-duplicate", detail: "Drop the invoice that was sent twice" },
  { id: "aggregate", label: "Total up", detail: "By branch, then overall" },
  { id: "report", label: "Build the report", detail: "The thing a person used to assemble" },
] as const;
