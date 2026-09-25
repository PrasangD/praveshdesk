// Shared by the request form and the Apps Script schema, so labels and allowed
// values can never drift apart. Every value here must also exist in LABELS in
// apps-script/Code.gs, or the answer silently falls back to its default.

export const KIND_OPTIONS = [
  { value: "company", label: "A company" },
  { value: "institute", label: "A school, college or coaching institute" },
  { value: "other", label: "Something else" },
] as const;

export const ROLE_OPTIONS = [
  { value: "owner", label: "Owner, founder or director" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance or accounts" },
  { value: "engineering", label: "IT or engineering" },
  { value: "hr", label: "HR or admin" },
  { value: "other", label: "Other" },
] as const;

export const SIZE_OPTIONS = [
  { value: "not-sure", label: "Prefer not to say" },
  { value: "under-10", label: "Fewer than 10 people" },
  { value: "10-50", label: "10 to 50" },
  { value: "50-200", label: "50 to 200" },
  { value: "200-1000", label: "200 to 1,000" },
  { value: "1000-plus", label: "More than 1,000" },
] as const;

/** Roughly how big the job is. The strongest qualifying question on the form. */
export const HOURS_OPTIONS = [
  { value: "not-sure", label: "Not sure yet" },
  { value: "under-2", label: "Under 2 hours a week" },
  { value: "2-5", label: "2 to 5 hours a week" },
  { value: "5-15", label: "5 to 15 hours a week" },
  { value: "15-plus", label: "More than 15 hours a week" },
] as const;

// What they want automated. Values match the group ids in lib/automations.ts,
// plus the two answers that are not a group.
export const AREA_OPTIONS = [
  { value: "reports", label: "Reports that build themselves" },
  { value: "integration", label: "Data moving between systems" },
  { value: "documents", label: "Documents and paperwork" },
  { value: "spreadsheets", label: "Spreadsheets and back-office" },
  { value: "deployments", label: "Deployments, environments and releases" },
  { value: "cloud", label: "Cloud cost and housekeeping" },
  { value: "monitoring", label: "Monitoring, alerts and on-call" },
  { value: "people", label: "Joining, moving and leaving" },
  { value: "requests", label: "Approvals and internal requests" },
  { value: "institutes", label: "Schools, colleges and coaching institutes" },
  { value: "custom", label: "Something else — I'll describe it below" },
  { value: "not-sure", label: "Not sure yet, I want advice" },
] as const;

export const REQUEST_SOURCES = [
  "home",
  "demo",
  "contact",
  "calculator",
  "city",
  "pricing",
  "automations",
  "audit",
] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
export type Kind = Values<typeof KIND_OPTIONS>;
export type Role = Values<typeof ROLE_OPTIONS>;
export type Size = Values<typeof SIZE_OPTIONS>;
export type Hours = Values<typeof HOURS_OPTIONS>;
export type Area = Values<typeof AREA_OPTIONS>;
export type RequestSource = (typeof REQUEST_SOURCES)[number];

export function valuesOf<T extends readonly { value: string }[]>(opts: T) {
  return opts.map((o) => o.value) as unknown as [Values<T>, ...Values<T>[]];
}

export function labelOf(opts: readonly { value: string; label: string }[], value?: string) {
  return opts.find((o) => o.value === value)?.label ?? value ?? "";
}

/** What the calculator sends along, so a request arrives with their own numbers. */
export type CalculatorSnapshot = {
  hoursPerWeek: number;
  people: number;
  monthlySalary: number;
  buildCost: number;
  hoursPerYear: number;
  yearlyCost: number;
  paybackMonths: number | null;
};
