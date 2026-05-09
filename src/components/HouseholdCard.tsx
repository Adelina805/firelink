import { semanticForHouseholdStatus } from "@/lib/dashboardSemantic";
import {
  householdCardAccentClasses,
  householdPreparingCardClasses,
  preparingStatusPillClasses,
  statusPillClasses,
} from "@/lib/semanticStyles";
import type { AnonymousHousehold } from "@/lib/types";
import type { ReactNode } from "react";

interface HouseholdCardProps {
  household: AnonymousHousehold;
}

export function HouseholdCard({ household }: HouseholdCardProps) {
  const pct = Math.min(100, Math.max(0, household.prep_score));
  const tier = semanticForHouseholdStatus(household.status);
  const isPreparing = household.status === "Preparing";
  const surfaceClass = isPreparing
    ? householdPreparingCardClasses
    : householdCardAccentClasses[tier];
  const pillClass = isPreparing
    ? preparingStatusPillClasses
    : statusPillClasses[tier];

  const prepLabel =
    pct <= 39 ? "Low" : pct <= 69 ? "In progress" : "Strong";
  const barClass =
    pct <= 39 ? "bg-[#DC2626]" : pct <= 69 ? "bg-[#F97316]" : "bg-[#16A34A]";

  return (
    <article
      className={`flex flex-col gap-4 overflow-hidden rounded-2xl p-5 ${surfaceClass}`}
    >
      <header className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="font-mono text-base font-semibold text-[var(--foreground)]">
          Household {household.anonymous_id}
        </h3>
        <span className="rounded-full border border-[var(--card-border)] bg-[var(--background)]/80 px-2.5 py-0.5 text-xs font-semibold text-[var(--foreground)] dark:bg-slate-900/50">
          ZIP {household.zip_code}
        </span>
      </header>

      <div>
        <p className="sr-only">Status: {household.status}</p>
        <span
          className={`inline-flex max-w-full rounded-full border px-3.5 py-2 text-sm font-semibold leading-snug ${pillClass}`}
        >
          {household.status}
        </span>
      </div>

      <ul className="flex flex-wrap gap-2" aria-label="Household attributes">
        <AttributeChip
          icon={<PawIcon className="h-3.5 w-3.5" />}
          label="Pets"
          value={household.has_pets}
        />
        <AttributeChip
          icon={<CarIcon className="h-3.5 w-3.5" />}
          label="Transport"
          value={household.has_transport}
        />
        <AttributeChip
          icon={<BatteryIcon className="h-3.5 w-3.5" />}
          label="Medical power"
          value={household.medical_needs}
        />
        <AttributeChip
          icon={<HandIcon className="h-3.5 w-3.5" />}
          label="Can help"
          value={household.can_volunteer}
        />
      </ul>

      <div>
        <div className="mb-1 flex flex-wrap justify-between gap-x-2 gap-y-1 text-xs text-[var(--muted-foreground)]">
          <span>Preparedness</span>
          <span>
            <span className="tabular-nums">{pct}%</span>
            <span className="mx-1 text-[var(--muted-foreground)]">·</span>
            <span className="font-medium text-[var(--foreground)]">
              {prepLabel}
            </span>
          </span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
          <div
            className={`h-full rounded-full transition-[width] duration-500 ${barClass}`}
            style={{ width: `${pct}%` }}
            role="progressbar"
            aria-valuenow={pct}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuetext={`${pct}% prepared, ${prepLabel}`}
          />
        </div>
      </div>
    </article>
  );
}

function AttributeChip({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: boolean;
}) {
  const text = value ? "Yes" : "No";
  return (
    <li className="inline-flex items-center gap-1.5 rounded-lg border border-[var(--card-border)] bg-[var(--background)]/60 px-2 py-1 text-xs font-medium text-[var(--foreground)] dark:bg-slate-900/40">
      <span className="text-[var(--muted-foreground)]" aria-hidden>
        {icon}
      </span>
      <span className="text-[var(--muted-foreground)]">{label}:</span>
      <span className="tabular-nums">{text}</span>
    </li>
  );
}

function PawIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="11" cy="7" r="2" />
      <circle cx="17" cy="9" r="2" />
      <circle cx="7" cy="11" r="2" />
      <circle cx="13" cy="15" r="2" />
      <path d="M12 12c-2 2-3 5-1 6s4 0 5-2 0-5-4-4Z" />
    </svg>
  );
}

function CarIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3.5a1.5 1.5 0 0 0-1.2-1.4L16 10H5L3 12.5V16c0 .6.4 1 1 1h2" />
      <circle cx="7.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}

function BatteryIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M18 10h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-2" />
      <rect x="2" y="8" width="16" height="8" rx="1" />
    </svg>
  );
}

function HandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c2.4-2 4.4-4.3 6-7" />
    </svg>
  );
}
