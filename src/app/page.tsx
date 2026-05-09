import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4 py-24 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-amber-300/90">
        FireLink
      </p>
      <h1 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
        Wildfire readiness by SMS
      </h1>
      <p className="mx-auto mt-4 max-w-lg text-white/70">
        Public community dashboards stay anonymous — ZIP-level stats and broad
        needs only.
      </p>
      <Link
        href="/dashboard/92104"
        className="mt-8 inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-stone-950 shadow-lg shadow-amber-900/30 transition hover:bg-amber-400"
      >
        Open demo dashboard (92104)
      </Link>
    </div>
  );
}
