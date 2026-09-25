import type { Metadata } from "next";
import Link from "next/link";
import { AreasList } from "@/components/AreasList";
import { AutomationPreview } from "@/components/AutomationCatalogue";
import { BuildSteps } from "@/components/BuildSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PricingSummary } from "@/components/PricingPlans";
import { RequestForm } from "@/components/RequestForm";
import { RunLog } from "@/components/RunLog";
import { Section } from "@/components/PageIntro";
import { automationCount } from "@/lib/automations";
import { cities } from "@/lib/cities";
import { generalFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { sectors } from "@/lib/sectors";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMeta({
    title: `Automation for companies and institutes in Dombivli, Thane and Navi Mumbai | ${site.name}`,
    description:
      "A DevOps engineer who automates the job your team does by hand every week. Reports, reconciliation, documents, deployments, monitoring. Fixed price per job, built on your own systems, handed over with the code.",
    path: "/",
  }),
  title: {
    absolute: `Automation for companies and institutes in Dombivli, Thane and Navi Mumbai | ${site.name}`,
  },
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
    serviceType: "Business process and infrastructure automation",
  };

  return (
    <>
      <JsonLd data={orgJsonLd} />

      <section className="overflow-hidden">
        <div className="container-page grid items-center gap-12 pb-16 pt-10 sm:pt-16 lg:grid-cols-[1.05fr_1fr] lg:gap-12 lg:pb-24">
          <div>
            <h1 className="text-[2.75rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.25rem]">
              If you do it every week, it should do itself.
            </h1>
            <p className="mt-6 max-w-xl text-xl leading-relaxed">
              I am a {site.founderRole} in {site.baseLocation}. I take the job somebody at your company does by hand
              every week — the report, the reconciliation, the documents, the deployment — and build the thing that does
              it instead. One process at a time, at a fixed price.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/demo" className="btn btn-primary">
                Watch one run
              </Link>
              <Link href="/calculator" className="btn btn-secondary">
                Work out what a job costs you
              </Link>
            </div>
            <p className="mt-5 text-base text-muted">
              Built on your own systems. Handed over with the code. No platform to licence, no lock-in.
            </p>
          </div>
          <RunLog />
        </div>
      </section>

      <Section
        title="The test is simple"
        intro="Not everything should be automated. These are the five signs that something should be, and if a job of yours ticks three of them it is almost certainly worth a conversation."
        className="border-t border-rule"
      >
        <ol className="grid gap-x-12 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Somebody does it the same way every week",
            "The rules could be written down, even if nobody has",
            "The information already exists somewhere",
            "Getting it wrong costs money or a customer",
            "It is the reason somebody stays late",
          ].map((t, i) => (
            <li key={t} className="flex gap-4 border-t border-rule py-5">
              <span className="text-xl font-bold text-margin tabular-nums">{i + 1}</span>
              <span className="text-lg">{t}</span>
            </li>
          ))}
        </ol>
      </Section>

      <Section
        title="What I automate"
        intro="Ten areas, drawn from the jobs that actually come up. Your version will differ in the details — the details are the build."
        className="bg-register/60"
      >
        <AutomationPreview />
        <div className="mt-10 max-w-3xl border-l-2 border-margin pl-5">
          <p className="text-xl font-bold text-ink-deep">
            If the job you are thinking of is not on that list, that is the one I most want to hear about.
          </p>
          <p className="mt-2 text-lg">
            Describe it in a sentence. You will get an honest answer about whether it can be built, roughly what it would
            take, and whether it is worth your money — before you pay anything.
          </p>
        </div>
        <p className="mt-8">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See all {automationCount} jobs, grouped by whose week they ruin
          </Link>
        </p>
      </Section>

      <Section
        title="Who this is for"
        intro="The common thread is not an industry. It is having more process than people to run it."
      >
        <ul className="grid gap-x-12 md:grid-cols-2">
          {sectors.map((s) => (
            <li key={s.id} className="border-t border-rule py-6">
              <h3 className="text-xl font-bold">{s.name}</h3>
              <p className="mt-2 text-lg">{s.situation}</p>
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/who-its-for" className="text-lg font-semibold text-ink underline">
            Where the hours usually go in each, and when I am the wrong person to call
          </Link>
        </p>
      </Section>

      <section className="border-y border-rule bg-highlight/35">
        <div className="container-page flex flex-col gap-5 py-12 md:flex-row md:items-center md:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-bold sm:text-3xl">What is that job costing you?</h2>
            <p className="mt-2 text-lg">
              Hours a week, people involved, what they cost. It works out the yearly figure and how long a build would
              take to pay for itself.
            </p>
          </div>
          <Link href="/calculator" className="btn btn-primary shrink-0">
            Open the calculator
          </Link>
        </div>
      </section>

      <Section title="How it goes" intro="Five steps, no surprises, and two places where you can walk away having spent almost nothing.">
        <BuildSteps />
      </Section>

      <Section title="What it costs" intro="An audit first, so the fixed price is based on something real rather than a guess." className="bg-register/60">
        <PricingSummary />
      </Section>

      <Section title="Where I work" intro={`Based in ${site.baseLocation}. On site across the Central line corridor and Navi Mumbai, remote beyond it.`}>
        <AreasList />
      </Section>

      <Section title="Questions I get asked" className="border-t border-rule">
        <FaqList items={generalFaqs.slice(0, 6)} />
      </Section>

      <Section
        id="start"
        title="Tell me the job"
        intro="A sentence is enough to start. You will get a straight answer within one working day."
        className="bg-register/60"
      >
        <div className="max-w-3xl">
          <RequestForm
            source="home"
            id="home-form"
            messageLabel="What job would you like to stop doing by hand?"
            messageHint="What happens today, who does it, and how often. A few lines is plenty."
          />
        </div>
      </Section>
    </>
  );
}
