import type { Metadata } from "next";
import { RequestForm } from "@/components/RequestForm";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `WhatsApp, call or email ${site.name}. Based in Dombivli, working with companies and institutes across Thane district and Navi Mumbai.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact">
        <p>{site.replyPromise} WhatsApp is the fastest way to reach me.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <dl className="divide-y divide-rule border-y border-rule">
              <div className="py-4">
                <dt className="text-base text-muted">WhatsApp</dt>
                <dd className="mt-1">
                  <a className="btn btn-whatsapp" href={whatsappLink(`Hi, I have a job I'd like to automate.`)}>
                    Message me on WhatsApp
                  </a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-base text-muted">Phone</dt>
                <dd className="mt-1 text-xl font-bold">
                  <a className="text-ink" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-base text-muted">Email</dt>
                <dd className="mt-1 text-xl font-bold">
                  <a className="text-ink" href={`mailto:${site.email}`}>{site.email}</a>
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-base text-muted">When I can talk</dt>
                <dd className="mt-1 text-lg">
                  {site.supportWindows}. I have a full-time job, so first calls are usually evenings or a weekend — say
                  what suits you and I will work around it.
                </dd>
              </div>
              <div className="py-4">
                <dt className="text-base text-muted">Based in</dt>
                <dd className="mt-1 text-lg">
                  {site.baseLocation}, {site.region}. I visit clients; there is no office to walk into.
                </dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Tell me the job</h2>
            <p className="mt-3 text-lg">
              One or two lines about what happens today is enough. You will get an honest answer about whether it is
              worth automating — including &ldquo;no, do this instead&rdquo; when that is the answer.
            </p>
            <div className="mt-6">
              <RequestForm
                source="contact"
                submitLabel="Send message"
                id="contact-form"
                messageLabel="What job would you like to stop doing by hand?"
                messageHint="What happens today, who does it, and how often."
              />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
