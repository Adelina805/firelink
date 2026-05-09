"use client";

import { ActivityLog } from "@/components/ActivityLog";
import type { ActivityItem, NeedItem } from "@/lib/types";
import {
  type FeedFilterId,
  filterActivityByFeed,
  urgentNeedsPreview,
} from "@/lib/dashboardFilters";
import Link from "next/link";
import { useMemo, useState } from "react";

const FEED_CHIPS: { id: FeedFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "urgent", label: "Urgent" },
  { id: "new", label: "New" },
  { id: "volunteers", label: "Volunteers" },
  { id: "safe", label: "Safe" },
];

interface HomeFeedProps {
  zip: string;
  events: ActivityItem[];
  needs: NeedItem[];
}

export function HomeFeed({ zip, events, needs }: HomeFeedProps) {
  const [filter, setFilter] = useState<FeedFilterId>("all");
  const [activitySort, setActivitySort] = useState<"newest" | "oldest">(
    "newest",
  );

  const filteredEvents = useMemo(
    () => filterActivityByFeed(events, filter),
    [events, filter],
  );

  const urgentPreview = useMemo(() => urgentNeedsPreview(needs, 4), [needs]);

  return (
    <div className="space-y-8">
      <section aria-labelledby="urgent-needs-heading">
        <div className="mb-3 flex items-center justify-between gap-2">
          <h2
            id="urgent-needs-heading"
            className="text-sm font-semibold text-zinc-900 dark:text-white"
          >
            Needs queue
          </h2>
          <Link
            href={`/dashboard/${zip}/needs`}
            className="shrink-0 text-xs font-semibold text-amber-700 underline-offset-2 hover:text-amber-600 hover:underline dark:text-amber-300 dark:hover:text-amber-200"
          >
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {urgentPreview.map((n) => (
            <li
              key={n.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-zinc-300 bg-white px-4 py-3 dark:border-zinc-700 dark:bg-zinc-900/70"
            >
              <span className="text-sm text-zinc-800 dark:text-white/90">
                {n.label}
              </span>
              <span className="font-mono text-base font-semibold tabular-nums text-amber-700 dark:text-amber-100">
                {n.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="activity-feed-heading">
        <h2
          id="activity-feed-heading"
          className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white"
        >
          Activity feed
        </h2>
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
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 ${
                  selected
                    ? "border-amber-600 bg-amber-100 text-amber-900 dark:border-amber-400/70 dark:bg-amber-400/15 dark:text-amber-100"
                    : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="w-full text-[10px] font-semibold uppercase tracking-wider text-zinc-600 sm:w-auto dark:text-zinc-300">
            Sort
          </span>
          <button
            type="button"
            onClick={() => setActivitySort("newest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 ${
              activitySort === "newest"
                ? "border-zinc-500 bg-zinc-100 text-zinc-900 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
                : "border-zinc-300 bg-transparent text-zinc-700 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => setActivitySort("oldest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-500/60 ${
              activitySort === "oldest"
                ? "border-zinc-500 bg-zinc-100 text-zinc-900 dark:border-zinc-500 dark:bg-zinc-800 dark:text-zinc-100"
                : "border-zinc-300 bg-transparent text-zinc-700 hover:text-zinc-900 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-zinc-100"
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
