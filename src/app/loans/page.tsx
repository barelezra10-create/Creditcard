import Link from "next/link";
import { Banknote, GraduationCap, Car, Building2, Home as HomeIcon } from "lucide-react";

export const metadata = {
  title: "Loans Comparison: Best Loan Options for 2026",
  description: "Compare personal loans, student loans, auto loans, business loans, and mortgages.",
};

const LOAN_CATEGORIES = [
  { slug: "student-loans", label: "Student Loans", desc: "Private student loans and refinancing options.", Icon: GraduationCap, status: "live" },
  { slug: "personal-loans", label: "Personal Loans", desc: "Unsecured loans for debt consolidation, home improvement, and more.", Icon: Banknote, status: "live" },
  { slug: "auto-loans", label: "Auto Loans", desc: "New car loans, used car financing, refinancing.", Icon: Car, status: "soon" },
  { slug: "business-loans", label: "Business Loans", desc: "Term loans, lines of credit, equipment financing.", Icon: Building2, status: "soon" },
  { slug: "mortgages", label: "Mortgages", desc: "Home purchase loans, refinancing, HELOC.", Icon: HomeIcon, status: "soon" },
];

export default function LoansHub() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Loans</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Compare loan products across every major category. Independent reviews, real APR ranges, no upsell games.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {LOAN_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={c.status === "live" ? `/loans/${c.slug}` : "#"}
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
