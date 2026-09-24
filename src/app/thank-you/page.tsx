import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ThanksHeading } from "@/components/ThanksHeading";
import { pageMeta } from "@/lib/metadata";
import { site, whatsappLink } from "@/lib/site";

export const metadata: Metadata = pageMeta({
  title: "Request received",
  description: "Thanks for your request.",
  path: "/thank-you",
  noindex: true,
});

export default function ThankYouPage() {
  return (
    <section className="container-page py-20 sm:py-28">
      <span className="stamp text-base">Received</span>
      <Suspense fallback={<h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Thanks. We&apos;ve got your request.</h1>}>
        <ThanksHeading />
      </Suspense>
      <div className="mt-6 max-w-2xl space-y-4 text-xl">
        <p>
          We&apos;ll call or WhatsApp you from {site.phone} to fix a time. {site.replyPromise}
        </p>
        <p>If you&apos;d rather talk now, send us a WhatsApp message and we&apos;ll pick it up from there.</p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a className="btn btn-whatsapp" href={whatsappLink(`Hi, I just requested a ${site.name} demo on the website.`)}>
          Message us on WhatsApp
        </a>
        <Link href="/how-it-works" className="btn btn-secondary">
          Read how setup works
        </Link>
      </div>
    </section>
  );
}
