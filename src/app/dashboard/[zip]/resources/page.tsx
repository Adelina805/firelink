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

  return (
    <div>
      <h2 className="mb-2 text-lg font-semibold text-[var(--foreground)]">
        Available resources
      </h2>
      <p className="mb-6 text-sm text-[var(--muted-foreground)]">
        Hotlines, shelter info, and SMS-based tools — demo copy only.
      </p>
      <ResourcesList resources={data.resources} />
    </div>
  );
}
