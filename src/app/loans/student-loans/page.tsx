import { loadAllStudentLoans } from "@/lib/loans/loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best Student Loans in 2026",
  description: "Independently ranked best student loans for 2026. Private loans and refinance options compared by APR, fees, and flexibility.",
};

export default function StudentLoansListicle() {
  const loans = loadAllStudentLoans().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best Student Loans in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {loans.length} private and refinance student loan options.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>If you need money for college, max out federal loans first. Federal loans offer income-driven repayment, forgiveness programs, and protections that private loans do not. Private student loans make sense when you have hit federal loan limits and still need to cover the gap. For graduates with steady income and good credit, refinancing existing federal or private loans into a lower-rate private loan can save thousands, but it permanently gives up federal protections.</p>
        <p>We ranked these {loans.length} loan options by APR ranges, repayment flexibility, cosigner requirements, and fees. Each pick below shows the key terms; click through to the lender&apos;s site for current rates and to apply.</p>
      </section>

      {loans.map((loan, i) => (
        <article key={loan.slug} className="my-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-baseline gap-3">
            <div className="font-num text-sm font-semibold text-slate-500">#{i + 1}</div>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{loan.type === "refinance" ? "Refinance" : "Private student loan"}</span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{loan.lender}: {loan.product_name}</h2>
              <p className="mt-1 text-xs text-slate-500">For {loan.type === "refinance" ? "graduates refinancing existing loans" : "students paying for school"}</p>

              {loan.rating !== undefined && <div className="mt-3"><StarRating rating={loan.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="APR Range" value={`${loan.apr_range.min}-${loan.apr_range.max}%`} />
                <Stat label="APR Type" value={loan.apr_type} />
                <Stat label="Origination Fee" value={loan.origination_fee === 0 ? "$0" : `${(loan.origination_fee * 100).toFixed(2)}%`} />
                <Stat label="Cosigner" value={loan.cosigner_required ? "Required" : "Optional"} />
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
                <div className="text-xs uppercase tracking-wider text-slate-500">Loan amount</div>
                <div className="mt-1 font-num font-semibold text-navy-900">${loan.loan_amount_min.toLocaleString()} {loan.loan_amount_max ? `- $${loan.loan_amount_max.toLocaleString()}` : "+"}</div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Repayment terms</div>
                <div className="mt-1 font-num text-sm text-slate-900">{loan.repayment_terms_years.join(", ")} years</div>
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
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these student loans</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted APR ranges (40%), repayment flexibility including forbearance and income-based options (25%), cosigner requirements and release options (15%), origination and prepayment fees (10%), and customer experience based on industry reviews (10%). We did not weight by affiliate payout.</p>
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
