import { loadAllPersonalLoans } from "@/lib/loans/personal-loan-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Personal Loans in 2026",
  description: "Compare the best personal loans for debt consolidation, home improvement, and emergencies. Independent rankings by APR, fees, and credit flexibility.",
};

export default function PersonalLoansListicle() {
  const loans = loadAllPersonalLoans().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Personal Loans in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {loans.length} personal loan lenders ranked by APR, fees, and credit flexibility.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>A personal loan is a lump-sum, fixed-rate loan you repay in equal monthly installments over a set term. Unlike a credit card, you know exactly when it will be paid off. Personal loans make the most sense for debt consolidation (combining multiple high-interest balances into one lower-APR payment), home improvement projects where a HELOC is overkill, unexpected medical expenses, or any large purchase where spreading the cost over 2-5 years at a fixed rate beats revolving credit card interest.</p>
        <p>Most personal loans are unsecured, meaning no collateral required. Secured options exist at lenders like OneMain Financial and Best Egg if you need better odds of approval or a lower rate. Your credit score is the biggest factor in the rate you receive: borrowers above 720 typically qualify for rates under 12%, while those below 600 may see rates near 30%.</p>
        <p>We ranked these {loans.length} lenders by APR competitiveness (40%), origination and other fees (25%), credit score flexibility (15%), funding speed (10%), and customer experience (10%). We did not rank by affiliate payout.</p>
      </section>

      {loans.map((loan, i) => (
        <article key={loan.slug} className="my-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-baseline gap-3">
            <div className="font-num text-sm font-semibold text-slate-500">#{i + 1}</div>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{loan.best_for}</span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{loan.lender}: {loan.product_name}</h2>
              <p className="mt-1 text-xs text-slate-500">Funding speed: {loan.funding_speed}</p>

              {loan.rating !== undefined && <div className="mt-3"><StarRating rating={loan.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="APR Range" value={`${loan.apr_range.min}-${loan.apr_range.max}%`} />
                <Stat label="Loan Amount" value={`$${loan.loan_amount_min.toLocaleString()}-$${loan.loan_amount_max.toLocaleString()}`} />
                <Stat label="Term" value={`${Math.min(...loan.repayment_terms_months)}-${Math.max(...loan.repayment_terms_months)} mo`} />
                <Stat
                  label="Origination Fee"
                  value={loan.origination_fee.max === 0 ? "$0" : `${loan.origination_fee.min}-${loan.origination_fee.max}%`}
                />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{loan.perks.map((p) => <li key={p}>+ {p}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{loan.drawbacks.map((d) => <li key={d}>- {d}</li>)}</ul>
                </div>
              </div>
            </div>

            <div className="md:w-64">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">Credit score needed</div>
                <div className="mt-1 font-num font-semibold text-navy-900">{loan.credit_score_required.min}+ min</div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Funding speed</div>
                <div className="mt-1 font-num text-sm text-slate-900">{loan.funding_speed}</div>
                <a
                  href={loan.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                >
                  Visit {loan.lender} &rarr;
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section className="mt-12 rounded-xl border-l-4 border-navy-500 bg-slate-50 p-6">
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these personal loans</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted APR competitiveness (40%), origination and other fees (25%), credit score flexibility (15%), funding speed (10%), and customer experience based on industry reviews (10%). We did not weight by affiliate payout.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-4">
          <Faq q="What is a personal loan?">
            A personal loan is an installment loan from a bank, credit union, or online lender. You receive a lump sum upfront and repay it in fixed monthly payments over a set term, usually 2-7 years. Most personal loans are unsecured, meaning you do not need to put up collateral.
          </Faq>
          <Faq q="What can you use a personal loan for?">
            Personal loans can be used for nearly anything: debt consolidation, home improvement, medical bills, moving costs, weddings, or emergencies. Some lenders restrict use for business expenses, education, or investing.
          </Faq>
          <Faq q="What credit score do you need for a personal loan?">
            It varies by lender. Top-tier lenders like LightStream and SoFi prefer 720+. Mid-tier lenders like LendingClub and Best Egg accept 600-640. Lenders like Upstart and OneMain serve borrowers below 580, but rates will be high.
          </Faq>
          <Faq q="What is an origination fee?">
            An origination fee is a one-time charge the lender deducts from your loan proceeds at closing, expressed as a percentage of the loan. A $10,000 loan with a 5% origination fee means you receive $9,500 but repay $10,000 plus interest. SoFi, LightStream, Marcus, and Discover charge no origination fee.
          </Faq>
          <Faq q="Is a personal loan better than a credit card for debt consolidation?">
            Usually yes, if you qualify for a rate below your current credit card APR. Credit cards average 20-22% APR. A personal loan at 10-15% with a fixed payoff timeline can save hundreds or thousands over the repayment period. The key is not running up new card balances after consolidating.
          </Faq>
          <Faq q="What is the difference between secured and unsecured personal loans?">
            Unsecured loans require no collateral. Secured personal loans require you to pledge an asset (such as a vehicle or savings account) as collateral. Secured loans may offer lower rates or higher approval odds for borrowers with imperfect credit, but you risk losing the asset if you default.
          </Faq>
          <Faq q="How fast can I get a personal loan?">
            Some lenders like SoFi and LightStream fund same-day or next business day after approval. Others take 2-4 business days. Approval itself can take minutes to a few days depending on your documentation and the lender.
          </Faq>
          <Faq q="What is the average personal loan interest rate?">
            As of 2026, average personal loan APRs range from roughly 12-15% for good-credit borrowers. Excellent credit (720+) can qualify for 7-10%. Fair credit (580-660) typically sees 18-28% APR. Bad credit often exceeds 30%.
          </Faq>
          <Faq q="Does getting a personal loan hurt your credit score?">
            Applying triggers a hard inquiry, which may temporarily lower your score by a few points. Over time, making on-time payments improves your payment history and can raise your score. Adding a personal loan also diversifies your credit mix, which is a positive factor.
          </Faq>
          <Faq q="Can I pay off a personal loan early?">
            Most lenders on this list charge no prepayment penalty, meaning you can pay off the loan early and save on interest at no cost. Always verify before signing, as some lenders do charge prepayment fees.
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
