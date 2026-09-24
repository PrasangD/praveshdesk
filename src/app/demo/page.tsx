import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Book a free 15-minute demo",
  description:
    "See PraveshDesk working with sample enquiries on your own phone. 15 minutes, in person or on a call, for coaching classes in Dombivli, Kalyan, Thane and nearby.",
  path: "/demo",
});

const agenda = [
  "A new enquiry arriving from the reception QR code",
  "The alert the owner receives",
  "Today's calls list, with one-tap call and WhatsApp",
  "Moving an enquiry from demo class to admitted",
  "The Monday report: sources, conversions, overdue calls",
];

export default function DemoPage() {
  return (
    <>
      <PageIntro title={<>Book a free <span className="whitespace-nowrap">15-minute</span> demo</>}>
        <p>In person at your institute or on a call, whichever suits you. No preparation needed.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <h2 className="text-2xl font-bold">What you&apos;ll see</h2>
            <ol className="mt-5 space-y-3">
              {agenda.map((a, i) => (
                <li key={a} className="flex gap-4 text-lg">
                  <span className="w-6 shrink-0 font-bold text-margin tabular-nums">{i + 1}</span>
                  <span>{a}</span>
                </li>
              ))}
            </ol>
            <p className="mt-8 border-l-2 border-stamp pl-4 text-lg">
              We&apos;ll also ask how enquiries reach you today. If a register is honestly enough for your institute, we
              will tell you.
            </p>
          </div>
          <div>
            <LeadForm source="demo" id="demo-form" />
          </div>
        </div>
      </Section>
    </>
  );
}
