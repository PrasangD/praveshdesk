import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "About",
  description: `${site.name} is one ${site.founderRole} in ${site.baseLocation} who automates the jobs businesses still do by hand.`,
  path: "/about",
});

// EDIT THIS PAGE: the story below is a draft built from what you told me.
// Put it in your own words once you have had your first few conversations,
// and only claim what is true.
const principles = [
  {
    title: "One job at a time",
    body: "A single automation that works beats a platform that half works. Every engagement starts with one process and earns the right to the next.",
  },
  {
    title: "You own what I build",
    body: "It runs on your systems, you get the code and the credentials, and the handover assumes I might not be around. That is the test of whether it was built properly.",
  },
  {
    title: "A fixed price, agreed first",
    body: "You know the number and the date before anything starts. Scope changes are a new number you agree to, never a surprise at the end.",
  },
  {
    title: "The honest no",
    body: "Some jobs should not be automated, and some should just be done less often. Saying so costs me a sale and is the reason the rest of this is worth believing.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageIntro title={`About ${site.name}`}>
        <p>
          One {site.founderRole} in {site.baseLocation}, automating the work that businesses and institutes still do by
          hand every week.
        </p>
      </PageIntro>

      <Section>
        <div className="max-w-2xl space-y-5 text-lg">
          <p>
            I&apos;m {site.founderName}. I work as a {site.founderRole}, which in practice means I spend my days making
            sure things happen without anyone needing to remember to do them — deployments, checks, reports, alerts, the
            small reliable machinery that keeps software running.
          </p>
          <p>
            The same machinery works outside software, and almost nobody applies it there. Every business I have looked
            at closely has at least one person whose week is spent doing something a schedule should be doing:
            assembling the same report, reconciling the same two lists, typing the same record into a second system,
            producing the same forty documents.
          </p>
          <p>
            So that is what this is. Not a product, not a platform, and not a subscription for software you did not ask
            for. You name the job, I quote a fixed price, I build it on your systems, and I hand it over with the code.
          </p>
          <p>
            I do this alongside a full-time job, which is why I take {site.concurrentBuilds} builds at a time and say so
            on the pricing page. It is a real limit, and it is the reason I can promise a date and keep it.
          </p>
        </div>
      </Section>

      <Section title="How I work" className="border-t border-rule bg-register/60">
        <ul className="grid gap-x-12 gap-y-8 md:grid-cols-2">
          {principles.map((p) => (
            <li key={p.title} className="border-t border-rule pt-4">
              <h2 className="text-xl font-bold">{p.title}</h2>
              <p className="mt-2 text-lg">{p.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand title="Got a job in mind?" />
    </>
  );
}
