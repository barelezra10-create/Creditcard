"use client";
import { useState, useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Lock, Plus, X, Check } from "lucide-react";
import type { Card } from "@/lib/cards/types";
import { CardVisual } from "@/components/cards/CardVisual";
import { StarRating } from "@/components/cards/StarRating";

type Slot = string | null;

const POPULAR_COMPARISONS = [
  {
    label: "Best premium travel",
    slugs: ["chase-sapphire-reserve", "amex-platinum", "capital-one-venture-x"],
  },
  {
    label: "Best flat-rate cashback",
    slugs: ["citi-double-cash", "wells-fargo-active-cash", "capital-one-quicksilver"],
  },
  {
    label: "Best secured cards",
    slugs: ["discover-it-secured", "capital-one-platinum-secured", "opensky-secured"],
  },
  {
    label: "Sapphire Preferred vs Reserve",
    slugs: ["chase-sapphire-preferred", "chase-sapphire-reserve"],
  },
  {
    label: "Amex Gold vs Platinum",
    slugs: ["amex-gold", "amex-platinum"],
  },
];

export default function CompareClient({ allCards }: { allCards: Card[] }) {
  const sp = useSearchParams();
  const router = useRouter();

  const initialSlots: Slot[] = (() => {
    const fromUrl = sp.getAll("c");
    if (fromUrl.length >= 2) return fromUrl.slice(0, 3);
    return [null, null];
  })();
  const [slots, setSlots] = useState<Slot[]>(initialSlots);

  function updateUrl(newSlots: Slot[]) {
    const filled = newSlots.filter((s): s is string => Boolean(s));
    const qs = filled.map((s) => `c=${encodeURIComponent(s)}`).join("&");
    router.replace(qs ? `/compare?${qs}` : "/compare", { scroll: false });
  }

  function setSlot(idx: number, slug: string | null) {
    const next = [...slots];
    next[idx] = slug;
    setSlots(next);
    updateUrl(next);
  }

  function addSlot() {
    if (slots.length >= 3) return;
    const next = [...slots, null];
    setSlots(next);
  }

  function removeSlot(idx: number) {
    if (slots.length <= 2) return;
    const next = slots.filter((_, i) => i !== idx);
    setSlots(next);
    updateUrl(next);
  }

  const cards = useMemo(
    () => slots.map((s) => (s ? allCards.find((c) => c.slug === s) ?? null : null)),
    [slots, allCards],
  );
  const filledCards = cards.filter((c): c is Card => Boolean(c));
  const cols = slots.length;
  const allEmpty = filledCards.length === 0;

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-8">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
          Compare credit cards
        </h1>
        <p className="mt-2 text-slate-600">
          Pick 2 or 3 cards to see them side-by-side. The best value in each category is highlighted.
        </p>
      </header>

      {/* Popular comparisons — only shown when nothing is picked */}
      {allEmpty && (
        <div className="mb-8 rounded-xl bg-slate-50 border border-slate-200 p-5">
          <div className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
            Popular comparisons
          </div>
          <div className="flex flex-wrap gap-2">
            {POPULAR_COMPARISONS.map((comp) => (
              <button
                key={comp.label}
                onClick={() => {
                  const next = comp.slugs as Slot[];
                  setSlots(next);
                  updateUrl(next);
                }}
                className="rounded-full border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:border-navy-500 hover:text-navy-900 transition-colors"
              >
                {comp.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Card slot pickers */}
      <div className={`grid gap-4 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {slots.map((slug, idx) => (
          <CardSlot
            key={idx}
            idx={idx}
            slug={slug}
            allCards={allCards}
            selectedSlugs={slots.filter((s): s is string => Boolean(s))}
            onSelect={(s) => setSlot(idx, s)}
            onRemove={cols > 2 ? () => removeSlot(idx) : undefined}
          />
        ))}
        {cols < 3 && (
          <button
            onClick={addSlot}
            className="flex min-h-[280px] items-center justify-center rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-navy-500 hover:text-navy-700"
          >
            <span className="flex items-center gap-2 font-medium">
              <Plus className="h-5 w-5" />
              Add 3rd card
            </span>
          </button>
        )}
      </div>

      {/* Comparison table */}
      {filledCards.length >= 2 ? (
        <ComparisonTable cards={cards} />
      ) : (
        <div className="mt-12 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-10 text-center">
          <p className="text-slate-600">Pick at least 2 cards to see the comparison.</p>
        </div>
      )}
    </div>
  );
}

// ---- CardPickerModal ----

const MODAL_CATEGORIES = [
  "all",
  "cashback",
  "travel",
  "miles",
  "hotel",
  "business",
  "secured",
  "student",
] as const;

function CardPickerModal({
  open,
  onClose,
  onSelect,
  allCards,
  excludeSlugs,
}: {
  open: boolean;
  onClose: () => void;
  onSelect: (slug: string) => void;
  allCards: Card[];
  excludeSlugs: string[];
}) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");

  if (!open) return null;

  const filtered = allCards
    .filter((c) => !excludeSlugs.includes(c.slug))
    .filter(
      (c) =>
        categoryFilter === "all" ||
        c.category.includes(categoryFilter as Card["category"][number]),
    )
    .filter((c) => {
      if (!search.trim()) return true;
      const s = search.toLowerCase();
      return c.name.toLowerCase().includes(s) || c.issuer.toLowerCase().includes(s);
    })
    .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 md:p-8 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="my-auto w-full max-w-4xl rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div className="sticky top-0 z-10 rounded-t-xl border-b border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between gap-4">
            <h2 className="font-display text-xl font-bold text-navy-900">
              Pick a card to compare
            </h2>
            <button
              onClick={onClose}
              aria-label="Close"
              className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            placeholder="Search by card name or issuer..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="mt-4 w-full rounded-md border border-slate-300 px-4 py-2.5 text-sm focus:border-navy-500 focus:outline-none"
          />
          <div className="mt-3 flex flex-wrap gap-2">
            {MODAL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategoryFilter(cat)}
                className={`rounded-full px-3 py-1 text-xs font-semibold capitalize transition-colors ${
                  categoryFilter === cat
                    ? "bg-navy-900 text-white"
                    : "border border-slate-200 bg-white text-slate-700 hover:border-navy-500"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Card grid */}
        <div className="grid gap-3 p-5 sm:grid-cols-2 md:grid-cols-3">
          {filtered.length === 0 ? (
            <p className="col-span-full text-center text-slate-500">
              No cards match your filters.
            </p>
          ) : (
            filtered.map((c) => (
              <button
                key={c.slug}
                onClick={() => {
                  onSelect(c.slug);
                  onClose();
                }}
                className="group flex flex-col items-center rounded-lg border border-slate-200 bg-white p-4 text-left hover:border-navy-500 hover:shadow-sm transition-colors"
              >
                <CardVisual card={c} size="sm" />
                <div className="mt-3 w-full text-center">
                  <div className="text-xs font-medium uppercase text-slate-500">{c.issuer}</div>
                  <div className="mt-0.5 truncate font-display text-sm font-semibold text-navy-900">
                    {c.name}
                  </div>
                </div>
                {c.rating !== undefined && (
                  <div className="mt-2">
                    <StarRating rating={c.rating} />
                  </div>
                )}
                <div className="mt-2 text-xs text-slate-500">
                  {c.annual_fee === 0 ? "No annual fee" : `$${c.annual_fee}/yr`}
                </div>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ---- CardSlot: one slot in the picker grid ----
function CardSlot({
  idx,
  slug,
  allCards,
  selectedSlugs,
  onSelect,
  onRemove,
}: {
  idx: number;
  slug: string | null;
  allCards: Card[];
  selectedSlugs: string[];
  onSelect: (slug: string | null) => void;
  onRemove?: () => void;
}) {
  const [pickerOpen, setPickerOpen] = useState(false);
  const card = slug ? allCards.find((c) => c.slug === slug) ?? null : null;
  const otherSelected = selectedSlugs.filter((s) => s !== slug);

  return (
    <div className="relative flex min-h-[300px] flex-col rounded-xl border border-slate-200 bg-white p-5">
      {onRemove && (
        <button
          onClick={onRemove}
          aria-label="Remove this slot"
          className="absolute right-3 top-3 rounded-md p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 z-10"
        >
          <X className="h-4 w-4" />
        </button>
      )}

      {card ? (
        <div className="flex flex-1 flex-col items-center gap-3">
          <CardVisual card={card} size="md" />
          <div className="text-center">
            <div className="text-xs font-medium uppercase text-slate-500">{card.issuer}</div>
            <div className="mt-0.5 font-display text-base font-semibold text-navy-900">
              {card.name}
            </div>
          </div>
          {card.rating !== undefined && <StarRating rating={card.rating} />}
          <Link
            href={`/go/${card.slug}`}
            className="inline-flex items-center gap-1.5 rounded-md bg-blue-600 px-4 py-2 text-sm font-bold text-white shadow-sm hover:bg-blue-700"
          >
            <Lock className="h-3.5 w-3.5" />
            Apply now
          </Link>
          <button
            onClick={() => setPickerOpen(true)}
            className="text-xs font-medium text-navy-700 underline hover:text-navy-900"
          >
            Change card
          </button>
        </div>
      ) : (
        <button
          onClick={() => setPickerOpen(true)}
          className="flex flex-1 flex-col items-center justify-center gap-3 rounded-lg border-2 border-dashed border-slate-300 px-6 py-12 text-center text-slate-500 hover:border-navy-500 hover:text-navy-700 hover:bg-slate-50 transition-colors"
        >
          <div className="rounded-full bg-slate-100 p-3">
            <Plus className="h-6 w-6" />
          </div>
          <div className="font-semibold text-base">Pick a card</div>
          <div className="text-xs text-slate-400">Choose from 50+ reviewed cards</div>
        </button>
      )}

      <CardPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onSelect={(s) => onSelect(s)}
        allCards={allCards}
        excludeSlugs={otherSelected}
      />
    </div>
  );
}

// ---- ComparisonTable: rich row-by-row comparison ----
function ComparisonTable({ cards }: { cards: (Card | null)[] }) {
  const filled = cards.filter((c): c is Card => Boolean(c));
  if (filled.length < 2) return null;
  const cols = cards.length;

  type Row = {
    label: string;
    render: (c: Card) => string;
    winner?: (cards: Card[]) => "lowest" | "highest";
    extractValue?: (c: Card) => number;
  };

  const ROWS: Row[] = [
    {
      label: "Annual fee",
      render: (c) => (c.annual_fee === 0 ? "$0" : `$${c.annual_fee}`),
      winner: () => "lowest",
      extractValue: (c) => c.annual_fee,
    },
    {
      label: "Purchase APR",
      render: (c) => `${c.apr_purchase.min}-${c.apr_purchase.max}%`,
      winner: () => "lowest",
      extractValue: (c) => c.apr_purchase.min,
    },
    {
      label: "Intro APR",
      render: (c) =>
        c.apr_intro_months > 0
          ? `${c.apr_intro}% for ${c.apr_intro_months} mo`
          : "None",
      winner: () => "highest",
      extractValue: (c) => c.apr_intro_months,
    },
    {
      label: "Balance transfer APR",
      render: (c) => `${c.apr_balance_transfer.min}-${c.apr_balance_transfer.max}%`,
      winner: () => "lowest",
      extractValue: (c) => c.apr_balance_transfer.min,
    },
    {
      label: "Cash advance APR",
      render: (c) => `${c.apr_cash_advance}%`,
      winner: () => "lowest",
      extractValue: (c) => c.apr_cash_advance,
    },
    {
      label: "Foreign tx fee",
      render: (c) =>
        c.foreign_tx_fee === 0 ? "$0" : `${(c.foreign_tx_fee * 100).toFixed(0)}%`,
      winner: () => "lowest",
      extractValue: (c) => c.foreign_tx_fee,
    },
    {
      label: "Balance transfer fee",
      render: (c) =>
        c.balance_transfer_fee === 0
          ? "$0"
          : `${(c.balance_transfer_fee * 100).toFixed(0)}%`,
      winner: () => "lowest",
      extractValue: (c) => c.balance_transfer_fee,
    },
    {
      label: "Signup bonus",
      render: (c) => c.signup_bonus ?? "None",
      winner: () => "highest",
      extractValue: (c) => c.signup_bonus_value_usd ?? 0,
    },
    {
      label: "Recommended credit score",
      render: (c) => `${c.credit_score_required.recommended}+`,
      winner: () => "lowest",
      extractValue: (c) => c.credit_score_required.recommended,
    },
  ];

  function getWinnerSlug(row: Row): string | null {
    if (!row.winner || !row.extractValue) return null;
    const direction = row.winner(filled);
    const values = filled.map((c) => ({ slug: c.slug, value: row.extractValue!(c) }));
    const target =
      direction === "lowest"
        ? Math.min(...values.map((v) => v.value))
        : Math.max(...values.map((v) => v.value));
    const allEqual = values.every((v) => v.value === values[0].value);
    if (allEqual) return null;
    return values.find((v) => v.value === target)?.slug ?? null;
  }

  return (
    <div className="mt-12">
      <h2 className="font-display text-2xl font-bold text-navy-900">Side-by-side</h2>

      <Section
        title="Fees and APRs"
        cards={cards}
        rows={ROWS.slice(0, 7)}
        getWinnerSlug={getWinnerSlug}
      />

      <Section
        title="Welcome bonus and approval"
        cards={cards}
        rows={ROWS.slice(7)}
        getWinnerSlug={getWinnerSlug}
      />

      <RewardsSection cards={cards} />

      <ListSection title="Perks" cards={cards} extract={(c) => c.perks} />

      <ListSection title="Drawbacks" cards={cards} extract={(c) => c.drawbacks} />

      {/* Bottom CTAs */}
      <div className={`mt-12 grid gap-4 ${cols === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}>
        {cards.map((c, i) =>
          c ? (
            <Link
              key={i}
              href={`/go/${c.slug}`}
              className="flex items-center justify-center gap-2 rounded-lg bg-blue-600 px-5 py-4 text-base font-bold text-white shadow-sm hover:bg-blue-700"
            >
              <Lock className="h-4 w-4" />
              Apply for {c.name}
            </Link>
          ) : (
            <div key={i} />
          ),
        )}
      </div>
    </div>
  );
}

type RowDef = {
  label: string;
  render: (c: Card) => string;
  winner?: (cards: Card[]) => "lowest" | "highest";
  extractValue?: (c: Card) => number;
};

function Section({
  title,
  cards,
  rows,
  getWinnerSlug,
}: {
  title: string;
  cards: (Card | null)[];
  rows: RowDef[];
  getWinnerSlug: (row: RowDef) => string | null;
}) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <tbody>
            {rows.map((r) => {
              const winnerSlug = getWinnerSlug(r);
              return (
                <tr key={r.label} className="border-b border-slate-100 last:border-0">
                  <td
                    className="bg-slate-50 px-4 py-3 font-medium text-slate-700"
                    style={{ width: "180px" }}
                  >
                    {r.label}
                  </td>
                  {cards.map((c, i) => (
                    <td key={i} className="border-l border-slate-100 px-4 py-3">
                      {c ? (
                        <div className="flex items-center gap-1.5">
                          {winnerSlug === c.slug && (
                            <Check
                              className="h-4 w-4 text-green-600"
                              aria-label="Best value"
                            />
                          )}
                          <span
                            className={`font-num ${
                              winnerSlug === c.slug
                                ? "font-semibold text-green-700"
                                : ""
                            }`}
                          >
                            {r.render(c)}
                          </span>
                        </div>
                      ) : (
                        <span className="text-slate-300">-</span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function RewardsSection({ cards }: { cards: (Card | null)[] }) {
  const allKeys = Array.from(
    new Set(
      cards
        .filter((c): c is Card => Boolean(c))
        .flatMap((c) => Object.keys(c.rewards)),
    ),
  ).sort();

  if (allKeys.length === 0) return null;

  return (
    <section className="mt-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">
        Rewards rates
      </h3>
      <div className="overflow-hidden rounded-xl border border-slate-200">
        <table className="w-full text-sm">
          <tbody>
            {allKeys.map((key) => {
              const values = cards.map((c) => c?.rewards[key] ?? 0);
              const maxVal = Math.max(...values);
              const allEqual = values.every((v) => v === values[0]);

              return (
                <tr key={key} className="border-b border-slate-100 last:border-0">
                  <td
                    className="bg-slate-50 px-4 py-3 font-medium capitalize text-slate-700"
                    style={{ width: "180px" }}
                  >
                    {key.replaceAll("_", " ")}
                  </td>
                  {cards.map((c, i) => {
                    const v = c?.rewards[key];
                    const isWinner = !allEqual && v === maxVal && v! > 0;
                    return (
                      <td key={i} className="border-l border-slate-100 px-4 py-3">
                        {c ? (
                          v !== undefined ? (
                            <div className="flex items-center gap-1.5">
                              {isWinner && <Check className="h-4 w-4 text-green-600" />}
                              <span
                                className={`font-num ${
                                  isWinner ? "font-semibold text-green-700" : ""
                                }`}
                              >
                                {v}
                                {c.rewards_type === "cashback" ? "%" : "x"}
                              </span>
                            </div>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )
                        ) : (
                          <span className="text-slate-300">-</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function ListSection({
  title,
  cards,
  extract,
}: {
  title: string;
  cards: (Card | null)[];
  extract: (c: Card) => string[];
}) {
  return (
    <section className="mt-8">
      <h3 className="mb-3 text-sm font-bold uppercase tracking-wider text-slate-500">{title}</h3>
      <div
        className={`grid gap-4 ${cards.length === 2 ? "md:grid-cols-2" : "md:grid-cols-3"}`}
      >
        {cards.map((c, i) => (
          <div key={i} className="rounded-xl border border-slate-200 bg-white p-5">
            <div className="mb-2 text-sm font-semibold text-slate-900">{c?.name ?? "-"}</div>
            <ul className="space-y-1.5 text-sm text-slate-600">
              {c ? (
                extract(c).map((item, j) => (
                  <li key={j}>
                    {title === "Drawbacks" ? "-" : "+"} {item}
                  </li>
                ))
              ) : (
                <li className="text-slate-300">-</li>
              )}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
