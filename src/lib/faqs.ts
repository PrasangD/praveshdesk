import { site } from "./site";

export type Faq = { q: string; a: string };

export const generalFaqs: Faq[] = [
  {
    q: "We do something odd that no software handles. Can you still automate it?",
    a: "Usually, yes — that is the whole point of building it rather than selling you a product. Show me the job once. If the rules can be written down, it can almost always be built.",
  },
  {
    q: "Do you only work with one kind of business?",
    a: "No. Companies, factories, agencies and institutes all end up with the same problem: a person doing a job that a schedule should be doing. The industry changes the details, not the approach.",
  },
  {
    q: "Our software vendor says integration is not possible.",
    a: "Rarely the end of it. If a system can export a file, print a report, send an email or reach a database, it can usually be automated around without touching the vendor's software or breaking your support contract.",
  },
  {
    q: "What do you actually build it with?",
    a: "Whatever suits the job and what you already run — scripts, scheduled jobs, pipelines, your existing cloud and your existing spreadsheets. I do not sell a platform, so there is no licence to keep paying for and nothing new to log in to unless it genuinely helps.",
  },
  {
    q: "Who owns what you build?",
    a: "You do. It runs on your accounts, and the handover includes the code, the credentials and written notes. If you stop working with me, it keeps running.",
  },
  {
    q: "You have a full-time job. Will this get dropped?",
    a: `I take ${site.concurrentBuilds} builds at a time and give each a date before it starts. That limit exists so the answer to this question stays no. If I cannot hit a date, you will hear it from me before you have to ask.`,
  },
  {
    q: "Will our staff have to learn something complicated?",
    a: "No. Most automations end up as a form to fill, a list to open, or an email that arrives. If your team needs a manual to use it, it was built wrong.",
  },
  {
    q: "Is our data safe?",
    a: "It stays in your accounts and systems, not mine. I get access to build and maintain it, you can remove that access whenever you like, and nothing is copied elsewhere. I sign an NDA before any audit that touches real data — yours, if you have one.",
  },
  {
    q: "What if it breaks?",
    a: "Anything I build tells you when it fails, rather than failing quietly. Fixes to my own work are free for 30 days after handover. After that, a care plan covers it, or you can call me as needed.",
  },
  {
    q: "Are you going to tell us to fire people?",
    a: "No, and I will not build something designed to do that quietly. The useful version of this is giving a team back a day a week. What you do with that day is your decision, made openly.",
  },
];

export const pricingFaqs: Faq[] = [
  {
    q: "Why pay for an audit before a build?",
    a: "Because a price given before seeing the job is a guess, and guesses get padded. The audit is how the fixed price becomes real. It is credited in full against your first build, so if you go ahead it costs you nothing.",
  },
  {
    q: "What if the audit says nothing is worth automating?",
    a: "Then you have saved a great deal more than the fee, and you keep the written report either way. It has happened, and it will happen again.",
  },
  {
    q: "Can the price change halfway through?",
    a: "Not on its own. The quoted number is fixed. If you want something outside the agreed scope, that is a separate number you agree to before I start it — never a surprise on the invoice.",
  },
  {
    q: "How do we pay?",
    a: "UPI or bank transfer against an invoice. The audit is paid up front. Builds are half to start and half a week after go-live, once it has run on your real data.",
  },
  {
    q: "Do we have to take a care plan?",
    a: "No. The handover includes everything you need to run it yourself, and plenty of clients do. A care plan is for when you would rather it be somebody else's problem.",
  },
  {
    q: "Is there a long contract?",
    a: `No. Builds are one-off. Care plans are month to month — stop with ${site.cancellationNotice} notice.`,
  },
];
