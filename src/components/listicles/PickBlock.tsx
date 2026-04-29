import Link from "next/link";
import { CardVisual } from "@/components/cards/CardVisual";
import type { Card } from "@/lib/cards/types";

export function PickBlock({ rank, bestFor, blurb, card }: { rank: number; bestFor: string; blurb: string; card: Card }) {
  return (
    <article className="my-10 rounded-lg border border-slate-200 p-6">
      <div className="flex items-baseline gap-3">
        <div className="font-num text-sm font-semibold text-slate-500">#{rank}</div>
        <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">Best for {bestFor}</span>
      </div>
      <div className="mt-3 grid gap-6 md:grid-cols-[auto_1fr] md:items-start">
        <CardVisual card={card} size="sm" />
        <div>
          <Link href={`/cards/${card.slug}`} className="font-display text-xl font-bold text-navy-900 hover:underline">{card.issuer} {card.name}</Link>
          <p className="mt-2 text-sm leading-relaxed text-slate-700">{blurb}</p>
          <Link href={`/go/${card.slug}`} className="mt-3 inline-block rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white">Apply on {card.issuer}</Link>
        </div>
      </div>
    </article>
  );
}
