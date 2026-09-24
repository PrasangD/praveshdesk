import type { Metadata } from "next";
import { AreasList } from "@/components/AreasList";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Areas we serve: Dombivli, Kalyan, Thane and nearby",
  description:
    "PraveshDesk sets up enquiry follow-up systems in person for coaching classes in Dombivli, Kalyan, Thane, Ulhasnagar, Ambernath, Badlapur and Navi Mumbai.",
  path: "/coaching-classes",
});

export default function AreasPage() {
  return (
    <>
      <PageIntro title="Areas we serve">
        <p>
          We&apos;re based in {site.baseLocation} and set up every institute in person. These are the areas we can visit
          regularly.
        </p>
      </PageIntro>
      <Section>
        <AreasList />
        <p className="mt-10 max-w-2xl text-lg">
          Outside these areas? We may still be able to help over a video call. Choose &ldquo;Somewhere else&rdquo; on the
          demo form and tell us where you are.
        </p>
      </Section>
      <CtaBand />
    </>
  );
}
