// Shared by the client form and the server schema, so labels and allowed
// values can never drift apart.

export const ROLE_OPTIONS = [
  { value: "owner", label: "Owner or director" },
  { value: "admin", label: "Admin or reception" },
  { value: "counsellor", label: "Counsellor" },
  { value: "other", label: "Other" },
] as const;

export const STUDENT_OPTIONS = [
  { value: "not-sure", label: "Prefer not to say" },
  { value: "under-100", label: "Fewer than 100" },
  { value: "100-300", label: "100 to 300" },
  { value: "300-600", label: "300 to 600" },
  { value: "600-plus", label: "More than 600" },
] as const;

export const ENQUIRY_OPTIONS = [
  { value: "not-sure", label: "Not sure" },
  { value: "under-20", label: "Fewer than 20" },
  { value: "20-50", label: "20 to 50" },
  { value: "50-150", label: "50 to 150" },
  { value: "150-plus", label: "More than 150" },
] as const;

export const METHOD_OPTIONS = [
  { value: "register", label: "Paper register" },
  { value: "excel", label: "Excel or Google Sheets" },
  { value: "whatsapp", label: "Mostly WhatsApp chats" },
  { value: "software", label: "Software or an app" },
  { value: "other", label: "Something else" },
] as const;

export const LEAD_SOURCES = ["home", "demo", "contact", "calculator", "city", "pricing"] as const;

type Values<T extends readonly { value: string }[]> = T[number]["value"];
export type Role = Values<typeof ROLE_OPTIONS>;
export type StudentsRange = Values<typeof STUDENT_OPTIONS>;
export type EnquiryRange = Values<typeof ENQUIRY_OPTIONS>;
export type Method = Values<typeof METHOD_OPTIONS>;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export function valuesOf<T extends readonly { value: string }[]>(opts: T) {
  return opts.map((o) => o.value) as unknown as [Values<T>, ...Values<T>[]];
}

export function labelOf(opts: readonly { value: string; label: string }[], value?: string) {
  return opts.find((o) => o.value === value)?.label ?? value ?? "";
}

export type CalculatorSnapshot = {
  enquiriesPerMonth: number;
  followUpRate: number;
  joinRate: number;
  averageFee: number;
  missedPerMonth: number;
  yearlyValue: number;
};
