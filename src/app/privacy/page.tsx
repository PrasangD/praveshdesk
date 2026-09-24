import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

// DRAFT written for a small Indian service business under the DPDP Act, 2023
// and DPDP Rules, 2025. Have a lawyer review it before relying on it.

export const metadata: Metadata = pageMeta({
  title: "Privacy policy",
  description: `How ${site.name} collects, uses and protects personal data.`,
  path: "/privacy",
});

export default function PrivacyPage() {
  return (
    <>
      <PageIntro title="Privacy policy">
        <p>Last updated {site.legalUpdated}.</p>
      </PageIntro>
      <Section>
        <div className="prose-legal text-lg">
          <p>
            This policy explains how {site.name} (&ldquo;we&rdquo;), a service run by {site.founderName} from{" "}
            {site.baseLocation}, {site.region}, handles personal data. It covers this website and enquiries sent to us,
            and it explains our role when we set up {site.name} for an institute.
          </p>

          <h2>What we collect on this website</h2>
          <p>When you fill in a form, we collect what you type in:</p>
          <ul>
            <li>Your name, role, institute name and area</li>
            <li>Your mobile number, and your email address if you give it</li>
            <li>Answers about your institute, such as its size, number of enquiries and how you record them</li>
            <li>Your message, the best time to call, and calculator numbers if you used the calculator</li>
            <li>The page you sent the form from, the website or campaign that brought you here, and the time you gave consent</li>
          </ul>
          <p>
            Our hosting provider keeps standard server logs, such as IP address and browser type, for security. We do not
            use advertising cookies or third-party tracking on this website. Your browser keeps a note of the campaign that
            brought you here in session storage, which is cleared when you close the tab.
          </p>

          <h2>Why we use it</h2>
          <ul>
            <li>To reply to your request, arrange a demo and send you a proposal if you ask for one</li>
            <li>To understand which pages and areas bring enquiries, so we can improve the website</li>
            <li>To protect the website from spam and abuse</li>
            <li>To meet legal, tax and accounting obligations if you become a customer</li>
          </ul>
          <p>
            We rely on the consent you give when you tick the box on our form. You can withdraw it at any time by writing
            to <a href={`mailto:${site.email}`}>{site.email}</a>. After that we will stop contacting you and delete your
            enquiry, unless we must keep something by law.
          </p>

          <h2>Where it is stored and who can see it</h2>
          <p>
            Enquiries are stored in our Google Workspace account (Google Sheets and Gmail) and may be processed on servers
            outside India under Google&apos;s terms. The website is hosted on Cloudflare Pages, and the
            form uses Cloudflare Turnstile to block spam by checking your browser for signs of automated activity. Cloudflare
            may process technical data such as IP addresses on servers outside India. Only {site.founderName}{" "}
            has access. We do not sell or rent personal data, and we share it only with these service providers or when the
            law requires it.
          </p>

          <h2>How long we keep it</h2>
          <p>
            We keep enquiry details for up to 24 months after our last conversation, then delete them. If you become a
            customer, we keep contract and billing records for as long as tax law requires.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask us to show you the personal data we hold about you, correct it, delete it, or stop using it. You can
            also nominate someone to exercise these rights for you. Write to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and we will reply within 30 days. If you are not satisfied
            with our response, you may complain to the Data Protection Board of India.
          </p>

          <h2>Children</h2>
          <p>
            This website is meant for institute owners and staff. We do not knowingly collect personal data from anyone
            under 18 through this website. If you believe a child has sent us their details, contact us and we will delete
            them.
          </p>

          <h2>Security</h2>
          <p>
            The website uses HTTPS, our accounts use two-step verification, and access is limited to the people who need it.
            If a breach affects your personal data, we will inform you and the authorities as the law requires.
          </p>

          <h2>When we set up {site.name} for your institute</h2>
          <p>
            Enquiry and student data for your institute is stored in your institute&apos;s own Google account. Your
            institute decides why and how that data is used and is responsible for it, including having a lawful basis and,
            where required, a parent&apos;s consent for students under 18. We act only on your institute&apos;s written
            instructions, to set up and maintain the system. We do not copy your data into our own systems except when
            needed for a specific support task, and we delete any such copy once the task is done. You can remove our
            access at any time.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If we change this policy, we will update the date at the top of this page. For significant changes that affect
            existing customers, we will tell them directly.
          </p>

          <h2>Contact</h2>
          <p>
            {site.name}, {site.baseLocation}, {site.region}. Email{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> or call {site.phone}.
          </p>
        </div>
      </Section>
    </>
  );
}
