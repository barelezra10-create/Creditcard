import type { Card } from "@/lib/cards/types";

const ROWS: Array<{ label: string; render: (c: Card) => string }> = [
  { label: "Annual fee", render: (c) => c.annual_fee === 0 ? "$0" : `$${c.annual_fee}` },
  { label: "Purchase APR", render: (c) => `${c.apr_purchase.min}-${c.apr_purchase.max}%` },
  { label: "Intro APR", render: (c) => c.apr_intro_months > 0 ? `${c.apr_intro}% for ${c.apr_intro_months} mo` : "None" },
  { label: "Foreign tx fee", render: (c) => c.foreign_tx_fee === 0 ? "$0" : `${(c.foreign_tx_fee * 100).toFixed(0)}%` },
  { label: "Signup bonus", render: (c) => c.signup_bonus ?? "None" },
  { label: "Rec. credit score", render: (c) => `${c.credit_score_required.recommended}+` },
];

export function CompareTable({ cards }: { cards: Card[] }) {
  return (
    <table className="w-full text-sm">
      <thead><tr><th></th>{cards.map((c) => <th key={c.slug} className="px-4 py-3 text-left font-display">{c.issuer} {c.name}</th>)}</tr></thead>
      <tbody>
        {ROWS.map((r) => (
          <tr key={r.label} className="border-t border-slate-100">
            <td className="py-3 pr-4 font-medium text-slate-600">{r.label}</td>
            {cards.map((c) => <td key={c.slug} className="py-3 pr-4 font-num">{r.render(c)}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
