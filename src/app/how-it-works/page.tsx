import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { SetupSteps } from "@/components/SetupSteps";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "How it works: live in three working days",
  description:
    "A visit to your institute, a build in your own Google account, and 30 minutes of staff training. Then two minutes a day for your front desk.",
  path: "/how-it-works",
});

const needs = [
  "A Google account for the institute (a free Gmail account is fine)",
  "The names and phone numbers of staff who handle enquiries",
  "Your current enquiry register, Excel file or lead-ad sheet, if you have one",
  "About an hour with the owner on day 1, and 30 minutes with staff on day 3",
];

const daily = [
  { who: "Reception", what: "Adds each walk-in or phone enquiry in about 20 seconds, or lets the parent scan the QR code." },
  { who: "Counsellor", what: "Opens today's calls each morning, calls or WhatsApps with one tap, and picks the next status." },
  { who: "Owner", what: "Gets an alert for each new enquiry and reads one report every Monday." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro title="How it works">
        <p>
          You don&apos;t buy software and figure it out. We set it up around how your institute already works, train your
          staff, and check in every month.
        </p>
      </PageIntro>

      <Section title="From demo to go-live">
        <SetupSteps />
      </Section>

      <Section title="What your team does each day" className="border-t border-rule bg-register/60">
        <dl className="max-w-3xl divide-y divide-rule border-y border-rule">
          {daily.map((d) => (
            <div key={d.who} className="grid gap-1 py-5 sm:grid-cols-[10rem_1fr] sm:gap-6">
              <dt className="text-lg font-bold text-ink-deep">{d.who}</dt>
              <dd className="text-lg">{d.what}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="What we need from you">
        <ul className="max-w-2xl space-y-3">
          {needs.map((n) => (
            <li key={n} className="flex gap-3 text-lg">
              <svg viewBox="0 0 16 16" className="mt-2 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  );
}
