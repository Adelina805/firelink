"use client";

import type { ActivityItem } from "@/lib/types";

interface ActivityLogProps {
  events: ActivityItem[];
  /** Default newest first */
  sortOrder?: "newest" | "oldest";
}

function formatTime(iso: string) {
  try {
    return new Intl.DateTimeFormat(undefined, {
      hour: "numeric",
      minute: "2-digit",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

export function ActivityLog({
  events,
  sortOrder = "newest",
}: ActivityLogProps) {
  const sorted = [...events].sort((a, b) => {
    const ta = new Date(a.timestamp).getTime();
    const tb = new Date(b.timestamp).getTime();
    return sortOrder === "newest" ? tb - ta : ta - tb;
  });

  return (
    <ul className="space-y-3" aria-live="polite">
      {sorted.map((ev) => (
        <li
          key={ev.id}
          className="flex flex-col gap-1.5 rounded-xl border border-zinc-300 bg-white px-4 py-3 sm:flex-row sm:items-start sm:justify-between dark:border-zinc-700 dark:bg-zinc-900/70"
        >
          <span className="max-w-3xl leading-snug text-zinc-900 dark:text-zinc-100">
            {ev.message}
          </span>
          <time
            className="shrink-0 text-xs text-zinc-600 sm:text-right dark:text-zinc-400"
            dateTime={ev.timestamp}
          >
            {formatTime(ev.timestamp)}
          </time>
        </li>
      ))}
    </ul>
  );
}
