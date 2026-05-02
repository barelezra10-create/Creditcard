import { loadAllListicles } from "@/lib/listicles/loader";
import { HeroImage } from "@/components/layout/HeroImage";
import Link from "next/link";

export const metadata = {
  title: "Best Credit Cards by Category",
  description: "Independently ranked best credit cards in every major category.",
};

export default function BestIndex() {
  const listicles = loadAllListicles().sort((a, b) => a.title.localeCompare(b.title));

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">
          Best credit cards by category
        </h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Independently ranked picks across every major credit card category. We score by real
          cardholder value, not by what pays us the most.
        </p>
        <p className="mt-3 text-sm font-medium text-slate-400">
          Ranked across {listicles.length} categories
        </p>
      </header>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {listicles.map((l) => {
          const heroSlug = `best-${l.category}`;
          return (
            <Link
              key={l.slug}
              href={`/best/${l.slug}`}
              className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white transition-all hover:border-navy-500 hover:shadow-sm"
            >
              <HeroImage slug={heroSlug} alt={l.title} className="h-40 w-full object-cover" />
              <div className="flex flex-1 flex-col p-5">
                <div className="font-display text-base font-semibold text-navy-900 group-hover:text-navy-700">
                  {l.title}
                </div>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-500">{l.description}</p>
                <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                  View picks &rarr;
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
