import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/CtaBand";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { RequestForm } from "@/components/RequestForm";
import { Section } from "@/components/PageIntro";
import { guides } from "@/lib/automation-guides";
import { automationGroups } from "@/lib/automations";
import { pageMeta } from "@/lib/metadata";
import { buildBands, inr } from "@/lib/pricing";
import type { Area } from "@/lib/request-options";
import { site } from "@/lib/site";

type Params = { area: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  // Fails the build if a group has no guide, which is the point: a group
  // without one would otherwise silently vanish from the site.
  for (const g of automationGroups) {
    if (!guides[g.id]) throw new Error(`No guide in automation-guides.ts for group "${g.id}"`);
  }
  return automationGroups.map((g) => ({ area: g.id }));
}

function load(area: string) {
  const group = automationGroups.find((g) => g.id === area);
  const guide = group ? guides[group.id] : undefined;
  return group && guide ? { group, guide } : null;
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const found = load((await params).area);
  if (!found) return {};
  return pageMeta({
    title: found.guide.metaTitle,
    description: found.guide.metaDescription,
    path: `/automations/${found.group.id}`,
  });
}

export default async function AreaPage({ params }: { params: Promise<Params> }) {
  const found = load((await params).area);
  if (!found) notFound();
  const { group, guide } = found;

  const band = buildBands.find((b) => b.id === guide.band) ?? buildBands[0];
  const others = automationGroups.filter((g) => g.id !== group.id);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: site.url },
        { "@type": "ListItem", position: 2, name: "What I automate", item: `${site.url}/automations` },
        { "@type": "ListItem", position: 3, name: group.name, item: `${site.url}/automations/${group.id}` },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      name: guide.h1,
      serviceType: group.name,
      description: guide.metaDescription,
      provider: { "@type": "ProfessionalService", name: site.name, url: site.url },
      areaServed: { "@type": "AdministrativeArea", name: "Mumbai Metropolitan Region" },
      offers: {
        "@type": "Offer",
        priceCurrency: "INR",
        price: band.from,
        description: `${band.name}: ${band.time}`,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: guide.faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <>
      {jsonLd.map((d, i) => (
        <JsonLd key={i} data={d} />
      ))}

      <section className="border-b border-rule bg-register/60">
        <div className="container-page py-14 sm:py-20">
          <p className="text-lg font-semibold text-margin">
            <Link href="/automations" className="no-underline hover:underline">
              What I automate
            </Link>{" "}
            / {group.name}
          </p>
          <h1 className="mt-3 max-w-4xl text-[2.35rem] font-extrabold tracking-tight sm:text-5xl">{guide.h1}</h1>
          <div className="mt-5 max-w-2xl space-y-4 text-xl leading-relaxed">
            {guide.intro.map((p) => (
              <p key={p.slice(0, 40)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#start" className="btn btn-primary">Tell me about yours</a>
            <Link href="/calculator" className="btn btn-secondary">Work out what it costs you</Link>
          </div>
        </div>
      </section>

      <Section title="You probably know this is you if">
        <ul className="grid max-w-4xl gap-x-12 md:grid-cols-2">
          {guide.symptoms.map((s) => (
            <li key={s} className="flex gap-3 border-t border-rule py-4 text-lg">
              <svg viewBox="0 0 16 16" className="mt-2 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="The jobs in this area" className="border-t border-rule bg-register/60">
        <ul className="grid gap-x-12 md:grid-cols-2">
          {group.items.map((item) => (
            <li key={item.title} className="border-b border-rule py-5">
              <h3 className="text-lg font-bold text-ink-deep">{item.title}</h3>
              <p className="mt-2 text-lg">{item.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="How a build like this goes">
        <ol className="max-w-3xl space-y-5">
          {guide.approach.map((a, i) => (
            <li key={a.slice(0, 40)} className="flex gap-4">
              <span className="w-6 shrink-0 text-xl font-bold text-margin tabular-nums">{i + 1}</span>
              <p className="text-lg">{a}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section title="A worked example" className="border-t border-rule bg-register/60">
        <div className="max-w-3xl rounded-md border-2 border-ink bg-white p-6">
          <h3 className="text-xl font-bold">{guide.worked.title}</h3>
          <dl className="mt-5 divide-y divide-rule border-y border-rule">
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-base font-bold text-margin">Before</dt>
              <dd className="text-lg">{guide.worked.before}</dd>
            </div>
            <div className="grid gap-1 py-4 sm:grid-cols-[7rem_1fr] sm:gap-4">
              <dt className="text-base font-bold text-stamp">After</dt>
              <dd className="text-lg">{guide.worked.after}</dd>
            </div>
          </dl>
          <p className="mt-5 text-lg">{guide.worked.maths}</p>
        </div>
        <p className="mt-6 max-w-3xl text-base text-muted">
          Those are illustrative figures, not a quote and not a promise. Your own numbers are the only ones that matter —{" "}
          <Link href="/calculator" className="text-ink underline">
            the calculator
          </Link>{" "}
          does the same arithmetic on them.
        </p>
      </Section>

      <Section title="What this normally costs">
        <div className="max-w-3xl">
          <p className="text-lg">
            A job in this area is usually a <strong>{band.name.toLowerCase()}</strong>:{" "}
            <strong className="tabular-nums">
              {band.to ? `${inr(band.from)} to ${inr(band.to)}` : `from ${inr(band.from)}`}
            </strong>
            , {band.time.toLowerCase()}. The exact number comes from the audit, in writing, before anything is built.
          </p>
          <p className="mt-4 text-lg">
            The audit itself is {inr(9999)} and comes off the first build in full. If it turns out this is not worth
            automating for you, that is what the report will say.
          </p>
          <p className="mt-6">
            <Link href="/pricing" className="text-lg font-semibold text-ink underline">
              See the full price list
            </Link>
          </p>
        </div>
      </Section>

      <Section title="Questions about this kind of work" className="border-t border-rule bg-register/60">
        <FaqList items={guide.faqs} />
      </Section>

      <Section id="start" title={`Tell me about your version of this`}>
        <div className="max-w-3xl">
          <RequestForm
            source="automations"
            id={`area-${group.id}-form`}
            defaultArea={group.id as Area}
            messageLabel="What does this look like at your organisation?"
            messageHint="What happens today, who does it, and how often. A few lines is plenty."
          />
        </div>
      </Section>

      <section className="border-t border-rule">
        <div className="container-page py-10">
          <h2 className="text-lg font-bold">Other areas</h2>
          <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
            {others.map((g) => (
              <li key={g.id}>
                <Link href={`/automations/${g.id}`} className="text-lg text-ink underline">
                  {g.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
