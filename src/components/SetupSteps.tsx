const steps = [
  {
    label: "Day 1",
    title: "We visit your institute",
    body: "We sit with the owner and reception for about an hour, see how enquiries come in today, and agree on the status names and the form.",
  },
  {
    label: "Day 2",
    title: "We build it in your Google account",
    body: "The enquiry form, the reception QR code, today's calls list and the weekly report, with your current enquiries imported.",
  },
  {
    label: "Day 3",
    title: "Your staff learn it in 30 minutes",
    body: "We train reception and counsellors on their own phones, then you go live the same day.",
  },
  {
    label: "Every month",
    title: "A 30-minute review",
    body: "We look at your numbers together: where enquiries came from, how many were called, and how many joined.",
  },
];

export function SetupSteps() {
  return (
    <ol className="grid gap-8 md:grid-cols-4 md:gap-6">
      {steps.map((s, i) => (
        <li key={s.label} className="relative border-t-2 border-ink pt-4">
          <p className="text-base font-bold text-margin">{s.label}</p>
          <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
          <p className="mt-2 text-base">{s.body}</p>
          <span className="sr-only">{`Step ${i + 1} of ${steps.length}`}</span>
        </li>
      ))}
    </ol>
  );
}
