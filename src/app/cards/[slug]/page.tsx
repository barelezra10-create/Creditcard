import { notFound } from "next/navigation";
import Link from "next/link";
import { Lock } from "lucide-react";
import { loadAllCards, loadCardBySlug } from "@/lib/cards/loader";
import { CardVisual } from "@/components/cards/CardVisual";
import { StatGrid } from "@/components/cards/StatGrid";
import { StarRating } from "@/components/cards/StarRating";
import { ProsCons } from "@/components/cards/ProsCons";
import { RewardsTable } from "@/components/cards/RewardsTable";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StructuredData } from "@/components/seo/StructuredData";
import { SITE } from "@/lib/site";

export function generateStaticParams() {
  return loadAllCards().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = loadCardBySlug(slug);
  if (!card) return {};
  return {
    title: `${card.issuer} ${card.name} Review`,
    description: `Independent review of the ${card.issuer} ${card.name}: APR, fees, rewards, who it's for, and alternatives.`,
  };
}

export default async function CardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const card = loadCardBySlug(slug);
  if (!card) notFound();

  const rating = card.rating ?? 4.5;

  // "Compare similar" — same category, exclude self, max 3
  const allCards = loadAllCards();
  const similarCards = allCards
    .filter((c) => c.slug !== card.slug && c.category.some((cat) => card.category.includes(cat)))
    .slice(0, 3);

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <DisclosureBox />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "Product",
        name: `${card.issuer} ${card.name}`,
        brand: card.issuer,
        category: card.category.join(", "),
        review: {
          "@type": "Review",
          author: { "@type": "Organization", name: SITE.name },
          datePublished: card.last_updated,
        },
      }} />

      <AuthorByline slug="bar-elezra" updatedAt={card.last_updated} />

      <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="text-sm font-semibold text-slate-500">{card.issuer}</div>
          <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{card.name}</h1>
          <div className="mt-2">
            <StarRating rating={rating} label="our rating" />
          </div>
          <p className="mt-1 text-xs text-slate-400" />
        </div>
        <CardVisual card={card} size="lg" />
      </header>

      {/* Big blue CTA */}
      <div className="mt-6 flex flex-col gap-1.5">
        <Link
          href={`/go/${card.slug}`}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition-colors hover:bg-blue-700"
        >
          <Lock className="h-4 w-4" />
          Apply now on {card.issuer}&apos;s site
        </Link>
        <p className="text-xs text-slate-400">on {card.issuer} secure site</p>
      </div>

      {/* 4-col stat grid */}
      <div className="my-8 grid grid-cols-2 divide-slate-100 overflow-hidden rounded-lg border border-slate-200 md:grid-cols-4">
        {[
          { label: "Annual Fee", value: card.annual_fee === 0 ? "$0" : `$${card.annual_fee}` },
          { label: "Purchase APR", value: `${card.apr_purchase.min}–${card.apr_purchase.max}%` },
          { label: "Intro APR", value: card.apr_intro_months > 0 ? `${card.apr_intro}% / ${card.apr_intro_months}mo` : "None" },
          { label: "Recommended Score", value: `${card.credit_score_required.recommended}+` },
        ].map((s, i) => (
          <div key={s.label} className={`bg-white p-4 text-center ${i < 3 ? "border-b border-slate-100 md:border-b-0 md:border-r" : ""}`}>
            <div className="font-num text-lg font-bold text-navy-900">{s.value}</div>
            <div className="mt-0.5 text-xs text-slate-500">{s.label}</div>
          </div>
        ))}
      </div>

      <StatGrid card={card} />
      <h2 className="mt-10 font-display text-2xl font-bold text-navy-900">Rewards</h2>
      <RewardsTable card={card} />
      <ProsCons pros={card.perks} cons={card.drawbacks} />

      {/* Compare similar section */}
      {similarCards.length > 0 && (
        <section className="mt-12 border-t border-slate-100 pt-8">
          <h2 className="font-display text-xl font-bold text-navy-900">Compare similar cards</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            {similarCards.map((c) => (
              <Link
                key={c.slug}
                href={`/cards/${c.slug}`}
                className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white p-4 text-center transition-all hover:border-blue-300 hover:shadow-sm"
              >
                <CardVisual card={c} size="sm" />
                <div className="mt-2 text-xs font-semibold text-navy-900 group-hover:text-blue-700 leading-tight">
                  {c.issuer} {c.name}
                </div>
                {c.rating && (
                  <div className="mt-1">
                    <StarRating rating={c.rating} />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
