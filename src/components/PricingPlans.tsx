import Link from "next/link";
import { annualNote, foundingOffer, gstNote, inr, plans } from "@/lib/pricing";

export function FoundingOffer() {
  return (
    <div className="relative rounded-md border-2 border-dashed border-stamp/60 bg-white p-5 sm:p-6">
      <span className="stamp absolute -top-3 right-4 bg-white">{`${foundingOffer.seats} places`}</span>
      <h3 className="text-xl font-bold">{foundingOffer.name}</h3>
      <p className="mt-2 text-lg">
        {inr(foundingOffer.setup)} setup, then {inr(foundingOffer.monthlyIntro)} a month for {foundingOffer.introMonths}{" "}
        months and {inr(foundingOffer.monthlyAfter)} a month after that. Everything in Admission Desk.
      </p>
      <p className="mt-2 text-base text-muted">{foundingOffer.terms}</p>
    </div>
  );
}

export function PricingPlans({ showFounding = true }: { showFounding?: boolean }) {
  return (
    <div>
      {showFounding && (
        <div className="mb-10 max-w-2xl">
          <FoundingOffer />
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2 md:gap-0 md:divide-x md:divide-rule">
        {plans.map((p) => (
          <div
            key={p.id}
            className={`md:px-8 md:first:pl-0 md:last:pr-0 ${p.highlight ? "" : ""}`}
          >
            <div className={`border-t-4 pt-5 ${p.highlight ? "border-ink" : "border-rule"}`}>
              <h3 className="text-2xl font-bold">{p.name}</h3>
              <p className="mt-1 text-base text-muted">{p.forWhom}</p>
              <p className="mt-5">
                <span className="text-4xl font-extrabold text-ink-deep tabular-nums">{inr(p.monthly)}</span>
                <span className="text-lg"> a month</span>
              </p>
              <p className="text-lg">plus {inr(p.setup)} one-time setup</p>
              <ul className="mt-5 space-y-2">
                {p.includes.map((item) => (
                  <li key={item} className="flex gap-3 text-base">
                    <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                      <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/demo" className={`btn mt-6 ${p.highlight ? "btn-primary" : "btn-secondary"}`}>
                Book a demo
              </Link>
            </div>
          </div>
        ))}
      </div>
      <p className="mt-8 text-base text-muted">
        {annualNote} {gstNote} Month to month, no long contract.
      </p>
    </div>
  );
}
