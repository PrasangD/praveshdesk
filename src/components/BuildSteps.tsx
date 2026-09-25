import { buildSteps } from "@/lib/automations";

export function BuildSteps() {
  return (
    <ol className="grid gap-8 md:grid-cols-5 md:gap-6">
      {buildSteps.map((s, i) => (
        <li key={s.title} className="relative border-t-2 border-ink pt-4">
          <p className="text-base font-bold text-margin tabular-nums">Step {i + 1}</p>
          <h3 className="mt-1 text-xl font-bold">{s.title}</h3>
          <p className="mt-2 text-base">{s.body}</p>
        </li>
      ))}
    </ol>
  );
}
