import { loadAllAutoInsurance } from "@/lib/insurance/auto-insurance-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Auto Insurance Companies in 2026",
  description: "Compare the best auto insurance companies by premium, coverage, JD Power ratings, and discounts. Independent rankings for every driver profile.",
};

export default function AutoInsuranceListicle() {
  const carriers = loadAllAutoInsurance().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Auto Insurance Companies in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {carriers.length} top auto insurance carriers ranked by premium, coverage, and customer satisfaction.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>Auto insurance is mandatory in virtually every US state, but what you pay and what you get vary enormously by carrier. The two main coverage tiers are liability-only (covers damage you cause to others) and full coverage (adds comprehensive and collision, which covers damage to your own vehicle). Most lenders require full coverage when you finance or lease a car. If your vehicle is older and paid off, liability-only may be sufficient depending on its market value.</p>
        <p>State minimum coverage requirements set the legal floor, but minimums are often too low to fully protect you in a serious accident. High-value vehicles benefit from gap insurance, which covers the difference between your car&apos;s market value and what you owe if it is totaled. Bundling auto with home or renters insurance typically saves 10-25% across most carriers.</p>
        <p>We ranked these {carriers.length} carriers by average premium competitiveness (35%), AM Best financial strength (20%), JD Power customer satisfaction (20%), digital experience (10%), and coverage breadth (15%). Ratings reflect research as of May 2026.</p>
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
                <Stat label="Avg Annual Premium" value={`$${carrier.avg_annual_premium.min.toLocaleString()}-$${carrier.avg_annual_premium.max.toLocaleString()}`} />
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
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Good driver discount</div>
                <div className="mt-1 font-num text-sm text-slate-900">
                  {carrier.good_driver_discount_pct !== null ? `Up to ${carrier.good_driver_discount_pct}%` : "N/A"}
                </div>
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
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these auto insurance carriers</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted average premium competitiveness (35%), AM Best financial strength rating (20%), JD Power customer satisfaction score (20%), digital experience quality (10%), and coverage breadth and options (15%). We did not weight by affiliate payout or advertising relationship.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <Faq q="What types of auto insurance coverage do I need?">
            Every state requires at least liability coverage, which pays for damage and injuries you cause to others. Full coverage adds comprehensive (theft, weather, animals) and collision (accidents involving your car). If you finance or lease, your lender typically requires full coverage. Gap insurance is optional but recommended if you owe more than your car is worth.
          </Faq>
          <Faq q="What is the difference between liability-only and full coverage?">
            Liability-only pays for damage you cause to others. Full coverage adds collision (damage to your vehicle in an accident) and comprehensive (damage from non-collision events like theft, hail, or a fallen tree). Full coverage costs more but protects your vehicle as well.
          </Faq>
          <Faq q="What are state minimum coverage requirements?">
            Each state sets its own minimum liability limits. For example, California requires 15/30/5 (meaning $15K bodily injury per person, $30K per accident, $5K property damage). These minimums are often insufficient for serious accidents. Most financial advisors recommend 100/300/100 or higher.
          </Faq>
          <Faq q="Does bundling home and auto insurance really save money?">
            Yes. Bundling your auto and home (or renters) insurance with the same carrier typically saves 10-25%. Allstate and Liberty Mutual offer some of the highest bundling discounts. State Farm and Nationwide also offer strong multi-policy savings.
          </Faq>
          <Faq q="What is a telematics or usage-based insurance program?">
            Telematics programs (like Progressive Snapshot, GEICO DriveEasy, and State Farm Drive Safe and Save) monitor your driving behavior through a mobile app or device. Safe drivers can earn significant discounts of 10-40%. The tradeoff is sharing driving data with your insurer.
          </Faq>
          <Faq q="Why is USAA rated so highly but not available to everyone?">
            USAA consistently earns the highest customer satisfaction scores and lowest premiums, but eligibility is limited to active military, veterans, and their immediate family members. If you qualify, USAA is typically the best choice.
          </Faq>
          <Faq q="What is an SR-22 and who needs one?">
            An SR-22 is a certificate filed by your insurer with the state to verify you carry minimum required insurance. It is typically required after serious violations like a DUI, reckless driving, or driving uninsured. The General specializes in providing coverage and SR-22 filings for high-risk drivers.
          </Faq>
          <Faq q="How can I lower my auto insurance premium?">
            Strategies include: maintaining a clean driving record, increasing your deductible, bundling with home or renters insurance, asking about all available discounts (good student, military, low mileage), taking a defensive driving course, and shopping quotes annually across multiple carriers.
          </Faq>
          <Faq q="What factors affect my auto insurance rate?">
            Key factors include your driving history, age, location, vehicle type and age, coverage level chosen, credit score (in most states), annual mileage, and whether you have prior insurance gaps. Young drivers and those with recent violations typically pay the highest rates.
          </Faq>
          <Faq q="How often should I shop for new auto insurance?">
            At minimum, compare quotes annually at renewal. Rates change frequently, and loyalty does not always pay. Major life events like moving, buying a new car, or improving your credit score are also good triggers to shop around.
          </Faq>
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

function Faq({ q, children }: { q: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5">
      <h3 className="font-display text-base font-semibold text-navy-900">{q}</h3>
      <p className="mt-2 text-sm text-slate-700">{children}</p>
    </div>
  );
}
