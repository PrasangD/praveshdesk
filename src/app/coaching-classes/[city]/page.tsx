import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList } from "@/components/FaqList";
import { FeatureList } from "@/components/FeatureList";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { Section } from "@/components/PageIntro";
import { PricingPlans } from "@/components/PricingPlans";
import { SetupSteps } from "@/components/SetupSteps";
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
    title: `Admission enquiry follow-up for coaching classes in ${city.name}`,
    description: `Every enquiry in one list, a daily list of who to call, and a weekly report. Set up in person for coaching classes in ${city.localities.slice(0, 3).join(", ")} and across ${city.name}.`,
    path: `/coaching-classes/${city.slug}`,
  });
}

export default async function CityPage({ params }: { params: Promise<Params> }) {
  const city = getCity((await params).city);
  if (!city) notFound();

  const others = cities.filter((c) => c.slug !== city.slug);
  const serviceJsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Admission enquiry follow-up system for coaching classes in ${city.name}`,
    provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
    areaServed: { "@type": "City", name: city.name },
    serviceType: "Admission enquiry management for coaching institutes",
  };

  return (
    <>
      <JsonLd data={serviceJsonLd} />

      <section className="border-b border-rule bg-register/60">
        <div className="container-page py-14 sm:py-20">
          <p className="text-lg font-semibold text-margin">
            <Link href="/coaching-classes" className="no-underline hover:underline">Areas</Link> / {city.name}
          </p>
          <h1 className="mt-3 max-w-4xl text-[2.35rem] font-extrabold tracking-tight sm:text-5xl">
            Enquiry <span className="whitespace-nowrap">follow-up</span> for coaching classes in {city.name}
          </h1>
          <p className="mt-5 max-w-2xl text-xl leading-relaxed">{city.intro}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#book" className="btn btn-primary">Book a free demo in {city.name}</a>
            <Link href="/calculator" className="btn btn-secondary">Try the calculator</Link>
          </div>
        </div>
      </section>

      <Section title={`Visiting institutes in ${city.name}`}>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <p className="max-w-2xl text-lg">{city.visitNote}</p>
          <div>
            <h3 className="text-lg font-bold">Localities we visit</h3>
            <ul className="mt-3 flex flex-wrap gap-2">
              {city.localities.map((l) => (
                <li key={l} className="rounded border border-rule bg-white px-3 py-1 text-base text-ink-deep">{l}</li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="What your institute gets" className="border-t border-rule bg-register/60">
        <FeatureList />
      </Section>

      <Section title="Live in three working days">
        <SetupSteps />
      </Section>

      <Section title="Pricing" className="border-t border-rule">
        <PricingPlans />
      </Section>

      <Section title={`Questions from ${city.name} classes`} className="border-t border-rule bg-register/60">
        <FaqList items={[...city.faq, ...generalFaqs.slice(0, 3)]} />
      </Section>

      <Section id="book" title={`Book a free demo for your ${city.name} institute`}>
        <div className="max-w-3xl">
          <LeadForm source="city" defaultCity={city.slug} id={`city-${city.slug}-form`} />
        </div>
      </Section>

      <section className="border-t border-rule">
        <div className="container-page py-10">
          <h2 className="text-lg font-bold">We also visit</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link href={`/coaching-classes/${c.slug}`} className="text-lg text-ink underline">{c.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
