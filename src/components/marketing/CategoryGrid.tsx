import Link from "next/link";
import { IconBestCards } from "@/components/icons/IconBestCards";
import { IconCashBack } from "@/components/icons/IconCashBack";
import { IconTravel } from "@/components/icons/IconTravel";
import { IconBusiness } from "@/components/icons/IconBusiness";
import { IconSecured } from "@/components/icons/IconSecured";
import { IconMiles } from "@/components/icons/IconMiles";

const CATEGORIES = [
  { label: "Best Cards", href: "/best/cashback", Icon: IconBestCards, color: "text-amber-500 bg-amber-50" },
  { label: "Cash Back", href: "/best/cashback", Icon: IconCashBack, color: "text-green-600 bg-green-50" },
  { label: "Travel", href: "/best/travel", Icon: IconTravel, color: "text-amber-500 bg-amber-50" },
  { label: "Business", href: "/best/business", Icon: IconBusiness, color: "text-navy-700 bg-blue-50" },
  { label: "Secured", href: "/best/secured", Icon: IconSecured, color: "text-green-600 bg-green-50" },
  { label: "Miles", href: "/best/miles", Icon: IconMiles, color: "text-amber-500 bg-amber-50" },
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
              <Icon className="h-9 w-9" />
            </div>
            <span className="mt-3 text-xs font-semibold text-slate-800 leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}
