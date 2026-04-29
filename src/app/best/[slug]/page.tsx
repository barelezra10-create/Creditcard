import { notFound } from "next/navigation";
import { loadAllListicles, loadListicleBySlug } from "@/lib/listicles/loader";
import { loadCardBySlug } from "@/lib/cards/loader";
import { PickBlock } from "@/components/listicles/PickBlock";
import { FAQAccordion } from "@/components/listicles/FAQAccordion";
import { MethodologyBlock } from "@/components/listicles/MethodologyBlock";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { StructuredData } from "@/components/seo/StructuredData";

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
    <article className="mx-auto max-w-3xl px-6 py-10">
      <StructuredData data={faqLd} />
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{l.title}</h1>
      <p className="mt-2 text-sm text-slate-600">Updated {l.last_updated}</p>
      <p className="mt-6 text-base leading-relaxed text-slate-700">{l.intro}</p>
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
