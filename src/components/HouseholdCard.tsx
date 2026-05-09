import type { AnonymousHousehold } from "@/lib/types";

interface HouseholdCardProps {
  household: AnonymousHousehold;
}

export function HouseholdCard({ household }: HouseholdCardProps) {
  const pct = Math.min(100, Math.max(0, household.prep_score));

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-white/12 bg-black/35 p-5 backdrop-blur-md">
      <header className="flex flex-wrap items-baseline justify-between gap-2">
        <span className="font-mono text-lg font-semibold text-amber-100">
          Household {household.anonymous_id}
        </span>
        <span className="rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-0.5 text-xs font-medium text-emerald-200">
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
        <div className="mb-1 flex justify-between text-xs text-white/60">
          <span>Preparedness</span>
          <span>{pct}%</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/10">
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
      <dt className="text-white/50">{label}</dt>
      <dd className="font-medium text-white">{value}</dd>
    </div>
  );
}
