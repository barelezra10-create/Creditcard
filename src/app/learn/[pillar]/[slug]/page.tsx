import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { PILLARS } from "@/lib/pillars";
import { loadArticles, loadArticle } from "@/lib/content/loader";
import { AuthorByline } from "@/components/seo/AuthorByline";

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

  const updatedAt = a.updatedAt ?? a.publishedAt ?? "";

  return (
    <article className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">{a.title}</h1>
      <AuthorByline slug="bar-elezra" updatedAt={updatedAt} />
      <div className="prose prose-slate max-w-none">
        <MDXRemote source={a.body} />
      </div>
    </article>
  );
}
