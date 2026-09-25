import type { Metadata } from "next";
import { AreasList } from "@/components/AreasList";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Where I work: Dombivli, Kalyan, Thane, Navi Mumbai and nearby",
  description:
    "On-site automation work across the Central line corridor — Dombivli, Kalyan, Thane, Navi Mumbai, Ulhasnagar, Ambernath and Badlapur — including the MIDC estates. Remote beyond that.",
  path: "/automation-services",
});

export default function AreasPage() {
  return (
    <>
      <PageIntro title="Where I work">
        <p>
          I am based in {site.baseLocation}, so the Central line corridor and Navi Mumbai are the places I can reach
          easily and visit more than once. That matters more than it sounds: seeing the job done in the room is usually
          what makes the quote accurate.
        </p>
      </PageIntro>
      <Section>
        <AreasList />
        <div className="mt-12 max-w-2xl space-y-4">
          <p className="text-lg">
            <strong className="text-ink-deep">Further away?</strong> Most builds work perfectly well remotely — a call
            to watch the job over a screen share, then build and hand over without ever being in the room. Choose
            &ldquo;Somewhere else&rdquo; on the form and say where you are.
          </p>
          <p className="text-lg">
            The exception is anything involving a shop floor, a physical register or hardware. For those I would rather
            come once and see it than guess from a description.
          </p>
        </div>
      </Section>
      <CtaBand />
    </>
  );
}
