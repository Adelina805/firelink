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
          className="w-full rounded-xl border border-white/15 bg-black/40 px-4 py-3 text-sm text-white placeholder:text-white/35 focus:border-amber-500/50 focus:outline-none focus:ring-2 focus:ring-amber-500/25"
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
                  ? "border-amber-500/60 bg-amber-500/15 text-amber-100"
                  : "border-white/15 bg-white/5 text-white/70 hover:border-white/25 hover:text-white/90"
              }`}
            >
              {c.label}
            </button>
          );
        })}
      </div>
      {filtered.length === 0 ? (
        <p className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-sm text-white/60">
          No needs match this filter.
        </p>
      ) : (
        <NeedsTable needs={filtered} />
      )}
    </div>
  );
}
