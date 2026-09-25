"use client";

import { useState } from "react";
import { automationGroups } from "@/lib/automations";

type Filter = "all" | "company" | "institute";

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "Everything" },
  { value: "company", label: "Companies" },
  { value: "institute", label: "Institutes" },
];

export function AutomationCatalogue() {
  const [filter, setFilter] = useState<Filter>("all");
  const groups = automationGroups.filter(
    (g) => filter === "all" || g.audience === filter || g.audience === "both",
  );
  const count = groups.reduce((n, g) => n + g.items.length, 0);

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-base font-bold text-ink-deep">Show:</span>
        <div className="flex flex-wrap gap-2" role="group" aria-label="Filter automations by audience">
          {FILTERS.map((f) => (
            <button
              key={f.value}
              type="button"
              aria-pressed={filter === f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-md border px-3.5 py-1.5 text-base font-medium transition-colors ${
                filter === f.value
                  ? "border-ink bg-ink text-white"
                  : "border-rule bg-white text-ink hover:border-ink"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
        <p aria-live="polite" className="text-base text-muted">
          {count} jobs in {groups.length} areas
        </p>
      </div>

      <div className="mt-12 space-y-14">
        {groups.map((group) => (
          <section key={group.id} id={group.id} className="scroll-mt-24">
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-2">
              <h3 className="text-2xl font-bold sm:text-[1.75rem]">{group.name}</h3>
              <p className="text-base text-muted">Takes the work off: {group.lead.toLowerCase()}</p>
            </div>

            <ul className="grid gap-x-12 md:grid-cols-2">
              {group.items.map((item) => (
                <li key={item.title} className="border-b border-rule py-5">
                  <h4 className="flex gap-3 text-lg font-bold text-ink-deep">
                    <svg viewBox="0 0 16 16" className="mt-1.5 h-4 w-4 shrink-0 text-margin" aria-hidden="true">
                      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                    <span>{item.title}</span>
                  </h4>
                  <p className="mt-2 pl-7 text-lg">{item.body}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

/** A short teaser for the home page: one line per area. */
export function AutomationPreview() {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
      {automationGroups.map((g) => (
        <li key={g.id} className="border-t border-rule py-4">
          <h3 className="text-lg font-bold text-ink-deep">{g.name}</h3>
          <p className="mt-1 text-base text-muted">{g.items.length} jobs done by hand today</p>
        </li>
      ))}
    </ul>
  );
}
