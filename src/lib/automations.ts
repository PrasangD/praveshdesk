// The automation catalogue.
//
// PraveshDesk starts with admission enquiries, but the same machinery — a sheet
// your institute owns, a form, a schedule and an email — replaces most of the
// repeated paperwork in a coaching class. This file is the list we can build
// from. Keep every line concrete: a task someone at the institute does by hand
// today, and what it turns into.

export type Automation = {
  /** The manual job, named the way an owner would say it. */
  title: string;
  /** What replaces it. One sentence, plain. */
  body: string;
};

export type AutomationGroup = {
  id: string;
  name: string;
  /** Who at the institute stops doing this work. */
  lead: string;
  items: Automation[];
};

export const automationGroups: AutomationGroup[] = [
  {
    id: "admissions",
    name: "Admissions and enquiries",
    lead: "Reception and counsellors",
    items: [
      {
        title: "Writing every enquiry into a register",
        body: "A 20-second form and a counter QR code. Walk-ins, calls, WhatsApp and ad leads land in one list.",
      },
      {
        title: "Remembering who to call back",
        body: "Each morning every counsellor opens one page: today's calls, overdue ones on top, last note beside each name.",
      },
      {
        title: "Chasing demo class attendance",
        body: "A demo booking sets its own reminder, and the no-shows come back onto the call list the next day.",
      },
      {
        title: "Re-typing the admission form into a sheet",
        body: "The form the parent fills becomes the student record. Nobody copies it a second time.",
      },
      {
        title: "Telling the owner what happened this week",
        body: "Monday morning: enquiries by source, admissions, overdue calls and who followed up.",
      },
    ],
  },
  {
    id: "fees",
    name: "Fees and collections",
    lead: "Accounts and the owner",
    items: [
      {
        title: "Working out who owes money this week",
        body: "An instalment due list every morning, ordered by how late each one is.",
      },
      {
        title: "Writing receipts by hand",
        body: "A receipt PDF with your letterhead and a running receipt number, created the moment a payment is entered.",
      },
      {
        title: "Totalling the day's collection",
        body: "A daily collection figure split by cash, UPI and cheque, in the owner's inbox by evening.",
      },
      {
        title: "Finding which UPI payment belongs to which student",
        body: "Payments matched against the fee sheet, with the ones that don't match flagged for a human.",
      },
      {
        title: "Deciding when to escalate a defaulter",
        body: "A fixed ladder — reminder, call, parent meeting — that moves each pending instalment along on its own.",
      },
    ],
  },
  {
    id: "attendance",
    name: "Attendance and batches",
    lead: "Teachers and the front desk",
    items: [
      {
        title: "Marking a register at the start of class",
        body: "One tap per student on the teacher's phone, for the batch that is actually running now.",
      },
      {
        title: "Spotting the student who stopped coming",
        body: "A list of everyone absent three sessions in a row, on the front desk's screen, before it becomes a dropout.",
      },
      {
        title: "Answering 'how many classes has my child attended?'",
        body: "An attendance percentage per student, per month, ready before the parent asks.",
      },
      {
        title: "Redrawing batch lists after every admission",
        body: "Batch rosters that rebuild themselves as students join, shift batch or leave.",
      },
    ],
  },
  {
    id: "tests",
    name: "Tests, marks and report cards",
    lead: "Teachers and academic heads",
    items: [
      {
        title: "Adding up marks and ranking a test",
        body: "Marks entered once per test; totals, ranks and the topper list come out on their own.",
      },
      {
        title: "Making a report card for each student",
        body: "A one-page PDF per student with marks, rank, attendance and the teacher's remark.",
      },
      {
        title: "Working out what the batch got wrong",
        body: "A weak-topic list per batch, so the revision class targets the questions most students missed.",
      },
      {
        title: "Tracking a student across the year",
        body: "Every test for one student on a single line, so a slide is visible in March, not in May.",
      },
    ],
  },
  {
    id: "parents",
    name: "Parent communication",
    lead: "The front desk",
    items: [
      {
        title: "Typing the same update to forty parents",
        body: "A ready message per parent with their child's name and numbers filled in, sent by your staff from your own number.",
      },
      {
        title: "Announcing a holiday or a timing change",
        body: "The affected batches worked out for you, so the notice reaches exactly those parents and nobody else.",
      },
      {
        title: "Sending the monthly progress note",
        body: "Attendance, recent test marks and one remark, drafted for every student on the same day each month.",
      },
      {
        title: "Asking for feedback after a demo class",
        body: "A short form that goes out the evening after the demo, with the answers beside that enquiry.",
      },
    ],
  },
  {
    id: "staff",
    name: "Staff and daily admin",
    lead: "The owner",
    items: [
      {
        title: "Counting teaching hours at month end",
        body: "Hours logged as classes happen, totalled per teacher when you need to pay them.",
      },
      {
        title: "Preparing the salary sheet",
        body: "A month-end sheet built from hours, batches and whatever rules you already use.",
      },
      {
        title: "Finding a substitute when a teacher is away",
        body: "Who is free in that slot and can teach that subject, answered in one screen.",
      },
      {
        title: "Remembering the opening and closing routine",
        body: "A dated checklist for the front desk, with what was missed visible to the owner.",
      },
    ],
  },
  {
    id: "documents",
    name: "Paperwork and documents",
    lead: "Reception",
    items: [
      {
        title: "Filling certificates one by one",
        body: "Bonafide and course-completion certificates generated from the student record, ready to print or sign.",
      },
      {
        title: "Making student ID cards",
        body: "ID cards with photo, batch and roll number, produced for a whole batch in one go.",
      },
      {
        title: "Assembling the admission kit",
        body: "Fee schedule, rules, timetable and receipt, merged into one PDF per new student.",
      },
      {
        title: "Hunting for last year's form",
        body: "Every document filed against the student it belongs to, findable by name or phone number.",
      },
    ],
  },
  {
    id: "owner",
    name: "The owner's own reports",
    lead: "You",
    items: [
      {
        title: "Asking three people how the month is going",
        body: "One daily line: enquiries, admissions, collection, absentees. Read it in ten seconds.",
      },
      {
        title: "Comparing branches",
        body: "The same numbers per branch, side by side, without anyone preparing anything.",
      },
      {
        title: "Knowing if this year beats last year",
        body: "Admissions and collection against the same month last year, once you have a year of data.",
      },
      {
        title: "Seeing which ad actually brought students",
        body: "Enquiry source carried all the way through to admission and fee paid, not just to the enquiry.",
      },
    ],
  },
  {
    id: "growth",
    name: "Getting more students",
    lead: "The owner and counsellors",
    items: [
      {
        title: "Losing leads from Facebook and Instagram ads",
        body: "Ad enquiries imported into the same follow-up list within seconds of being submitted.",
      },
      {
        title: "Forgetting who referred whom",
        body: "Referrals tracked to the parent who made them, so you know who to thank and who to ask again.",
      },
      {
        title: "Having no Google reviews",
        body: "A review request that goes out to happy parents at the right moment, once, not repeatedly.",
      },
      {
        title: "Turning away students when a batch is full",
        body: "A waitlist that tells you who to call first the day a seat opens or a new batch starts.",
      },
    ],
  },
];

