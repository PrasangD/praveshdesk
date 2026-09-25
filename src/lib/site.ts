// Single source of truth for brand + contact details.
// Change the name here and it changes everywhere on the site.

const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "919000000000";

export const site = {
  name: "PraveshDesk",
  tagline: "If you do it every week, it should do itself.",
  shortDescription:
    "Automation built to order for companies and institutes around Dombivli, Thane and Navi Mumbai. One process at a time, a fixed price, and it keeps running after I leave.",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "https://praveshdesk.pages.dev").replace(/\/$/, ""),
  phone: process.env.NEXT_PUBLIC_CONTACT_PHONE ?? "+91 90000 00000",
  whatsappNumber,
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "yourname@gmail.com",
  founderName: process.env.NEXT_PUBLIC_FOUNDER_NAME ?? "Your Name",
  /** What I do in the day job. It is the reason any of this is credible. */
  founderRole: "DevOps engineer",
  baseLocation: "Dombivli",
  region: "Thane district, Maharashtra",
  replyPromise: "I reply within one working day.",
  supportWindows: "Tuesday and Thursday 8–9 pm, Saturday 10 am–1 pm",
  cancellationNotice: "15 days",
  legalUpdated: "25 September 2026",
  /** Honest capacity. This is deliberate: it is a real constraint, and it sells. */
  concurrentBuilds: 2,
} as const;

export function whatsappLink(text: string) {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const nav = [
  { href: "/automations", label: "What I automate" },
  { href: "/demo", label: "See it run" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/calculator", label: "Calculator" },
] as const;
