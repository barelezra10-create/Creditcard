import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PILLARS } from "@/lib/pillars";
import { loadArticles, loadArticle } from "@/lib/content/loader";

export function generateStaticParams() {
  const out: { pillar: string; slug: string }[] = [];
  for (const p of PILLARS) {
    for (const a of loadArticles(`learn/${p.slug}`)) {
      out.push({ pillar: p.slug, slug: a.slug });
    }
  }
  return out;
}

export async function generateMetadata({ params }: { params: Promise<{ pillar: string; slug: string }> }) {
  const { pillar, slug } = await params;
  const a = loadArticle(`learn/${pillar}`, slug);
  return a ? { title: a.title, description: a.description } : {};
}

export default async function ArticlePage({ params }: { params: Promise<{ pillar: string; slug: string }> }) {
  const { pillar, slug } = await params;
  const a = loadArticle(`learn/${pillar}`, slug);
  if (!a) notFound();

  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <h1>{a.title}</h1>
      <p className="text-sm text-slate-500">Updated {a.updatedAt ?? a.publishedAt}</p>
      <MDXRemote source={a.body} />
    </article>
  );
}
