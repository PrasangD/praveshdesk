/**
 * The hero visual: the same job, before and after.
 *
 * Deliberately not an abstract illustration. It is a run log, because that is
 * what the deliverable actually looks like — something ran, at a time nobody
 * chose that morning, and left a record.
 */

const steps = [
  { name: "collect", detail: "4 sources", ms: "1.8s" },
  { name: "validate", detail: "312 rows, 2 rejected", ms: "0.4s" },
  { name: "build report", detail: "PDF + sheet", ms: "2.1s" },
  { name: "send", detail: "4 recipients", ms: "0.9s" },
];

export function RunLog() {
  return (
    <div className="relative">
      <div className="rounded-lg border-2 border-ink bg-ink-deep p-5 text-white shadow-[0_18px_40px_-24px_rgba(18,29,74,0.9)] sm:p-6">
        <div className="flex items-center justify-between gap-4 border-b border-white/15 pb-3">
          <p className="font-bold">weekly-ops-report</p>
          <p className="text-sm text-white/60">Monday, 06:00</p>
        </div>

        <ol className="mt-4 space-y-2.5 font-mono text-[0.9rem] leading-snug">
          {steps.map((s) => (
            <li key={s.name} className="flex items-baseline gap-3">
              <span className="text-[#3ddc97]" aria-hidden="true">
                ✓
              </span>
              <span className="w-[6.5rem] shrink-0 text-white">{s.name}</span>
              <span className="flex-1 truncate text-white/55">{s.detail}</span>
              <span className="shrink-0 tabular-nums text-white/70">{s.ms}</span>
            </li>
          ))}
        </ol>

        <p className="mt-4 border-t border-white/15 pt-3 text-sm text-white/70">
          Finished in 5.2 seconds. Nobody opened a laptop.
        </p>
      </div>

      <div className="mt-4 rounded-lg border border-rule bg-register px-5 py-4">
        <p className="text-base text-muted">
          <span className="font-bold text-ink-deep">Before:</span> one person, every Monday morning, about three hours.
          Occasionally wrong, always late when they were on leave.
        </p>
      </div>
    </div>
  );
}
