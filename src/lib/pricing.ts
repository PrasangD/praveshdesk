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
  { item: "Importing your existing Excel or Google Sheet of enquiries", price: "Free" },
];

export function inr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
