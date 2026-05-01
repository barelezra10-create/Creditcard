import Link from "next/link";
import { Lock } from "lucide-react";
import { CardVisual } from "@/components/cards/CardVisual";
import { StarRating } from "@/components/cards/StarRating";
import type { Card } from "@/lib/cards/types";

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center border-r border-slate-100 px-3 py-2 last:border-r-0 text-center">
      <span className="font-num text-base font-bold text-navy-900">{value}</span>
      <span className="mt-0.5 text-xs text-slate-500">{label}</span>
    </div>
  );
}

export function PickBlock({
  rank,
  bestFor,
  blurb,
  card,
}: {
  rank: number;
  bestFor: string;
  blurb: string;
  card: Card;
}) {
  const introApr =
    card.apr_intro_months > 0
      ? `${card.apr_intro ?? 0}% for ${card.apr_intro_months} mo`
      : "None";
  const rewardsRate = (() => {
    const vals = Object.values(card.rewards);
    if (!vals.length) return "N/A";
    const max = Math.max(...vals);
    return card.rewards_type === "cashback" ? `${max}%` : `${max}x`;
  })();
  const annualFee = card.annual_fee === 0 ? "$0" : `$${card.annual_fee}/yr`;
  const regularApr = `${card.apr_purchase.min}–${card.apr_purchase.max}%`;
  const creditScore = `${card.credit_score_required.recommended}+`;
  const rating = card.rating ?? 4.5;

  return (
    <article className="my-8 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md">
      {/* Top bar: rank + badge */}
      <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50 px-5 py-2.5">
        <span className="font-num text-xs font-semibold text-slate-400">#{rank}</span>
        <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
          Best for {bestFor}
        </span>
      </div>

      {/* Main 3-col layout */}
      <div className="grid gap-0 md:grid-cols-[auto_1fr_280px]">
        {/* LEFT: card image + star rating */}
        <div className="flex flex-col items-center border-b border-slate-100 bg-white p-5 md:border-b-0 md:border-r">
          <CardVisual card={card} size="sm" />
          <div className="mt-3">
            <StarRating rating={rating} />
          </div>
        </div>

        {/* MIDDLE: card name, blurb, review link */}
        <div className="border-b border-slate-100 p-5 md:border-b-0 md:border-r">
          <Link
            href={`/cards/${card.slug}`}
            className="font-display text-xl font-bold leading-snug text-navy-900 hover:underline"
          >
            {card.issuer} {card.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-slate-700">{blurb}</p>
          <Link
            href={`/cards/${card.slug}`}
            className="mt-3 inline-block text-xs font-medium text-blue-600 hover:underline"
          >
            Read full review &rarr;
          </Link>
        </div>

        {/* RIGHT: credit score + CTA */}
        <div className="flex flex-col items-center justify-center gap-3 p-5">
          <div className="w-full rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5 text-center">
            <span className="text-xs text-slate-500">Recommended credit score</span>
            <div className="font-num text-sm font-bold text-slate-800">{creditScore}</div>
          </div>
          <Link
            href={`/go/${card.slug}`}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
          >
            <Lock className="h-4 w-4" />
            Apply now
          </Link>
          <p className="text-center text-xs text-slate-400">on {card.issuer} secure site</p>
          <label className="flex cursor-pointer items-center gap-2 text-xs text-slate-500 hover:text-slate-700">
            <input type="checkbox" className="h-3.5 w-3.5 rounded accent-blue-600" />
            Add to compare
          </label>
        </div>
      </div>

      {/* Bottom: 4-col stat grid */}
      <div className="grid grid-cols-4 divide-x divide-slate-100 border-t border-slate-100 bg-slate-50">
        <StatCell label="Intro APR" value={introApr} />
        <StatCell label="Rewards Rate" value={rewardsRate} />
        <StatCell label="Annual Fee" value={annualFee} />
        <StatCell label="Regular APR" value={regularApr} />
      </div>
    </article>
  );
}
