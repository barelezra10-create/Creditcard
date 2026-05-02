import { loadAllHomeInsurance } from "@/lib/insurance/home-insurance-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Home Insurance Companies in 2026",
  description: "Compare the best homeowners insurance companies by premium, AM Best rating, JD Power satisfaction, and coverage. Independent rankings for every home type.",
};

export default function HomeInsuranceListicle() {
  const carriers = loadAllHomeInsurance().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Home Insurance Companies in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {carriers.length} top homeowners insurance carriers ranked by premium, financial strength, and customer satisfaction.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>Homeowners insurance is not legally required by state law, but virtually every mortgage lender requires it. The standard policy type is HO-3, which covers your home&apos;s structure on an open-perils basis (all risks except those explicitly excluded) and your personal property on a named-perils basis. An HO-5 policy covers both structure and personal property on an open-perils basis, making it the gold standard for comprehensive protection, though it costs more.</p>
        <p>Your policy has two main coverage buckets: dwelling coverage (the physical structure and attached structures like garages) and personal property coverage (furniture, electronics, clothing). Most standard policies also include liability coverage if someone is injured on your property and additional living expenses if a covered loss forces you to relocate temporarily. Critically, standard homeowners policies do not cover flood or earthquake damage. You must purchase separate flood insurance through the National Flood Insurance Program or a private carrier, and separate earthquake insurance if you live in a seismically active region.</p>
        <p>Bundling home and auto insurance with the same carrier typically saves 10-25%, making it one of the highest-value discounts in personal finance. We ranked these {carriers.length} carriers by average premium competitiveness (30%), AM Best financial strength (25%), JD Power customer satisfaction (25%), digital experience (10%), and claims process quality (10%). Ratings reflect research as of May 2026.</p>
      </section>

      {carriers.map((carrier, i) => (
        <article key={carrier.slug} className="my-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-baseline gap-3">
            <div className="font-num text-sm font-semibold text-slate-500">#{i + 1}</div>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{carrier.best_for}</span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{carrier.carrier}</h2>
              <p className="mt-1 text-xs text-slate-500">
                Available in: {carrier.states_available === "all" ? "All 50 states" : `${(carrier.states_available as string[]).length} states`}
              </p>

              {carrier.rating !== undefined && <div className="mt-3"><StarRating rating={carrier.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="Avg Annual Premium" value={`$${carrier.avg_annual_premium.min.toLocaleString()}-$${carrier.avg_annual_premium.max.toLocaleString()}/yr`} />
                <Stat label="AM Best Rating" value={carrier.am_best_rating} />
                <Stat label="JD Power" value={carrier.jd_power_satisfaction !== null ? `${carrier.jd_power_satisfaction}/1000` : "Not rated"} />
                <Stat label="Best For" value={carrier.best_for} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{carrier.perks.map((p) => <li key={p}>+ {p}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{carrier.drawbacks.map((d) => <li key={d}>- {d}</li>)}</ul>
                </div>
              </div>
            </div>

            <div className="md:w-64">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Bundling discount</div>
                <div className="mt-1 font-num font-semibold text-navy-900">
                  {carrier.bundling_discount_pct !== null ? `Up to ${carrier.bundling_discount_pct}%` : "N/A"}
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Claims process</div>
                <div className="mt-1 text-sm capitalize text-slate-900">{carrier.claims_process}</div>
                <a
                  href={carrier.quote_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                >
                  Get a quote on {carrier.carrier} &rarr;
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section className="mt-12 rounded-xl border-l-4 border-navy-500 bg-slate-50 p-6">
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these home insurance companies</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted average premium competitiveness (30%), AM Best financial strength rating (25%), JD Power customer satisfaction score (25%), digital experience quality (10%), and claims process quality (10%). We did not weight by affiliate payout or advertising relationship.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-2">
          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What does homeowners insurance cover?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">A standard HO-3 policy covers your home&apos;s structure and attached structures against open perils (everything except named exclusions), your personal property against named perils like fire and theft, personal liability if someone is injured on your property, and additional living expenses if your home becomes uninhabitable due to a covered loss. It does not cover flood or earthquake by default.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is the difference between HO-3 and HO-5 policies?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">An HO-3 policy covers your home&apos;s dwelling on an open-perils basis but covers personal property only for named perils. An HO-5 policy covers both the dwelling and personal property on an open-perils basis, providing broader protection. HO-5 policies cost roughly 10-15% more but offer superior coverage, especially for high-value possessions.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Does homeowners insurance cover flood damage?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">No. Flood damage is excluded from standard homeowners insurance policies. You must purchase a separate flood insurance policy, either through FEMA&apos;s National Flood Insurance Program (NFIP) or a private carrier. If you live in a FEMA-designated flood zone and have a federally backed mortgage, flood insurance is required.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Does homeowners insurance cover earthquake damage?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">No. Earthquake damage is also excluded from standard policies. If you live in California, Oregon, Washington, or another seismically active region, you should purchase a separate earthquake insurance policy. In California, the California Earthquake Authority (CEA) offers policies through participating insurers.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How much dwelling coverage do I need?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Your dwelling coverage should equal the full replacement cost of rebuilding your home from scratch, not its market value. These are often very different numbers. An insurer can help calculate replacement cost based on your home&apos;s square footage, construction type, and local building costs. Do not underinsure to save on premiums since you could face a large gap in a total loss.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is bundling and how much does it save?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Bundling means purchasing both home and auto insurance from the same carrier. Most major insurers offer discounts of 10-25% when you bundle. State Farm, Allstate, and USAA offer some of the most competitive bundling discounts. The savings typically exceed any premium difference from shopping each policy separately.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is actual cash value vs. replacement cost coverage?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Actual cash value (ACV) pays out the depreciated value of damaged or stolen items. Replacement cost value (RCV) pays what it actually costs to replace them new. For example, if a 5-year-old TV is stolen, ACV might pay $200 while RCV would pay the $600 cost of a comparable new TV. Always choose replacement cost coverage if it fits your budget.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is an AM Best rating and why does it matter?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">AM Best is an independent credit rating agency that evaluates the financial strength and creditworthiness of insurance companies. An A++ or A+ rating indicates superior financial strength, meaning the insurer is highly likely to be able to pay claims even in catastrophic scenarios. Only purchase insurance from carriers rated A or higher by AM Best.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How can I lower my home insurance premium?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Key ways to reduce your premium include: raising your deductible (from $500 to $1,000 can save 10-15%), bundling with auto insurance (10-25% savings), installing security systems and smoke detectors, making your home more weather-resistant (impact-resistant roof, storm shutters), maintaining a good credit score, and shopping quotes annually across multiple carriers.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What does homeowners liability coverage protect?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Liability coverage pays for legal and medical expenses if someone is injured on your property or if you or a family member accidentally causes injury or property damage to others. Standard policies include $100,000 in liability coverage, but most financial advisors recommend $300,000-$500,000. If you have significant assets, consider an umbrella policy for additional coverage above your home and auto limits.</p>
          </details>
        </div>
      </section>
    </article>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-0.5 font-num text-sm font-semibold capitalize text-slate-900">{value}</div>
    </div>
  );
}
