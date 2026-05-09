import type { ResourceItem } from "@/lib/types";

interface ResourcesListProps {
  resources: ResourceItem[];
}

export function ResourcesList({ resources }: ResourcesListProps) {
  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {resources.map((r) => (
        <li
          key={r.id}
          className="rounded-2xl border border-emerald-700/30 bg-emerald-50 p-5 dark:border-emerald-500/35 dark:bg-emerald-900/25"
        >
          <h3 className="font-semibold text-emerald-900 dark:text-emerald-100">{r.title}</h3>
          <p className="mt-2 text-sm text-zinc-800 dark:text-zinc-200">{r.description}</p>
          {r.detail ? (
            <p className="mt-2 text-xs text-zinc-700 dark:text-zinc-300">{r.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
