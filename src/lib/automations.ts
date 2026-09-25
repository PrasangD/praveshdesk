// The automation catalogue.
//
// One rule for every line in this file: name the job the way the person who
// does it would say it, not the way a vendor would. "Copying yesterday's numbers
// into a slide" beats "reporting automation". The whole site's credibility rests
// on a visitor recognising their own week here.
//
// Groups are ordered roughly by how often they come up, not by how interesting
// they are to build.

export type Automation = {
  /** The manual job, in the words of whoever is stuck with it. */
  title: string;
  /** What replaces it. One sentence, no product names. */
  body: string;
};

export type AutomationGroup = {
  id: string;
  name: string;
  /** Who stops doing this work. Shown beside the heading. */
  lead: string;
  /** Which kind of client this mostly lands with. Drives the filter chips. */
  audience: "company" | "institute" | "both";
  items: Automation[];
};

export const automationGroups: AutomationGroup[] = [
  {
    id: "reports",
    name: "Reports that build themselves",
    lead: "Whoever loses Monday morning to it",
    audience: "both",
    items: [
      {
        title: "Rebuilding the same report every week",
        body: "The numbers are pulled, checked and formatted on a schedule, and land in your inbox before you ask for them.",
      },
      {
        title: "Chasing four people for their figures",
        body: "Each person fills one short form, or the figure is read straight from the system it already lives in. No chasing.",
      },
      {
        title: "Copying yesterday's totals into a slide",
        body: "The slide or dashboard updates itself from the source, so the version you present is never the stale one.",
      },
      {
        title: "Nobody agreeing which number is right",
        body: "One definition per number, written down in the job that calculates it, so two teams stop arguing about whose export is correct.",
      },
      {
        title: "Finding out about a bad week on Friday",
        body: "A threshold you choose, checked daily, that messages you the moment something moves the wrong way.",
      },
    ],
  },
  {
    id: "integration",
    name: "Data moving between systems",
    lead: "Whoever is the human API",
    audience: "both",
    items: [
      {
        title: "Exporting from one tool to import into another",
        body: "The two systems talk directly on a schedule, with a record of what moved and what was rejected.",
      },
      {
        title: "Typing the same record into three places",
        body: "Entered once, written everywhere it is needed, with the copies kept in step afterwards.",
      },
      {
        title: "A CSV that arrives by email every morning",
        body: "Picked up, validated and loaded on its own — and if the file is late or malformed, you hear about it rather than discovering it later.",
      },
      {
        title: "Legacy software with no integration",
        body: "If it can export a file, print, or expose a database, it can usually be automated around without touching the software itself.",
      },
      {
        title: "Silent failures nobody noticed for a week",
        body: "Every run logged with a result, and a message when a run fails or simply does not happen.",
      },
    ],
  },
  {
    id: "documents",
    name: "Documents and paperwork",
    lead: "Accounts, admin and HR",
    audience: "both",
    items: [
      {
        title: "Making the same document forty times",
        body: "Invoices, receipts, certificates, offer letters and ID cards generated from one record, ready to print, sign or send.",
      },
      {
        title: "Numbering things by hand",
        body: "Invoice and receipt numbers issued in sequence by the system, so two people can never take the same number.",
      },
      {
        title: "Merging attachments into one PDF",
        body: "Files gathered, merged in the right order and named to a convention, so nobody has to remember the convention.",
      },
      {
        title: "Filing documents where they can be found later",
        body: "Every generated document stored against the customer, employee or student it belongs to, findable by name or number.",
      },
      {
        title: "Getting something signed and tracking who has not",
        body: "The document goes out, the reminders go out, and the outstanding list is generated rather than maintained.",
      },
    ],
  },
  {
    id: "spreadsheets",
    name: "Spreadsheets and back-office",
    lead: "Finance and operations",
    audience: "both",
    items: [
      {
        title: "Reconciling two lists by eye",
        body: "Matched automatically on the rules you already apply in your head; only genuine exceptions reach a person.",
      },
      {
        title: "Cleaning the same mess every month",
        body: "Whatever you fix by hand — date formats, stray spaces, duplicate rows, wrong codes — done the same way every time.",
      },
      {
        title: "Consolidating files from many branches",
        body: "Files collected, checked for the right shape, combined and totalled, with the one that did not arrive flagged by name.",
      },
      {
        title: "A workbook only one person understands",
        body: "The logic moved out of nested formulas into a job with a name and a log, so the business does not stop when that person is on leave.",
      },
      {
        title: "Errors found only after they cost something",
        body: "Validation that runs before the data is used, not after: totals that must balance, values that must exist, rows that must be unique.",
      },
    ],
  },
  {
    id: "deployments",
    name: "Deployments, environments and releases",
    lead: "Engineering teams with no platform person",
    audience: "company",
    items: [
      {
        title: "Deploying by following a page of instructions",
        body: "A pipeline that builds, tests, deploys and can roll back, so a release is a button rather than an evening.",
      },
      {
        title: "Only one person being able to deploy",
        body: "The same pipeline for everyone, with a record of who released what and when.",
      },
      {
        title: "Setting up an environment by hand",
        body: "Environments defined as code and recreated on demand, so test and production stop drifting apart.",
      },
      {
        title: "A release that cannot be undone quickly",
        body: "Versioned releases with a rollback that is tested, not theoretical.",
      },
      {
        title: "Secrets pasted into config files and chats",
        body: "Credentials moved into a proper store, injected at run time, and rotated without a code change.",
      },
      {
        title: "Backups nobody has ever restored",
        body: "Backups that run on schedule and a restore that is actually rehearsed, with the result recorded.",
      },
    ],
  },
  {
    id: "cloud",
    name: "Cloud cost and housekeeping",
    lead: "Whoever signs the cloud bill",
    audience: "company",
    items: [
      {
        title: "A bill that grows and nobody can explain",
        body: "A monthly breakdown by team, project or tag, with the biggest movers since last month named.",
      },
      {
        title: "Test machines left running over the weekend",
        body: "Non-production resources stopped on a schedule and started when people need them.",
      },
      {
        title: "Nobody knowing what a resource is for",
        body: "Tagging enforced at creation, and a list of the untagged things that already exist.",
      },
      {
        title: "A certificate or domain expiring on a Sunday",
        body: "Expiry dates watched, with warnings early enough to act during working hours.",
      },
      {
        title: "Old snapshots and disks quietly billing forever",
        body: "Unattached and orphaned resources reported, then cleaned up on rules you approve.",
      },
    ],
  },
  {
    id: "monitoring",
    name: "Monitoring, alerts and on-call",
    lead: "Whoever's phone rings at night",
    audience: "company",
    items: [
      {
        title: "Finding out from a customer that it is down",
        body: "Health checks from outside your network, alerting the right person on the right channel within a minute.",
      },
      {
        title: "So many alerts that nobody reads them",
        body: "Alerts grouped, de-duplicated and routed by severity, so the ones that wake someone up are the ones that should.",
      },
      {
        title: "Writing the incident timeline from memory",
        body: "The timeline assembled from what actually happened, ready to edit rather than reconstruct.",
      },
      {
        title: "Answering 'is it just me?' in chat",
        body: "A status page that updates from the same checks, so the question answers itself.",
      },
      {
        title: "The same fix applied manually every time",
        body: "A known, safe remedy triggered automatically, with a record of when it ran and whether it worked.",
      },
    ],
  },
  {
    id: "people",
    name: "Joining, moving and leaving",
    lead: "HR and IT together",
    audience: "company",
    items: [
      {
        title: "Setting up a new joiner across eight tools",
        body: "One request creates the accounts, access and equipment checklist, and tells each owner what to do.",
      },
      {
        title: "Access that outlives the person",
        body: "Leaving triggers removal everywhere, with a confirmation that it actually happened.",
      },
      {
        title: "Nobody knowing who has access to what",
        body: "A current access list generated on demand, plus a periodic review sent to whoever owns each system.",
      },
      {
        title: "Chasing signed policies and documents",
        body: "Documents issued, reminders sent, and only the outstanding names left to chase.",
      },
      {
        title: "Assets tracked in somebody's memory",
        body: "Laptops and devices logged against people, with a return checklist that runs at exit.",
      },
    ],
  },
  {
    id: "requests",
    name: "Approvals and internal requests",
    lead: "Every manager who is a bottleneck",
    audience: "both",
    items: [
      {
        title: "Approvals living in a mail thread",
        body: "A short form, a clear route, and a record of who approved what and when.",
      },
      {
        title: "Requests stuck because someone is on leave",
        body: "Rules for escalation and delegation applied automatically, rather than depending on a reply.",
      },
      {
        title: "Nobody knowing where a request has reached",
        body: "Status visible to the person who raised it, so the follow-up message never gets sent.",
      },
      {
        title: "The same purchase reasoning re-typed each time",
        body: "Recurring requests pre-filled from the last approved one, with only the changes needing thought.",
      },
      {
        title: "Month-end scramble for expense claims",
        body: "Reminders on a schedule, submissions validated on arrival, and a summary ready for whoever signs.",
      },
    ],
  },
  {
    id: "institutes",
    name: "Schools, colleges and coaching institutes",
    lead: "The front desk and the owner",
    audience: "institute",
    items: [
      {
        title: "Working out who owes fees this week",
        body: "An instalment due list every morning, ordered by how late each one is, with receipts generated on payment.",
      },
      {
        title: "Marking and totalling attendance",
        body: "One tap per student, an absent-three-sessions list before it becomes a dropout, and monthly percentages ready before a parent asks.",
      },
      {
        title: "Adding up marks and making report cards",
        body: "Marks entered once; totals, ranks and a one-page report card per student come out of it.",
      },
      {
        title: "Typing the same update to forty parents",
        body: "A ready message per parent with their child's own numbers filled in, sent by your staff from your own number.",
      },
      {
        title: "Counting teaching hours at month end",
        body: "Hours logged as classes happen, totalled per teacher when it is time to pay them.",
      },
    ],
  },
];

