import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `${site.name} is a small, founder-run service based in Dombivli that sets up enquiry follow-up systems for coaching classes.`,
  path: "/about",
});

// EDIT THIS PAGE: replace the story with your own words once your first
// conversations with institutes have happened. Keep it true and specific.
const principles = [
  { title: "Small on purpose", body: "One workflow, done well. We would rather your staff use a simple list every day than ignore a big system." },
  { title: "Your data is yours", body: "Everything lives in your institute's Google account. We keep only the access we need, and you can remove it any time." },
  { title: "Clear scope, clear price", body: "You know what is included before you pay. Anything extra is quoted first, never billed as a surprise." },
  { title: "Fixed support windows", body: `We answer on WhatsApp during set hours (${site.supportWindows}), and we tell you in advance if that ever changes.` },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title={`About ${site.name}`}>
        <p>
          {site.name} is a small, founder-run service based in {site.baseLocation}. We help coaching classes make sure
          every enquiry gets followed up.
        </p>
      </PageIntro>

      <Section>
        <div className="max-w-2xl space-y-5 text-lg">
          <p>
            I&apos;m {site.founderName}, a software developer from {site.baseLocation}. Talking to coaching class owners
            around Dombivli and Kalyan, I kept hearing the same thing: enquiries were being written down, but nobody could
            say how many were ever called back.
          </p>
          <p>
            The fix did not need expensive software. It needed one list that reception can fill in quickly, a morning
            list of who to call, and a weekly report the owner actually reads. So that is what {site.name} is.
          </p>
          <p>
            I set up every institute myself, in person, and I review the numbers with each owner every month.
          </p>
        </div>
      </Section>

      <Section title="How we work" className="border-t border-rule bg-register/60">
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-rule pt-4">
              <h3 className="text-xl font-bold">{p.title}</h3>
              <p className="mt-2 text-lg">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title="Want to see if it fits your institute?" />
    </>
  );
}
