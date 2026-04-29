"use client";
import { useSearchParams } from "next/navigation";
import type { Card } from "@/lib/cards/types";
import { CompareTable } from "@/components/cards/CompareTable";

export default function CompareClient({ allCards }: { allCards: Card[] }) {
  const sp = useSearchParams();
  const slugsFromC = sp.getAll("c");
  const slugsFromAB = ["a", "b"].map((k) => sp.get(k)).filter(Boolean) as string[];
  const slugs = slugsFromC.length ? slugsFromC : slugsFromAB;
  const cards = slugs.map((s) => allCards.find((c) => c.slug === s)).filter(Boolean) as Card[];

  if (cards.length < 2) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-navy-900">Compare cards</h1>
        <p className="mt-4 text-slate-600">Pick at least two cards from the list below to compare.</p>
        <ul className="mt-6 grid gap-2 md:grid-cols-2">
          {allCards.map((c) => (
            <li key={c.slug}>
              <a href={`/compare?c=${c.slug}&c=${allCards[0].slug === c.slug ? allCards[1].slug : allCards[0].slug}`} className="block rounded-md border border-slate-200 p-3 hover:border-navy-500">{c.issuer} {c.name}</a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{cards.map((c) => c.name).join(" vs ")}</h1>
      <div className="mt-8 overflow-x-auto"><CompareTable cards={cards} /></div>
    </div>
  );
}
