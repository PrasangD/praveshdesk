// Service-area pages. Each page must say something true and specific about
// working in that area — never add a place just to rank for its name.
//
// The corridor is real: I live in Dombivli, and everything here is reachable
// on the Central line or a short drive. The MIDC estates at Dombivli,
// Ambernath, Badlapur and Taloja, plus the offices at Wagle Estate, Airoli
// and Mahape, are where the manual back-office work actually is.

export const CITY_SLUGS = [
  "dombivli",
  "kalyan",
  "thane",
  "navi-mumbai",
  "ulhasnagar",
  "ambernath",
  "badlapur",
] as const;

export type CitySlug = (typeof CITY_SLUGS)[number];

export type City = {
  slug: CitySlug;
  name: string;
  localities: string[];
  travel: string;
  intro: string;
  visitNote: string;
  faq: { q: string; a: string }[];
};

export const cities: City[] = [
  {
    slug: "dombivli",
    name: "Dombivli",
    localities: ["Dombivli East", "Dombivli West", "Dombivli MIDC", "Manpada Road", "Thakurli", "Palava"],
    travel: "Home base",
    intro:
      "I live and work in Dombivli. Whether you run a unit in the MIDC phase, an office near the station, or a coaching institute on Manpada Road, I can walk in, watch the job being done, and be back with a written quote the same week.",
    visitNote:
      "Dombivli visits happen at short notice, including evenings and weekends. For MIDC units I would rather come during a normal shift and see the process under real load than be shown a tidy version of it.",
    faq: [
      {
        q: "Can you come during working hours?",
        a: "For the first visit, usually evenings or a weekend, because I have a full-time job. Once a build is running, deployment and handover are planned around your quiet hours, not mine.",
      },
      {
        q: "We are a small unit with two computers and a lot of registers. Is that too small?",
        a: "No. Some of the best returns come from exactly that: one register, one person, one afternoon a week. If it turns out a formula would fix it, I will tell you that instead and charge nothing.",
      },
    ],
  },
  {
    slug: "kalyan",
    name: "Kalyan",
    localities: ["Kalyan West", "Kalyan East", "Khadakpada", "Shahad", "Titwala"],
    travel: "Two stations away",
    intro:
      "Kalyan businesses tend to have grown faster than their systems: more orders, more staff, and the same workbook that one person has maintained for years. That workbook is usually the first thing worth automating, and the first thing that stops the business when its owner is on leave.",
    visitNote:
      "Two stations from Dombivli, so a first visit and a follow-up visit are both easy to arrange around your working day.",
    faq: [
      {
        q: "Our data is spread across four Excel files. Is that a problem?",
        a: "It is the normal starting point. Part of the audit is working out which file is the real source of truth, because usually one of them is and the others are copies.",
      },
      {
        q: "What if the person who built our spreadsheet leaves?",
        a: "That is the risk worth pricing. Moving the logic into a documented job with a log, that anyone can run, is exactly the kind of build that pays for itself the first time somebody is unavailable.",
      },
    ],
  },
  {
    slug: "thane",
    name: "Thane",
    localities: ["Thane West", "Wagle Estate", "Ghodbunder Road", "Naupada", "Majiwada", "Kolshet"],
    travel: "About 30 minutes by local",
    intro:
      "Thane has the fullest mix: Wagle Estate manufacturing, offices along Ghodbunder Road, and growing software teams. The common thread is a finance or operations team assembling the same report pack every month, and an engineering team deploying by hand because nobody was hired to fix that.",
    visitNote:
      "I visit Thane in person for the audit and the handover. Progress reviews during a build work fine over a call, which keeps your time and my travel down.",
    faq: [
      {
        q: "We have an IT team already. Where do you fit?",
        a: "Usually on the work they know needs doing and never reach: pipelines, environments, backups that have never been restored, alert noise. I work with your team and hand over to them, not around them.",
      },
      {
        q: "Can you work with our existing cloud account and tools?",
        a: "Yes, and I would prefer to. Everything is built in your accounts, with your credentials, so the handover is real rather than a promise.",
      },
    ],
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    localities: ["Airoli", "Ghansoli", "Mahape", "Vashi", "Turbhe", "Taloja MIDC"],
    travel: "About an hour",
    intro:
      "Airoli, Mahape and Ghansoli have the IT parks; Taloja and Turbhe have the industrial estates. Both ends of that produce the same complaint — a person whose week is spent moving data between two systems that will never be integrated by their vendors.",
    visitNote:
      "Navi Mumbai visits are planned rather than spontaneous, usually a single longer session for the audit instead of several short ones.",
    faq: [
      {
        q: "Our software vendor says integration is not possible. Is that the end of it?",
        a: "Rarely. If the system can export a file, print a report, or reach a database, there is almost always a way to automate around it without touching the vendor's software or breaking your support contract.",
      },
      {
        q: "Do you sign an NDA?",
        a: "Yes, as a matter of course before any audit that touches real data. If your company has its own template, I will sign yours.",
      },
    ],
  },
  {
    slug: "ulhasnagar",
    name: "Ulhasnagar",
    localities: ["Ulhasnagar 1 to 5", "Camp areas", "Netaji Chowk", "Shahad border"],
    travel: "Three stations away",
    intro:
      "Trading and manufacturing businesses here often run on a paper trail that works perfectly well — until somebody has to total it, reconcile it, or produce it for an audit. Those three jobs are the ones worth automating first, and the paper can stay if you want it to.",
    visitNote:
      "Close enough for a same-week visit. I will usually ask to see a month's worth of the actual registers rather than a description of them.",
    faq: [
      {
        q: "We do not want to change how our staff work. Can you still help?",
        a: "Often yes. The best automations sit behind the existing habit: your staff keep filling the same register or form, and the counting, checking and reporting stop being done by a person.",
      },
      {
        q: "Is our data safe if it goes into a system?",
        a: "It goes into your accounts, not mine. I get access to build and maintain it, you can remove that access whenever you like, and nothing is copied anywhere else.",
      },
    ],
  },
  {
    slug: "ambernath",
    name: "Ambernath",
    localities: ["Ambernath East", "Ambernath West", "Ambernath MIDC", "Morivali", "Shiv Mandir area"],
    travel: "Four stations away",
    intro:
      "The MIDC estate here is full of units where production, dispatch and accounts each keep their own record, and a day a month disappears into making the three agree. That reconciliation is a textbook first build: clear rules, real cost, and an obvious moment when it has worked.",
    visitNote:
      "Worth a single longer visit rather than several short ones. Seeing a shift change and a dispatch day tells me more than any description of the process.",
    faq: [
      {
        q: "Our production data is written on the shop floor. Does automation need new hardware?",
        a: "Usually not. A simple form on a phone or a shared tablet, or even continuing on paper with one entry point, is enough to start. Hardware is a later decision, not a precondition.",
      },
      {
        q: "How much disruption is there during a build?",
        a: "Almost none. The automation is built and tested alongside your current process, and you switch over only once it has produced the same answers as the manual method for a period you are comfortable with.",
      },
    ],
  },
  {
    slug: "badlapur",
    name: "Badlapur",
    localities: ["Badlapur East", "Badlapur West", "Badlapur MIDC", "Katrap", "Manjarli"],
    travel: "Five stations away",
    intro:
      "Smaller units and a growing number of businesses run by people who commute into Mumbai and would rather not spend their Sunday on paperwork. Those are usually quick wins: one report, one reconciliation, one set of documents that stops needing a person.",
    visitNote:
      "Reachable on the same line, so a visit is straightforward. For smaller jobs an audit over a call plus a sample of your files is often enough to quote accurately.",
    faq: [
      {
        q: "Can the whole thing be done remotely?",
        a: "For a quick win, often yes — a call to watch the job over a screen share, then build and hand over remotely. For anything touching a shop floor or a physical register, I would rather come once and see it.",
      },
      {
        q: "We only have one job worth automating. Is that enough to be worth your time?",
        a: "Yes. One job is the normal starting point, and it is a better first project than a long list. If nothing else follows, that is a perfectly good outcome.",
      },
    ],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
