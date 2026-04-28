import Link from "next/link";
import { SITE } from "@/lib/site";

export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6">
      <section className="py-20 text-center">
        <h1 className="font-display text-4xl font-bold text-navy-900 md:text-6xl">{SITE.tagline}</h1>
        <p className="mt-4 text-lg text-slate-600">{SITE.subhead}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/tools/which-card" className="rounded-md bg-navy-900 px-5 py-3 text-sm font-semibold text-white">Take the 60-second quiz</Link>
          <Link href="/best/cashback" className="rounded-md border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-900">Browse top cards</Link>
        </div>
      </section>
    </div>
  );
}
