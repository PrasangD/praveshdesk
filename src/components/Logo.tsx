import { site } from "@/lib/site";

/** Mark: a job that runs on its own loop, and comes out right. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="6" fill="#1d2e6e" />
      {/* the loop: it comes back round by itself */}
      <path
        d="M9 16a7 7 0 0 1 12-4.9M23 16a7 7 0 0 1-12 4.9"
        fill="none"
        stroke="#f1f5fc"
        strokeWidth="2.1"
        strokeLinecap="round"
      />
      <path d="M21.4 7.6v3.9h-3.9" fill="none" stroke="#f1f5fc" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M10.6 24.4v-3.9h3.9" fill="none" stroke="#f1f5fc" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
      {/* and it comes out right */}
      <path d="M13 16.1l2.1 2.1 4.4-4.6" fill="none" stroke="#3ddc97" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Logo() {
  return (
    <span className="inline-flex items-center gap-2.5">
      <LogoMark />
      <span className="text-[1.4rem] font-extrabold tracking-tight text-ink-deep">{site.name}</span>
    </span>
  );
}
