// Single source of truth for brand + contact details.
// Change the name here and it changes everywhere on the site.

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000";

export const site = {
  name: "PraveshDesk",
  tagline: "Every enquiry gets a call back.",
  shortDescription:
    "Done-for-you software for coaching classes in Dombivli, Kalyan, Thane and nearby: admission enquiries and follow-up first, then whatever else your staff still do by hand.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://praveshdesk.pages.dev").replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 90000 00000",
  whatsappNumber,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yourname@gmail.com",
  founderName: process.env.NEXT_PUBLIC_FOUNDER_NAME ?? "Your Name",
  baseLocation: "Dombivli",
  region: "Thane district, Maharashtra",
  replyPromise: "We reply within one working day.",
  supportWindows: "Tuesday and Thursday 8–9 pm, Saturday 10 am–1 pm",
  cancellationNotice: "15 days",
  legalUpdated: "25 September 2026",
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/features", label: "Features" },
  { href: "/automations", label: "Automations" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/coaching-classes", label: "Areas" },
  { href: "/calculator", label: "Calculator" },
] as const;
