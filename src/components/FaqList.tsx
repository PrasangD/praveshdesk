import type { Faq } from "@/lib/faqs";

export function FaqList({ items }: { items: Faq[] }) {
  return (
    <div className="max-w-3xl divide-y divide-rule border-y border-rule">
      {items.map((f) => (
        <details key={f.q} className="group py-1">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 text-lg font-bold text-ink-deep [&::-webkit-details-marker]:hidden">
            {f.q}
            <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0 text-ink transition-transform group-open:rotate-45" aria-hidden="true">
              <path d="M8 2v12M2 8h12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </summary>
          <p className="pb-5 pr-8 text-lg">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
