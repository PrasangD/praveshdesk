import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageIntro, Section } from "@/components/PageIntro";
import { AuditCard, BuildBands, CarePlans } from "@/components/PricingPlans";
import { pricingFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { buildPriceNote, capacityNote, dayRate, extras, gstNote, inr, paymentNote } from "@/lib/pricing";

export const metadata: Metadata = pageMeta({
  title: "Pricing: ₹9,999 audit, then a fixed price per automation",
  description:
    "An automation audit is ₹9,999 and credited against your first build. Quick wins are ₹18,000 to ₹45,000, modules ₹60,000 to ₹1,80,000. Optional care plans from ₹4,999 a month.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageIntro title="Pricing">
        <p>
          Three steps, and you can stop after any of them. An audit that tells you what is worth doing, a fixed price
          for each thing you decide to build, and an optional plan if you would rather not maintain it yourself.
        </p>
      </PageIntro>

      <Section title="1. The audit" intro="Nobody should hand over a large number to somebody who has not seen the work. This is how the fixed price becomes real.">
        <div className="max-w-2xl">
          <AuditCard />
        </div>
      </Section>

      <Section title="2. The build" intro="One fixed price per automation, quoted after the audit, based on the job rather than on what you can afford." className="border-t border-rule bg-register/60">
        <BuildBands />
        <p className="mt-10 max-w-2xl border-l-2 border-stamp pl-4 text-lg">{buildPriceNote}</p>
        <p className="mt-6 max-w-2xl text-lg">{capacityNote}</p>
      </Section>

      <Section title="3. Keeping it running" intro="Optional, and genuinely optional — the handover includes everything you need to maintain it yourself.">
        <CarePlans />
      </Section>

      <Section title="By the day" className="border-t border-rule bg-register/60">
        <div className="max-w-2xl">
          <p className="text-lg">{dayRate.note}</p>
          <dl className="mt-6 divide-y divide-rule border-y border-rule">
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="text-lg font-bold text-ink-deep">A day</dt>
              <dd className="text-xl font-bold tabular-nums text-ink-deep">{inr(dayRate.day)}</dd>
            </div>
            <div className="flex items-baseline justify-between gap-6 py-4">
              <dt className="text-lg font-bold text-ink-deep">A week</dt>
              <dd className="text-xl font-bold tabular-nums text-ink-deep">{inr(dayRate.week)}</dd>
            </div>
          </dl>
        </div>
      </Section>

      <Section title="Everything else">
        <dl className="max-w-2xl divide-y divide-rule border-y border-rule">
          {extras.map((e) => (
            <div key={e.item} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:gap-6">
              <dt className="text-lg font-bold text-ink-deep">{e.item}</dt>
              <dd className="text-lg">{e.price}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-8 max-w-2xl text-lg">{paymentNote}</p>
        <p className="mt-3 max-w-2xl text-base text-muted">{gstNote}</p>
        <p className="mt-8">
          <Link href="/calculator" className="text-lg font-semibold text-ink underline">
            Work out whether a build would pay for itself
          </Link>
        </p>
      </Section>

      <Section title="Pricing questions" className="border-t border-rule bg-register/60">
        <FaqList items={pricingFaqs} />
      </Section>

      <CtaBand />
    </>
  );
}
