export type Feature = { title: string; body: string; detail: string[] };

export const features: Feature[] = [
  {
    title: "Every enquiry in one list",
    body: "Walk-ins, phone calls, WhatsApp chats and ad leads all land in the same list, within seconds.",
    detail: [
      "A short enquiry form your reception fills in 20 seconds",
      "A QR code at the counter that parents can scan themselves",
      "Facebook and Instagram lead-ad enquiries imported next to the rest",
      "Duplicate enquiries from the same phone number are flagged",
    ],
  },
  {
    title: "The owner knows straight away",
    body: "Each new enquiry is sent to the owner with the parent's name, class and a one-tap link to call or message.",
    detail: [
      "New-enquiry alert by email, with WhatsApp alerts available as an add-on",
      "High-interest enquiries are marked so they are called first",
    ],
  },
  {
    title: "Today's calls, every morning",
    body: "Each counsellor opens one page on their phone and sees who to call today, with the last note beside each name.",
    detail: [
      "Overdue calls stay at the top until someone updates them",
      "Tap to call or tap to WhatsApp, from your own number",
      "Pick the next date for a follow-up in one tap",
    ],
  },
  {
    title: "Every enquiry has a status",
    body: "New, contacted, demo class booked, demo attended, fee discussed, admitted or lost, with the reason.",
    detail: [
      "Status names set to match how your class talks",
      "Lost reasons show you why parents chose elsewhere",
    ],
  },
  {
    title: "A weekly report you'll actually read",
    body: "Every Monday the owner gets one email: enquiries by source, how many joined, which calls are overdue and who followed up.",
    detail: [
      "Enquiries and admissions by source: walk-in, calls, ads, referrals",
      "Follow-up activity for each counsellor",
      "Up to three people can receive it",
    ],
  },
];

// Scope limits for the admissions product specifically. Anything outside this
// list is a question for /automations, not a flat no — keep the two in step.
export const notIncluded = [
  "Bulk or automated WhatsApp messages to parents, from any tool that is not Meta's official one",
  "Online classes, video lessons or an app students log into",
  "Book-keeping, GST filing or anything that replaces your accountant",
  "Judgement calls: which student to admit, what fee to waive, who to call personally",
];
