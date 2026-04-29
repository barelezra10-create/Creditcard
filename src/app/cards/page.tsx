import Link from "next/link";
import { loadAllCards } from "@/lib/cards/loader";
import { CardVisual } from "@/components/cards/CardVisual";

export const metadata = { title: "All Card Reviews", description: "Browse every credit card we've reviewed." };

export default function CardsIndex() {
  const cards = loadAllCards();
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">All Reviews</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <Link key={c.slug} href={`/cards/${c.slug}`} className="block rounded-lg border border-slate-200 p-5 hover:border-navy-500">
            <CardVisual card={c} size="sm" />
            <div className="mt-3 font-display font-semibold text-navy-900">{c.name}</div>
            <div className="text-sm text-slate-600">{c.issuer}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
