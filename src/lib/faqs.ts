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

export const automationFaqs: Faq[] = [
  {
    q: "We do something odd that no software handles. Can you still automate it?",
    a: "Usually, yes — that is the point of building it for you rather than selling you a product. Show us the job once. If it can be written down as rules, it can be built.",
  },
  {
    q: "Do we have to take the admission system to get anything else?",
    a: "No. Most institutes start with admissions because that is where the money leaks, but we will build only the fee tracker, or only the report cards, if that is your real problem.",
  },
  {
    q: "How long does a custom automation take?",
    a: "A small one is usually ready within a week of the quote being agreed. A bigger module that touches fees or results takes two to four weeks. You get a date with the quote.",
  },
  {
    q: "What does a custom build cost?",
    a: "A fixed price, quoted in writing before anything is built, based on how long it takes. It does not change once we start. If we think the job is not worth automating, we will say so and charge nothing.",
  },
  {
    q: "What happens to it if we stop working with you?",
    a: `It keeps running. Everything sits in your institute's own Google account, so the sheets, forms and documents stay yours. Tell us ${site.cancellationNotice} before your next billing date and we remove our access.`,
  },
  {
    q: "Can it work with the software we already use?",
    a: "Often, yes, if that software can export a file or has a way to connect. We will check before quoting rather than promise it in advance. We do not replace your accounting or teaching software.",
  },
  {
    q: "Will our staff have to learn something complicated?",
    a: "No. Almost everything ends up as a form to fill, a list to open, or an email that arrives. If your staff need a manual to use it, we built it wrong.",
  },
  {
    q: "Is our students' and parents' data safe?",
    a: "It stays in your Google account, not ours. We get access to set it up and maintain it, you can remove that access at any time, and we never move your data to another institute or use it for anything else.",
  },
];
