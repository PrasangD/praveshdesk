// Service-area pages. Each city page must say something true and specific
// about serving that area — never add a city just to rank for its name.

export const CITY_SLUGS = [
  "dombivli",
  "kalyan",
  "thane",
  "ulhasnagar",
  "ambernath",
  "badlapur",
  "navi-mumbai",
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
    localities: ["Dombivli East", "Dombivli West", "Phadke Road", "Manpada Road", "Thakurli", "Palava"],
    travel: "Home base",
    intro:
      "PraveshDesk is run from Dombivli. If your classes are near the station, on Phadke Road, along Manpada Road or out towards Palava, setup happens in person, usually on a weekend so batch timings are not disturbed.",
    visitNote:
      "Dombivli visits can be booked within the same week, including a quick follow-up visit after your first month if your staff want a refresher.",
    faq: [
      {
        q: "Can you come to our class on a Sunday?",
        a: "Yes. Most Dombivli setups happen on Saturday or Sunday mornings, when reception is quieter.",
      },
      {
        q: "We have one branch in the East and one in the West. Can both use the same list?",
        a: "Yes. Each enquiry is tagged with its branch, and the owner sees both branches in one weekly report. Two branches are included in the Admission + Fees plan.",
      },
    ],
  },
  {
    slug: "kalyan",
    name: "Kalyan",
    localities: ["Kalyan West", "Kalyan East", "Khadakpada", "Shahad", "Titwala"],
    travel: "Two stations away",
    intro:
      "If your Kalyan class takes enquiries at the counter, over the phone and from ads on the same busy evening, PraveshDesk puts every one of them into a single list, so the parent who said \"we'll think about it\" still gets a call two days later.",
    visitNote:
      "Kalyan is two stations from our base, so setup visits and follow-up visits are easy to fit around your batch timings.",
    faq: [
      {
        q: "Our counsellor works only in the evening. Does the follow-up list still work?",
        a: "Yes. The list shows whoever is due for a call that day, whenever the counsellor opens it. Overdue calls stay at the top until someone updates them.",
      },
      {
        q: "We get many enquiries from Titwala and Shahad. Can we see which area they come from?",
        a: "Yes. Add the area as a field on the enquiry form and the weekly report shows enquiries and admissions by area.",
      },
    ],
  },
  {
    slug: "thane",
    name: "Thane",
    localities: ["Thane West", "Thane East", "Naupada", "Vartak Nagar", "Ghodbunder Road", "Kopri"],
    travel: "About 30 minutes by local",
    intro:
      "If your Thane institute runs Facebook or Instagram ads, PraveshDesk puts those lead-ad enquiries next to walk-ins and phone calls, so you can finally see which source turns into admissions.",
    visitNote:
      "We visit Thane in person for the setup day and the staff training. Monthly reviews can be in person or over a video call, whichever you prefer.",
    faq: [
      {
        q: "We already pay a marketing agency for ads. Will this replace them?",
        a: "No. It makes their work measurable. You will see how many ad enquiries were called, booked a demo class and joined.",
      },
      {
        q: "Can the weekly report go to our partners as well as the owner?",
        a: "Yes. The weekly report can be emailed to up to three people at no extra cost.",
      },
    ],
  },
  {
    slug: "ulhasnagar",
    name: "Ulhasnagar",
    localities: ["Camp 1", "Camp 2", "Camp 3", "Camp 4", "Camp 5", "Vithalwadi"],
    travel: "A short trip via Kalyan",
    intro:
      "If your Ulhasnagar class has one person handling the front desk, PraveshDesk is built for exactly that: one simple list the front desk updates in seconds, and a morning list of who to call.",
    visitNote:
      "Ulhasnagar is a short trip from Dombivli via Kalyan, so we set up in person and come back for a check-in during your first month.",
    faq: [
      {
        q: "Our receptionist is not comfortable with computers. Will she manage?",
        a: "The daily work happens on a phone: open today's list, tap to call or WhatsApp, and pick the new status. Training takes about 30 minutes.",
      },
      {
        q: "Can we write enquiries in Hindi or Marathi?",
        a: "Yes. Names and notes can be typed in any language your staff use on their phone keyboard.",
      },
    ],
  },
  {
    slug: "ambernath",
    name: "Ambernath",
    localities: ["Ambernath East", "Ambernath West"],
    travel: "About 30 minutes via Kalyan",
    intro:
      "If word of mouth brings most of your Ambernath enquiries, every missed call-back is expensive. PraveshDesk records who referred each enquiry, so you can see which parents and students are sending new families your way.",
    visitNote:
      "We set up Ambernath classes in person. Setup day is booked a few days ahead so we can plan the visit around your schedule.",
    faq: [
      {
        q: "Most of our enquiries come through referrals. Is this still useful?",
        a: "Yes. Referral enquiries are usually the easiest to convert, so they deserve a reliable follow-up. You can also see which families refer most often.",
      },
      {
        q: "Do we need a computer at the reception?",
        a: "No. A phone is enough for the front desk. The owner can view the full list and report on a phone or a laptop.",
      },
    ],
  },
  {
    slug: "badlapur",
    name: "Badlapur",
    localities: ["Badlapur East", "Badlapur West"],
    travel: "About 40 minutes via Kalyan",
    intro:
      "If your Badlapur class gets more enquiries every season, PraveshDesk gives you a proper enquiry system before the register becomes three registers.",
    visitNote:
      "We come to Badlapur for the setup day. After go-live, most support happens on WhatsApp during our fixed support windows.",
    faq: [
      {
        q: "We are small right now. Is it too early?",
        a: "If you get fewer than about 20 enquiries a month, a register may be enough for now. We will tell you honestly during the demo.",
      },
      {
        q: "Can we add fee reminders later?",
        a: "Yes. Most classes start with enquiries and add fee tracking once the first list is working. Your data carries over.",
      },
    ],
  },
  {
    slug: "navi-mumbai",
    name: "Navi Mumbai",
    localities: ["Airoli", "Ghansoli", "Vashi", "Nerul", "Belapur", "Kharghar"],
    travel: "Visits grouped by week",
    intro:
      "If your Navi Mumbai institute runs branches in more than one node, PraveshDesk keeps each branch's enquiries separate for the counsellors and puts them together in one report for the owner.",
    visitNote:
      "We group Navi Mumbai visits, so the setup day is usually booked about a week ahead. Monthly reviews happen over a video call unless you prefer a visit.",
    faq: [
      {
        q: "We have branches in Vashi and Kharghar. How is that priced?",
        a: "Two branches are included in the Admission + Fees plan. For three or more branches, we quote after seeing how enquiries move between them.",
      },
      {
        q: "Is in-person setup included for Navi Mumbai?",
        a: "Yes. The setup visit and staff training are included in the setup fee.",
      },
    ],
  },
];

export function getCity(slug: string) {
  return cities.find((c) => c.slug === slug);
}
