import type { Metadata } from "next";
import { LeadForm } from "@/components/LeadForm";
import { PageIntro, Section } from "@/components/PageIntro";
import { pageMeta } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Contact",
  description: `WhatsApp, call or email ${site.name}. Based in Dombivli, serving coaching classes in Kalyan, Thane and nearby.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <PageIntro title="Contact">
        <p>{site.replyPromise} WhatsApp is the fastest way to reach us.</p>
      </PageIntro>

      <Section>
        <div className="grid gap-14 lg:grid-cols-[1fr_1.6fr]">
          <div>
            <dl className="divide-y divide-rule border-y border-rule">
              <div className="py-4">
                <dt className="text-base text-muted">WhatsApp</dt>
                <dd className="mt-1">
                  <a className="btn btn-whatsapp" href={whatsappLink(`Hi, I have a question about ${site.name}.`)}>
                    Message us on WhatsApp
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
                <dt className="text-base text-muted">Support hours for customers</dt>
                <dd className="mt-1 text-lg">{site.supportWindows}</dd>
              </div>
              <div className="py-4">
                <dt className="text-base text-muted">Based in</dt>
                <dd className="mt-1 text-lg">{site.baseLocation}, {site.region}. We visit institutes; we don&apos;t have a walk-in office.</dd>
              </div>
            </dl>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <div className="mt-6">
              <LeadForm source="contact" submitLabel="Send message" id="contact-form" />
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
