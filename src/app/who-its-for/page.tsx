import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { notFor, sectors } from "@/lib/sectors";

export const metadata: Metadata = pageMeta({
  title: "Who this is for: companies, factories, agencies and institutes",
  description:
    "Automation for businesses with more process than people to run it — operations and finance teams, engineering teams with no DevOps, MIDC manufacturing, agencies, and schools and coaching institutes.",
  path: "/who-its-for",
});

export default function WhoItsForPage() {
  return (
    <>
      <PageIntro title="More process than people to run it">
        <p>
          The industry is not the thing these have in common. What they share is a business that grew faster than its
          systems, and at least one person whose week is spent holding the gap together by hand.
        </p>
      </PageIntro>

      <Section>
        <div className="space-y-12">
          {sectors.map((s) => (
            <section key={s.id} className="border-t-2 border-ink pt-6">
              <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-12">
                <div>
                  <h2 className="text-2xl font-bold sm:text-[1.75rem]">{s.name}</h2>
                  <p className="mt-3 text-lg">{s.situation}</p>
                </div>
                <div>
                  <h3 className="text-base font-bold text-ink-deep">Where the hours usually go</h3>
                  <ul className="mt-3 space-y-2">
                    {s.typical.map((t) => (
                      <li key={t} className="flex gap-3 text-base">
                        <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                          <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          ))}
        </div>
      </Section>

      <Section title="When I am the wrong person to call" className="border-t border-rule bg-register/60">
        <ul className="max-w-2xl space-y-3">
          {notFor.map((n) => (
            <li key={n} className="border-l-2 border-margin pl-4 text-lg">{n}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-lg">
          If that sounds like your situation, you will hear it on the first call rather than after you have paid for an
          audit.
        </p>
      </Section>

      <Section title="Not sure which one you are?">
        <p className="max-w-2xl text-lg">
          It does not matter much. The first conversation is about one job, not about your industry.{" "}
          <Link href="/automations" className="text-ink underline">
            Look through what I automate
          </Link>{" "}
          and see whether any of it sounds like your week.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
