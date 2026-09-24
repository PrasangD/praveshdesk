import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

// DRAFT plain-language terms for a small Indian service business.
// Have a lawyer review them (especially liability and jurisdiction) before relying on them.

export const metadata: Metadata = pageMeta({
  title: "Terms of service",
  description: `The terms for using ${site.name}'s website and services.`,
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
            These terms apply to this website and to the services {site.name} (&ldquo;we&rdquo;), run by{" "}
            {site.founderName} from {site.baseLocation}, provides to institutes (&ldquo;you&rdquo;). If a signed proposal
            says something different from these terms, the proposal wins.
          </p>

          <h2>1. What we provide</h2>
          <p>
            We set up an enquiry and follow-up system for your institute in your own Google account, train your staff, and
            maintain it for a monthly fee. The exact scope for your institute is written in your proposal.
          </p>

          <h2>2. Fees and payment</h2>
          <ul>
            <li>The setup fee is paid before the setup visit.</li>
            <li>The monthly fee is paid in advance at the start of each month, by UPI or bank transfer against an invoice.</li>
            <li>If a monthly payment is more than 15 days late, we may pause support and maintenance until it is paid.</li>
            <li>Prices are as shown on our pricing page or in your proposal at the time you sign up.</li>
          </ul>

          <h2>3. Changes and extra work</h2>
          <p>
            Small changes within your plan are included. Anything outside the agreed scope is a change request: we quote it
            first, and do the work only after you approve the quote.
          </p>

          <h2>4. Support</h2>
          <p>
            Support is on WhatsApp during our support windows ({site.supportWindows}). {site.replyPromise} This is not a
            24-hour emergency service.
          </p>

          <h2>5. Your responsibilities</h2>
          <ul>
            <li>You own and control the Google account the system runs in.</li>
            <li>
              You collect and use personal data of students and parents lawfully, including a parent&apos;s consent where
              the law requires it for students under 18.
            </li>
            <li>Your staff use the system as trained, and you tell us promptly if something stops working.</li>
          </ul>

          <h2>6. Your data</h2>
          <p>
            Your enquiry and student data belongs to you. We access it only to set up, maintain and support the system, and
            you can remove our access at any time. Our{" "}
            <a href="/privacy">privacy policy</a> explains how we handle personal data.
          </p>

          <h2>7. Other companies&apos; services</h2>
          <p>
            The system uses services such as Google Workspace and WhatsApp, which have their own terms, limits and prices.
            We are not responsible for their outages or changes, but we will help you adapt if they change something that
            affects you.
          </p>

          <h2>8. No guarantee of admissions</h2>
          <p>
            We make sure enquiries are recorded and follow-ups are due on time. We do not guarantee any number of enquiries
            or admissions.
          </p>

          <h2>9. Liability</h2>
          <p>
            To the extent the law allows, our total liability for any claim is limited to the fees you paid us in the three
            months before the claim. We are not liable for indirect losses such as lost profits.
          </p>

          <h2>10. Cancellation</h2>
          <ul>
            <li>You can cancel with {site.cancellationNotice} notice before your next billing date.</li>
            <li>The setup fee is not refundable once the setup visit has happened. Monthly fees are not refunded for part months.</li>
            <li>
              After cancellation you keep your Google Sheet and all your data. Automations we built keep running as they are,
              but we no longer maintain them, and we remove our access.
            </li>
            <li>We may end the service with 30 days notice, or immediately for non-payment beyond 30 days or misuse.</li>
          </ul>

          <h2>11. Confidentiality</h2>
          <p>
            We keep your institute&apos;s business information and data confidential, and use it only to provide the
            service.
          </p>

          <h2>12. Governing law</h2>
          <p>These terms are governed by the laws of India. Courts in Thane, Maharashtra have jurisdiction.</p>

          <h2>13. Contact</h2>
          <p>
            Questions about these terms: <a href={`mailto:${site.email}`}>{site.email}</a> or {site.phone}.
          </p>
        </div>
      </Section>
    </>
  );
}
