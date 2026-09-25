import Link from "next/link";
import { cities } from "@/lib/cities";

export function AreasList() {
  return (
    <ul className="grid gap-x-10 sm:grid-cols-2 lg:grid-cols-3">
      {cities.map((c) => (
        <li key={c.slug} className="border-t border-rule">
          <Link
            href={`/automation-services/${c.slug}`}
            className="group flex items-baseline justify-between gap-4 py-4 no-underline"
          >
            <span className="text-xl font-bold text-ink-deep group-hover:underline">{c.name}</span>
            <span className="text-right text-base text-muted">{c.travel}</span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
