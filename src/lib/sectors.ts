// Who this is for.
//
// Written as recognition, not as segments: an owner or an ops head should read
// one of these and think "that is us". Each one names a real situation, and the
// "not for" list at the bottom is what keeps the rest believable.

export type Sector = {
  id: string;
  name: string;
  /** The situation, in one recognisable sentence. */
  situation: string;
  /** Where the hours actually go for this kind of client. */
  typical: string[];
};

export const sectors: Sector[] = [
  {
    id: "smb",
    name: "Companies with more process than people",
    situation:
      "Twenty to five hundred people, an operations or finance team holding the business together with spreadsheets, and a backlog of jobs everyone agrees should be automated and nobody has time to automate.",
    typical: [
      "The monthly report pack that takes three days to assemble",
      "Reconciliation between the billing system and the bank",
      "Data re-typed between two systems that will never talk to each other",
      "Approvals that live in a mail thread",
    ],
  },
  {
    id: "engineering",
    name: "Engineering teams with nobody doing DevOps",
    situation:
      "Developers who are shipping, but deploying by hand, sharing credentials in chat, and finding out about outages from a customer. Not big enough to hire a platform engineer, too big to keep going like this.",
    typical: [
      "A deployment that only one person is confident running",
      "Environments that have quietly drifted apart",
      "Backups that have never been restored",
      "Alerts nobody reads because there are too many",
    ],
  },
  {
    id: "industrial",
    name: "Manufacturing and distribution around the MIDC belt",
    situation:
      "Dombivli, Ambernath, Badlapur and Taloja. Production, dispatch and accounts each keeping their own register or workbook, and a day's work every month spent making the three agree.",
    typical: [
      "Production and dispatch figures consolidated by hand",
      "Stock and reorder levels discovered too late",
      "Invoices, challans and gate passes typed twice",
      "Compliance records assembled the week before an audit",
    ],
  },
  {
    id: "services",
    name: "Agencies and services businesses",
    situation:
      "Client work is the business, and the admin around it — timesheets, status reports, invoices, renewals — eats the margin quietly.",
    typical: [
      "The weekly client update that is assembled by hand",
      "Timesheets chased at month end",
      "Invoices raised from a spreadsheet somebody maintains",
      "Renewals and retainers remembered rather than tracked",
    ],
  },
  {
    id: "institutes",
    name: "Schools, colleges and coaching institutes",
    situation:
      "A front desk doing fees, attendance, marks and parent messages between batches, and an owner who finds out what happened only when somebody prepares a report.",
    typical: [
      "Fee dues and receipts maintained by hand",
      "Attendance registers totalled at month end",
      "Marks added up and report cards typed one at a time",
      "The same message sent to forty parents individually",
    ],
  },
];

/** Being clear about this early saves everyone a wasted meeting. */
export const notFor = [
  "Anyone wanting one packaged product that covers everything on day one — this is built to order, one process at a time",
  "A process that is about to change anyway; automate it after the change, not before",
  "Work that needs someone on site full time, or during my working hours on weekdays",
  "A business that wants the automation but not the conversation about how the work actually gets done",
];
