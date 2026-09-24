import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "See it working on your own phone",
  body = "A 15-minute demo with sample enquiries. If it does not fit your institute, we will say so.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="bg-ink text-white">
      <div className="container-page flex flex-col gap-6 py-14 md:flex-row md:items-center md:justify-between">
        <div className="max-w-2xl">
          <h2 className="text-3xl font-bold text-white">{title}</h2>
          <p className="mt-2 text-lg text-white/85">{body}</p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href="/demo" className="btn bg-white text-ink hover:bg-register">
            Book a free demo
          </Link>
          <a href={whatsappLink(`Hi, I'd like a ${site.name} demo for my institute.`)} className="btn btn-whatsapp">
            WhatsApp us
          </a>
        </div>
      </div>
    </section>
  );
}
