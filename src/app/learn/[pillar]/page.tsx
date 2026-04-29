import { notFound } from "next/navigation";
import Link from "next/link";
import { PILLARS } from "@/lib/pillars";
import { loadArticles } from "@/lib/content/loader";

export function generateStaticParams() {
  return PILLARS.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params;
  const p = PILLARS.find((x) => x.slug === pillar);
  return p ? { title: p.title, description: p.description } : {};
}

export default async function PillarPage({ params }: { params: Promise<{ pillar: string }> }) {
  const { pillar } = await params;
  const p = PILLARS.find((x) => x.slug === pillar);
  if (!p) notFound();

  const articles = loadArticles(`learn/${p.slug}`);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{p.title}</h1>
      <p className="mt-3 text-lg text-slate-600">{p.description}</p>
      {articles.length === 0 ? (
        <p className="mt-8 text-sm text-slate-500">Articles coming soon.</p>
      ) : (
        <ul className="mt-8 divide-y divide-slate-200 border-y border-slate-200">
          {articles.map((a) => (
            <li key={a.slug} className="py-4">
              <Link
                href={`/learn/${p.slug}/${a.slug}`}
                className="font-display text-lg font-semibold text-navy-900 hover:underline"
              >
                {a.title}
              </Link>
              <p className="mt-1 text-sm text-slate-600">{a.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
