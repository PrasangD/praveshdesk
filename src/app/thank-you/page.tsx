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
      <Suspense fallback={<h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl">Thanks. I&apos;ve got your request.</h1>}>
        <ThanksHeading />
      </Suspense>
      <div className="mt-6 max-w-2xl space-y-4 text-xl">
        <p>
          I&apos;ll call or WhatsApp you from {site.phone} to fix a time. {site.replyPromise}
        </p>
        <p>
          If you&apos;d rather talk now, send a WhatsApp message and we can pick it up from there. If the job turns out
          not to be worth automating, you&apos;ll hear that too.
        </p>
      </div>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <a className="btn btn-whatsapp" href={whatsappLink(`Hi, I just sent a request on the ${site.name} website.`)}>
          Message on WhatsApp
        </a>
        <Link href="/how-it-works" className="btn btn-secondary">
          Read how a build works
        </Link>
      </div>
    </section>
  );
}
