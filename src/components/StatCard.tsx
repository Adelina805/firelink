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
      ? "border-amber-500/40 shadow-[0_0_24px_-8px_rgba(251,191,36,0.5)]"
      : variant === "muted"
        ? "border-white/10"
        : "border-white/15";

  return (
    <div
      className={`rounded-2xl border bg-white/5 p-5 backdrop-blur-sm ${border}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-amber-200/80">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tabular-nums text-white">{value}</p>
      {subtitle ? (
        <p className="mt-1 text-sm text-white/55">{subtitle}</p>
      ) : null}
    </div>
  );
}
