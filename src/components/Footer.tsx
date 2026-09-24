import Link from "next/link";
import { cities } from "@/lib/cities";
import { site, whatsappLink } from "@/lib/site";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-auto border-t border-rule bg-register">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-4 text-base">
            A done-for-you enquiry and follow-up system for coaching classes. Based in {site.baseLocation}, {site.region}.
          </p>
          <p className="mt-3 text-base">{site.replyPromise}</p>
        </div>

        <div>
          <h2 className="text-base font-bold">Contact</h2>
          <ul className="mt-3 space-y-2 text-base">
            <li>
              <a className="text-ink underline" href={whatsappLink(`Hi, I'd like to know more about ${site.name}.`)}>
                WhatsApp us
              </a>
            </li>
            <li>
              <a className="text-ink underline" href={`tel:${site.phone.replace(/\s/g, "")}`}>{site.phone}</a>
            </li>
            <li>
              <a className="text-ink underline" href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold">Areas</h2>
          <ul className="mt-3 space-y-2 text-base">
            {cities.map((c) => (
              <li key={c.slug}>
                <Link className="text-graphite underline decoration-rule hover:text-ink" href={`/coaching-classes/${c.slug}`}>
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold">Company</h2>
          <ul className="mt-3 space-y-2 text-base">
            {[
              ["/about", "About"],
              ["/solutions", "Who it's for"],
              ["/contact", "Contact"],
              ["/privacy", "Privacy policy"],
              ["/terms", "Terms of service"],
            ].map(([href, label]) => (
              <li key={href}>
                <Link className="text-graphite underline decoration-rule hover:text-ink" href={href}>
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-rule">
        <p className="container-page py-5 text-sm text-muted">
          © {year} {site.name}. Made in {site.baseLocation}.
        </p>
      </div>
    </footer>
  );
}
