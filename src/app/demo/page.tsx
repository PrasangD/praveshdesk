import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { DemoRunner } from "@/components/DemoRunner";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { inr } from "@/lib/pricing";

export const metadata: Metadata = pageMeta({
  title: "See an automation run",
  description:
    "A working demo: four branches send messy daily files, and the weekly report builds itself in milliseconds — including flagging the rows a person still needs to look at.",
  path: "/demo",
});

const honesty = [
  {
    title: "The data is deliberately messy",
    body: "Three date formats, branch names typed differently, amounts with rupee signs and thousands separators, an invoice sent twice and a row with no branch. That is not me being unfair to the example — that is a normal Monday.",
  },
  {
    title: "It refuses to guess",
    body: "Three rows cannot be trusted, so they are set aside and named rather than quietly averaged away. An automation that hides bad data is worse than the spreadsheet it replaced.",
  },
  {
    title: "The real version also has a schedule and an alert",
    body: "On your systems this runs at a time you pick, keeps a log of every run, and messages someone if a branch file never arrives. That part is not interesting to watch, which is exactly the point.",
  },
];

export default function DemoPage() {
  return (
    <>
      <PageIntro title="Watch one actually run">
        <p>
          The most common first build there is: four branches email a daily file, and somebody loses Monday morning to
          making them agree. Press the button — the report below is calculated in your browser from the raw rows on the
          left, not played back from a recording.
        </p>
      </PageIntro>

      <Section>
        <DemoRunner />
      </Section>

      <Section title="What this demo is honest about" className="border-t border-rule bg-register/60">
        <ul className="grid gap-x-12 md:grid-cols-3">
          {honesty.map((h) => (
            <li key={h.title} className="border-t-2 border-ink py-5">
              <h2 className="text-xl font-bold">{h.title}</h2>
              <p className="mt-2 text-lg">{h.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="What this one would cost">
        <div className="max-w-3xl">
          <p className="text-lg">
            A job this shape — a handful of inputs, some cleaning rules, a report, a schedule and an alert — is a quick
            win: <strong className="tabular-nums">{inr(18000)} to {inr(45000)}</strong>, ready in three to seven working
            days. If the person doing it by hand spends three hours a week on it, it pays for itself in a few months.
          </p>
          <p className="mt-5 flex flex-col gap-3 sm:flex-row">
            <Link href="/calculator" className="btn btn-secondary">
              Check the arithmetic on your own numbers
            </Link>
            <Link href="/pricing" className="btn btn-secondary">
              See the full price list
            </Link>
          </p>
        </div>
      </Section>

      <CtaBand
        title="Want to see this on your own data?"
        body="Send a sample file with the sensitive parts removed. If a demo on your real shape of data is useful, I will build one before you have paid anything."
      />
    </>
  );
}
