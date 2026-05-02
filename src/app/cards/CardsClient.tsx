"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { CardVisual } from "@/components/cards/CardVisual";
import { StarRating } from "@/components/cards/StarRating";
import type { Card } from "@/lib/cards/types";

const CATEGORIES = [
  "all",
  "cashback",
  "travel",
  "miles",
  "hotel",
  "business",
  "secured",
  "student",
  "no-credit",
  "balance-transfer",
  "rewards",
  "rebuilding",
];

const SORT_OPTIONS = [
  { value: "rating", label: "Highest rated" },
  { value: "fee-asc", label: "Lowest annual fee" },
  { value: "fee-desc", label: "Highest annual fee" },
  { value: "name", label: "A-Z" },
];

export default function CardsClient({ allCards }: { allCards: Card[] }) {
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("rating");

  const filtered = useMemo(() => {
    let cards = allCards;
    if (category !== "all") {
      cards = cards.filter((c) => c.category.includes(category as any));
    }
    cards = [...cards].sort((a, b) => {
      switch (sort) {
        case "rating":
          return (b.rating ?? 0) - (a.rating ?? 0);
        case "fee-asc":
          return a.annual_fee - b.annual_fee;
        case "fee-desc":
          return b.annual_fee - a.annual_fee;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
    return cards;
  }, [allCards, category, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900">All credit card reviews</h1>
        <p className="mt-2 text-sm text-slate-600">{allCards.length} cards across every major category.</p>
      </header>

      <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                category === cat
                  ? "bg-navy-900 text-white"
                  : "border border-slate-200 bg-white text-slate-700 hover:border-navy-500"
              }`}
            >
              {cat.replaceAll("-", " ")}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <label className="text-sm text-slate-600">Sort:</label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-navy-500 focus:outline-none"
          >
            {SORT_OPTIONS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mb-4 text-sm text-slate-500">
        {filtered.length} {filtered.length === 1 ? "card" : "cards"}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((c) => (
          <Link
            key={c.slug}
            href={`/cards/${c.slug}`}
            className="block rounded-lg border border-slate-200 p-5 transition-colors hover:border-navy-500"
          >
            <CardVisual card={c} size="sm" />
            <div className="mt-3 flex items-start justify-between gap-2">
              <div className="flex-1">
                <div className="text-xs font-medium uppercase text-slate-500">{c.issuer}</div>
                <div className="mt-0.5 font-display font-semibold text-navy-900">{c.name}</div>
              </div>
            </div>
            <div className="mt-2 flex items-center justify-between text-sm">
              {c.rating !== undefined && <StarRating rating={c.rating} />}
              <span className="font-num text-slate-700">
                {c.annual_fee === 0 ? "$0/yr" : `$${c.annual_fee}/yr`}
              </span>
            </div>
          </Link>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-slate-600">No cards in this category.</p>
        </div>
      )}
    </div>
  );
}
