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
          className="flex flex-col gap-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <span className="text-white/90">{ev.message}</span>
          <time
            className="shrink-0 text-xs text-white/45"
            dateTime={ev.timestamp}
          >
            {formatTime(ev.timestamp)}
          </time>
        </li>
      ))}
    </ul>
  );
}
