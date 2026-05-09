import { CommunityNeedsNow } from "@/components/CommunityNeedsNow";
import { CommunitySnapshot } from "@/components/CommunitySnapshot";
import { HouseholdsListClient } from "@/components/HouseholdsListClient";
import { getCommunityData } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

type Props = Readonly<{
  params: Promise<{ zip: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params;
  return {
    title: `FireLink — Community · ${zip}`,
    description:
      "Community status: anonymous household signals by ZIP — no names, phone numbers, or exact addresses.",
  };
}

export default async function DashboardHouseholdsPage({ params }: Props) {
  const { zip } = await params;
  const data = await getCommunityData(zip);

  if (!data) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center py-12 text-center">
        <p className="text-[var(--muted-foreground)]">No data for this ZIP.</p>
        <Link
          href="/dashboard/91001"
          className="mt-3 text-sm font-semibold text-blue-700 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300"
        >
          Open demo ZIP
        </Link>
      </div>
    );
  }

  const { stats, households } = data;

  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight text-[var(--foreground)] sm:text-2xl">
        Community status
      </h2>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[var(--muted-foreground)]">
        Anonymous household status by ZIP — no names, phone numbers, or exact
        addresses shown.
      </p>

      <div className="mt-8 space-y-10">
        <CommunityNeedsNow stats={stats} />
        <CommunitySnapshot zip={zip} stats={stats} />
        <HouseholdsListClient households={households} />
      </div>
    </div>
  );
}
