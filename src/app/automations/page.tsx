import type { Metadata } from "next";
import Link from "next/link";
import { AutomationCatalogue } from "@/components/AutomationCatalogue";
import { BuildSteps } from "@/components/BuildSteps";
import { FaqList } from "@/components/FaqList";
import { JsonLd } from "@/components/JsonLd";
import { RequestForm } from "@/components/RequestForm";
import { PageIntro, Section } from "@/components/PageIntro";
import { automationCount, badCandidates, goodCandidates, willNotBuild } from "@/lib/automations";
import { generalFaqs } from "@/lib/faqs";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "What I automate: name the job and it gets built",
  description:
    "Reports, data between systems, documents, reconciliation, deployments, cloud cost, monitoring, onboarding, approvals and institute back-office. Fixed price per job, built on your own systems.",
  path: "/automations",
});

export default function AutomationsPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: generalFaqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <JsonLd data={faqJsonLd} />

      <PageIntro title="Name the job. I build the thing that does it.">
        <p>
          There is no product here to fit into. Everything is built for the process you actually run, on the systems you
          already have. Below is what comes up most often — not a menu, a starting point for recognising your own week.
        </p>
      </PageIntro>

      <Section
        title="Start from the job, not the software"
        intro="Most software asks you to change how you work, then charges you monthly for the privilege. This works the other way round."
      >
        <div className="grid gap-x-12 gap-y-8 md:grid-cols-3">
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">You already have the list</h3>
            <p className="mt-2 text-lg">
              Everyone can name three jobs they wish would just happen. Those three are the brief. There is nothing to
              prepare and no document to write.
            </p>
          </div>
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">It runs on your systems</h3>
            <p className="mt-2 text-lg">
              Your cloud, your accounts, your data. You get the code and the credentials, so nothing depends on me
              staying around.
            </p>
          </div>
          <div className="border-t-2 border-ink py-5">
            <h3 className="text-xl font-bold">One fixed price</h3>
            <p className="mt-2 text-lg">
              Agreed in writing before anything is built, and it does not move. If a job is not worth automating, you
              are told so for free.
            </p>
          </div>
        </div>
      </Section>

      <Section
        title={`${automationCount} jobs, grouped by whose week they ruin`}
        intro="Filter by what you are. Anything marked for both turns up in companies and institutes alike, because the paperwork does not care what the business does."
        className="border-t border-rule bg-register/60"
      >
        <AutomationCatalogue />
      </Section>

      <Section title="And the one that is only yours">
        <div className="max-w-3xl">
          <p className="text-xl leading-relaxed">
            The list above is what I have seen. The job you are thinking about right now — the one specific to how your
            business grew, the one you assumed no software would ever cover — is the interesting one.
          </p>
          <p className="mt-4 text-lg">
            Describe it in a sentence. You will get an honest answer about whether it can be built, roughly what it
            would take, and whether it is worth your money. That conversation costs nothing.
          </p>
          <p className="mt-6">
            <Link href="#build" className="btn btn-primary">
              Tell me the job
            </Link>
          </p>
        </div>
      </Section>

      <Section title="How a build goes" className="border-t border-rule bg-register/60">
        <BuildSteps />
        <p className="mt-10 max-w-2xl border-l-2 border-stamp pl-4 text-lg">
          On-site work happens across {site.baseLocation}, Thane and Navi Mumbai. Further away, the same process works
          over a call and a screen share — most builds never need me in the room after the first visit.
        </p>
      </Section>

      <Section
        title="Which jobs are worth automating"
        intro="Not all of them. Being straight about this early saves your money and both our time."
      >
        <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
          <div>
            <h3 className="flex items-center gap-3 text-xl font-bold">
              <span className="stamp">Worth it</span>
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
            <h3 className="text-xl font-bold">Leave it alone</h3>
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

      <Section title="What I will not build, whatever you offer" className="border-t border-rule bg-register/60">
        <ul className="grid max-w-5xl gap-x-12 md:grid-cols-2">
          {willNotBuild.map((w) => (
            <li key={w.title} className="border-t border-rule py-5">
              <h3 className="text-lg font-bold text-ink-deep">{w.title}</h3>
              <p className="mt-2 text-lg">{w.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Questions I get asked">
        <FaqList items={generalFaqs} />
      </Section>

      <Section
        id="build"
        title="Tell me what to build"
        intro="Pick the area, or choose 'something else' and describe it in your own words."
        className="border-t border-rule bg-register/60"
      >
        <div className="max-w-3xl">
          <RequestForm
            source="automations"
            id="automations-form"
            messageLabel="Describe the job you want automated"
            messageHint="What happens today, who does it, and how often. A few lines is plenty."
          />
        </div>
      </Section>
    </>
  );
}
