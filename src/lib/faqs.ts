import { site } from "./site";

export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "Do my staff need to learn new software?",
    a: "Very little. Enquiries go into a simple form, and each morning your staff open one list on their phone showing who to call. Training takes about 30 minutes.",
  },
  {
    q: "We already use WhatsApp. Why change?",
    a: "You keep using WhatsApp. PraveshDesk tells your staff who to message and when, and the message still goes from your institute's own number.",
  },
  {
    q: "Will you send bulk WhatsApp messages to parents?",
    a: "No. Unofficial bulk messaging gets numbers blocked. Every message is sent by your staff, from your own WhatsApp, one tap at a time.",
  },
  {
    q: "Where is our enquiry data stored?",
    a: "In your institute's own Google account. We get access only to set it up and maintain it, and you can remove our access at any time.",
  },
  {
    q: "We use Classplus or Teachmint. Is this a replacement?",
    a: "No. Keep using them for teaching and fees. PraveshDesk handles the part before a student joins: the enquiry, the follow-up and the admission decision.",
  },
  {
    q: "What if we want to stop?",
    a: `Tell us ${site.cancellationNotice} before your next billing date. The Google Sheet is already yours, so there is nothing to export or hand over.`,
  },
  {
    q: "Can you customise it for our process?",
    a: "Yes, within the setup. Status names, form fields and the weekly report are set to match how your class works. Bigger changes are quoted before we start.",
  },
  {
    q: "Do you guarantee more admissions?",
    a: "No. We make sure every enquiry is followed up and that you can see the numbers. Admissions still depend on your teaching, fees and counselling.",
  },
  {
    q: "How long does setup take?",
    a: "Three working days from the setup visit to go-live.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why is there a setup fee?",
    a: "Setup includes a visit to your institute, building the form, list and report around your process, importing your current enquiries and training your staff.",
  },
  {
    q: "What does the monthly fee cover?",
    a: "Keeping everything working, small changes, a monthly 30-minute review of your numbers, and WhatsApp support during our support windows.",
  },
  {
    q: "How do we pay?",
    a: "By UPI or bank transfer against an invoice. The setup fee is paid before the setup visit. The monthly fee is paid at the start of each month.",
  },
  {
    q: "Is there a long contract?",
    a: `No. It is month to month. Stop with ${site.cancellationNotice} notice.`,
  },
];
