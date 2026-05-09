import type { CommunityStats } from "@/lib/types";

interface CommunitySnapshotProps {
  zip: string;
  stats: CommunityStats;
}

export function CommunitySnapshot({ zip, stats }: CommunitySnapshotProps) {
  return (
    <section
      className="mb-10 opacity-[0.92]"
      aria-labelledby="community-snapshot-heading"
    >
      <h2
        id="community-snapshot-heading"
        className="mb-3 text-base font-semibold tracking-tight text-[var(--muted-foreground)]"
      >
        Community snapshot
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <SnapshotTile label="Registered households" value={stats.registeredHouseholds} />
        <SnapshotTile label="Households with pets" value={stats.pets} />
        <SnapshotTile label="ZIP code" value={zip} mono />
        <SnapshotTile
          label="Average preparedness"
          value={`${stats.averagePreparedness}%`}
        />
      </div>
    </section>
  );
}

function SnapshotTile({
  label,
  value,
  mono,
}: {
  label: string;
  value: string | number;
  mono?: boolean;
}) {
  return (
    <div className="rounded-xl border border-[var(--card-border)] bg-[var(--card)] px-3.5 py-3 sm:px-4 sm:py-3.5">
      <p className="text-xs font-semibold leading-tight tracking-tight text-[var(--muted-foreground)] sm:text-sm">
        {label}
      </p>
      <p
        className={`mt-0.5 text-2xl font-bold tabular-nums tracking-tight text-[var(--foreground)] sm:text-3xl ${mono ? "font-mono" : ""}`}
      >
        {value}
      </p>
    </div>
  );
}
