const leaks = [
  {
    who: "The walk-in who said “we'll think about it”",
    what: "Written in the register. Nobody calls again, and they join the class down the road.",
  },
  {
    who: "The parent who called during a batch",
    what: "The number sits in someone's call log. It never reaches the register at all.",
  },
  {
    who: "The Instagram ad enquiry",
    what: "The lead sheet was downloaded once, called once, and forgotten by the second week.",
  },
  {
    who: "The owner's question",
    what: "“Which of our ads actually brought admissions?” Nobody can answer it without a day of work.",
  },
];

export function LeakRows() {
  return (
    <ul className="margin-line border-y border-rule">
      {leaks.map((l) => (
        <li key={l.who} className="relative grid gap-1 border-b border-rule py-5 pl-[4.5rem] pr-2 last:border-b-0 sm:grid-cols-[1fr_1.3fr] sm:gap-8">
          <span aria-hidden="true" className="absolute left-3 mt-0.5 font-hand text-lg font-bold text-margin">
            missed
          </span>
          <p className="text-lg font-bold text-ink-deep">{l.who}</p>
          <p className="text-lg">{l.what}</p>
        </li>
      ))}
    </ul>
  );
}