/** A flat count for the page copy, so the number can never go stale. */
export const automationCount = automationGroups.reduce((n, g) => n + g.items.length, 0);

// ---------------------------------------------------------------------------
// Custom work: the part where the owner names it.
// ---------------------------------------------------------------------------

export const buildSteps = [
  {
    title: "You show us the job",
    body: "On a call or at your institute. We watch whoever does it today do it once, at their normal speed. No document, no requirement list.",
  },
  {
    title: "We tell you if it is worth automating",
    body: "Some jobs are not. If the answer is a better Excel formula or a different habit, we will say that and charge nothing for saying it.",
  },
  {
    title: "A fixed price before anything is built",
    body: "One number, agreed in writing, with what it includes and what it does not. It does not move once we start.",
  },
  {
    title: "You use it before you pay the rest",
    body: "We build it, set it up on your own Google account, and sit with the staff who will use it. You pay the balance once it has run for a week.",
  },
];

/** The honest test for whether a task is a good candidate. */
export const goodCandidates = [
  "Someone does it the same way every week",
  "The rules can be written down, even if nobody has written them",
  "The information already lives in a sheet, a register or a chat",
  "Getting it wrong costs money or a parent's trust",
  "It is the reason someone stays late",
];

export const badCandidates = [
  "It needs judgement about a particular family's situation",
  "It changes completely every time it is done",
  "It happens twice a year and takes an hour",
  "Someone would have to type the data in twice to make it work",
];

/** What we will not build, whatever the price. */
export const willNotBuild = [
  {
    title: "Bulk WhatsApp through unofficial tools",
    body: "It gets your institute's number blocked. Messages go from your staff, one at a time, or through Meta's official platform.",
  },
  {
    title: "Anything that hides a person from a parent",
    body: "Automatic replies that pretend to be your counsellor damage the trust you spent years building.",
  },
  {
    title: "Scraping other institutes' student or parent lists",
    body: "It is someone else's personal data. We will not touch it.",
  },
  {
    title: "A system only we can maintain",
    body: "It runs on your Google account and you own the data. If you stop working with us, it keeps working.",
  },
];
