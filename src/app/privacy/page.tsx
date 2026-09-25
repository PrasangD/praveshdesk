import type { Metadata } from "next";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site } from "@/lib/site";

// DRAFT written for a one-person Indian service business under the DPDP Act,
// 2023 and DPDP Rules, 2025. Have a lawyer review it before relying on it.

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
            This policy explains how {site.name} (&ldquo;I&rdquo;, &ldquo;me&rdquo;), run by {site.founderName} from{" "}
            {site.baseLocation}, {site.region}, handles personal data. It covers this website and requests sent through
            it, and it explains my role when I build or maintain an automation inside your systems.
          </p>

          <h2>What this website collects</h2>
          <p>When you fill in a form, I collect what you type in:</p>
          <ul>
            <li>Your name, role, company or institute name, and the area you are in</li>
            <li>Your mobile number, and your email address if you give it</li>
            <li>
              Answers about your organisation, such as how many people it has, what you would like automated, and how
              long the job takes today
            </li>
            <li>Your message, the best time to call, and calculator figures if you used the calculator</li>
            <li>
              The page you sent the form from, the website or campaign that brought you here, and the time you gave
              consent
            </li>
          </ul>
          <p>
            The hosting provider keeps standard server logs, such as IP address and browser type, for security. There
            are no advertising cookies and no third-party tracking on this website. Your browser keeps a note of the
            campaign that brought you here in session storage, which is cleared when you close the tab. The calculator
            runs entirely in your browser: nothing you type into it is sent anywhere unless you submit the form.
          </p>

          <h2>Why I use it</h2>
          <ul>
            <li>To reply to your request, discuss the job and send a quote if you ask for one</li>
            <li>To understand which pages and areas bring requests, so the website can be improved</li>
            <li>To protect the website from spam and abuse</li>
            <li>To meet legal, tax and accounting obligations if you become a client</li>
          </ul>
          <p>
            I rely on the consent you give when you tick the box on the form. You can withdraw it at any time by writing
            to <a href={`mailto:${site.email}`}>{site.email}</a>. After that I will stop contacting you and delete your
            request, unless something must be kept by law.
          </p>

          <h2>Where it is stored and who can see it</h2>
          <p>
            Requests are stored in my Google Workspace account (Google Sheets and Gmail) and may be processed on servers
            outside India under Google&apos;s terms. The website is hosted on Cloudflare Pages, and the form uses
            Cloudflare Turnstile to block spam by checking your browser for signs of automated activity. Cloudflare may
            process technical data such as IP addresses on servers outside India. Only {site.founderName} has access. I
            do not sell or rent personal data, and I share it only with these service providers or when the law requires
            it.
          </p>

          <h2>How long I keep it</h2>
          <p>
            Request details are kept for up to 24 months after our last conversation, then deleted. If you become a
            client, contract and billing records are kept for as long as tax law requires.
          </p>

          <h2>Your rights</h2>
          <p>
            You can ask to see the personal data I hold about you, correct it, delete it, or stop me using it. You can
            also nominate someone to exercise these rights for you. Write to{" "}
            <a href={`mailto:${site.email}`}>{site.email}</a> and I will reply within 30 days. If you are not satisfied
            with the response, you may complain to the Data Protection Board of India.
          </p>

          <h2>Children</h2>
          <p>
            This website is meant for people running or working in businesses and institutes. I do not knowingly collect
            personal data from anyone under 18 through this website. If you believe a child has sent their details,
            contact me and I will delete them.
          </p>

          <h2>Security</h2>
          <p>
            The website uses HTTPS, my accounts use two-step verification, and access is limited to what is needed. If a
            breach affects your personal data, I will inform you and the authorities as the law requires.
          </p>

          <h2>When I work inside your systems</h2>
          <p>
            An automation runs on your accounts and infrastructure, and any personal data it touches — your employees,
            customers, students or parents — stays there. You decide why and how that data is used and remain
            responsible for it, including having a lawful basis and, where required, a parent&apos;s consent for anyone
            under 18. I act only on your instructions, to build and maintain what you asked for.
          </p>
          <p>
            In practice that means: I take the least access needed; I work on sample or anonymised data where that is
            enough; I do not copy your data into my own systems except when a specific support task requires it, and I
            delete any such copy once the task is done; I do not use your data to train anything or to help another
            client; and you can remove my access at any time. I will sign your NDA if you have one, and I sign one as a
            matter of course before any audit that touches real data.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            If this policy changes, the date at the top of this page is updated. For significant changes affecting
            existing clients, I will tell them directly.
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
