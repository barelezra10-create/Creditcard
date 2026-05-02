import Link from "next/link";
import { Shield, Home as HomeIcon, Heart, Activity, Building, PawPrint } from "lucide-react";

export const metadata = {
  title: "Insurance Comparison: Best Insurance for 2026",
  description: "Compare auto, home, life, health, renters, and pet insurance. Independent reviews, real quotes.",
};

const INSURANCE_CATEGORIES = [
  { slug: "auto-insurance", label: "Auto Insurance", desc: "Compare car insurance rates from top carriers.", Icon: Shield, status: "live" },
  { slug: "home-insurance", label: "Home Insurance", desc: "Homeowners insurance for every budget and coverage need.", Icon: HomeIcon, status: "live" },
  { slug: "life-insurance", label: "Life Insurance", desc: "Term and whole life policies compared.", Icon: Heart, status: "live" },
  { slug: "health-insurance", label: "Health Insurance", desc: "Individual and family health plan options.", Icon: Activity, status: "soon" },
  { slug: "renters-insurance", label: "Renters Insurance", desc: "Affordable coverage for renters starting under $20/month.", Icon: Building, status: "soon" },
  { slug: "pet-insurance", label: "Pet Insurance", desc: "Vet cost coverage for dogs and cats.", Icon: PawPrint, status: "soon" },
];

export default function InsuranceHub() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Insurance</h1>
        <p className="mt-2 max-w-2xl text-slate-600">Compare auto, home, life and more. Independent reviews, real quotes. We help you find the right coverage without the upsell.</p>
      </header>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {INSURANCE_CATEGORIES.map((c) => (
          <Link
            key={c.slug}
            href={c.status === "live" ? `/insurance/${c.slug}` : "#"}
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
