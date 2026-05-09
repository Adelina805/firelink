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
          className="rounded-2xl border border-emerald-500/20 bg-emerald-950/20 p-5"
        >
          <h3 className="font-semibold text-emerald-100">{r.title}</h3>
          <p className="mt-2 text-sm text-white/70">{r.description}</p>
          {r.detail ? (
            <p className="mt-2 text-xs text-white/50">{r.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
