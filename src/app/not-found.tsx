import Link from "next/link";

export default function NotFound() {
  return (
    <section className="container-page py-24">
      <p className="font-hand text-2xl text-margin">page not in the register</p>
      <h1 className="mt-3 text-4xl font-extrabold tracking-tight">This page doesn&apos;t exist.</h1>
      <p className="mt-4 max-w-xl text-xl">The link may be old or mistyped. Start from the home page or book a demo.</p>
      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Link href="/" className="btn btn-primary">Go to the home page</Link>
        <Link href="/demo" className="btn btn-secondary">Book a demo</Link>
      </div>
    </section>
  );
}
