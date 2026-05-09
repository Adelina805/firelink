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
          className="rounded-2xl border border-[var(--card-border)] border-l-[3px] border-l-[#2563EB] bg-[var(--card)] p-5"
        >
          <h3 className="font-semibold text-[var(--foreground)]">{r.title}</h3>
          <p className="mt-2 text-sm text-[var(--muted-foreground)]">{r.description}</p>
          {r.detail ? (
            <p className="mt-2 text-xs text-[var(--muted-foreground)]">{r.detail}</p>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
