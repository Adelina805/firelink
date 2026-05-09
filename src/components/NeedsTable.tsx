import type { NeedItem } from "@/lib/types";

interface NeedsTableProps {
  needs: NeedItem[];
}

export function NeedsTable({ needs }: NeedsTableProps) {
  return (
    <div className="-mx-1 overflow-x-auto rounded-2xl border border-white/12 bg-black/35 sm:mx-0">
      <table className="w-full min-w-[280px] border-collapse text-left text-sm">
        <thead className="bg-white/5 text-xs uppercase tracking-wider text-amber-200/90">
          <tr>
            <th className="px-5 py-3 font-semibold">Need</th>
            <th className="px-5 py-3 font-semibold text-right">Count</th>
          </tr>
        </thead>
        <tbody>
          {needs.map((row, i) => (
            <tr
              key={row.label}
              className={`border-t border-white/10 ${i % 2 === 0 ? "bg-transparent" : "bg-white/[0.02]"}`}
            >
              <td className="px-5 py-3.5 text-white/95">{row.label}</td>
              <td className="px-5 py-3.5 text-right font-mono tabular-nums text-amber-100">
                {row.count}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
