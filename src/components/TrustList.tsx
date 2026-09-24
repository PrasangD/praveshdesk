import { site } from "@/lib/site";

const points = [
  {
    title: "Your data stays in your account",
    body: "Enquiries live in your institute's own Google account. We only get the access we need to set it up and look after it.",
  },
  {
    title: "Messages go from your own WhatsApp",
    body: "No bulk messaging and no risk to your number. Staff send each message themselves, with one tap.",
  },
  {
    title: "Set up in person, supported locally",
    body: `We come to your institute for setup and training. Support is on WhatsApp during fixed windows: ${site.supportWindows}.`,
  },
  {
    title: "No lock-in",
    body: `Month to month. Stop with ${site.cancellationNotice} notice and keep everything, because it was always yours.`,
  },
];

export function TrustList() {
  return (
    <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
      {points.map((p) => (
        <li key={p.title} className="border-l-2 border-stamp pl-5">
          <h3 className="text-xl font-bold">{p.title}</h3>
          <p className="mt-1.5 text-lg">{p.body}</p>
        </li>
      ))}
    </ul>
  );
}
