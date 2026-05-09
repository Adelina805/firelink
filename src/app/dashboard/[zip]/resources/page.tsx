import { ResourcesList } from "@/components/ResourcesList";
import { getCommunityData } from "@/lib/data";
import Link from "next/link";
import type { Metadata } from "next";

type Props = Readonly<{
  params: Promise<{ zip: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params;
  return {
    title: `FireLink — Resources · ${zip}`,
    description: "Verified-style resource links and guidance for this area.",
  };
}

export default async function DashboardResourcesPage({ params }: Props) {
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

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
        Available resources
      </h2>
      <p className="mb-6 text-sm text-zinc-700 dark:text-zinc-300">
        Hotlines, shelter info, and SMS-based tools — demo copy only.
      </p>
      <ResourcesList resources={data.resources} />
    </div>
  );
}
