import { loadAllLifeInsurance } from "@/lib/insurance/life-insurance-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Life Insurance Companies in 2026",
  description: "Compare the best life insurance companies by coverage amount, term lengths, AM Best rating, and underwriting speed. Independent rankings for every life stage.",
};

export default function LifeInsuranceListicle() {
  const carriers = loadAllLifeInsurance().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Life Insurance Companies in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {carriers.length} top life insurance carriers ranked by coverage, financial strength, and underwriting speed.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>Life insurance is one of the most important financial decisions a family can make, yet it remains widely misunderstood. The three main policy types each serve different needs. Term life insurance provides coverage for a set period (10, 20, or 30 years) at the lowest cost, making it the best choice for most people with a temporary need such as income replacement during working years or mortgage protection. Whole life insurance combines a death benefit with a cash value component that grows tax-deferred, but costs 5-10 times more than term for the same death benefit. Universal life insurance offers flexible premiums and death benefits but requires active management to avoid lapsing.</p>
        <p>A common rule of thumb is to purchase 10 times your annual income in coverage, but a more precise calculation adds your outstanding debts, anticipated future expenses (college, mortgage balance), and the number of years your dependents would need income replacement. A 35-year-old with a $100K salary, $400K mortgage, and two young children might need $1.5M or more in coverage.</p>
        <p>Medical underwriting (requiring a medical exam) typically offers lower premiums for healthy applicants. No-exam policies are faster and more accessible but cost 10-30% more. Several carriers now use accelerated underwriting, which uses data and algorithms to approve applicants without a physical exam at traditional rates. We ranked these {carriers.length} carriers by AM Best financial strength (30%), coverage availability (25%), no-exam options (20%), price competitiveness (15%), and customer experience (10%).</p>
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
                Policy types: {carrier.policy_types.join(", ")}
              </p>

              {carrier.rating !== undefined && <div className="mt-3"><StarRating rating={carrier.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="Coverage" value={`$${(carrier.coverage_amount_min / 1000).toFixed(0)}K-$${(carrier.coverage_amount_max / 1000000).toFixed(1)}M`} />
                <Stat label="Term Lengths" value={carrier.term_lengths_years.length > 0 ? `${carrier.term_lengths_years.join(", ")} yrs` : "N/A"} />
                <Stat label="AM Best" value={carrier.am_best_rating} />
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
                <div className="text-xs uppercase tracking-wider text-slate-500">No-exam available</div>
                <div className="mt-1 font-semibold text-navy-900">
                  {carrier.no_medical_exam_available ? "Yes" : "No"}
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Underwriting speed</div>
                <div className="mt-1 text-sm text-slate-900">{carrier.underwriting_speed}</div>
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
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these life insurance companies</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted AM Best financial strength rating (30%), coverage amount and availability (25%), no-exam and accelerated underwriting options (20%), price competitiveness (15%), and customer experience (10%). We did not weight by affiliate payout or advertising relationship.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-2">
          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is the difference between term and whole life insurance?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Term life insurance provides a death benefit for a fixed period (10, 20, or 30 years) at a low cost, and expires if you outlive it. Whole life insurance covers you for life, builds cash value over time, and never expires, but costs 5-10 times more for the same death benefit. Most financial advisors recommend term life for most people and suggest investing the premium difference separately.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How much life insurance coverage do I need?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">A common starting point is 10 times your annual income. A more precise method is DIME: Debt (all outstanding debts), Income (years until retirement times annual income), Mortgage (remaining balance), and Education (estimated college costs for each child). Sum these four amounts for a thorough estimate. Single people without dependents may need minimal or no life insurance.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is a no-exam or no-medical life insurance policy?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">No-exam policies skip the traditional medical examination and can be approved within days or even minutes. They use health questionnaires, prescription history, and database checks instead. These policies typically cost 10-30% more than fully underwritten policies and may have lower coverage limits. They are best for people who need coverage quickly, have a fear of needles, or have moderate health conditions that might not qualify for preferred rates.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is accelerated underwriting?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Accelerated underwriting uses algorithms, public records, prescription databases, and motor vehicle reports to approve applicants without a medical exam at traditional, fully underwritten rates. Healthy applicants in their 20s to 50s applying for up to $3-5 million in coverage often qualify. It combines the speed of no-exam with the pricing of traditional policies.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How long should my term life policy be?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Choose a term that covers your period of maximum financial obligation. A 30-year-old with a 30-year mortgage and young children might want a 30-year term to cover through the mortgage payoff and until children are financially independent. A 45-year-old with a paid-off house and adult children might only need a 20-year term through retirement. Align the term to when your dependents would no longer need your income.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What are common life insurance riders?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Riders are optional add-ons to a base policy. Common riders include: waiver of premium (premiums waived if you become disabled), accelerated death benefit (access part of the death benefit early if terminally ill), child rider (small death benefit for minor children), guaranteed insurability (buy more coverage later without medical underwriting), and return of premium (get premiums back if you outlive the term, at a higher cost).</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Can I have multiple life insurance policies?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Yes. There is no legal limit on the number of life insurance policies you can own, as long as the total coverage is justifiable relative to your income and financial obligations. A common strategy is layering: purchasing a 30-year term for your full coverage need and a separate 20-year term for additional coverage during peak earning and child-rearing years, then letting the 20-year policy expire when those needs diminish.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is the difference between universal and whole life insurance?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Both are permanent life insurance with a cash value component. Whole life has fixed premiums, guaranteed cash value growth, and guaranteed death benefits. Universal life offers flexible premiums and death benefits, with cash value tied to a declared interest rate or market index (indexed universal life). Universal life can be powerful for tax planning but requires monitoring to ensure the policy does not lapse.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What happens to my life insurance if I stop paying premiums?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">For term insurance, missing payments results in a grace period (usually 30-31 days) then policy lapse. For permanent policies with cash value, most insurers offer nonforfeiture options: reduced paid-up insurance (smaller death benefit, no more premiums), extended term insurance (full death benefit for a shorter term using cash value), or a cash surrender (take the cash value and cancel the policy).</p>
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