/** A flat count for the page copy, so the number can never go stale. */
export const automationCount = automationGroups.reduce((n, g) => n + g.items.length, 0);

export const audienceLabels = {
  company: "Companies",
  institute: "Institutes",
  both: "Both",
} as const;

// ---------------------------------------------------------------------------
// Custom work: the part where you name it.
// ---------------------------------------------------------------------------

export const buildSteps = [
  {
    title: "You show me the job",
    body: "Half an hour, on a call or at your office. Whoever does it today does it once, at their normal speed, while I watch. No requirement document, no brief to write.",
  },
  {
    title: "I tell you whether it is worth it",
    body: "Some jobs are not. If the honest answer is a better formula, a setting you already have, or simply doing it less often, you get that answer and it costs you nothing.",
  },
  {
    title: "A fixed price, in writing, before anything starts",
    body: "One number, with what it includes, what it excludes and when it will be ready. It does not move once we begin. Scope changes are a new number you agree to first.",
  },
  {
    title: "Built, handed over, and yours",
    body: "It runs on your own accounts and infrastructure. You get the code, the credentials and a short written handover — not a black box that only I can open.",
  },
  {
    title: "You pay the rest once it has run",
    body: "Half to start, half after it has worked for a week on your real data. If it does not do what the quote said, I fix it before that invoice exists.",
  },
];

