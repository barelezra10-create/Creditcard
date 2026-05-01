import { notFound } from "next/navigation";
import Link from "next/link";
import { loadAllListicles, loadListicleBySlug } from "@/lib/listicles/loader";
import { loadCardBySlug } from "@/lib/cards/loader";
import { PickBlock } from "@/components/listicles/PickBlock";
import { FAQAccordion } from "@/components/listicles/FAQAccordion";
import { MethodologyBlock } from "@/components/listicles/MethodologyBlock";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { StructuredData } from "@/components/seo/StructuredData";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { HeroImage } from "@/components/layout/HeroImage";
import { SITE } from "@/lib/site";

const FILTER_PILLS = [
  { label: "All cards", href: "/best/cashback" },
  { label: "No annual fee", href: "/best/cashback" },
  { label: "0% APR intro", href: "/best/cashback" },
  { label: "Cash back", href: "/best/cashback" },
  { label: "Travel rewards", href: "/best/travel" },
];

export function generateStaticParams() {
  return loadAllListicles().map((l) => ({ slug: l.slug }));
}
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = loadListicleBySlug(slug);
  return l ? { title: l.title, description: l.description } : {};
}

export default async function ListiclePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const l = loadListicleBySlug(slug);
  if (!l) notFound();

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: l.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <StructuredData data={faqLd} />
      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
          { "@type": "ListItem", position: 2, name: "Best Cards", item: `${SITE.url}/best/` },
          { "@type": "ListItem", position: 3, name: l.title, item: `${SITE.url}/best/${l.slug}/` },
        ],
      }} />
      <DisclosureBox />
      <HeroImage slug={`best-${l.slug}`} alt={l.title} className="my-6 h-64 w-full rounded-2xl object-cover md:h-72" />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{l.title}</h1>
      <AuthorByline slug="bar-elezra" updatedAt={l.last_updated} />

      {/* Filter pills + sort */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FILTER_PILLS.map((pill) => (
            <Link
              key={pill.label}
              href={pill.href}
              className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:border-blue-400 hover:text-blue-700"
            >
              {pill.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500">Sort:</span>
          <select className="rounded-md border border-slate-200 bg-white px-3 py-1 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-300">
            <option>Featured</option>
            <option>Lowest APR</option>
            <option>Highest rewards</option>
          </select>
        </div>
      </div>

      <p className="mb-8 text-base leading-relaxed text-slate-700">{l.intro}</p>

      {l.picks.map((p, i) => {
        const card = loadCardBySlug(p.cardSlug);
        if (!card) return null;
        return <PickBlock key={p.cardSlug} rank={i + 1} bestFor={p.bestFor} blurb={p.blurb} card={card} />;
      })}
      <MethodologyBlock text={l.methodology} />
      <FAQAccordion faqs={l.faqs} />
    </article>
  );
}
