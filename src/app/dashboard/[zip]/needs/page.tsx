import { NeedsFilterClient } from "@/components/NeedsFilterClient";
import { getCommunityData } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

type Props = Readonly<{
  params: Promise<{ zip: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params;
  return {
    title: `FireLink — Needs · ${zip}`,
    description: "Current community need categories and counts for this ZIP.",
  };
}

export default async function DashboardNeedsPage({ params }: Props) {
  const { zip } = await params;
  const data = await getCommunityData(zip);

  if (!data) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center py-12 text-center">
        <p className="text-white/65">No data for this ZIP.</p>
        <Link
          href="/dashboard/92104"
          className="mt-3 text-sm font-semibold text-amber-300 hover:text-amber-200"
        >
          Open demo ZIP
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-white">Current needs</h2>
      <p className="mb-6 text-sm text-white/55">
        Broad categories and counts — filter by type or search labels.
      </p>
      <NeedsFilterClient needs={data.needs} />
    </div>
  );
}
