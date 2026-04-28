import Link from "next/link";
import { SITE } from "@/lib/site";

const COLS = [
  { title: "Site", links: [["Glossary", "/glossary"], ["Methodology", "/methodology"], ["How We Make Money", "/how-we-make-money"]] },
  { title: "Company", links: [["About", "/about"], ["Contact", "/contact"], ["Privacy", "/privacy"]] },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-slate-50">
      <div className="mx-auto grid max-w-6xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-base font-bold text-navy-900">{SITE.name}</div>
          <p className="mt-2 max-w-sm text-sm text-slate-600">{SITE.subhead}</p>
        </div>
        {COLS.map((c) => (
          <div key={c.title}>
            <div className="text-sm font-semibold text-slate-900">{c.title}</div>
            <ul className="mt-3 space-y-2">
              {c.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-slate-600 hover:text-navy-900">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-slate-200 px-6 py-4 text-center text-xs text-slate-500">
        © {new Date().getFullYear()} {SITE.name}. Editorial content; not financial advice.
      </div>
    </footer>
  );
}
