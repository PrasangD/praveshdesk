// Long-form content for the per-area pages at /automations/[area].
//
// Why these exist: "automation services" is a phrase nobody searches and
// everybody sells. "automate excel reconciliation" is a phrase a specific
// person types at 6pm when they have had enough. Each guide below targets one
// of those, with enough substance to deserve the ranking.
//
// Keyed by the group ids in automations.ts. Every group must have an entry —
// there is a test for it at the bottom of this file's consumer page.
//
// Rules if you add or edit one:
//   - Unique writing throughout. Ten near-identical pages is a doorway-page
//     pattern and Google has demonopolised it hard since 2024.
//   - `symptoms` are how the reader recognises themselves. Use their words.
//   - `worked` must contain real arithmetic that survives a sceptic.
//   - Never promise a saving. Describe a mechanism.

export type Guide = {
  /** Used in <title>. Lead with the verb people search. */
  metaTitle: string;
  metaDescription: string;
  /** The page heading. Shorter and more human than the meta title. */
  h1: string;
  /** Two or three paragraphs. The part that earns the ranking. */
  intro: string[];
  /** How the reader knows this page is about them. */
  symptoms: string[];
  /** How the build actually goes for this kind of job. */
  approach: string[];
  /** A concrete before/after with numbers that add up. */
  worked: { title: string; before: string; after: string; maths: string };
  /** Which price band this normally lands in. */
  band: "quick" | "module" | "system";
  faqs: { q: string; a: string }[];
};

