import Link from "next/link";
import { PiggyBank, CreditCard, Lock, TrendingUp, Landmark } from "lucide-react";

export const metadata = {
  title: "Banking Comparison: Best Bank Accounts for 2026",
  description: "Compare savings accounts, checking accounts, CDs, money market accounts, and high-yield savings.",
};

const BANKING_CATEGORIES = [
  { slug: "savings-accounts", label: "Savings Accounts", desc: "Traditional savings accounts from banks and credit unions.", Icon: PiggyBank, status: "soon" },
  { slug: "checking-accounts", label: "Checking Accounts", desc: "Fee-free and high-yield checking options.", Icon: CreditCard, status: "soon" },
  { slug: "cds", label: "CDs", desc: "Certificates of deposit with guaranteed returns.", Icon: Lock, status: "soon" },
  { slug: "money-market-accounts", label: "Money Market Accounts", desc: "Higher rates with flexible access.", Icon: Landmark, status: "soon" },
  { slug: "high-yield-savings", label: "High-Yield Savings", desc: "Earn 10x more than traditional savings rates.", Icon: TrendingUp, status: "soon" },
];

export default function BankingHub() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Banking</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Find the best bank accounts for your money. We compare rates, fees, and features across savings, checking, CDs, and more.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {BANKING_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href="#"
            className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 opacity-60 transition-all"
            aria-disabled
          >
            <c.Icon className="h-8 w-8 text-navy-700" />
            <div className="mt-4 flex items-center gap-2">
              <span className="font-display text-base font-semibold text-navy-900">{c.label}</span>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700">Coming soon</span>
            </div>
            <p className="mt-2 text-sm text-slate-500">{c.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
