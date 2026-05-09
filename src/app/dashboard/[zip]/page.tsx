import { HomeFeed } from "@/components/HomeFeed";
import { NeedsNowSection } from "@/components/NeedsNowSection";
import { StatCard } from "@/components/StatCard";
import { getCommunityData } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

type Props = Readonly<{
  params: Promise<{ zip: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params;
  return {
    title: `FireLink — ZIP ${zip}`,
    description:
      "Community readiness overview, needs queue, and recent SMS activity — anonymous aggregates only.",
  };
}

export default async function DashboardHomePage({ params }: Props) {
  const { zip } = await params;
  const data = await getCommunityData(zip);

  if (!data) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center py-12 text-center">
        <h2 className="text-xl font-bold text-[var(--foreground)]">No demo data for this ZIP</h2>
        <p className="mt-3 max-w-md text-[var(--muted-foreground)]">
          Try the sample community at{" "}
          <Link
            href="/dashboard/92104"
            className="font-semibold text-blue-700 underline underline-offset-2 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
          >
            /dashboard/92104
          </Link>
          .
        </p>
      </div>
    );
  }

  const { stats, needs } = data;
  const shelterCount =
    needs.find((n) => n.label.trim().toLowerCase() === "shelter info")?.count ?? 0;

  return (
    <div>
      <p className="mb-5 text-xs font-medium uppercase tracking-wider text-[var(--muted-foreground)]">
        Updates: auto-refresh every 5s (demo)
      </p>

      <NeedsNowSection zip={zip} needs={needs} />

      <section className="mb-8" aria-labelledby="home-metrics-heading">
        <h2 id="home-metrics-heading" className="sr-only">
          Key metrics
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <StatCard label="Registered households" value={stats.registeredHouseholds} tone="neutral" />
          <StatCard label="Requested help" value={stats.requestedHelp} tone="urgent" />
          <StatCard label="Volunteers available" value={stats.volunteers} tone="safe" />
          <StatCard label="Marked safe" value={stats.markedSafe} tone="safe" />
          <StatCard label="Medical power support" value={stats.medicalPowerNeeds} tone="warning" />
          <StatCard label="Shelter info" value={shelterCount} tone="info" />
        </div>
      </section>

      <div className="mb-8 rounded-xl border border-[var(--card-border)] bg-[var(--card)] p-4 text-sm text-[var(--muted-foreground)]">
        <strong className="font-semibold text-[var(--foreground)]">Privacy:</strong> Aggregate counts
        and anonymous household IDs only — never street addresses or contact info. Medical concerns are
        summarized as &quot;medical device power support&quot; where applicable.
      </div>

      <HomeFeed events={data.events} />
    </div>
  );
}
