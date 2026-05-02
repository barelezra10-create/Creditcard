import Link from "next/link";
import { TrendingUp, Bot, Umbrella, RefreshCw, GraduationCap } from "lucide-react";

export const metadata = {
  title: "Investing Comparison: Best Investment Accounts for 2026",
  description: "Compare brokerages, robo-advisors, IRAs, Roth IRAs, and 529 college savings plans.",
};

const INVESTING_CATEGORIES = [
  { slug: "brokerages", label: "Brokerages", desc: "Self-directed investing platforms with stocks, ETFs, and more.", Icon: TrendingUp, status: "live" },
  { slug: "robo-advisors", label: "Robo-Advisors", desc: "Automated portfolio management at low cost.", Icon: Bot, status: "soon" },
  { slug: "ira-accounts", label: "IRA Accounts", desc: "Traditional IRAs for tax-deferred retirement savings.", Icon: Umbrella, status: "soon" },
  { slug: "roth-iras", label: "Roth IRAs", desc: "Tax-free growth on after-tax contributions.", Icon: RefreshCw, status: "soon" },
  { slug: "college-savings-529", label: "College Savings (529)", desc: "Tax-advantaged plans for education expenses.", Icon: GraduationCap, status: "soon" },
];

export default function InvestingHub() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Investing</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Compare investment accounts, brokerages, and retirement plans. Independent analysis, no sponsored rankings.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INVESTING_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={c.status === "live" ? `/investing/${c.slug}` : "#"}
            className={`flex flex-col rounded-xl border border-slate-200 bg-white p-6 transition-all ${c.status === "live" ? "hover:border-navy-500 hover:shadow-sm" : "opacity-60"}`}
            aria-disabled={c.status !== "live"}
          >
            <c.Icon className="h-8 w-8 text-navy-700" />
            <div className="mt-4 flex items-center gap-2">
              <span className="font-display text-base font-semibold text-navy-900">{c.label}</span>
              {c.status === "soon" && <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Coming soon</span>}
            </div>
            <p className="mt-2 text-sm text-slate-500">{c.desc}</p>
            {c.status === "live" && <div className="mt-4 text-sm font-medium text-blue-600 hover:underline">Compare &rarr;</div>}
          </Link>
        ))}
      </div>
    </div>
  );
}
