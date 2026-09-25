"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "@/lib/site";
import { Logo } from "./Logo";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className="sticky top-0 z-40 border-b border-rule/70 bg-paper/95 backdrop-blur supports-[backdrop-filter]:bg-paper/85">
      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Link href="/" className="rounded no-underline" aria-label="Kaamless home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-7 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`text-[1.0625rem] font-medium no-underline hover:text-ink ${
                pathname.startsWith(item.href) ? "text-ink underline decoration-2" : "text-graphite"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/demo" className="btn btn-primary min-h-11 py-2">
            Book a demo
          </Link>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <Link href="/demo" className="btn btn-primary min-h-10 px-3.5 py-1.5 text-base">
            Book a demo
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-rule bg-white text-ink"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="border-t border-rule bg-paper lg:hidden">
          <ul className="container-page py-2">
            {nav.map((item) => (
              <li key={item.href} className="border-b border-rule/60 last:border-0">
                <Link href={item.href} className="block py-3 text-lg font-medium text-ink-deep no-underline">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="block py-3 text-lg font-medium text-ink-deep no-underline">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
