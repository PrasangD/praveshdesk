import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageIntro, Section } from "@/components/PageIntro";
import { PricingPlans } from "@/components/PricingPlans";
import { pricingFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { buildPriceNote, buildSizes, extras } from "@/lib/pricing";

export const metadata: Metadata = pageMeta({
  title: "Pricing: from ₹1,499 a month",
  description:
    "Admission Desk costs ₹4,999 setup and ₹1,499 a month. Admission + Fees costs ₹8,999 setup and ₹2,499 a month. Custom automations are a fixed price per job. Month to month, no long contract.",
  path: "/pricing",
});

export default function PricingPage() {
  return (
    <>
      <PageIntro title="Pricing">
        <p>
          A one-time setup fee for the visit, the build and the training, then a small monthly fee to keep it working.
          If it helps you recover even one admission a year, it has usually paid for itself.
        </p>
      </PageIntro>

      <Section>
        <PricingPlans />
      </Section>

      <Section
        title="Anything built to order"
        intro="The plans above are the admissions system, which we have already built. Everything else your institute does by hand is priced per job."
        className="border-t border-rule bg-register/60"
      >
        <div className="grid gap-x-12 md:grid-cols-3">
          {buildSizes.map((b) => (
            <div key={b.name} className="border-t-2 border-ink py-5">
              <h3 className="text-xl font-bold">{b.name}</h3>
              <p className="mt-2 text-lg">{b.shape}</p>
              <p className="mt-3 text-base font-bold text-ink-deep">{b.time}</p>
              <p className="mt-1 text-base text-muted">{b.examples}</p>
            </div>
          ))}
        </div>
        <p className="mt-8 max-w-2xl border-l-2 border-stamp pl-4 text-lg">{buildPriceNote}</p>
        <p className="mt-6">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See what can be built, and what we will not build
          </Link>
        </p>
      </Section>

      <Section title="Extras" className="border-t border-rule">
        <dl className="max-w-2xl divide-y divide-rule border-y border-rule">
          {extras.map((e) => (
            <div key={e.item} className="flex flex-col justify-between gap-1 py-4 sm:flex-row sm:gap-6">
              <dt className="text-lg font-bold text-ink-deep">{e.item}</dt>
              <dd className="text-lg">{e.price}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Pricing questions">
        <FaqList items={pricingFaqs} />
      </Section>

      <CtaBand />
    </>
  );
}
