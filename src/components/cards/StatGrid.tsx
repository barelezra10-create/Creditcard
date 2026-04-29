import type { Card } from "@/lib/cards/types";

export function StatGrid({ card }: { card: Card }) {
  const stats = [
    { label: "Annual Fee", value: card.annual_fee === 0 ? "$0" : `$${card.annual_fee}` },
    { label: "Purchase APR", value: `${card.apr_purchase.min}% - ${card.apr_purchase.max}%` },
    { label: "Intro APR", value: card.apr_intro_months > 0 ? `${card.apr_intro}% for ${card.apr_intro_months} mo` : "None" },
    { label: "Foreign Tx Fee", value: card.foreign_tx_fee === 0 ? "$0" : `${(card.foreign_tx_fee * 100).toFixed(0)}%` },
    { label: "Recommended Score", value: `${card.credit_score_required.recommended}+` },
    { label: "Signup Bonus", value: card.signup_bonus ?? "None" },
  ];
  return (
    <dl className="my-6 grid grid-cols-2 gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="rounded-md border border-slate-200 p-4">
          <dt className="text-xs uppercase tracking-wider text-slate-500">{s.label}</dt>
          <dd className="mt-1 font-num font-semibold text-slate-900">{s.value}</dd>
        </div>
      ))}
    </dl>
  );
}
