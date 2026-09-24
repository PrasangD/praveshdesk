import { features } from "@/lib/features";

export function FeatureList({ detailed = false }: { detailed?: boolean }) {
  return (
    <ul className="grid gap-x-12 md:grid-cols-2">
      {features.map((f) => (
        <li key={f.title} className="border-t border-rule py-6">
          <h3 className="text-xl font-bold">{f.title}</h3>
          <p className="mt-2 text-lg">{f.body}</p>
          {detailed && (
            <ul className="mt-3 space-y-1.5">
              {f.detail.map((d) => (
                <li key={d} className="flex gap-3 text-base">
                  <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                    <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          )}
        </li>
      ))}
    </ul>
  );
}
