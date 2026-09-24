export type Plan = {
  id: "founding" | "admission-desk" | "admission-fees";
  name: string;
  forWhom: string;
  setup: number;
  monthly: number;
  monthlyNote?: string;
  includes: string[];
  highlight?: boolean;
};

export const plans: Plan[] = [
  {
    id: "admission-desk",
    name: "Admission Desk",
    forWhom: "One branch that wants every enquiry followed up.",
    setup: 4999,
    monthly: 1499,
    highlight: true,
    includes: [
      "Enquiry form and reception QR code",
      "Today's calls list for up to 3 staff",
      "One-tap call and WhatsApp from your own number",
      "New-enquiry alerts to the owner",
      "Weekly report: sources, conversions, overdue calls",
      "In-person setup and 30-minute staff training",
      "Monthly 30-minute review",
    ],
  },
  {
    id: "admission-fees",
    name: "Admission + Fees",
    forWhom: "Classes that also chase fee instalments every month.",
    setup: 8999,
    monthly: 2499,
    includes: [
      "Everything in Admission Desk",
      "Fee instalment tracker with due-date list",
      "Monthly pending-fees report for the owner",
      "Up to 2 branches and 5 staff",
      "Automatic alerts to staff when a follow-up is overdue",
    ],
  },
];

export const foundingOffer = {
  name: "Founding institute offer",
  setup: 2999,
  monthlyIntro: 999,
  introMonths: 3,
  monthlyAfter: 1499,
  seats: 3,
  terms:
    "For the first 3 institutes only. In return, we ask for a short case study with your numbers once the system has run for a month.",
};

export const annualNote = "Pay yearly and get 12 months for the price of 10.";

// Keep this true only while you are below the GST registration threshold.
// If you register for GST, change the note (and your prices) accordingly.
export const gstNote = "No GST is added to these prices.";

export const extras = [
  { item: "Extra branch", price: "₹999 per month" },
  { item: "Changes outside the agreed setup", price: "Quoted before we start" },
  { item: "A new automation once you are running", price: "Fixed price per job" },
  { item: "Importing your existing Excel or Google Sheet of enquiries", price: "Free" },
  { item: "Telling you a job is not worth automating", price: "Free" },
];

// Custom work is quoted per job rather than sold as a plan. These bands exist so
// an owner can place their own request before they call, not to fix a price.
// Deliberately no rupee figures: the number comes from the job, in writing, once.
export type BuildSize = { name: string; shape: string; time: string; examples: string };

export const buildSizes: BuildSize[] = [
  {
    name: "A small job",
    shape: "One task, one sheet, one output. Usually a list, a reminder or a document that makes itself.",
    time: "Ready within a week of the quote",
    examples: "Receipt PDFs, an absent-student list, a daily collection email, an ID card run",
  },
  {
    name: "A module",
    shape: "A whole area of the week, with its own forms, lists and reports, connected to what you already run.",
    time: "Two to four weeks",
    examples: "Fee instalments end to end, attendance across every batch, test marks through to report cards",
  },
  {
    name: "A system",
    shape: "Several modules working off the same student record, so nothing is typed in twice.",
    time: "Quoted with a schedule, built in stages you can stop between",
    examples: "Admissions, fees and attendance together across two or three branches",
  },
];

export const buildPriceNote =
  "Every custom build is a single fixed price, agreed in writing before anything starts, and it does not move once we begin. Half before, half once it has run for a week.";

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
