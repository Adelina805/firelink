"use client";

import { ActivityLog } from "@/components/ActivityLog";
import { FilterMenu } from "@/components/FilterMenu";
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

const SORT_OPTIONS = [
  { id: "newest" as const, label: "Newest" },
  { id: "oldest" as const, label: "Oldest" },
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
        <div className="mb-4 flex flex-wrap items-center gap-2">
          <FilterMenu
            options={FEED_CHIPS}
            value={filter}
            onChange={setFilter}
            menuLabel="Filter activity"
            buttonLabel="Filter"
            align="left"
          />
          <FilterMenu
            options={SORT_OPTIONS}
            value={activitySort}
            onChange={setActivitySort}
            menuLabel="Sort activity"
            buttonLabel="Sort"
            align="left"
          />
        </div>
        <ActivityLog events={filteredEvents} sortOrder={activitySort} />
      </section>
    </div>
  );
}
