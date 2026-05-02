import { loadAllSavingsAccounts } from "@/lib/banking/savings-loader";
import { DisclosureBox } from "@/components/seo/DisclosureBox";
import { AuthorByline } from "@/components/seo/AuthorByline";
import { StarRating } from "@/components/cards/StarRating";

export const metadata = {
  title: "Best High-Yield Savings Accounts in 2026",
  description: "Compare the best high-yield savings accounts by APY, fees, minimum deposit, and features. Independent rankings updated for 2026 rate environment.",
};

export default function SavingsAccountsListicle() {
  const accounts = loadAllSavingsAccounts().sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));

  return (
    <article className="mx-auto max-w-4xl px-6 py-10">
      <DisclosureBox />
      <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Best High-Yield Savings Accounts in 2026</h1>
      <p className="mt-2 text-sm text-slate-600">Compare {accounts.length} top high-yield savings accounts ranked by APY, fees, and features.</p>
      <AuthorByline slug="bar-elezra" updatedAt="2026-05-02" />

      <section className="my-8 prose prose-slate max-w-none">
        <p>A high-yield savings account (HYSA) is a savings account that pays significantly more interest than a traditional bank savings account. While the national average savings rate at traditional banks hovers near 0.5%, high-yield savings accounts at online banks routinely pay 4-5% APY. The primary reason is that online-only banks have lower overhead costs than banks with branch networks, and they pass those savings to depositors as higher interest rates.</p>
        <p>All the accounts on this list are FDIC-insured up to $250,000 per depositor per institution, meaning your money is protected by the federal government even if the bank fails. APYs on high-yield savings accounts are variable, meaning they can change at any time based on the Federal Reserve&apos;s federal funds rate. When the Fed raises rates, savings APYs tend to rise; when the Fed cuts rates, APYs follow. This is why locking in a high APY via a certificate of deposit (CD) may make sense when you expect rates to fall.</p>
        <p>We ranked these {accounts.length} accounts by APY competitiveness (40%), fee structure (25%), minimum deposit requirements (15%), digital experience (10%), and additional features (10%). Ratings reflect research as of May 2026.</p>
      </section>

      {accounts.map((account, i) => (
        <article key={account.slug} className="my-8 rounded-xl border border-slate-200 bg-white p-6">
          <div className="flex items-baseline gap-3">
            <div className="font-num text-sm font-semibold text-slate-500">#{i + 1}</div>
            <span className="rounded-full bg-navy-50 px-2 py-0.5 text-xs font-semibold text-navy-700">{account.best_for}</span>
          </div>

          <div className="mt-3 flex flex-col gap-6 md:flex-row md:items-start">
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{account.product_name}</h2>
              <p className="mt-1 text-xs text-slate-500">{account.bank}</p>

              {account.rating !== undefined && <div className="mt-3"><StarRating rating={account.rating} /></div>}

              <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-4">
                <Stat label="APY" value={`${account.apy.toFixed(2)}%`} />
                <Stat label="Monthly Fee" value={account.monthly_fee === 0 ? "$0" : `$${account.monthly_fee}`} />
                <Stat label="Min Deposit" value={account.min_opening_deposit === 0 ? "$0" : `$${account.min_opening_deposit}`} />
                <Stat label="Best For" value={account.best_for} />
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <div>
                  <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{account.perks.map((p) => <li key={p}>+ {p}</li>)}</ul>
                </div>
                <div>
                  <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
                  <ul className="mt-2 space-y-1 text-sm text-slate-700">{account.drawbacks.map((d) => <li key={d}>- {d}</li>)}</ul>
                </div>
              </div>
            </div>

            <div className="md:w-64">
              <div className="rounded-lg border border-slate-200 p-4">
                <div className="text-xs uppercase tracking-wider text-slate-500">FDIC Insured</div>
                <div className="mt-1 font-semibold text-navy-900">{account.fdic_insured ? "Yes" : "No"}</div>
                <div className="mt-3 text-xs uppercase tracking-wider text-slate-500">Mobile app rating</div>
                <div className="mt-1 text-sm text-slate-900">
                  {account.mobile_app_rating !== null ? `${account.mobile_app_rating}/5` : "N/A"}
                </div>
                <a
                  href={account.application_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 block rounded-md bg-blue-600 px-4 py-3 text-center text-sm font-bold text-white hover:bg-blue-700"
                >
                  Open account at {account.bank} &rarr;
                </a>
              </div>
            </div>
          </div>
        </article>
      ))}

      <section className="mt-12 rounded-xl border-l-4 border-navy-500 bg-slate-50 p-6">
        <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these savings accounts</h3>
        <p className="mt-2 text-sm text-slate-700">We weighted APY competitiveness (40%), fee structure and transparency (25%), minimum deposit requirements (15%), mobile and digital experience (10%), and additional features like ATM access and savings tools (10%). We did not weight by affiliate payout or advertising relationship.</p>
      </section>

      <section className="mt-12 space-y-6">
        <h2 className="font-display text-2xl font-bold text-navy-900">Frequently Asked Questions</h2>

        <div className="space-y-2">
          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is a high-yield savings account?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">A high-yield savings account is a federally insured deposit account that pays a significantly higher interest rate than a standard savings account. Online-only banks, which have lower overhead costs, typically offer the best rates. In 2026, top HYSAs are paying 4-5% APY compared to the national average of roughly 0.5% at traditional banks.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Are high-yield savings accounts FDIC insured?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Yes. All the accounts on this list are FDIC-insured up to $250,000 per depositor per institution. Credit union savings accounts are insured by the NCUA, which provides the same $250,000 protection. If you need to hold more than $250,000 in savings, consider spreading funds across multiple FDIC-insured institutions to maximize protection.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Why do high-yield savings rates keep changing?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">High-yield savings APYs are variable and tied to the Federal Reserve&apos;s federal funds rate. When the Fed raises rates to fight inflation, savings rates rise. When the Fed cuts rates to stimulate the economy, savings rates fall. Unlike CDs, which lock in a rate for a fixed term, savings accounts adjust freely. If you expect rates to fall, consider moving some savings to a CD to lock in today&apos;s higher rates.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>What is the difference between APY and APR?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">APY (Annual Percentage Yield) reflects the real return on your savings including compounding. APR (Annual Percentage Rate) does not account for compounding. For savings accounts, always look at APY. For example, a 4.00% interest rate compounded daily yields an APY slightly above 4.00%. The more frequent the compounding, the higher the effective APY.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How much should I keep in a high-yield savings account?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Financial advisors typically recommend keeping 3-6 months of living expenses in a liquid, FDIC-insured savings account as your emergency fund. Beyond that, money you expect to need within 1-2 years is also well-suited for a HYSA. Money with a longer time horizon (retirement, down payment in 5+ years) is generally better invested in a diversified portfolio with higher expected returns.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Is it safe to bank with an online-only bank?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Yes, as long as the bank is FDIC-insured. All the banks on this list are legitimate, federally regulated institutions. The only practical difference is no physical branch access. Customer service is handled by phone, chat, and app. Transfers to and from external accounts take 1-3 business days. For most people, the significantly higher APY more than compensates for the lack of branches.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Can I withdraw money from a high-yield savings account at any time?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">Yes. High-yield savings accounts are liquid, meaning you can withdraw your money at any time. Federal Regulation D previously limited savings withdrawals to 6 per month, but the Fed suspended that rule in 2020. Most banks still have their own limits but typically allow unlimited transfers. For immediate cash needs, a savings account without an ATM card requires an ACH transfer to a linked checking account, which takes 1-3 business days.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>Should I open multiple savings accounts at different banks?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">It can make sense in two scenarios. First, if your savings exceed $250,000, spreading across multiple FDIC-insured banks maximizes federal insurance coverage. Second, having separate accounts at different institutions for different goals (emergency fund, vacation fund, down payment) can provide mental separation and reduce the temptation to dip into one goal&apos;s savings for another. Banks like Ally even offer a buckets feature within a single account to achieve the same effect.</p>
          </details>

          <details className="group border-b border-slate-200 py-4">
            <summary className="flex cursor-pointer items-center justify-between font-medium text-slate-900 list-none">
              <span>How do I move money into a high-yield savings account?</span>
              <span className="text-slate-400 group-open:rotate-45 transition-transform">+</span>
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-slate-700">The most common method is an ACH transfer from your existing checking or savings account. You link your external account during the application process by providing your routing and account numbers. Transfers typically clear in 1-3 business days. Some banks also accept wire transfers (faster, but may have fees) and mobile check deposits for the initial funding.</p>
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
