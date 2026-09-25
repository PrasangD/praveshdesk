import Link from "next/link";
import { site, whatsappLink } from "@/lib/site";

export function CtaBand({
  title = "Tell me the job you are tired of",
  body = "One call, half an hour. You will get a straight answer about whether it is worth automating — including 'no' if that is the answer.",
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
          <Link href="/contact" className="btn bg-white text-ink hover:bg-register">
            Start with a call
          </Link>
          <a href={whatsappLink(`Hi, I have a job at my company I'd like to automate.`)} className="btn btn-whatsapp">
            WhatsApp me
          </a>
        </div>
      </div>
    </section>
  );
}
