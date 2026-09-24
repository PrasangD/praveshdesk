/**
 * The one "loud" element on the site: the paper enquiry register every class
 * already has, and the same enquiries as PraveshDesk's list of today's calls.
 * Purely illustrative — all names and numbers are made up.
 */

const registerRows = [
  { date: "12/10", name: "Aarav Patil", std: "9th", phone: "98XXX XX210", note: "will think", tone: "missed" },
  { date: "12/10", name: "Sneha Kulkarni", std: "11th Sci", phone: "99XXX XX847", note: "demo Sat", tone: "" },
  { date: "13/10", name: "Rohan Deshmukh", std: "10th", phone: "70XXX XX392", note: "asked fees", tone: "" },
  { date: "14/10", name: "Fatima Shaikh", std: "12th", phone: "Insta ad", note: "call back??", tone: "red" },
  { date: "14/10", name: "Ishaan Mehta", std: "8th", phone: "88XXX XX105", note: "", tone: "" },
] as const;

const todayRows = [
  { initials: "AP", name: "Aarav Patil", std: "Std 9", note: "Said he'd think about it. Call back today.", state: "call" },
  { initials: "RD", name: "Rohan Deshmukh", std: "Std 10", note: "Asked about fees on Monday.", state: "call" },
  { initials: "SK", name: "Sneha Kulkarni", std: "Std 11 Science", note: "Attended Saturday's demo class.", state: "admitted" },
] as const;

export function RegisterHero() {
  return (
    <figure className="relative mx-auto w-full max-w-[35rem]">
      <figcaption className="sr-only">
        A paper enquiry register with a parent marked &quot;will think&quot; and never called back, and the same
        enquiries in PraveshDesk as a list of today&apos;s calls with call and WhatsApp buttons.
      </figcaption>

      <div
        aria-hidden="true"
        className="ruled margin-line overflow-hidden rounded-md border border-rule shadow-[0_24px_48px_-28px_rgba(18,29,74,0.45)]"
      >
        <p className="h-[calc(var(--line-register)*2)] pl-[4.25rem] pt-3 font-hand text-[1.35rem] font-bold text-ink">
          Enquiries, October
        </p>
        <ul className="font-hand text-[1.05rem] leading-[var(--line-register)] text-ink">
          {registerRows.map((r, i) => (
            <li key={i} className="flex h-[var(--line-register)] items-center">
              <span className="w-14 shrink-0 pr-2 text-right text-[0.9rem] text-ink/70">{r.date}</span>
              <span className="min-w-0 flex-1 truncate pl-3">
                {r.name} <span className="text-ink/70">({r.std})</span>
              </span>
              <span className="hidden w-28 shrink-0 text-[0.95rem] text-ink/75 sm:block">{r.phone}</span>
              <span
                className={`w-24 shrink-0 pr-3 text-right sm:w-28 ${
                  r.tone === "missed"
                    ? "underline decoration-margin decoration-wavy decoration-[1.5px] underline-offset-4"
                    : r.tone === "red"
                      ? "text-margin"
                      : ""
                }`}
              >
                {r.note}
              </span>
            </li>
          ))}
          <li className="h-[var(--line-register)]" />
          <li className="h-[var(--line-register)]" />
          <li className="h-[var(--line-register)]" />
        </ul>
      </div>

      <div
        aria-hidden="true"
        className="relative -mt-24 ml-auto mr-3 w-[88%] rounded-lg border border-rule bg-white p-4 shadow-[0_28px_60px_-30px_rgba(18,29,74,0.55)] sm:-mr-3 sm:w-[21rem]"
      >
        <div className="flex items-baseline justify-between">
          <p className="text-[1.05rem] font-bold text-ink-deep">
            Today&apos;s calls <span className="ml-1 rounded bg-register px-1.5 text-sm font-bold text-ink">2</span>
          </p>
          <p className="text-sm text-muted">Thu, 15 Oct</p>
        </div>
        <ul className="mt-3 divide-y divide-rule/70">
          {todayRows.map((r) => (
            <li key={r.name} className="py-2.5">
              <div className="flex items-start gap-3">
                <span className="mt-0.5 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-register text-xs font-bold text-ink">
                  {r.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[0.98rem] font-bold leading-tight text-ink-deep">
                    {r.name} <span className="font-medium text-muted">{r.std}</span>
                  </p>
                  <p className="text-[0.9rem] leading-snug text-graphite">{r.note}</p>
                  {r.state === "call" ? (
                    <div className="mt-2 flex gap-2">
                      <span className="rounded border border-rule px-2.5 py-0.5 text-sm font-semibold text-ink">Call</span>
                      <span className="rounded bg-stamp px-2.5 py-0.5 text-sm font-semibold text-white">WhatsApp</span>
                    </div>
                  ) : (
                    <span className="stamp mt-2">Admitted</span>
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </figure>
  );
}
