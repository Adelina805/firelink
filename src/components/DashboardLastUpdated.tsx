"use client";

import { useEffect, useState } from "react";

function formatTime(d: Date) {
  return new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
  }).format(d);
}

export function DashboardLastUpdated() {
  const [ts, setTs] = useState<Date | null>(null);

  useEffect(() => {
    const bump = () => setTs(new Date());
    bump();
    window.addEventListener("firelink:dashboard-refresh", bump);
    return () => window.removeEventListener("firelink:dashboard-refresh", bump);
  }, []);

  return (
    <p className="text-xs font-medium text-[var(--muted-foreground)]">
      Last updated:{" "}
      {ts === null ? (
        <span className="font-mono tabular-nums text-[var(--foreground)]">
          <span className="sr-only">Loading time</span>
          —
        </span>
      ) : (
        <time dateTime={ts.toISOString()} className="font-mono tabular-nums text-[var(--foreground)]">
          {formatTime(ts)}
        </time>
      )}
    </p>
  );
}
