import type { Metadata } from "next";
import Link from "next/link";
import { CtaBand } from "@/components/CtaBand";
import { FeatureList } from "@/components/FeatureList";
import { PageIntro, Section } from "@/components/PageIntro";
import { notIncluded } from "@/lib/features";
import { pageMeta } from "@/lib/metadata";

export const metadata: Metadata = pageMeta({
  title: "Features: enquiry capture, daily follow-ups and weekly reports",
  description:
    "Every enquiry in one list, owner alerts, a daily list of who to call, clear statuses and a weekly report. Built for coaching classes.",
  path: "/features",
});

const modules = [
  { name: "Admission enquiries and follow-up", state: "Available now", body: "Everything on this page." },
  { name: "Fee instalment tracking", state: "Available now as an add-on", body: "A due-date list, a pending-fees report, and a reminder list for staff." },
  { name: "Attendance, report cards, receipts, staff hours", state: "Built to order", body: "Not a product you switch on — we build the version your institute actually needs." },
  { name: "Whatever your institute does by hand", state: "Built to order", body: "Describe the job and we quote a fixed price for it, or tell you it is not worth automating." },
  { name: "Scholarship test and event registration", state: "Planned", body: "Registrations flow straight into your enquiry list, so test-takers get followed up." },
  { name: "Official WhatsApp alerts", state: "Planned", body: "Approved WhatsApp notifications to your own staff, sent through Meta's official platform." },
];

export default function FeaturesPage() {
  return (
    <>
      <PageIntro title="Everything between the first enquiry and the admission">
        <p>
          PraveshDesk does one job: makes sure every parent and student who enquires gets followed up, and shows the
          owner what happened. Here is exactly what that includes.
        </p>
      </PageIntro>

      <Section>
        <FeatureList detailed />
      </Section>

      <Section title="What the admissions system does not do, on purpose" className="border-t border-rule bg-register/60">
        <p className="max-w-2xl text-lg">
          Keeping it small is why your staff will keep using it. These are deliberately left out of the product — the
          first two we will not build at any price, the rest is simply somebody else&apos;s job:
        </p>
        <ul className="mt-6 max-w-2xl space-y-3">
          {notIncluded.map((n) => (
            <li key={n} className="flex gap-3 text-lg">
              <svg viewBox="0 0 16 16" className="mt-2 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <span>{n}</span>
            </li>
          ))}
        </ul>
      </Section>

      <Section title="Beyond admissions">
        <p className="max-w-2xl text-lg">
          Everything above is the part we have already built and can show you working. The rest of what your staff do by
          hand — fees, attendance, marks, receipts, staff hours, your own reports — gets built for your institute
          specifically, at a fixed price agreed before we start.
        </p>
        <p className="mt-5">
          <Link href="/automations" className="text-lg font-semibold text-ink underline">
            See the full list, and how a custom build works
          </Link>
        </p>
      </Section>

      <Section title="Modules" className="border-t border-rule">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left text-lg">
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="py-3 pr-6 font-bold text-ink-deep">Module</th>
                <th scope="col" className="py-3 pr-6 font-bold text-ink-deep">Status</th>
                <th scope="col" className="py-3 font-bold text-ink-deep">What it adds</th>
              </tr>
            </thead>
            <tbody>
              {modules.map((m) => (
                <tr key={m.name} className="border-b border-rule align-top">
                  <th scope="row" className="py-4 pr-6 font-bold text-ink-deep">{m.name}</th>
                  <td className="py-4 pr-6">{m.state}</td>
                  <td className="py-4">{m.body}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
