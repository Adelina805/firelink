"use client";

import { ActivityLog } from "@/components/ActivityLog";
import type { ActivityItem } from "@/lib/types";
import { type FeedFilterId, filterActivityByFeed } from "@/lib/dashboardFilters";
import { useMemo, useState } from "react";

const FEED_CHIPS: { id: FeedFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "urgent", label: "Urgent" },
  { id: "new", label: "New" },
  { id: "volunteers", label: "Volunteers" },
  { id: "safe", label: "Safe" },
];

interface HomeFeedProps {
  events: ActivityItem[];
}

export function HomeFeed({ events }: HomeFeedProps) {
  const [filter, setFilter] = useState<FeedFilterId>("all");
  const [activitySort, setActivitySort] = useState<"newest" | "oldest">("newest");

  const filteredEvents = useMemo(
    () => filterActivityByFeed(events, filter),
    [events, filter],
  );

  return (
    <div className="space-y-8">
      <section aria-labelledby="activity-feed-heading">
        <h2
          id="activity-feed-heading"
          className="mb-1 text-sm font-bold uppercase tracking-wide text-[var(--foreground)]"
        >
          Activity feed
        </h2>
        <p className="mb-3 text-xs text-[var(--muted-foreground)]">
          Recent SMS and status events — color tags mirror response priority.
        </p>
        <div
          className="mb-4 flex flex-wrap gap-2"
          role="tablist"
          aria-label="Filter activity"
        >
          {FEED_CHIPS.map((chip) => {
            const selected = filter === chip.id;
            return (
              <button
                key={chip.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setFilter(chip.id)}
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)]/50 ${
                  selected
                    ? "border-[var(--brand-amber)]/70 bg-[var(--brand-amber)]/15 text-[var(--foreground)] dark:bg-[var(--brand-amber)]/20"
                    : "border-[var(--card-border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-slate-400 hover:text-[var(--foreground)] dark:hover:border-slate-500"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="w-full text-[10px] font-semibold uppercase tracking-wider text-[var(--muted-foreground)] sm:w-auto">
            Sort
          </span>
          <button
            type="button"
            onClick={() => setActivitySort("newest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)]/50 ${
              activitySort === "newest"
                ? "border-slate-500 bg-slate-200/80 text-[var(--foreground)] dark:border-slate-500 dark:bg-slate-800 dark:text-[var(--foreground)]"
                : "border-[var(--card-border)] bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => setActivitySort("oldest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)]/50 ${
              activitySort === "oldest"
                ? "border-slate-500 bg-slate-200/80 text-[var(--foreground)] dark:border-slate-500 dark:bg-slate-800 dark:text-[var(--foreground)]"
                : "border-[var(--card-border)] bg-transparent text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
            }`}
          >
            Oldest
          </button>
        </div>
        <ActivityLog events={filteredEvents} sortOrder={activitySort} />
      </section>
    </div>
  );
}
