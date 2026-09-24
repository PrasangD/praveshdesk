import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { PageIntro, Section } from "@/components/PageIntro";
import { PricingPlans } from "@/components/PricingPlans";
import { pricingFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { extras } from "@/lib/pricing";

export const metadata: Metadata = pageMeta({
  title: "Pricing: from ₹1,499 a month",
  description:
    "Admission Desk costs ₹4,999 setup and ₹1,499 a month. Admission + Fees costs ₹8,999 setup and ₹2,499 a month. Month to month, no long contract.",
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

      <Section title="Extras" className="border-t border-rule bg-register/60">
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
