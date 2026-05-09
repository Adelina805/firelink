"use client";

import { FilterMenu } from "@/components/FilterMenu";
import { HouseholdCard } from "@/components/HouseholdCard";
import {
  type CommunityFilterId,
  type CommunitySortId,
  filterHouseholds,
  sortHouseholds,
} from "@/lib/communityHouseholds";
import type { AnonymousHousehold } from "@/lib/types";
import { useMemo, useState } from "react";

const FILTER_OPTIONS: { id: CommunityFilterId; label: string }[] = [
  { id: "all", label: "All" },
  { id: "urgent", label: "Urgent" },
  { id: "needs-ride", label: "Needs ride" },
  { id: "medical", label: "Medical" },
  { id: "shelter", label: "Shelter info" },
  { id: "safe", label: "Safe" },
  { id: "can-help", label: "Can help" },
];

const SORT_OPTIONS: { id: CommunitySortId; label: string }[] = [
  { id: "urgency", label: "Urgency" },
  { id: "prep-asc", label: "Preparedness · low to high" },
  { id: "prep-desc", label: "Preparedness · high to low" },
];

interface HouseholdsListClientProps {
  households: AnonymousHousehold[];
}

export function HouseholdsListClient({ households }: HouseholdsListClientProps) {
  const [filter, setFilter] = useState<CommunityFilterId>("all");
  const [sort, setSort] = useState<CommunitySortId>("urgency");

  const visible = useMemo(() => {
    const filtered = filterHouseholds(households, filter);
    return sortHouseholds(filtered, sort);
  }, [households, filter, sort]);

  return (
    <div>
      <h2 className="mb-3 text-base font-semibold tracking-tight text-[var(--foreground)]">
        Households in this ZIP
      </h2>

      <div className="mb-6 w-full min-w-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <div
            className="min-w-0 flex-1 -mx-0.5 flex gap-2 overflow-x-auto px-0.5 py-0.5 [scrollbar-width:thin]"
            role="toolbar"
            aria-label="Filter households"
          >
            {FILTER_OPTIONS.map((opt) => {
              const selected = filter === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setFilter(opt.id)}
                  aria-pressed={selected}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)]/50 ${
                    selected
                      ? "border-[var(--foreground)]/25 bg-[var(--foreground)]/10 text-[var(--foreground)]"
                      : "border-[var(--card-border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-slate-400 hover:text-[var(--foreground)] dark:hover:border-slate-500"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
          <div className="shrink-0">
            <FilterMenu
              options={SORT_OPTIONS}
              value={sort}
              onChange={setSort}
              menuLabel="Sort households"
              buttonLabel="Sort"
              align="right"
            />
          </div>
        </div>
      </div>

      {visible.length === 0 ? (
        <p
          className="rounded-xl border border-dashed border-[var(--card-border)] bg-[var(--card)] px-4 py-10 text-center text-sm text-[var(--muted-foreground)]"
          role="status"
        >
          No households match this filter.
        </p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {visible.map((h) => (
            <HouseholdCard key={h.anonymous_id} household={h} />
          ))}
        </div>
      )}
    </div>
  );
}
