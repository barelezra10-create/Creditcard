import type { Card } from "@/lib/cards/types";

export function RewardsTable({ card }: { card: Card }) {
  const rows = Object.entries(card.rewards);
  if (rows.length === 0) return null;
  const unit = card.rewards_type === "cashback" ? "%" : "x";
  return (
    <table className="w-full border-collapse text-sm">
      <thead><tr className="border-b border-slate-200"><th className="py-2 text-left">Category</th><th className="py-2 text-right">Rate</th></tr></thead>
      <tbody>
        {rows.map(([k, v]) => (
          <tr key={k} className="border-b border-slate-100">
            <td className="py-2 capitalize text-slate-700">{k.replaceAll("_", " ")}</td>
            <td className="py-2 text-right font-num font-semibold">{v}{unit}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
