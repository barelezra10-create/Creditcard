import { notFound } from "next/navigation";
import Link from "next/link";
import { loadAllCards, loadCardBySlug } from "@/lib/cards/loader";
import { CardVisual } from "@/components/cards/CardVisual";
import { StatGrid } from "@/components/cards/StatGrid";
import { ProsCons } from "@/components/cards/ProsCons";
import { RewardsTable } from "@/components/cards/RewardsTable";
import { DisclosureBox } from "@/components/seo/DisclosureBox";

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

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <DisclosureBox />
      <header className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <div className="text-sm font-semibold text-slate-500">{card.issuer}</div>
          <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{card.name}</h1>
          <p className="mt-2 text-sm text-slate-600">Updated {card.last_updated}</p>
        </div>
        <CardVisual card={card} size="md" />
      </header>

      <Link href={`/go/${card.slug}`} className="mt-6 inline-block rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white">Apply on {card.issuer}'s site</Link>

      <StatGrid card={card} />
      <h2 className="mt-10 font-display text-2xl font-bold text-navy-900">Rewards</h2>
      <RewardsTable card={card} />
      <ProsCons pros={card.perks} cons={card.drawbacks} />
    </article>
  );
}
