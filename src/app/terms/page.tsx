import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

// DRAFT plain-language terms for a one-person Indian service business.
// Have a lawyer review them (especially liability, IP and jurisdiction)
// before relying on them.

export const metadata: Metadata = pageMeta({
  title: "Terms of service",
  description: `The terms for using ${site.name}'s website and automation services.`,
  path: "/terms",
});

export default function TermsPage() {
  return (
    <>
      <PageIntro title="Terms of service">
        <p>Last updated {site.legalUpdated}.</p>
      </PageIntro>
      <Section>
        <div className="prose-legal text-lg">
          <p>
            These terms apply to this website and to the services {site.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;), run by{" "}
            {site.founderName} from {site.baseLocation}, provides to you (&ldquo;you&rdquo;, your company or institute).
            If a signed proposal or quote says something different from these terms, the proposal wins.
          </p>

          <h2>1. What I provide</h2>
          <ul>
            <li>
              <strong>An automation audit:</strong> time spent with your team looking at how work is done now, followed
              by a written report on what is worth automating, what is not, and an indicative price for each.
            </li>
            <li>
              <strong>Builds:</strong> automation of specific processes, each at a fixed price against a written scope.
            </li>
            <li>
              <strong>Care plans:</strong> optional monthly monitoring, fixes and changes for what has been built.
            </li>
          </ul>
          <p>The exact scope for your work is what your quote says, not what this website says.</p>

          <h2>2. Fees and payment</h2>
          <ul>
            <li>The audit fee is paid before the audit.</li>
            <li>Builds are 50% before work starts and 50% one week after the automation is running on your real data.</li>
            <li>Care plans are paid monthly in advance, by UPI or bank transfer against an invoice.</li>
            <li>
              If a payment is more than 15 days late I may pause work and support until it is paid. I will tell you
              before I do.
            </li>
            <li>Prices are those in your quote at the time you accept it, not those on this website at a later date.</li>
          </ul>

          <h2>3. Scope, changes and estimates</h2>
          <p>
            A quoted price is fixed for the scope described in it. Anything outside that scope is a change request: I
            quote it first and start only after you approve the quote in writing. Dates given in a quote assume you
            provide access and answers reasonably promptly; if they are delayed, the date moves and I will say so at the
            time.
          </p>

          <h2>4. Warranty and support</h2>
          <p>
            If something I built does not do what its scope says, I fix it at no charge for 30 days after handover. That
            covers defects in my work. It does not cover changes you make afterwards, changes in systems I do not
            control, or new requirements. After 30 days, a care plan or day-rate work covers it.
          </p>
          <p>
            Support is during my support windows ({site.supportWindows}). {site.replyPromise} This is not a 24-hour
            emergency service, and nothing here should be treated as one unless your quote says otherwise in writing.
          </p>

          <h2>5. Ownership and handover</h2>
          <p>
            Once a build is paid for in full, the code written specifically for you is yours. You may modify it, extend
            it, or have somebody else do so, and you do not need my permission for any of that.
          </p>
          <p>
            Two things are not transferred: third-party open-source components, which stay under their own licences; and
            my own pre-existing general-purpose tools and techniques, which I keep the right to reuse for other clients.
            Nothing specific to your business, your data or your process is ever reused elsewhere.
          </p>

          <h2>6. Your responsibilities</h2>
          <ul>
            <li>You own and control the accounts, systems and infrastructure the automation runs in.</li>
            <li>
              You have the right to give me access to the data and systems involved, and you collect and use any
              personal data in them lawfully.
            </li>
            <li>
              You tell me about anything that would change how the automation should behave — a process change, a system
              migration, a change in who does the work.
            </li>
            <li>
              You keep your own backups. I will build backup steps where they are in scope, but I am not your backup.
            </li>
          </ul>

          <h2>7. Access and security</h2>
          <p>
            I use the least access needed to do the work, and prefer accounts issued to me by you over shared
            credentials. You can revoke my access at any time. On completion of a build, or on request, I remove my
            access unless a care plan requires it.
          </p>

          <h2>8. Other companies&apos; services</h2>
          <p>
            Automations typically depend on services such as cloud providers, Google Workspace, messaging platforms and
            whatever software you already run. Those have their own terms, limits, prices and outages. I am not
            responsible for their failures or changes, but if a change breaks something I built, I will tell you what it
            would take to adapt.
          </p>

          <h2>9. No guaranteed savings</h2>
          <p>
            Figures on this website, in the calculator and in an audit report are estimates based on the information
            given to me. They are not promises. What an automation actually saves depends on how your team uses it and
            on things neither of us controls.
          </p>

          <h2>10. Liability</h2>
          <p>
            To the extent the law allows, my total liability for any claim is limited to the fees you paid me for the
            work the claim relates to, in the three months before the claim. I am not liable for indirect losses such as
            lost profits, lost data you had not asked me to back up, or business interruption. Nothing here limits
            liability that cannot be limited by law.
          </p>

          <h2>11. Ending the work</h2>
          <ul>
            <li>
              You can cancel a build before it starts for a full refund. Once work has begun, the first 50% covers work
              done to that point and is not refundable.
            </li>
            <li>Care plans can be stopped with {site.cancellationNotice} notice before the next billing date.</li>
            <li>
              After cancellation you keep everything paid for, and it keeps running. I no longer maintain it, and I
              remove my access.
            </li>
            <li>
              I may end the work with 30 days notice, or immediately for non-payment beyond 30 days, or if I am asked to
              build something on the list of things I do not build.
            </li>
          </ul>

          <h2>12. Confidentiality</h2>
          <p>
            I keep your business information, data and systems confidential and use them only to do the work. I will
            sign your NDA if you have one. I will not name you as a client, or describe what was built, without your
            written permission.
          </p>

          <h2>13. Governing law</h2>
          <p>These terms are governed by the laws of India. Courts in Thane, Maharashtra have jurisdiction.</p>

          <h2>14. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
          </p>
        </div>
      </Section>
    </>
  );
}
