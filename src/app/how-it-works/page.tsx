import type { Metadata } from "next";
import Link from "next/link";
import { BuildSteps } from "@/components/BuildSteps";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { audit, capacityNote } from "@/lib/pricing";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "How it works: audit, fixed price, build, handover",
  description:
    "Half a day watching how the work is really done, a written report, a fixed price per job, then a build on your own systems handed over with the code and the credentials.",
  path: "/how-it-works",
});

const needs = [
  "Half an hour with the person who actually does the job — not a description of it from someone else",
  "Access to a sample of the real data, with anything sensitive removed",
  "Someone who can approve access to the systems it touches",
  "An honest answer about whether the process is about to change",
];

const handover = [
  { what: "The code", detail: "In your repository or your account, not mine. Commented, and written to be read by whoever comes next." },
  { what: "The credentials", detail: "Created in your accounts, stored where your team keeps secrets. I hold no keys after handover unless you want me on a care plan." },
  { what: "Written notes", detail: "What it does, when it runs, what to do when it fails, and the three things most likely to break first." },
  { what: "A walkthrough", detail: "A session with whoever will own it, recorded if that is useful, so the knowledge is not only in a conversation." },
];

export default function HowItWorksPage() {
  return (
    <>
      <PageIntro title="How it works">
        <p>
          Five steps, and two places where you can stop having spent almost nothing. Nobody is asked to commit to a
          large number before the work has been seen.
        </p>
      </PageIntro>

      <Section>
        <BuildSteps />
      </Section>

      <Section title="What happens in the audit" className="border-t border-rule bg-register/60">
        <div className="grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:gap-14">
          <div>
            <p className="text-lg">
              {audit.duration.toLowerCase().replace(/^half/, "Half")}. I watch the job being done at normal speed,
              interrupt with questions, and write down what it actually costs — not what it is supposed to cost.
            </p>
            <p className="mt-4 text-lg">
              Three working days later you get a written report: each process costed, what can be automated, what should
              not be, what to fix without code at all, and a price band for each with the payback worked out. It is
              yours to keep, and yours to take to somebody else for a second quote.
            </p>
            <p className="mt-4 text-lg">{audit.creditNote}</p>
          </div>
          <div>
            <h2 className="text-lg font-bold">What I need from you</h2>
            <ul className="mt-4 space-y-3">
              {needs.map((n) => (
                <li key={n} className="flex gap-3 text-base">
                  <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-stamp" aria-hidden="true">
                    <path
                      d="M3 8.5l3 3 7-7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <span>{n}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      <Section title="What handover actually means">
        <p className="max-w-2xl text-lg">
          This is the part most automation work gets wrong. A build that only its author can maintain is a liability you
          paid for. Everything I build is handed over properly, whether or not you take a care plan.
        </p>
        <dl className="mt-8 max-w-3xl divide-y divide-rule border-y border-rule">
          {handover.map((h) => (
            <div key={h.what} className="grid gap-1 py-5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-lg font-bold text-ink-deep">{h.what}</dt>
              <dd className="text-lg">{h.detail}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="How long it takes, and why" className="border-t border-rule bg-register/60">
        <div className="max-w-3xl space-y-4">
          <p className="text-lg">
            A quick win is three to seven working days from the go-ahead. A connected module is two to four weeks. Both
            include the part people forget: running it alongside your existing process until it produces the same
            answers, so switching over is a decision rather than a leap.
          </p>
          <p className="text-lg">{capacityNote}</p>
          <p className="text-lg">
            Support after handover runs on {site.supportWindows.toLowerCase()}. Anything I built is fixed free for 30
            days.
          </p>
        </div>
        <p className="mt-8">
          <Link href="/pricing" className="text-lg font-semibold text-ink underline">
            See what each step costs
          </Link>
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
