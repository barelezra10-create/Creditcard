import Link from "next/link";
import { HeroImage } from "@/components/layout/HeroImage";

const TOOLS = [
  { href: "/tools/which-card", title: "Which Card Should I Get?", desc: "60-second quiz." },
  { href: "/tools/rewards-optimizer", title: "Rewards Optimizer", desc: "Rank every card by your spend." },
  { href: "/tools/balance-transfer", title: "Balance Transfer Calculator", desc: "See how much you'd save." },
  { href: "/tools/payoff", title: "Payoff Calculator", desc: "How long until you're free." },
  { href: "/tools/apr", title: "APR Cost Calculator", desc: "What APR really costs." },
  { href: "/tools/student-loan-payoff", title: "Student Loan Calculator", desc: "Monthly payment and total interest for any student loan." },
  { href: "/tools/personal-loan-calculator", title: "Personal Loan Calculator", desc: "Monthly payment and total interest for any personal loan." },
];

export const metadata = { title: "Credit Card Tools" };

export default function ToolsIndex() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <HeroImage slug="tools" alt="Credit card tools and calculators" className="mb-8 h-64 w-full rounded-2xl object-cover md:h-80" />
      <h1 className="font-display text-3xl font-bold text-navy-900">Tools</h1>
      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {TOOLS.map((t) => (
          <Link key={t.href} href={t.href} className="rounded-lg border border-slate-200 p-5 hover:border-navy-500">
            <div className="font-display font-semibold text-navy-900">{t.title}</div>
            <div className="mt-1 text-sm text-slate-600">{t.desc}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
