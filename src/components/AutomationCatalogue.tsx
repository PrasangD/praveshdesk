import { automationGroups } from "@/lib/automations";

/** Jump links, so an owner can get to the part of their day they care about. */
export function AutomationJumpLinks() {
  return (
    <nav aria-label="Automation areas" className="flex flex-wrap gap-2">
      {automationGroups.map((g) => (
        <a
          key={g.id}
          href={`#${g.id}`}
          className="rounded-md border border-rule bg-white px-3 py-1.5 text-base font-medium text-ink no-underline hover:border-ink"
        >
          {g.name}
        </a>
      ))}
    </nav>
  );
}

export function AutomationCatalogue() {
  return (
    <div className="space-y-14">
      {automationGroups.map((group) => (
        <section key={group.id} id={group.id} className="scroll-mt-24">
          <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b-2 border-ink pb-2">
            <h3 className="text-2xl font-bold sm:text-[1.75rem]">{group.name}</h3>
            <p className="text-base text-muted">Work this takes off: {group.lead.toLowerCase()}</p>
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
  );
}

/** A short teaser for the home page: one line per area. */
export function AutomationPreview() {
  return (
    <ul className="grid gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
      {automationGroups.map((g) => (
        <li key={g.id} className="border-t border-rule py-4">
          <h3 className="text-lg font-bold text-ink-deep">{g.name}</h3>
          <p className="mt-1 text-base text-muted">
            {g.items.length} things your staff do by hand today
          </p>
        </li>
      ))}
    </ul>
  );
}
