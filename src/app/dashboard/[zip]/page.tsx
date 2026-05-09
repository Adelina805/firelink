import { HomeFeed } from "@/components/HomeFeed";
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
        <h2 className="text-xl font-bold text-white">No demo data for this ZIP</h2>
        <p className="mt-3 max-w-md text-white/65">
          Try the sample community at{" "}
          <Link
            href="/dashboard/92104"
            className="font-semibold text-amber-300 underline underline-offset-2 hover:text-amber-200"
          >
            /dashboard/92104
          </Link>
          .
        </p>
      </div>
    );
  }

  const { stats } = data;

  return (
    <div>
      <p className="mb-6 text-sm leading-relaxed text-white/55">
        <span className="text-white/40">Updates:</span> Auto-refresh every 5s
        (demo placeholder).
      </p>

      <section className="mb-8" aria-labelledby="home-metrics-heading">
        <h2 id="home-metrics-heading" className="sr-only">
          Key metrics
        </h2>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <StatCard
            label="Registered households"
            value={stats.registeredHouseholds}
            variant="accent"
          />
          <StatCard label="Requested help" value={stats.requestedHelp} />
          <StatCard label="Volunteers available" value={stats.volunteers} />
        </div>
      </section>

      <div className="mb-8 rounded-xl border border-amber-500/25 bg-amber-950/30 p-4 text-sm text-amber-50/90">
        <strong className="text-amber-100">Privacy:</strong> Aggregate counts
        and anonymous household IDs only — never street addresses or contact
        info. Medical concerns are summarized as &quot;medical device power
        support&quot; where applicable.
      </div>

      <HomeFeed zip={zip} events={data.events} needs={data.needs} />
    </div>
  );
}
