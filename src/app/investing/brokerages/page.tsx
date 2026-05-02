import { loadAllBrokerages } from "@/lib/investing/brokerage-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Online Brokerages in 2026",
  description: "Compare the best online brokerages by commissions, account minimums, asset classes, and research quality. Independent rankings for every investor type.",
};

export default function BrokeragesListicle() {
  const brokerages = loadAllBrokerages().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Online Brokerages in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {brokerages.length} top online brokerages ranked by commissions, features, and research quality.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>The commission-free era, which began when Charles Schwab eliminated stock trading commissions in October 2019 and every major broker followed within days, fundamentally changed retail investing. Today, trading US stocks and ETFs is free at virtually every major brokerage, removing the barrier that once discouraged small and frequent investors. The real differentiators in 2026 are research quality, platform sophistication, account types offered, and the breadth of asset classes available.</p>
        <p>When choosing a brokerage, consider your investment style first. Passive investors focused on index funds and retirement accounts will find Fidelity and Vanguard hard to beat on cost. Active traders who want sophisticated charting, options analytics, and fast execution should look at Interactive Brokers or Charles Schwab&apos;s thinkorswim platform. Beginners who want a simple mobile experience may prefer Robinhood or Webull. Whatever your choice, the account types matter: taxable brokerage accounts, traditional IRAs, Roth IRAs, and rollover IRAs all have different tax treatments and should be considered as part of a comprehensive financial plan.</p>
        <p>We ranked these {brokerages.length} brokerages by commission structure (20%), research quality (25%), account types available (15%), platform experience (20%), asset class breadth (10%), and account minimums (10%). Ratings reflect research as of May 2026.</p>
      </section>

      {brokerages.map((broker, i) => (
        <article key={broker.slug} className="my-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-baseline gap-3">
            <div className="font-num text-sm font-semibold text-slate-500">#{i + 1}</div>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{broker.best_for}</span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{broker.broker}</h2>
              <p className="mt-1 text-xs text-slate-500">
                Asset classes: {broker.asset_classes.join(", ")}
              </p>

              {broker.rating !== undefined && <div className="mt-3"><StarRating rating={broker.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="Stock Commission" value={broker.commission_stocks === 0 ? "$0" : `$${broker.commission_stocks}`} />
                <Stat label="Account Min" value={broker.account_minimum === 0 ? "$0" : `$${broker.account_minimum.toLocaleString()}`} />
                <Stat label="Best For" value={broker.best_for} />
                <Stat label="Asset Classes" value={`${broker.asset_classes.length} types`} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{broker.perks.map((p) => <li key={p}>+ {p}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{broker.drawbacks.map((d) => <li key={d}>- {d}</li>)}</ul>
                </div>
              </div>
            </div>

            <div className="md:w-64">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Options/contract</div>
                <div className="mt-1 font-num font-semibold text-navy-900">
                  {broker.commission_options_per_contract === 0 ? "$0" : `$${broker.commission_options_per_contract}`}
                </div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Research quality</div>
                <div className="mt-1 text-sm capitalize text-slate-900">{broker.research_quality}</div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Fractional shares</div>
                <div className="mt-1 text-sm text-slate-900">{broker.fractional_shares_available ? "Available" : "Not available"}</div>
                <a
                  href={broker.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                >
                  Open account at {broker.broker} &rarr;
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section className="mt-12 rounded-xl border-l-4 border-navy-500 bg-slate-50 p-6">
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these brokerages</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted commission structure and transparency (20%), research and educational quality (25%), account types and retirement options (15%), trading platform and mobile experience (20%), asset class breadth (10%), and account minimums (10%). We did not weight by affiliate payout or advertising relationship.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-2">
          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Are stock trades really free at all brokerages?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">US-listed stock and ETF trades are $0 at virtually all major retail brokerages. Options still carry a per-contract fee at most brokers (typically $0.50-$0.65), though Robinhood and Webull offer free options trading. Mutual fund trades may carry transaction fees for non-proprietary funds at some brokers. The broker earns revenue through payment for order flow, margin interest, and premium services rather than per-trade commissions.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is payment for order flow (PFOF)?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Payment for order flow is a practice where brokers receive compensation from market makers for routing customer orders to them. Critics argue this creates a conflict of interest and results in slightly inferior execution prices. Proponents argue the price improvement from these market makers outweighs the rebate to the broker. Brokers like Fidelity route orders to achieve best execution rather than accepting PFOF, which may result in better fills for some trades.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is the difference between a taxable account and an IRA?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">A taxable brokerage account has no tax advantages but also no restrictions on contributions or withdrawals. Capital gains and dividends are taxed in the year they are realized. A traditional IRA offers a potential tax deduction on contributions and tax-deferred growth, with taxes owed on withdrawals in retirement. A Roth IRA offers no upfront deduction but completely tax-free growth and withdrawals in retirement, making it particularly powerful for younger investors in lower tax brackets.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How much money do I need to open a brokerage account?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Most major brokerages including Fidelity, Schwab, Robinhood, and Webull have no minimum account requirement. You can open an account with $1 and buy fractional shares immediately. Vanguard also has no minimum for most accounts. The $0 minimum revolution means there is no financial barrier to starting an investment account today, no matter how modest your initial savings.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What are fractional shares and why do they matter?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Fractional shares allow you to buy a portion of one share rather than a full share. This means a $100 investor can buy a portion of a stock priced at $500 per share, rather than waiting to save up for a full share. Fidelity, Schwab, and Robinhood all offer fractional shares. Vanguard and E*TRADE do not. Fractional shares are particularly valuable for building a diversified portfolio with limited capital.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Should I use one brokerage or multiple?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Many investors use two accounts: one for long-term retirement investing (often Fidelity or Vanguard for their low-cost index funds) and a separate account for active trading or taxable investing. This separation makes tax reporting simpler and keeps long-term investments from being tempted into short-term trades. There is no penalty for having multiple accounts at different institutions, and SIPC insurance covers each account separately up to $500,000.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is SIPC insurance and does it protect against investment losses?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">SIPC (Securities Investor Protection Corporation) insures brokerage accounts up to $500,000 (including $250,000 in cash) if a brokerage firm fails. It does not protect against investment losses from market movements. SIPC only kicks in if the brokerage firm itself goes bankrupt and customer assets go missing. Most brokerages also carry excess SIPC coverage through private insurance for high-balance accounts.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is a Roth IRA and who should open one?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">A Roth IRA lets you contribute after-tax dollars, and all growth and withdrawals in retirement are completely tax-free. The 2026 contribution limit is $7,000 per year ($8,000 if 50 or older). Roth IRAs are particularly beneficial for young investors who expect to be in a higher tax bracket in retirement than they are today. There are income limits: single filers earning over $161,000 and married filers over $240,000 are phased out of direct Roth IRA contributions.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What research tools should I look for in a brokerage?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Valuable research tools include: independent analyst reports (Morningstar, Credit Suisse, CFRA), stock screeners with fundamental and technical filters, earnings calendars and transcripts, options analytics including profit/loss visualizers and Greeks, portfolio analysis tools showing sector and risk exposure, and educational content for investors at all skill levels. Fidelity and Charles Schwab consistently rank highest for research depth among retail brokers.</p>
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
