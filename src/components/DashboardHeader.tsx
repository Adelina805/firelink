import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

export function DashboardHeader({ zip }: { zip: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-[var(--chrome-border)] bg-[var(--chrome-surface)] pt-[env(safe-area-inset-top)] shadow-[0_1px_0_0_rgba(0,0,0,0.06)] dark:shadow-[0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-2.5 sm:px-6 lg:px-8">
        <div className="min-w-0 flex-1">
          <Link
            href="/"
            className="text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-800 hover:text-amber-700 dark:text-amber-300 dark:hover:text-amber-200"
          >
            FireLink
          </Link>
          <div className="mt-0.5 flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <h1 className="truncate text-base font-bold tracking-tight text-zinc-900 sm:text-lg dark:text-zinc-100">
              Community dashboard
            </h1>
            <span className="rounded-full border border-emerald-600/40 bg-emerald-100 px-2 py-0.5 text-[10px] font-medium text-emerald-900 sm:text-xs dark:border-emerald-500/40 dark:bg-emerald-900/30 dark:text-emerald-200">
              Live (demo)
            </span>
          </div>
          <p className="mt-0.5 truncate text-xs text-zinc-700 dark:text-zinc-300">
            ZIP{" "}
            <span className="font-mono text-amber-800 dark:text-amber-200">{zip}</span>
            <span className="mx-1.5 text-zinc-500 dark:text-zinc-400">·</span>
            <span className="hidden md:inline">
              Anonymous counts only — no PII.
            </span>
          </p>
        </div>
        <div className="shrink-0">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
