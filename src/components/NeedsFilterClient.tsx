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
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-amber-500/70 focus:outline-none focus:ring-2 focus:ring-amber-500/30 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-400"
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
              className={`rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
                selected
                  ? "border-amber-600 bg-amber-100 text-amber-900 dark:border-amber-400/70 dark:bg-amber-400/15 dark:text-amber-100"
                  : "border-zinc-300 bg-white text-zinc-700 hover:border-zinc-500 hover:text-zinc-900 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-100"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-zinc-300 bg-white p-6 text-center text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900/70 dark:text-zinc-300">
          No needs match this filter.
        </p>
      ) : (
        <NeedsTable needs={filtered} />
      )}
    </div>
  );
}
