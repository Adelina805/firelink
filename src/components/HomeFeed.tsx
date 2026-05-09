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
            className="text-sm font-semibold text-white"
          >
            Needs queue
          </h2>
          <Link
            href={`/dashboard/${zip}/needs`}
            className="shrink-0 text-xs font-semibold text-amber-300 underline-offset-2 hover:text-amber-200 hover:underline"
          >
            View all
          </Link>
        </div>
        <ul className="space-y-2">
          {urgentPreview.map((n) => (
            <li
              key={n.label}
              className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-black/35 px-4 py-3"
            >
              <span className="text-sm text-white/90">
                {n.label}
              </span>
              <span className="font-mono text-base font-semibold tabular-nums text-amber-100">
                {n.count}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section aria-labelledby="activity-feed-heading">
        <h2
          id="activity-feed-heading"
          className="mb-3 text-sm font-semibold text-white"
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
                className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                  selected
                    ? "border-amber-500/60 bg-amber-500/15 text-amber-100"
                    : "border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:text-white/90"
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <span className="w-full text-[10px] font-semibold uppercase tracking-wider text-white/40 sm:w-auto">
            Sort
          </span>
          <button
            type="button"
            onClick={() => setActivitySort("newest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              activitySort === "newest"
                ? "border-white/25 bg-white/10 text-white"
                : "border-white/10 bg-transparent text-white/55 hover:text-white/80"
            }`}
          >
            Newest
          </button>
          <button
            type="button"
            onClick={() => setActivitySort("oldest")}
            className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
              activitySort === "oldest"
                ? "border-white/25 bg-white/10 text-white"
                : "border-white/10 bg-transparent text-white/55 hover:text-white/80"
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
