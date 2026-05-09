import type { NeedItem } from "@/lib/types";

interface NeedsTableProps {
  needs: NeedItem[];
}

export function NeedsTable({ needs }: NeedsTableProps) {
  return (
    <div className="-mx-1 overflow-x-auto rounded-2xl border border-zinc-300 bg-white sm:mx-0 dark:border-zinc-700 dark:bg-zinc-900/80">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <thead className="bg-zinc-100 text-xs uppercase tracking-wider text-amber-900 dark:bg-zinc-800 dark:text-amber-200">
          <tr>
            <th className="px-5 py-3 font-semibold">Need</th>
            <th className="px-5 py-3 font-semibold text-right">Count</th>
          </tr>
        </thead>
        <tbody>
          {needs.map((row, i) => (
            <tr
              key={row.label}
              className={`border-t border-zinc-200 dark:border-zinc-700 ${i % 2 === 0 ? "bg-transparent" : "bg-zinc-50 dark:bg-zinc-900"}`}
            >
              <td className="px-5 py-3.5 text-zinc-900 dark:text-zinc-100">{row.label}</td>
              <td className="px-5 py-3.5 text-right font-mono tabular-nums text-amber-800 dark:text-amber-200">
                {row.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
