import Link from "next/link";
import { SITE } from "@/lib/site";
import { loadAllListicles } from "@/lib/listicles/loader";
import { PILLARS } from "@/lib/pillars";
import { EmailCapture } from "@/components/marketing/EmailCapture";
import { HeroImage } from "@/components/layout/HeroImage";
import { PressStrip } from "@/components/marketing/PressStrip";
import { CategoryGrid } from "@/components/marketing/CategoryGrid";

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

const LISTICLE_HERO_SLUGS: Record<string, string> = {
  cashback: "best-cashback",
  travel: "best-travel",
  secured: "best-secured",
  business: "best-business",
  miles: "best-miles",
};

export default function Home() {
  const allListicles = loadAllListicles();
  const featuredSlugs = ["cashback", "travel", "secured"];
  const featuredListicles = featuredSlugs
    .map((s) => allListicles.find((l) => l.slug === s))
    .filter((l): l is NonNullable<typeof l> => Boolean(l));

  return (
    <div>
      {/* HERO: navy band above lifestyle image */}
      <section className="bg-navy-900">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-8 py-12 md:grid-cols-2 md:items-center md:py-16">
            {/* Text side */}
            <div>
              <h1 className="font-display text-4xl font-bold text-white md:text-5xl leading-tight">
                {SITE.tagline}
              </h1>
              <p className="mt-4 text-lg text-navy-200 leading-relaxed">{SITE.subhead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/tools/which-card"
                  className="rounded-md bg-white px-5 py-3 text-sm font-bold text-navy-900 transition-colors hover:bg-slate-100"
                >
                  Take the 60-second quiz
                </Link>
                <Link
                  href="/best/cashback"
                  className="rounded-md border border-white/30 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-700"
                >
                  Browse top cards
                </Link>
              </div>
            </div>
            {/* Image side */}
            <div>
              <HeroImage
                slug="homepage-tech-1-fan"
                alt="Premium credit cards arranged in a fan with teal and amber glow on deep navy background"
                className="h-64 w-full rounded-2xl object-cover shadow-2xl ring-1 ring-white/10 md:h-[340px]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-6">
        {/* Press / credibility strip */}
        <div className="-mx-6">
          <PressStrip />
        </div>

        {/* Category grid */}
        <CategoryGrid />

        {/* Why us strip */}
        <section className="rounded-2xl bg-slate-50 px-8 py-10 border border-slate-100">
          <div className="grid gap-6 sm:grid-cols-3">
            <div>
              <div className="text-lg font-bold text-navy-900 font-display">Independent</div>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                No paid placements. Every pick is based on math and real cardholder value.
              </p>
            </div>
            <div>
              <div className="text-lg font-bold text-navy-900 font-display">Transparent</div>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                We publish our scoring methodology and update picks quarterly.
              </p>
            </div>
            <div>
              <div className="text-lg font-bold text-navy-900 font-display">Practical</div>
              <p className="mt-1 text-sm text-slate-500 leading-relaxed">
                Free tools that run in your browser. No account. No upsells.
              </p>
            </div>
          </div>
        </section>

        {/* Top picks: listicle categories */}
        <section className="py-12 border-t border-slate-100">
          <h2 className="font-display text-2xl font-bold text-navy-900 md:text-3xl">
            Top picks by category
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Curated shortlists, ranked by what matters to real cardholders.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featuredListicles.map((listicle) => {
              const heroSlug = LISTICLE_HERO_SLUGS[listicle.slug];
              return (
                <Link
                  key={listicle.slug}
                  href={`/best/${listicle.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white overflow-hidden hover:border-navy-500 hover:shadow-sm transition-all"
                >
                  {heroSlug && (
                    <HeroImage
                      slug={heroSlug}
                      alt={listicle.title}
                      className="h-40 w-full object-cover"
                    />
                  )}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="font-display text-base font-semibold text-navy-900 group-hover:text-navy-700">
                      {listicle.title}
                    </div>
                    <p className="mt-2 flex-1 text-sm text-slate-500 leading-relaxed">
                      {listicle.description}
                    </p>
                    <div className="mt-4 text-sm font-medium text-blue-600 group-hover:underline">
                      View picks &rarr;
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Tools featured */}
        <section className="rounded-2xl bg-slate-50 px-8 py-10 border border-slate-100">
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
    </div>
  );
}