export const guides: Record<string, Guide> = {
  reports: {
    metaTitle: "Automate a weekly or monthly report",
    metaDescription:
      "Stop rebuilding the same report every week. The figures are pulled, checked and formatted on a schedule and land in your inbox. Fixed price, built on your own systems.",
    h1: "The report that builds itself",
    intro: [
      "Almost every business has one: a report somebody assembles by hand on a fixed day, from figures that live in three or four places. It takes a morning. It is late whenever that person is on leave. And because it is assembled under time pressure, nobody fully trusts it — which is why the meeting it feeds usually starts with someone questioning a number.",
      "The work is not the thinking. The thinking takes ten minutes. The work is fetching, pasting, reformatting, checking that the totals tie, and chasing the one person who has not sent theirs. All of that is mechanical, and all of it can be done on a schedule.",
      "What you get back is not just the hours. It is a report that arrives at the same time every week whether or not anyone is available, calculated the same way every time, with its numbers defined in one place instead of in somebody's head.",
    ],
    symptoms: [
      "The same file gets rebuilt every week, from the same sources, by the same person",
      "You chase two or three people for their figures before you can start",
      "Nobody can fully explain how one of the numbers is calculated any more",
      "The report is late or missing whenever one person is away",
      "Two teams arrive at a meeting with different versions of the same figure",
    ],
    approach: [
      "First we agree the definitions — what exactly counts as a sale, an active customer, a completed job. This takes longer than the code and is usually the most valuable part.",
      "Then the fetching: from the systems that have an export or an API, from the sheets people maintain, from the files that arrive by email.",
      "Then validation, which is the part most home-made reporting skips. Totals that must reconcile, values that must exist, rows that must be unique. Anything that fails is set aside and named, never quietly averaged away.",
      "Then the output — an email, a PDF, a sheet, a dashboard, whatever people will actually read — on a schedule, with an alert if a source is missing or the job does not run.",
    ],
    worked: {
      title: "A four-branch weekly sales report",
      before: "One person, every Monday morning, about three hours: four files, three date formats, branch names typed differently, one invoice sent twice.",
      after: "It runs at 06:00 on Monday. The report is in four inboxes before anyone arrives, with three rows flagged as needing a human.",
      maths:
        "3 hours a week × 52 = 156 hours a year. At a loaded ₹200/hour that is about ₹31,000 a year, for a build in the ₹18,000–₹45,000 band. It pays for itself somewhere between eight and eighteen months on hours alone — and that ignores the late reports and the arguments about whose number is right.",
    },
    band: "quick",
    faqs: [
      {
        q: "Our figures come from software that has no API.",
        a: "That is the normal case. If it can export a CSV or Excel file, print a report, or reach a database, it can be automated around without touching the software or breaking your support contract.",
      },
      {
        q: "What if the report needs commentary, not just numbers?",
        a: "Then the automation does the numbers and leaves you a draft to write the commentary into. The judgement stays with a person; the fetching and formatting does not.",
      },
      {
        q: "Can it go into our existing dashboard instead of an email?",
        a: "Yes, if that is where people actually look. Most teams read an email and ignore a dashboard, so it is worth being honest about which is true for you before building the prettier option.",
      },
    ],
  },

  integration: {
    metaTitle: "Move data between two systems automatically",
    metaDescription:
      "Stop exporting from one system to import into another. The two talk directly on a schedule, with a record of what moved and what was rejected. Fixed price per job.",
    h1: "When a person is the integration",
    intro: [
      "Two systems that will never be integrated by their vendors, and a person in the middle doing it by hand. Exporting a file from one at the end of the day, tidying it, importing it into the other, and fixing whatever the import rejected. It is the single most common automation request there is.",
      "It is also the one most likely to be silently wrong. Manual transfer has no record: when a row goes missing, nobody knows whether it was never exported, rejected on import, or typed in wrong. The error is found weeks later, in a reconciliation nobody enjoys.",
      "Automating it does two things. It gives the hours back, and it gives you a log — what moved, when, and what was refused and why.",
    ],
    symptoms: [
      "Somebody exports from one system and imports into another as a daily or weekly ritual",
      "The same record is typed into two places, and the two drift apart",
      "A file arrives by email every morning and somebody has to do something with it",
      "When a record goes missing, nobody can say at which step it was lost",
      "Your vendor has said integration is not possible, and that was the end of the conversation",
    ],
    approach: [
      "Work out what each side can actually do: an API, a scheduled export, a database you can read, a shared folder, an email attachment. There is almost always something.",
      "Agree what happens to a record that cannot be transferred. This is the decision that matters — rejected rows must go somewhere a person will look, not into a log nobody reads.",
      "Build the transfer with a record of every run: how many rows, how many accepted, how many refused and why.",
      "Then the part people forget: an alert when the job fails, and an alert when the job simply does not happen, which is the failure mode nobody notices for a fortnight.",
    ],
    worked: {
      title: "Orders from the sales system into accounts",
      before: "Every evening, export, tidy in Excel, import. Forty minutes, and a monthly reconciliation to find what went missing.",
      after: "Runs hourly. Rejected rows land in a sheet with the reason, and the person who used to do the transfer now only looks at those.",
      maths:
        "40 minutes a day × 5 days × 52 = about 173 hours a year, plus a day a month reconciling. Comfortably a module-band job, and the reconciliation day usually disappears entirely — which is the saving people underestimate when they only count the transfer time.",
    },
    band: "module",
    faqs: [
      {
        q: "Will this break our software support contract?",
        a: "Not if it is done properly. Reading exports, using a documented API, or reading a replica database does not modify the vendor's software. I will not make undocumented writes into a vendor's database, and you should refuse anyone who offers to.",
      },
      {
        q: "How often should it run?",
        a: "As rarely as the business genuinely needs. Hourly is usually plenty and fails more gracefully than real-time. Real-time is occasionally necessary and always more expensive to build and maintain.",
      },
      {
        q: "What if the systems disagree about a record?",
        a: "We decide up front which system is the source of truth for each field, and the automation never silently overwrites the other. Conflicts go to a person.",
      },
    ],
  },

  documents: {
    metaTitle: "Generate invoices, receipts and certificates automatically",
    metaDescription:
      "Stop producing the same document one at a time. Invoices, receipts, certificates and ID cards generated from the record, numbered in sequence, filed where they can be found.",
    h1: "The same document, forty times",
    intro: [
      "Somebody has a template open and a list beside it. They fill in the name, the amount and the date, save it, rename it, and do it again. Forty times. Then they do it again next month.",
      "Documents are a good first automation because the rules are unambiguous and the result is visible. Nobody has to be persuaded that the output is correct — they can see it. And the mistakes being eliminated are the embarrassing kind: the wrong name on a certificate, two invoices with the same number, a receipt that never reached the customer.",
      "The automation takes the record you already have and produces the document from it, with the numbering issued centrally so two people can never take the same number.",
    ],
    symptoms: [
      "A template is opened and filled in by hand, repeatedly",
      "Invoice or receipt numbers are tracked in a notebook or somebody's memory",
      "Documents are saved with names only their author understands",
      "Finding last year's copy of something takes more than a minute",
      "A document has gone out with the wrong name or amount on it, more than once",
    ],
    approach: [
      "Start from where the data already is — the sheet, the system, the form — so nothing is typed twice. If it would have to be typed twice, that is a sign the job is not ready to automate yet.",
      "Agree the numbering rules, including what happens to a cancelled document. This is where hand-run numbering usually turns out to have a hole in it.",
      "Build the template properly once, so a change to the letterhead is one edit rather than forty.",
      "File each document against the customer, employee or student it belongs to, with a naming convention nobody has to remember.",
    ],
    worked: {
      title: "Monthly fee receipts for an institute",
      before: "Two hours a month typing receipts, plus the calls from parents who did not get one.",
      after: "A receipt is generated the moment a payment is entered, numbered in sequence, filed against the student and ready to send.",
      maths:
        "Two hours a month is only 24 hours a year, so on hours alone this is marginal — and I would say so. It becomes worth doing when you count the duplicate numbers, the follow-up calls, and the fact that it removes a job nobody wants. Often it is bundled into a larger fees build rather than sold on its own.",
    },
    band: "quick",
    faqs: [
      {
        q: "Can it use our existing letterhead and format?",
        a: "Yes. Send the file you use now and the output matches it. Changing your format is a design decision, not an automation one, and I would rather not mix the two.",
      },
      {
        q: "Can it email or WhatsApp them out?",
        a: "Email, yes, straightforwardly. WhatsApp only through Meta's official platform — unofficial tools get your number blocked, and I do not build with them at any price.",
      },
      {
        q: "What about documents that need a signature?",
        a: "They can be generated ready to sign, or routed through a signing service if you use one. The generation and the chasing are both automatable; the signature stays a human act.",
      },
    ],
  },

  spreadsheets: {
    metaTitle: "Automate Excel reconciliation and monthly spreadsheet work",
    metaDescription:
      "Reconciliation done by eye, the same cleaning every month, files consolidated from many branches, and a workbook only one person understands. All of it can be automated.",
    h1: "The workbook that runs the business",
    intro: [
      "Most Indian businesses run on a spreadsheet that has quietly become critical. It works. It also has a single maintainer, no version history worth the name, formulas nested six deep, and a monthly ritual of cleaning that everyone has stopped questioning.",
      "The risk is rarely the spreadsheet itself — it is that the logic lives in one person's head and one file's formulas. When that person is on leave, or leaves, the business discovers how much was undocumented.",
      "Automating this does not mean throwing the spreadsheet away. It usually means moving the repetitive parts — the cleaning, the matching, the consolidation, the checks — into a job that runs on its own, with a name and a log, while the sheet stays as the thing people look at.",
    ],
    symptoms: [
      "The same cleaning is done every month: date formats, stray spaces, duplicate rows, wrong codes",
      "Two lists are matched by eye, or with a VLOOKUP somebody rebuilds each time",
      "Branch or client files are combined by hand, and one is always missing",
      "A key workbook has exactly one person who understands it",
      "An error was found long after it cost something",
    ],
    approach: [
      "Write down the rules the person applies without thinking. This is the real work, and it is why I want to watch the job being done rather than be told about it.",
      "Automate the cleaning first, because it is unambiguous and it makes everything after it more reliable.",
      "Then the matching, with a deliberate decision about tolerance — what counts as the same transaction when the amounts differ by two rupees and the dates by a day.",
      "Then validation that runs before the data is used rather than after: totals that must balance, references that must exist, rows that must be unique.",
    ],
    worked: {
      title: "Bank statement against the billing system",
      before: "Two days a month, matching line by line, with a tail of unexplained differences carried forward.",
      after: "Matched automatically on agreed rules. Only genuine exceptions reach a person — typically a handful rather than hundreds.",
      maths:
        "Two days a month is roughly 192 hours a year. At a loaded ₹300/hour that is about ₹58,000 a year against a module-band build. It pays back inside a year on hours alone, and the carried-forward differences usually stop accumulating, which is worth more than the hours.",
    },
    band: "module",
    faqs: [
      {
        q: "Do we have to stop using Excel?",
        a: "No, and usually you should not. People know it and trust it. The automation does the repetitive part and can put the result straight back into a sheet.",
      },
      {
        q: "Our data is genuinely messy. Is that a problem?",
        a: "It is the normal starting condition, and the demo on this site is built on deliberately messy data for exactly that reason. What matters is whether the mess follows rules — it almost always does, even when nobody has written them down.",
      },
      {
        q: "What if the rules have exceptions?",
        a: "Exceptions are fine as long as they are nameable. The automation handles the rule and routes the exception to a person, which is a better outcome than a person handling both and getting bored during the first.",
      },
    ],
  },

  deployments: {
    metaTitle: "CI/CD pipelines, environments and rollbacks for small teams",
    metaDescription:
      "Deploying by hand, one person who can release, environments that have drifted, secrets in chat files, backups nobody has restored. Fixed-price DevOps for teams with no platform engineer.",
    h1: "Deploying should be a button",
    intro: [
      "A small engineering team ships fine for a while, then accumulates a quiet tax: a deployment only one person is confident running, a page of instructions that is slightly out of date, environments that have drifted apart, credentials pasted into a config file two years ago, and backups nobody has ever restored.",
      "None of it is urgent, which is exactly why it never gets done. It becomes urgent on the day someone is unavailable, or a release has to be undone at nine in the evening.",
      "This is my day job. The work is not glamorous and does not take as long as people expect — a pipeline with a tested rollback is usually days, not months. What it takes is somebody deciding it is worth a fortnight of attention.",
    ],
    symptoms: [
      "Deployment involves following written steps rather than running one thing",
      "Only one person is genuinely confident releasing to production",
      "Test and production have drifted and nobody is sure how far",
      "Rolling back is theoretical — it has never actually been done",
      "Credentials live in config files, chat history or someone's laptop",
      "There are backups, and there has never been a restore",
    ],
    approach: [
      "Start with the release path, because it is the thing that blocks everything else. Build, test, deploy, and a rollback that gets tested as part of the work rather than promised.",
      "Then environments as code, so a new one can be created rather than assembled, and drift stops being invisible.",
      "Then secrets out of files and into a proper store, injected at run time, rotatable without a code change.",
      "Then a restore rehearsal. A backup nobody has restored is a hypothesis, not a backup, and the rehearsal is usually the most alarming half-day of the engagement.",
      "All of it with your team, in your accounts, handed over to them. I am not trying to become a dependency.",
    ],
    worked: {
      title: "A pipeline for a team of six",
      before: "Manual deploys, roughly weekly, about two hours each with two people watching. One bad release a quarter, taking half a day to unpick.",
      after: "A pipeline anyone on the team can run, with a rollback that has been tested. Deploys go from a scheduled event to a non-event.",
      maths:
        "2 hours × 2 people × 50 releases is 200 engineer-hours a year, plus the bad releases. Engineering time is expensive, so this is one of the few automations that pays back in months rather than quarters — and the real return is releasing more often because it stopped being frightening.",
    },
    band: "module",
    faqs: [
      {
        q: "We already have developers. Why bring you in?",
        a: "Because this work is never the most urgent thing on their list, and it competes with shipping features. I do it alongside them and hand it over — the goal is that your team maintains it, not that you keep calling me.",
      },
      {
        q: "Which tools do you use?",
        a: "Whatever you already run. If you are on GitHub, GitLab, AWS, Azure or GCP, that is what gets used. Introducing a new tool your team has to learn is a cost, and it needs to earn its place.",
      },
      {
        q: "Can you do this without access to production?",
        a: "The build, mostly yes. The final cutover needs someone with access, and that can be your engineer running it with me watching rather than the other way round.",
      },
    ],
  },

  cloud: {
    metaTitle: "Cut cloud costs and automate cloud housekeeping",
    metaDescription:
      "A bill nobody can explain, test machines running all weekend, untagged resources, certificates expiring on a Sunday, orphaned disks billing forever. All automatable.",
    h1: "The cloud bill nobody can explain",
    intro: [
      "Cloud spend grows quietly. Nothing is obviously wasteful, and yet the bill is up again, and the honest answer to why is that nobody has the time to find out.",
      "Most of the waste is boring and mechanical: environments running at nights and weekends when nobody is working, disks and snapshots left behind by things that were deleted, oversized instances from a load test that finished last year, and resources with no tag so nobody knows who to ask.",
      "This is among the easiest work to justify, because the saving arrives on a bill you can compare month to month. It is also the work that most often pays for itself before the invoice for it is due.",
    ],
    symptoms: [
      "The bill grows and no single person can explain the increase",
      "Non-production environments run 24 hours a day",
      "Nobody can say which team or project a given resource belongs to",
      "A certificate or domain has expired outside working hours at least once",
      "There are snapshots and volumes attached to nothing",
    ],
    approach: [
      "Measure before changing anything: a breakdown by team, project or tag, and the biggest movers since last month. Half the value is in the visibility.",
      "Then the safe, reversible wins: schedules that stop non-production out of hours, and a cleanup of orphaned resources on rules you approve rather than rules I choose.",
      "Then tagging enforced at creation, plus a list of the untagged things that already exist, so the problem stops growing while you work through the backlog.",
      "Then the expiry watch — certificates, domains, reserved commitments — with warnings early enough to act during working hours.",
    ],
    worked: {
      title: "Weekend shutdown for non-production",
      before: "Three environments running continuously, used only in office hours.",
      after: "Stopped at 9pm, started at 8am on weekdays, off entirely at weekends. A start button for anyone who needs them outside those hours.",
      maths:
        "Office hours are about 50 of the 168 hours in a week. Stopping non-production outside them removes roughly 70% of their compute cost, and compute is usually the largest line. On a ₹40,000/month non-production spend that is around ₹28,000 a month against a quick-win build — it pays for itself in the first or second month, which is why I usually suggest it first.",
    },
    band: "quick",
    faqs: [
      {
        q: "Will this break something?",
        a: "Schedules and cleanups are built to be reversible and are applied to non-production first, on rules you approve. Nothing is deleted on my judgement alone.",
      },
      {
        q: "We are on a reserved or committed plan.",
        a: "Then the savings are different and often smaller, and I will tell you that before quoting rather than after. Visibility and expiry-watching still apply.",
      },
      {
        q: "Can you just tell us what to do instead of building it?",
        a: "Yes — that is an audit, and for smaller estates it is often the right and cheaper answer. Several clients have implemented it themselves afterwards, which is a perfectly good outcome.",
      },
    ],
  },

  monitoring: {
    metaTitle: "Monitoring, alerting and on-call that works",
    metaDescription:
      "Finding out from a customer that it is down, alert noise nobody reads, incident timelines written from memory. Health checks, routing and status pages built to fit a small team.",
    h1: "Finding out before your customer does",
    intro: [
      "There are two common states. The first is no monitoring: you find out something is broken when a customer tells you. The second is worse in a subtle way: so many alerts that everyone has learned to ignore them, which means the real one is also ignored.",
      "Good monitoring for a small team is not a large platform. It is a small number of checks that mean something, routed to a person who can act, with enough context in the message that they know what to do before opening a laptop.",
      "The test is simple and uncomfortable: when the last alert fired, did somebody act on it within minutes? If not, the alerting is decorative.",
    ],
    symptoms: [
      "You have learned about an outage from a customer",
      "The alerts channel scrolls past unread",
      "The same alert fires several times for one underlying problem",
      "Nobody is sure who is supposed to respond outside office hours",
      "Writing up what happened after an incident is done from memory",
    ],
    approach: [
      "Start from outside your network, checking what a customer actually experiences, because internal checks can be green while the service is unreachable.",
      "Cut the noise before adding anything: group related alerts, de-duplicate, and delete the ones nobody has acted on in six months. An alert nobody acts on is a bug in the alerting.",
      "Route by severity, to a channel people watch, with the context needed to act in the message itself.",
      "Then the extras that pay off later — a status page fed by the same checks, and an incident timeline assembled from what happened rather than remembered.",
    ],
    worked: {
      title: "External checks for a customer-facing service",
      before: "Two outages last year found by customers, each running about 90 minutes before anyone noticed.",
      after: "Checks every minute from outside, alerting the person on call. Detection drops from 90 minutes to under two.",
      maths:
        "This one resists neat arithmetic and I would rather say so than invent a number. The build is quick-win band. Whether it is worth it depends on what 90 minutes of silent downtime costs you — in revenue, in support calls, or in a customer deciding you are unreliable. Most people can answer that question in one sentence.",
    },
    band: "quick",
    faqs: [
      {
        q: "We already have a monitoring tool and nobody uses it.",
        a: "Very common, and usually a routing and noise problem rather than a tooling one. Often the fix is to keep the tool and rebuild what it alerts on, which is cheaper than replacing it.",
      },
      {
        q: "Do we need to pay for a monitoring service?",
        a: "Sometimes, and the free tiers are genuinely sufficient for a small number of checks. I will tell you where a paid tier earns its cost and where it does not.",
      },
      {
        q: "Can this page our phones at night?",
        a: "It can. Whether it should is a management decision, not a technical one — and if nobody is actually going to act at 3am, honest silence is better than an alert everyone ignores.",
      },
    ],
  },

  people: {
    metaTitle: "Automate employee onboarding, offboarding and access reviews",
    metaDescription:
      "One request creates accounts, access and the equipment checklist. Leaving removes them everywhere, with confirmation. Access lists generated rather than maintained.",
    h1: "Joining, moving and leaving",
    intro: [
      "A new joiner needs accounts in six or eight systems, the right access in each, a laptop, and a set of documents signed. It is done from a checklist that lives in someone's head or a document that is slightly out of date, and something is always missed — usually discovered by the new person on their second day.",
      "Leaving is the same process in reverse and matters far more. Access that outlives the person is the most common serious security finding in small companies, and it happens for an ordinary reason: nobody owns the list.",
      "The automation is not exotic. One request, a defined route, the accounts created or removed, and — the important part — a confirmation that each step actually happened rather than an assumption that it did.",
    ],
    symptoms: [
      "A new joiner's setup is assembled from memory and something is always missing",
      "Nobody can produce a current list of who has access to what",
      "Somebody who left months ago still has an active account somewhere",
      "Signed policies and documents are chased by hand",
      "Laptops and devices are tracked in somebody's memory",
    ],
    approach: [
      "Write down the actual list first, per role. Most companies have never had it on one page, and producing it is valuable before anything is automated.",
      "Automate creation where there is an API, and generate a clear task for a named owner where there is not. A checklist that arrives and is chased automatically is a large improvement over one that exists in principle.",
      "Make offboarding the priority, not onboarding. It is the one with real risk attached, and it is usually less work.",
      "Add a periodic access review that goes to whoever owns each system, so the list stays true without anyone maintaining it.",
    ],
    worked: {
      title: "Joiner and leaver across eight systems",
      before: "About three hours of HR and IT time per joiner, and an offboarding checklist that was completed most of the time.",
      after: "One form, accounts created, owners notified for the rest, and a confirmed completion report. Offboarding runs the same way, in reverse.",
      maths:
        "At 24 joiners and leavers a year, three hours each is 72 hours. That is real but it is not the argument. The argument is the account that was still active four months after someone left — which costs nothing until the day it costs a great deal.",
    },
    band: "module",
    faqs: [
      {
        q: "Some of our tools have no API.",
        a: "Then those become generated tasks with named owners and automatic chasing, rather than silent gaps. Partial automation with complete visibility is much better than nothing, and it is honest about what it does.",
      },
      {
        q: "Is this not what an HR system does?",
        a: "Some do, well. If yours does, use it and I will say so. This work is usually needed because HR and IT use different systems and the join between them is a person.",
      },
      {
        q: "Can it handle contractors and temporary access?",
        a: "Yes, and that is often where the worst of the problem is — access granted for two weeks, three years ago, and never reviewed.",
      },
    ],
  },

  requests: {
    metaTitle: "Automate approvals, internal requests and expense chasing",
    metaDescription:
      "Approvals stuck in mail threads, requests blocked because someone is on leave, nobody knowing where a request has reached. A short form, a clear route and a record.",
    h1: "Approvals that live in a mail thread",
    intro: [
      "A purchase request, a leave request, an expense claim, an exception to a policy. Somebody emails somebody, who forwards it to somebody else, who is on leave. Nothing is wrong with any individual step; the process simply has no memory and no visibility.",
      "The cost is rarely the approver's time. It is the waiting — work that does not start, purchases that are made late, and the follow-up messages sent by people who cannot see where their request has reached.",
      "This is one of the least technically interesting automations and one of the most appreciated, because everybody in the company feels the difference within a week.",
    ],
    symptoms: [
      "Approvals happen in email and nobody can reconstruct who approved what",
      "A request stalls because one person is unavailable and there is no rule for it",
      "People send follow-up messages asking where their request has reached",
      "The same request is re-typed from scratch each time",
      "Month end involves chasing people for claims and submissions",
    ],
    approach: [
      "Start with one request type — usually the highest volume, not the most complex — and get it genuinely working before adding others.",
      "Agree the escalation and delegation rules explicitly. Most processes have never had them written down, which is precisely why they stall.",
      "Make status visible to the person who raised it. This one detail removes most of the follow-up messages and most of the frustration.",
      "Keep the form short. A long form gets worked around, and a process people work around is worse than the email thread it replaced.",
    ],
    worked: {
      title: "Purchase requests for a 120-person company",
      before: "Email threads, an average of four days to approval, and no record of who approved what.",
      after: "A short form, routed by amount, escalating after 48 hours, with status visible to the requester. Approval time drops to about a day.",
      maths:
        "The approvers save perhaps an hour a week each. The real saving is three days of waiting removed from every purchase, which shows up as work starting sooner rather than as hours on a timesheet — genuinely harder to put a number on, and usually the reason people ask for it in the first place.",
    },
    band: "module",
    faqs: [
      {
        q: "Do people need another system to log into?",
        a: "Preferably not. This usually works best inside the tools people already open — email, a chat tool, a shared sheet. A new system to log into is where these projects go to die.",
      },
      {
        q: "What about approvals that genuinely need a conversation?",
        a: "The automation handles routing, reminders and the record. It should not try to replace the conversation, and a process that forces one into a form makes things worse.",
      },
      {
        q: "Can it enforce policy limits?",
        a: "Yes — routing by amount, category or department is straightforward. Whether to make a limit a hard block or a flagged exception is a decision worth taking deliberately.",
      },
    ],
  },

  institutes: {
    metaTitle: "Automation for schools, colleges and coaching institutes",
    metaDescription:
      "Fee dues and receipts, attendance totals, marks and report cards, and parent updates — built for your institute, running in your own Google account, with the data staying yours.",
    h1: "The front desk between batches",
    intro: [
      "An institute's back office runs in the gaps between batches. Fees are chased, attendance is marked, marks are added up, report cards are typed, and the same message is sent to forty parents individually. All of it by people who are also dealing with whoever is standing at the counter.",
      "The work is not difficult. It is repetitive, interruptible, and done under pressure — which is exactly the combination that produces mistakes that cost trust. A fee reminder sent to a parent who has already paid is worse than no reminder at all.",
      "Everything here runs in your institute's own Google account. The data stays yours, you can remove my access whenever you like, and if you stop working with me it keeps running.",
    ],
    symptoms: [
      "Fee dues are worked out by going through a register or a workbook",
      "Receipts are written or typed by hand",
      "Attendance registers are totalled at month end",
      "Marks are added up and report cards typed one student at a time",
      "The same message is sent to parents individually, forty times",
      "The owner finds out how the month went only when somebody prepares a report",
    ],
    approach: [
      "Start with fees, almost always. It is where the money is, the rules are clear, and the result is visible within days.",
      "Keep the staff habit and change what happens behind it. Reception keeps filling the same form or register; the counting, checking and reminding stop being done by a person.",
      "Build on Google Sheets and Apps Script where it fits, because you already have the account, there is no licence to pay for, and any developer can maintain it.",
      "Messages to parents go from your own number, sent by your staff, one at a time — or through Meta's official platform. Never through unofficial bulk tools, which get your number blocked.",
    ],
    worked: {
      title: "Fee dues and receipts for a 300-student institute",
      before: "Most of a day each week going through records to work out who owes what, plus receipts typed by hand.",
      after: "A dues list every morning, ordered by how late each instalment is. Receipts generated on payment. A monthly pending-fees summary for the owner.",
      maths:
        "6 hours a week × 52 is about 312 hours a year. Even at a modest ₹150/hour that is around ₹47,000 a year against a quick-win or small module build. The larger effect is usually collection: instalments chased on the day they are due rather than whenever somebody has time.",
    },
    band: "quick",
    faqs: [
      {
        q: "We already use Classplus or Teachmint. Is this a replacement?",
        a: "No. Keep using them for what they do well. This is for the jobs they do not cover, or cover in a way your staff have quietly stopped using.",
      },
      {
        q: "Will you send bulk WhatsApp messages to parents?",
        a: "No. Unofficial bulk messaging gets your institute's number blocked. Messages go from your staff one at a time, or through Meta's official platform if the volume justifies it.",
      },
      {
        q: "Where does our student data live?",
        a: "In your institute's own Google account. I get access only to build and maintain it, you can remove that access at any time, and nothing is copied anywhere else.",
      },
    ],
  },
};
