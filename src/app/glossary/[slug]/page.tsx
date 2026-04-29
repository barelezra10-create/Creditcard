import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { loadArticles, loadArticle } from "@/lib/content/loader";

export function generateStaticParams() {
  return loadArticles("glossary").map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = loadArticle("glossary", slug);
  return t ? { title: `${t.title} - Glossary`, description: t.description } : {};
}

export default async function GlossaryTermPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = loadArticle("glossary", slug);
  if (!t) notFound();
  return (
    <article className="prose prose-slate mx-auto max-w-3xl px-6 py-10">
      <p className="text-sm text-slate-500"><Link href="/glossary" className="underline">Glossary</Link> / {t.title}</p>
      <h1>{t.title}</h1>
      <p className="text-sm text-slate-500">Updated {t.updatedAt ?? t.publishedAt}</p>
      <MDXRemote source={t.body} />
    </article>
  );
}
