import Link from "next/link";
import { CreditCard, Plane, Briefcase, Shield, MapPin, Percent } from "lucide-react";

const CATEGORIES = [
  { label: "Best Cards", href: "/best/cashback", Icon: CreditCard, color: "text-blue-600 bg-blue-50" },
  { label: "Cash Back", href: "/best/cashback", Icon: Percent, color: "text-green-600 bg-green-50" },
  { label: "Travel", href: "/best/travel", Icon: Plane, color: "text-sky-600 bg-sky-50" },
  { label: "Business", href: "/best/business", Icon: Briefcase, color: "text-violet-600 bg-violet-50" },
  { label: "Secured", href: "/best/secured", Icon: Shield, color: "text-amber-600 bg-amber-50" },
  { label: "Miles", href: "/best/miles", Icon: MapPin, color: "text-rose-600 bg-rose-50" },
];

export function CategoryGrid() {
  return (
    <section className="py-8">
      <h2 className="mb-5 font-display text-xl font-bold text-navy-900">Browse by category</h2>
      <div className="grid grid-cols-3 gap-3 sm:grid-cols-6">
        {CATEGORIES.map(({ label, href, Icon, color }) => (
          <Link
            key={label}
            href={href}
            className="group flex flex-col items-center rounded-xl border border-slate-200 bg-white px-3 py-5 text-center transition-all hover:border-blue-300 hover:shadow-md"
          >
            <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${color} transition-transform group-hover:scale-105`}>
              <Icon className="h-6 w-6" />
            </div>
            <span className="mt-3 text-xs font-semibold text-slate-800 leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
