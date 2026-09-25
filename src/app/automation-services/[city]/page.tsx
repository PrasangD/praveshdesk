import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BuildSteps } from "@/components/BuildSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { PricingSummary } from "@/components/PricingPlans";
import { RequestForm } from "@/components/RequestForm";
import { Section } from "@/components/PageIntro";
import { AutomationPreview } from "@/components/AutomationCatalogue";
import { cities, getCity } from "@/lib/cities";
import { generalFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

type Params = { city: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return cities.map((c) => ({ city: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const city = getCity((await params).city);
  if (!city) return {};
  return pageMeta({
    title: `Automation services in ${city.name}`,
    description: `Reports, reconciliation, documents, deployments and monitoring automated for companies and institutes in ${city.localities.slice(0, 3).join(", ")} and across ${city.name}. Fixed price per job.`,
    path: `/automation-services/${city.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const city = getCity((await params).city);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Business process and infrastructure automation in ${city.name}`,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: { "@type": "City", name: city.name },
    serviceType: "Business process and infrastructure automation",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <section className="border-b border-rule bg-register/60">
        <div className="container-page py-14 sm:py-20">
          <p className="text-lg font-semibold text-margin">
            <Link href="/automation-services" className="no-underline hover:underline">Where I work</Link> / {city.name}
          </p>
          <h1 className="mt-3 max-w-4xl text-[2.35rem] font-extrabold tracking-tight sm:text-5xl">
            Automation for {city.name} businesses
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed">{city.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#start" className="btn btn-primary">Tell me the job</a>
            <Link href="/demo" className="btn btn-secondary">Watch one run</Link>
          </div>
        </div>
      </section>

      <Section title={`Working in ${city.name}`}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-lg">{city.visitNote}</p>
          <div>
            <h2 className="text-lg font-bold">Areas I cover</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {city.localities.map((l) => (
                <li key={l} className="rounded border border-rule bg-white px-3 py-1 text-base text-ink-deep">{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="What usually gets automated first" className="border-t border-rule bg-register/60">
        <AutomationPreview />
        <p className="mt-8">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See every job in detail
          </Link>
        </p>
      </Section>

      <Section title="How it goes">
        <BuildSteps />
      </Section>

      <Section title="What it costs" className="border-t border-rule bg-register/60">
        <PricingSummary />
      </Section>

      <Section title={`Questions from ${city.name}`}>
        <FaqList items={[...city.faq, ...generalFaqs.slice(0, 3)]} />
      </Section>

      <Section id="start" title={`Tell me about a job in ${city.name}`} className="border-t border-rule bg-register/60">
        <div className="max-w-3xl">
          <RequestForm
            source="city"
            defaultCity={city.slug}
            id={`city-${city.slug}-form`}
            messageLabel="What job would you like to stop doing by hand?"
            messageHint="What happens today, who does it, and how often."
          />
        </div>
      </Section>

      <section className="border-t border-rule">
        <div className="container-page py-10">
          <h2 className="text-lg font-bold">I also work in</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/automation-services/${c.slug}`} className="text-lg text-ink underline">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
