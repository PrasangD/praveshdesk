import type { Metadata } from "next";
import { LeakCalculator } from "@/components/LeakCalculator";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Enquiry follow-up calculator for coaching classes",
  description:
    "Enter your monthly enquiries, follow-up rate and fees to estimate what missed follow-ups cost your coaching class in a year.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <PageIntro title={<>What do missed <span className="whitespace-nowrap">follow-ups</span> cost your class?</>}>
        <p>Move the sliders to match your institute. Nothing is sent anywhere unless you fill in the form.</p>
      </PageIntro>
      <Section>
        <LeakCalculator />
      </Section>
    </>
  );
}
