import type { ReactNode } from "react";
import type { CommunityStats } from "@/lib/types";
import { statLabelToneClasses, statToneClasses } from "@/lib/semanticStyles";

interface CommunityNeedsNowProps {
  stats: CommunityStats;
}

export function CommunityNeedsNow({ stats }: CommunityNeedsNowProps) {
  return (
    <section className="mb-6" aria-labelledby="community-needs-heading">
      <h2
        id="community-needs-heading"
        className="mb-3 text-base font-semibold tracking-tight text-[var(--foreground)]"
      >
        Community needs now
      </h2>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <PriorityCard
          title="Rides needed"
          count={stats.transportationNeeds}
          supporting="Evacuation transport"
          tone="urgent"
          icon={<CarAlertIcon className="h-5 w-5" />}
        />
        <PriorityCard
          title="Medical power"
          count={stats.medicalPowerNeeds}
          supporting="Charging / batteries"
          tone="warning"
          icon={<BatteryZapIcon className="h-5 w-5" />}
        />
        <PriorityCard
          title="Marked safe"
          count={stats.markedSafe}
          supporting="Checked in"
          tone="safe"
          icon={<CheckCircleIcon className="h-5 w-5" />}
        />
        <PriorityCard
          title="Can help"
          count={stats.volunteers}
          supporting="Volunteers"
          tone="volunteer"
          icon={<HandHeartIcon className="h-5 w-5" />}
        />
      </div>
    </section>
  );
}

type PriorityTone = "urgent" | "warning" | "safe" | "volunteer";

const priorityShell: Record<PriorityTone, string> = {
  urgent: statToneClasses.urgent,
  warning: statToneClasses.warning,
  safe: statToneClasses.safe,
  volunteer:
    "border-[var(--card-border)] border-l-[3px] border-l-[#0D9488] bg-[var(--card)] shadow-sm shadow-teal-900/5 dark:border-teal-800/40 dark:bg-teal-950/15 dark:shadow-teal-900/20",
};

const priorityLabel: Record<PriorityTone, string> = {
  urgent: statLabelToneClasses.urgent,
  warning: statLabelToneClasses.warning,
  safe: statLabelToneClasses.safe,
  volunteer: "text-teal-800 dark:text-teal-300",
};

const priorityIconWrap: Record<PriorityTone, string> = {
  urgent: "text-red-700 dark:text-red-300",
  warning: "text-orange-700 dark:text-orange-300",
  safe: "text-green-700 dark:text-green-300",
  volunteer: "text-teal-700 dark:text-teal-300",
};

function PriorityCard({
  title,
  count,
  supporting,
  tone,
  icon,
}: {
  title: string;
  count: number;
  supporting: string;
  tone: PriorityTone;
  icon: ReactNode;
}) {
  return (
    <article
      className={`flex items-center gap-3 rounded-xl px-3.5 py-3 sm:gap-3.5 sm:px-4 sm:py-3.5 ${priorityShell[tone]}`}
    >
      <span
        className={`flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/55 sm:size-10 dark:bg-black/25 ${priorityIconWrap[tone]}`}
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <h3
          className={`text-xs font-semibold leading-tight tracking-tight sm:text-sm ${priorityLabel[tone]}`}
        >
          {title}
        </h3>
        <p className="mt-0.5 truncate text-[11px] leading-snug text-[var(--muted-foreground)] sm:text-xs">
          {supporting}
        </p>
      </div>
      <p className="shrink-0 text-2xl font-bold tabular-nums tracking-tight text-[var(--foreground)] sm:text-3xl">
        {count}
      </p>
    </article>
  );
}

function CarAlertIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M10.5 3h3l1 2H19a2 2 0 0 1 2 2l-1 6H4L3 7a2 2 0 0 1 2-2h4.5l1-2Z" />
      <path d="M5 15h14v2a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-2Z" />
      <path d="M7 21v-2M17 21v-2" />
      <path d="M12 8v3M12 14h.01" />
    </svg>
  );
}

function BatteryZapIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M18 10h2a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-6a1 1 0 0 1 1-1h2" />
      <path d="M8 10V7a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v3" />
      <path d="m12 11-2 4h4l-2 4" />
    </svg>
  );
}

function CheckCircleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function HandHeartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      className={className}
    >
      <path d="M11 14h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
      <path d="m7 20 1.6-1.4c2.4-2 4.4-4.3 6-7" />
      <path d="M18 12h.01" />
      <path d="M21 12c0 1.5-1.2 2-2 2s-2-.5-2-2 1.2-2 2-2 2 .5 2 2Z" />
      <path d="M16 8c0 1.5-1.2 2-2 2" />
    </svg>
  );
}
