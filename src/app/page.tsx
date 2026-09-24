import type { Metadata } from "next";
import Link from "next/link";
import { AreasList } from "@/components/AreasList";
import { AutomationPreview } from "@/components/AutomationCatalogue";
import { FaqList } from "@/components/FaqList";
import { FeatureList } from "@/components/FeatureList";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { LeakRows } from "@/components/LeakRows";
import { Section } from "@/components/PageIntro";
import { PricingPlans } from "@/components/PricingPlans";
import { RegisterHero } from "@/components/RegisterHero";
import { SetupSteps } from "@/components/SetupSteps";
import { TrustList } from "@/components/TrustList";
import { automationCount } from "@/lib/automations";
import { cities } from "@/lib/cities";
import { generalFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: `Enquiry follow-up for coaching classes in Dombivli | ${site.name}`,
    description:
      "Every enquiry in one list, a daily list of who to call, and a weekly report for the owner — plus fees, attendance, report cards and paperwork built to order. Set up in person for coaching classes in Dombivli, Kalyan, Thane and nearby.",
    path: "/",
  }),
  title: { absolute: `Enquiry follow-up for coaching classes in Dombivli | ${site.name}` },
};

export default function HomePage() {
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: site.url,
    description: site.shortDescription,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Dombivli",
      addressRegion: "Maharashtra",
      addressCountry: "IN",
    },
    areaServed: cities.map((c) => ({ "@type": "City", name: c.name })),
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />

      <section className="overflow-hidden">
        <div className="container-page grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:pb-24">
          <div>
            <h1 className="text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              Every enquiry gets a call back.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed">
              {site.name} turns your reception register and WhatsApp chats into one follow-up list your staff actually
              use — and then takes on the fees, attendance and paperwork they still do by hand. Built for coaching
              classes, set up in person in Dombivli, Kalyan, Thane and nearby.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="btn btn-primary">
                Book a free demo
              </Link>
              <Link href="/calculator" className="btn btn-secondary">
                Work out what missed follow-ups cost
              </Link>
            </div>
            <p className="mt-5 text-base text-muted">
              Runs on your own Google account. No app to install, no bulk messages, no long contract.
            </p>
          </div>
          <RegisterHero />
        </div>
      </section>

      <Section
        title="Where admissions slip away"
        intro="Most classes don't lose students at the demo class. They lose them in the days after the first enquiry, when nobody calls back."
        className="border-t border-rule"
      >
        <LeakRows />
      </Section>

      <Section
        title="What PraveshDesk does"
        intro="One workflow, done properly: from the first enquiry to the admission."
        className="bg-register/60"
      >
        <FeatureList />
        <p className="mt-8">
          <Link href="/features" className="text-lg font-semibold text-ink underline">
            See every feature and what we leave out on purpose
          </Link>
        </p>
      </Section>

      <Section
        title="Then everything else you still do by hand"
        intro={
          <>
            Admissions is where we start, because that is where the money leaks. Once it is running, the same setup
            takes on the rest of the week: fee reminders, attendance, report cards, receipts, staff hours, your Monday
            numbers.
          </>
        }
      >
        <AutomationPreview />
        <div className="mt-10 max-w-3xl border-l-2 border-margin pl-5">
          <p className="text-xl font-bold text-ink-deep">
            If your institute does something none of these cover, that is the one we most want to hear about.
          </p>
          <p className="mt-2 text-lg">
            Describe the job in a sentence. We will tell you whether it can be built, what it would take, and whether it
            is worth your money — before you pay anything.
          </p>
        </div>
        <p className="mt-8">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See all {automationCount} jobs we can take off your staff
          </Link>
        </p>
      </Section>

      <Section title="Live in three working days" intro="You don't learn software. We come to your institute and set it up around how you already work." className="bg-register/60">
        <SetupSteps />
      </Section>

      <section className="border-y border-rule bg-highlight/35">
        <div className="container-page flex flex-col gap-5 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">How many admissions are slipping through?</h2>
            <p className="mt-2 text-lg">
              Enter your own numbers: monthly enquiries, how many get a call back, and your average fee.
            </p>
          </div>
          <Link href="/calculator" className="btn btn-primary shrink-0">
            Open the calculator
          </Link>
        </div>
      </section>

      <Section title="Simple pricing" intro="A one-time setup and a small monthly fee. Recovering one admission a year usually covers it.">
        <PricingPlans />
      </Section>

      <Section title="Why classes trust it" className="bg-register/60">
        <TrustList />
      </Section>

      <Section title="Areas we serve" intro={`Based in ${site.baseLocation}. We set up every institute in person.`}>
        <AreasList />
      </Section>

      <Section title="Questions owners ask" className="border-t border-rule">
        <FaqList items={generalFaqs.slice(0, 6)} />
      </Section>

      <Section
        id="book"
        title={<>Book a free <span className="whitespace-nowrap">15-minute</span> demo</>}
        intro="Tell us a little about your institute. We'll call or WhatsApp you to fix a time."
        className="bg-register/60"
      >
        <div className="max-w-3xl">
          <LeadForm source="home" id="home-form" />
        </div>
      </Section>
    </>
  );
}
