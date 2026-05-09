interface StatCardProps {
  label: string;
  value: string | number;
  subtitle?: string;
  variant?: "default" | "accent" | "muted";
}

export function StatCard({
  label,
  value,
  subtitle,
  variant = "default",
}: StatCardProps) {
  const border =
    variant === "accent"
      ? "border-amber-500/60 shadow-[0_0_24px_-8px_rgba(251,191,36,0.5)] dark:border-amber-400/50"
      : variant === "muted"
        ? "border-zinc-300 dark:border-zinc-700"
        : "border-zinc-300 dark:border-zinc-700";

  return (
    <div
      className={`rounded-2xl border bg-white p-5 backdrop-blur-sm dark:bg-zinc-900/70 ${border}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-amber-800 dark:text-amber-200">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tabular-nums text-zinc-900 dark:text-zinc-100">
        {value}
      </p>
      {subtitle ? (
        <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">{subtitle}</p>
      ) : null}
    </div>
  );
}
