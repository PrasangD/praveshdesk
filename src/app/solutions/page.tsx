import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Who it's for: tuition classes, Std 11–12 and entrance coaching",
  description:
    "PraveshDesk fits owner-run coaching classes with 100 to 600 students: school tuition, Std 11–12, JEE, NEET and MHT-CET coaching, and skill institutes. Admissions first, then whatever else is done by hand.",
  path: "/solutions",
});

const fits = [
  {
    title: "School tuition classes, Std 5 to 10",
    body: "Parents enquire in waves around results and the new academic year. The follow-up list makes sure the parents who said they would decide later hear from you first.",
  },
  {
    title: "Std 11–12 with JEE, NEET or MHT-CET coaching",
    body: "Enquiries come with demo classes, parent meetings and fee discussions. Every step gets a status, so nothing stalls between the demo and the fee talk.",
  },
  {
    title: "Skill and language institutes",
    body: "Spoken English, computer courses and similar institutes with year-round batches. Every enquiry gets a next follow-up date until they join or say no.",
  },
];

const notFits = [
  "Large chains already using a dedicated admissions CRM with a full-time admin",
  "Home tutors with only a few enquiries a month, where a notebook works fine",
  "Institutes that want one packaged ERP, bought off the shelf, that covers everything on day one",
  "Anyone who wants the work done without telling us how their institute actually runs",
];

export default function SolutionsPage() {
  return (
    <>
      <PageIntro title="Built for owner-run coaching classes">
        <p>
          The best fit is an institute with 100 to 600 students, one to three branches and a small front desk, where
          the owner still teaches and admissions depend on quick, reliable follow-up.
        </p>
      </PageIntro>

      <Section>
        <ul className="grid gap-x-12 md:grid-cols-3">
          {fits.map((f) => (
            <li key={f.title} className="border-t-2 border-ink py-5">
              <h2 className="text-xl font-bold">{f.title}</h2>
              <p className="mt-2 text-lg">{f.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section
        title="What we take on, once you are running"
        intro="The fit above is for admissions, which is where almost every institute starts. After that the question changes from 'does this product suit us' to 'what else is your staff doing by hand'."
      >
        <p className="max-w-2xl text-lg">
          Fees, attendance, report cards, receipts, certificates, staff hours, the owner&apos;s Monday numbers — each one
          built for your institute rather than switched on from a menu. If the job is specific to how you work, that is
          an argument for building it, not against.
        </p>
        <p className="mt-5">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See everything we can automate
          </Link>
        </p>
      </Section>

      <Section title="When it is not the right fit" className="border-t border-rule bg-register/60">
        <ul className="max-w-2xl space-y-3">
          {notFits.map((n) => (
            <li key={n} className="border-l-2 border-margin pl-4 text-lg">{n}</li>
          ))}
        </ul>
        <p className="mt-6 max-w-2xl text-lg">If that sounds like you, we will say so in the demo rather than sell you something you won&apos;t use.</p>
      </Section>

      <Section title="Schools and colleges">
        <p className="max-w-2xl text-lg">
          We are starting with coaching classes. If you run admissions for a school or junior college and want the same
          enquiry follow-up, <Link href="/contact" className="text-ink underline">tell us</Link> and we will be in touch
          when we open it up.
        </p>
      </Section>

      <CtaBand />
    </>
  );
}
