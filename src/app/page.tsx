import Link from "next/link";
import { SITE } from "@/lib/site";
import { loadAllListicles } from "@/lib/listicles/loader";
import { PILLARS } from "@/lib/pillars";
import { EmailCapture } from "@/components/marketing/EmailCapture";

const TOOLS = [
  {
    href: "/tools/which-card",
    name: "Which Card Quiz",
    description: "Answer 6 questions and get a personalized card recommendation in under a minute.",
  },
  {
    href: "/tools/rewards-optimizer",
    name: "Rewards Optimizer",
    description: "See which card earns the most on your actual spending mix.",
  },
  {
    href: "/tools/balance-transfer",
    name: "Balance Transfer Calculator",
    description: "Compare transfer offers and find your real break-even point.",
  },
  {
    href: "/tools/payoff",
    name: "Payoff Calculator",
    description: "Enter your balance, rate, and payment to see the exact date you will be free.",
  },
];

export default function Home() {
  const allListicles = loadAllListicles();
  const featuredSlugs = ["cashback", "travel", "secured"];
  const featuredListicles = featuredSlugs
    .map((s) => allListicles.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div className="mx-auto max-w-6xl px-6">

      {/* Hero */}
      <section className="py-16 text-center md:py-24">
        <h1 className="font-display text-4xl font-bold text-navy-900 md:text-6xl">
          {SITE.tagline}
        </h1>
        <p className="mt-4 text-lg text-slate-500 md:text-xl">{SITE.subhead}</p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/tools/which-card"
            className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white hover:bg-navy-700 transition-colors"
          >
            Take the 60-second quiz
          </Link>
          <Link
            href="/best/cashback"
            className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors"
          >
            Browse top cards
          </Link>
        </div>
      </section>

      {/* Top picks: listicle categories */}
      <section className="py-12 border-t border-slate-100">
        <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          Find your category
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Curated shortlists, ranked by what matters to real cardholders.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredListicles.map((listicle) => (
            <Link
              key={listicle.slug}
              href={`/best/${listicle.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-navy-500 hover:shadow-sm transition-all"
            >
              <div className="font-display text-base font-semibold text-navy-900 group-hover:text-navy-700">
                {listicle.title}
              </div>
              <p className="mt-2 flex-1 text-sm text-slate-500 leading-relaxed">
                {listicle.description}
              </p>
              <div className="mt-4 text-sm font-medium text-navy-700 group-hover:underline">
                View picks &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Tools featured */}
      <section className="py-12 border-t border-slate-100">
        <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          Powerful tools, no signup required
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Free calculators and decision aids that run entirely in your browser.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {TOOLS.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-green-500 hover:shadow-sm transition-all"
            >
              <div className="font-display text-sm font-semibold text-navy-900 group-hover:text-navy-700">
                {tool.name}
              </div>
              <p className="mt-2 flex-1 text-xs text-slate-500 leading-relaxed">
                {tool.description}
              </p>
              <div className="mt-3 text-xs font-medium text-green-700 group-hover:underline">
                Open &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Learn: pillar excerpts */}
      <section className="py-12 border-t border-slate-100">
        <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
          Learn the basics
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Plain-language guides covering everything from APR to points math.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PILLARS.map((pillar) => (
            <Link
              key={pillar.slug}
              href={`/learn/${pillar.slug}`}
              className="group flex flex-col rounded-xl border border-slate-200 bg-white p-5 hover:border-amber-500 hover:shadow-sm transition-all"
            >
              <div className="font-display text-sm font-semibold text-navy-900 group-hover:text-navy-700">
                {pillar.title}
              </div>
              <p className="mt-2 flex-1 text-xs text-slate-500 leading-relaxed">
                {pillar.description}
              </p>
              <div className="mt-3 text-xs font-medium text-amber-500 group-hover:underline">
                Read guide &rarr;
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Email capture */}
      <section className="py-12 border-t border-slate-100">
        <h2 className="font-display text-xl font-bold text-navy-900 mb-4">
          Stay in the loop
        </h2>
        <div className="max-w-lg">
          <EmailCapture />
        </div>
      </section>

      {/* Trust strip */}
      <section className="py-10 border-t border-slate-100">
        <div className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-6">
          <p className="text-sm text-slate-500">
            Independent reviews. No paid placements. Real math.
          </p>
          <Link
            href="/methodology"
            className="text-sm font-medium text-navy-700 underline underline-offset-2 hover:text-navy-900"
          >
            How we pick cards
          </Link>
        </div>
      </section>

    </div>
  );
}
