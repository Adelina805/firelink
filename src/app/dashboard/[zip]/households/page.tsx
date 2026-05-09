import { HouseholdCard } from "@/components/HouseholdCard";
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
    title: `FireLink — Households · ${zip}`,
    description:
      "Anonymous household status and readiness for this ZIP — no PII.",
  };
}

export default async function DashboardHouseholdsPage({ params }: Props) {
  const { zip } = await params;
  const data = await getCommunityData(zip);

  if (!data) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center py-12 text-center">
        <p className="text-zinc-700 dark:text-zinc-300">No data for this ZIP.</p>
        <Link
          href="/dashboard/92104"
          className="mt-3 text-sm font-semibold text-amber-700 hover:text-amber-600 dark:text-amber-300 dark:hover:text-amber-200"
        >
          Open demo ZIP
        </Link>
      </div>
    );
  }

  const { stats, households } = data;

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Anonymous household status
      </h2>
      <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
        Snapshot by anonymous ID — no names or addresses.
      </p>

      <section
        className="mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4"
        aria-label="Household summary counts"
      >
        <StatCard label="With pets" value={stats.pets} />
        <StatCard
          label="Transport needs"
          value={stats.transportationNeeds}
        />
        <StatCard
          label="Medical power support"
          value={stats.medicalPowerNeeds}
        />
        <StatCard label="Marked safe" value={stats.markedSafe} />
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {households.map((h) => (
          <HouseholdCard key={h.anonymous_id} household={h} />
        ))}
      </div>
    </div>
  );
}
