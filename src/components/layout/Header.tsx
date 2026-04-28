import Link from "next/link";
import { SITE } from "@/lib/site";

const NAV = [
  { href: "/best/cashback", label: "Best Cards" },
  { href: "/cards", label: "Reviews" },
  { href: "/tools", label: "Tools" },
  { href: "/learn", label: "Learn" },
  { href: "/compare", label: "Compare" },
];

export function Header() {
  return (
    <header className="border-b border-slate-100 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-display text-lg font-bold text-navy-900">{SITE.name}</Link>
        <nav className="hidden gap-6 md:flex">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className="text-sm font-medium text-slate-700 hover:text-navy-900">{n.label}</Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
