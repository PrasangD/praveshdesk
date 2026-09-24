import type { Metadata } from "next";
import Link from "next/link";
import { AutomationCatalogue, AutomationJumpLinks } from "@/components/AutomationCatalogue";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { LeadForm } from "@/components/LeadForm";
import { PageIntro, Section } from "@/components/PageIntro";
import {
  automationCount,
  automationGroups,
  badCandidates,
  buildSteps,
  goodCandidates,
  willNotBuild,
} from "@/lib/automations";
import { automationFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Automation for coaching classes: name the job, we build it",
  description:
    "Fees, attendance, report cards, receipts, parent updates, staff hours and owner reports — built around how your institute already works. Fixed price, quoted before we start.",
  path: "/automations",
});

export default function AutomationsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: automationFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageIntro title={<>Name the job. We build the thing that does it.</>}>
        <p>
          Admission follow-up is where we start, because that is where the money leaks. It is not where we stop. If
          someone at your institute does the same work every week by hand, it can almost certainly be done for them.
        </p>
      </PageIntro>

      <Section
        title="Start from the job, not the software"
        intro="Most software asks you to change how you work. We do it the other way round: you tell us what eats your staff's evening, and we build exactly that."
      >
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-3">
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">You already have the list</h3>
            <p className="mt-2 text-lg">
              Every owner can name three jobs they wish would just happen. Those three are the brief. There is nothing
              else to prepare.
            </p>
          </div>
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">It runs on your own account</h3>
            <p className="mt-2 text-lg">
              Your Google account, your sheets, your data. No new app for your staff to install and forget.
            </p>
          </div>
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">One fixed price</h3>
            <p className="mt-2 text-lg">
              Agreed in writing before anything is built, and it does not move afterwards. If the job is not worth
              automating, we say so for free.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title={`${automationCount} jobs we have already worked out`}
        intro={
          <>
            These are the ones that come up in nearly every coaching class, grouped by whose day they ruin. Your own
            version will differ in the details, and that is fine — the details are the build.
          </>
        }
        className="border-t border-rule bg-register/60"
      >
        <AutomationJumpLinks />
        <div className="mt-12">
          <AutomationCatalogue />
        </div>
      </Section>

      <Section title="And the one that is only yours">
        <div className="max-w-3xl">
          <p className="text-xl leading-relaxed">
            The list above is what we have seen. The job you are thinking about right now — the one no institute but
            yours has, the one you assumed no software would ever cover — is the interesting one.
          </p>
          <p className="mt-4 text-lg">
            Describe it in a sentence and we will tell you honestly whether it can be built, roughly what it would take,
            and whether it is worth your money. That conversation costs nothing.
          </p>
          <p className="mt-6">
            <Link href="#build" className="btn btn-primary">
              Tell us the job
            </Link>
          </p>
        </div>
      </Section>

      <Section title="How a custom build goes" className="border-t border-rule bg-register/60">
        <ol className="grid gap-x-12 md:grid-cols-2">
          {buildSteps.map((s, i) => (
            <li key={s.title} className="border-t border-rule py-6">
              <div className="flex gap-4">
                <span className="w-6 shrink-0 text-xl font-bold text-margin tabular-nums">{i + 1}</span>
                <div>
                  <h3 className="text-xl font-bold">{s.title}</h3>
                  <p className="mt-2 text-lg">{s.body}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <p className="mt-8 max-w-2xl border-l-2 border-stamp pl-4 text-lg">
          Setup happens in person in {site.baseLocation}, {site.region} and nearby. Further away, we do it over a call
          and a screen share.
        </p>
      </Section>

      <Section
        title="Which jobs are worth automating"
        intro="Not everything is. Being straight about this early saves you money and saves us both a wasted month."
      >
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <span className="stamp">Good fit</span>
            </h3>
            <ul className="mt-5 space-y-3">
              {goodCandidates.map((g) => (
                <li key={g} className="flex gap-3 text-lg">
                  <svg viewBox="0 0 16 16" className="mt-2 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold">Leave it as it is</h3>
            <ul className="mt-5 space-y-3">
              {badCandidates.map((b) => (
                <li key={b} className="flex gap-3 text-lg">
                  <svg viewBox="0 0 16 16" className="mt-2 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="What we will not build, whatever you offer" className="border-t border-rule bg-register/60">
        <ul className="grid max-w-4xl gap-x-12 md:grid-cols-2">
          {willNotBuild.map((w) => (
            <li key={w.title} className="border-t border-rule py-5">
              <h3 className="text-lg font-bold text-ink-deep">{w.title}</h3>
              <p className="mt-2 text-lg">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Questions owners ask about custom work">
        <FaqList items={automationFaqs} />
      </Section>

      <Section
        id="build"
        title="Tell us what to build"
        intro="Pick the area, or choose 'something else' and describe it in your own words. We reply within one working day with a straight answer about whether it is worth doing."
        className="border-t border-rule bg-register/60"
      >
        <div className="max-w-3xl">
          <LeadForm
            source="automations"
            id="automations-form"
            submitLabel="Send my request"
            // On this page the choice is the point, so an unchanged default would
            // be noise. "Not sure yet" honestly means they did not say.
            defaultInterest="not-sure"
            messageLabel="Describe the job you want automated"
            messageHint="What happens today, who does it, and how often. A few lines is plenty."
          />
        </div>
      </Section>
    </>
  );
}
