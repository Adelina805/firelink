import Link from "next/link";

export function DashboardHeader({ zip }: { zip: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-zinc-950/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-300/90 hover:text-amber-200"
          >
            FireLink
          </Link>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h1 className="truncate text-base font-bold tracking-tight text-white sm:text-lg">
              Community dashboard
            </h1>
            <span className="rounded-full border border-emerald-500/35 bg-emerald-950/50 px-2 py-0.5 text-[10px] font-medium text-emerald-200 sm:text-xs">
              Live (demo)
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-white/50">
            ZIP{" "}
            <span className="font-mono text-amber-200/90">{zip}</span>
            <span className="mx-1.5 text-white/30">·</span>
            <span className="hidden sm:inline">
              Anonymous counts only — no PII.
            </span>
          </p>
        </div>
      </div>
    </header>
  );
}