/** The honest test for whether a task is a good candidate. */
export const goodCandidates = [
  "Someone does it the same way every week",
  "The rules can be written down, even if nobody has written them yet",
  "The information already exists somewhere — a system, a sheet, a file, an inbox",
  "Getting it wrong costs money, a customer, or a night's sleep",
  "It is the reason somebody stays late",
];

export const badCandidates = [
  "It needs judgement about a specific person or situation",
  "It is done completely differently every time",
  "It happens twice a year and takes an hour",
  "The data would have to be typed in twice to make it work",
  "The process is about to change anyway — automate it after, not before",
];

/** What I will not build, whatever the price. Keep this list. */
export const willNotBuild = [
  {
    title: "Anything that pretends to be a person",
    body: "Automatic replies posing as your staff, or messages written to look hand-typed. It works until someone notices, and then it costs more than it saved.",
  },
  {
    title: "Bulk messaging through unofficial tools",
    body: "Unofficial WhatsApp automation gets your number blocked and your customers annoyed. Official channels or nothing.",
  },
  {
    title: "Scraping someone else's customer or student data",
    body: "It is other people's personal data, and increasingly it is also illegal. Not for any fee.",
  },
  {
    title: "Automation designed to make people redundant quietly",
    body: "I will happily give you back a day a week. I will not help you hide that decision from the people it affects.",
  },
  {
    title: "A system only I can maintain",
    body: "Everything is handed over with the code, the access and the notes. If you stop working with me, it keeps running.",
  },
];
