import Link from "next/link";
import { loadArticles } from "@/lib/content/loader";

export const metadata = { title: "Credit Card Glossary" };

export default function GlossaryIndex() {
  const terms = loadArticles("glossary").sort((a, b) => a.title.localeCompare(b.title));
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">Glossary</h1>
      <p className="mt-3 text-slate-600">Plain-English definitions of common credit card terms.</p>
      <ul className="mt-8 grid gap-2 md:grid-cols-2">
        {terms.map((t) => (
          <li key={t.slug}>
            <Link href={`/glossary/${t.slug}`} className="block rounded-md border border-slate-200 p-3 text-navy-700 underline hover:border-navy-500">{t.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
