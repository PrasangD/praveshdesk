import type { Metadata } from "next";
import { SavingsCalculator } from "@/components/SavingsCalculator";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "What is that manual job costing you?",
  description:
    "Enter the hours a task takes each week, how many people touch it and what they cost. Get the yearly figure, the working days it consumes, and how quickly automating it would pay for itself.",
  path: "/calculator",
});

export default function CalculatorPage() {
  return (
    <>
      <PageIntro title="What is that job costing you?">
        <p>
          Pick one task — the weekly report, the reconciliation, the thing nobody wants to do. Four numbers and you will
          know whether automating it is worth discussing. Nothing is sent anywhere unless you fill in the form.
        </p>
      </PageIntro>
      <Section>
        <SavingsCalculator />
      </Section>
    </>
  );
}
