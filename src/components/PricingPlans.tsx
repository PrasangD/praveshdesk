import Link from "next/link";
import {
  audit,
  buildBands,
  buildPriceNote,
  capacityNote,
  carePlans,
  gstNote,
  inr,
  startingOffer,
} from "@/lib/pricing";

function Ticks({ items }: { items: readonly string[] }) {
  return (
    <ul className="mt-5 space-y-2">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base">
          <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
            <path
              d="M3 8.5l3 3 7-7"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/** Step 1. Sold on its own so nobody has to trust a big number first. */
export function AuditCard({ showOffer = true }: { showOffer?: boolean }) {
  return (
    <div className="relative rounded-md border-2 border-ink bg-white p-6 sm:p-7">
      {showOffer && <span className="stamp absolute -top-3 right-5 bg-white">{`${startingOffer.seats} places`}</span>}
      <p className="text-base font-bold text-margin">Start here</p>
      <h3 className="mt-1 text-2xl font-bold">{audit.name}</h3>
      <p className="mt-4">
        <span className="text-4xl font-extrabold text-ink-deep tabular-nums">{inr(audit.price)}</span>
        <span className="text-lg"> one-time</span>
      </p>
      <p className="mt-1 text-lg">{audit.duration}</p>
      <p className="text-base text-muted">{audit.deliverable}</p>
      <Ticks items={audit.includes} />
      <p className="mt-5 border-l-2 border-stamp pl-4 text-base">{audit.creditNote}</p>
      {showOffer && (
        <p className="mt-4 rounded-md bg-highlight/50 p-3 text-base">
          <strong>{startingOffer.name}:</strong> {startingOffer.body}{" "}
          <span className="text-muted">{startingOffer.terms}</span>
        </p>
      )}
      <Link href="/contact" className="btn btn-primary mt-6">
        Book the audit
      </Link>
    </div>
  );
}

/** Step 2. Fixed price per job, quoted after the audit. */
export function BuildBands() {
  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rule">
      {buildBands.map((b) => (
        <div key={b.id} className="md:px-7 md:first:pl-0 md:last:pr-0">
          <div className={`border-t-4 pt-5 ${b.highlight ? "border-ink" : "border-rule"}`}>
            <h3 className="text-2xl font-bold">{b.name}</h3>
            <p className="mt-4">
              <span className="text-lg">{b.to ? "" : "from "}</span>
              <span className="text-3xl font-extrabold text-ink-deep tabular-nums">{inr(b.from)}</span>
              {b.to && (
                <>
                  <span className="text-lg"> to </span>
                  <span className="text-3xl font-extrabold text-ink-deep tabular-nums">{inr(b.to)}</span>
                </>
              )}
            </p>
            <p className="mt-1 text-base font-bold text-margin">{b.time}</p>
            <p className="mt-3 text-lg">{b.shape}</p>
            <p className="mt-4 text-base font-bold text-ink-deep">Typically</p>
            <Ticks items={b.examples} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** Step 3. Optional, and genuinely optional. */
export function CarePlans() {
  return (
    <div className="grid gap-8 md:grid-cols-3 md:gap-0 md:divide-x md:divide-rule">
      {carePlans.map((p) => (
        <div key={p.id} className="md:px-7 md:first:pl-0 md:last:pr-0">
          <div className={`border-t-4 pt-5 ${p.highlight ? "border-ink" : "border-rule"}`}>
            <h3 className="text-2xl font-bold">{p.name}</h3>
            <p className="mt-1 text-base text-muted">{p.forWhom}</p>
            <p className="mt-4">
              <span className="text-3xl font-extrabold text-ink-deep tabular-nums">{inr(p.monthly)}</span>
              <span className="text-lg"> a month</span>
            </p>
            <Ticks items={p.includes} />
          </div>
        </div>
      ))}
    </div>
  );
}

/** The whole ladder in one block, for pages that are not /pricing. */
export function PricingSummary() {
  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-[1fr_1.5fr] lg:gap-12">
        <AuditCard />
        <div>
          <h3 className="text-xl font-bold">Then the build, at a fixed price</h3>
          <dl className="mt-5 divide-y divide-rule border-y border-rule">
            {buildBands.map((b) => (
              <div key={b.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <dt>
                  <span className="text-lg font-bold text-ink-deep">{b.name}</span>
                  <span className="block text-base text-muted">{b.time}</span>
                </dt>
                <dd className="text-lg font-bold tabular-nums text-ink-deep">
                  {b.to ? `${inr(b.from)} – ${inr(b.to)}` : `from ${inr(b.from)}`}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-5 text-lg">{buildPriceNote}</p>
          <p className="mt-4 text-base text-muted">{capacityNote}</p>
          <p className="mt-2 text-base text-muted">{gstNote}</p>
          <p className="mt-6">
            <Link href="/pricing" className="text-lg font-semibold text-ink underline">
              See the full price list, including care plans
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
