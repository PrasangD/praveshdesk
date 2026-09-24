import { site } from "@/lib/site";

/** Mark: a register page with the red margin line and a ticked entry. */
export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="4" y="3" width="24" height="26" rx="2.5" fill="#1d2e6e" />
      <rect x="7" y="6" width="18" height="20" rx="1" fill="#f1f5fc" />
      <path d="M11.5 6v20" stroke="#c7303b" strokeWidth="1.3" />
      <path d="M13.5 11h9M13.5 15h9M13.5 19h9M13.5 23h6" stroke="#cbd7ef" strokeWidth="1.2" />
      <path d="M14 15.2l2.3 2.3 5-5.3" fill="none" stroke="#1c7a4d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
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
