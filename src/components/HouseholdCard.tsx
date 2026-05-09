import type { AnonymousHousehold } from "@/lib/types";

interface HouseholdCardProps {
  household: AnonymousHousehold;
}

export function HouseholdCard({ household }: HouseholdCardProps) {
  const pct = Math.min(100, Math.max(0, household.prep_score));

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-zinc-300 bg-white p-5 backdrop-blur-md dark:border-zinc-700 dark:bg-zinc-900/70">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-lg font-semibold text-amber-800 dark:text-amber-200">
          Household {household.anonymous_id}
        </span>
        <span className="rounded-full border border-emerald-600/40 bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-900 dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200">
          ZIP {household.zip_code}
        </span>
      </header>
      <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <Detail label="Pets" value={household.has_pets ? "Yes" : "No"} />
        <Detail
          label="Transportation"
          value={household.has_transport ? "Yes" : "No"}
        />
        <Detail
          label="Medical device power support needed"
          value={household.medical_needs ? "Yes" : "No"}
        />
        <Detail
          label="Can help others"
          value={household.can_volunteer ? "Yes" : "No"}
        />
        <Detail
          label="Status"
          value={household.status}
          className="col-span-2"
        />
      </dl>
      <div>
        <div className="mb-1 flex justify-between text-xs text-zinc-700 dark:text-zinc-300">
          <span>Preparedness</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-linear-to-r from-amber-600 to-orange-400 transition-[width] duration-500"
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </article>
  );
}

function Detail({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <dt className="text-zinc-700 dark:text-zinc-300">{label}</dt>
      <dd className="font-medium text-zinc-900 dark:text-zinc-100">{value}</dd>
    </div>
  );
}
