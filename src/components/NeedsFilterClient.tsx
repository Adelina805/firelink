"use client";

import { NeedsTable } from "@/components/NeedsTable";
import { filterNeedsByCategory } from "@/lib/dashboardFilters";
import type { NeedItem } from "@/lib/types";
import { useMemo, useState } from "react";

type Category = Parameters<typeof filterNeedsByCategory>[1];

const CATEGORIES: { id: Category; label: string }[] = [
  { id: "all", label: "All" },
  { id: "transport", label: "Transport" },
  { id: "medical", label: "Medical" },
  { id: "shelter", label: "Shelter" },
  { id: "pets", label: "Pets" },
  { id: "status", label: "Status" },
];

interface NeedsFilterClientProps {
  needs: NeedItem[];
}

export function NeedsFilterClient({ needs }: NeedsFilterClientProps) {
  const [category, setCategory] = useState<Category>("all");
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const byCat = filterNeedsByCategory(needs, category);
    const q = query.trim().toLowerCase();
    if (!q) return byCat;
    return byCat.filter((n) => n.label.toLowerCase().includes(q));
  }, [needs, category, query]);

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="needs-search" className="sr-only">
          Search needs
        </label>
        <input
          id="needs-search"
          type="search"
          placeholder="Search needs…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--muted-foreground)] focus:border-[var(--brand-amber)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--brand-amber)]/25"
        />
      </div>
      <div
        className="mb-5 flex flex-wrap gap-2"
        role="tablist"
        aria-label="Filter needs by category"
      >
        {CATEGORIES.map((c) => {
          const selected = category === c.id;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={selected}
              onClick={() => setCategory(c.id)}
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--brand-amber)]/50 ${
                selected
                  ? "border-[var(--brand-amber)]/70 bg-[var(--brand-amber)]/12 text-[var(--foreground)] dark:bg-[var(--brand-amber)]/18"
                  : "border-[var(--card-border)] bg-[var(--card)] text-[var(--muted-foreground)] hover:border-slate-400 hover:text-[var(--foreground)] dark:hover:border-slate-500"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-6 text-center text-sm text-[var(--muted-foreground)]">
          No needs match this filter.
        </p>
      ) : (
        <NeedsTable needs={filtered} />
      )}
    </div>
  );
}
