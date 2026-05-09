import { ActivityLog } from "@/components/ActivityLog";
import { DashboardAutoRefresh } from "@/components/DashboardAutoRefresh";
import { HouseholdCard } from "@/components/HouseholdCard";
import { NeedsTable } from "@/components/NeedsTable";
import { ResourcesList } from "@/components/ResourcesList";
import { StatCard } from "@/components/StatCard";
import { getCommunityData } from "@/lib/data";
import type { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: Promise<{ zip: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { zip } = await params;
  return {
    title: `FireLink — ZIP ${zip}`,
    description:
      "Anonymous ZIP-level wildfire readiness and needs. No names, phone numbers, or exact addresses are shown.",
  };
}

export default async function DashboardZipPage({ params }: Props) {
  const { zip } = await params;
  const data = await getCommunityData(zip);

  if (!data) {
    return (
      <div className="mx-auto flex min-h-full max-w-2xl flex-col items-center justify-center px-4 py-24 text-center">
        <h1 className="text-2xl font-bold text-white">No demo data for this ZIP</h1>
        <p className="mt-3 text-white/65">
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
    <>
      <DashboardAutoRefresh />
      <div className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <header className="mb-10 border-b border-white/10 pb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-amber-300/90">
            FireLink
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            FireLink Community Readiness Dashboard
          </h1>
          <p className="mt-3 max-w-3xl text-lg text-white/75">
            Anonymous, ZIP-level wildfire readiness and needs. No names, phone
            numbers, or exact addresses are shown.
          </p>
          <div className="mt-6 rounded-xl border border-amber-500/25 bg-amber-950/30 p-4 text-sm text-amber-50/90">
            <strong className="text-amber-100">Privacy:</strong> This page only
            shows aggregate counts, anonymous household IDs, and broad need
            categories — never street addresses or contact info. Medical
            concerns are summarized as &quot;medical device power support&quot;
            where applicable.
          </div>
          <p className="mt-4 text-sm text-white/45">
            ZIP <span className="font-mono text-amber-200/90">{data.zip}</span>
            <span className="mx-2 text-white/30">·</span>
            <span className="text-white/40">
              Auto-refresh every 5s (placeholder)
            </span>
          </p>
        </header>

        <section className="mb-14" aria-labelledby="readiness-heading">
          <h2
            id="readiness-heading"
            className="mb-6 text-xl font-semibold text-white"
          >
            Community Readiness
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              label="Registered households"
              value={stats.registeredHouseholds}
              variant="accent"
            />
            <StatCard
              label="Households with pets"
              value={stats.pets}
            />
            <StatCard
              label="Transportation needs"
              value={stats.transportationNeeds}
            />
            <StatCard
              label="Medical device power support needed"
              value={stats.medicalPowerNeeds}
            />
            <StatCard label="Marked safe" value={stats.markedSafe} />
            <StatCard label="Requested help" value={stats.requestedHelp} />
            <StatCard
              label="Volunteers available"
              value={stats.volunteers}
            />
            <StatCard
              label="Average preparedness"
              value={`${stats.averagePreparedness}%`}
              subtitle="ZIP-level average"
              variant="muted"
            />
          </div>
        </section>

        <section className="mb-14" aria-labelledby="needs-heading">
          <h2 id="needs-heading" className="mb-6 text-xl font-semibold text-white">
            Current Needs
          </h2>
          <NeedsTable needs={data.needs} />
        </section>

        <section
          className="mb-14"
          aria-labelledby="households-heading"
        >
          <h2
            id="households-heading"
            className="mb-6 text-xl font-semibold text-white"
          >
            Anonymous Household Status
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {data.households.map((h) => (
              <HouseholdCard key={h.anonymous_id} household={h} />
            ))}
          </div>
        </section>

        <section className="mb-14" aria-labelledby="activity-heading">
          <h2
            id="activity-heading"
            className="mb-6 text-xl font-semibold text-white"
          >
            Recent Activity
          </h2>
          <ActivityLog events={data.events} />
        </section>

        <section aria-labelledby="resources-heading">
          <h2
            id="resources-heading"
            className="mb-6 text-xl font-semibold text-white"
          >
            Available Resources
          </h2>
          <ResourcesList resources={data.resources} />
        </section>
      </div>
    </>
  );
}
