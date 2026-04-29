import Link from "next/link";
import { PILLARS } from "@/lib/pillars";

export const metadata = { title: "Learn About Credit Cards" };

export default function LearnIndex() {
  return (
    <div className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">Learn</h1>
      <div className="mt-8 grid gap-4">
        {PILLARS.map((p) => (
          <Link
            key={p.slug}
            href={`/learn/${p.slug}`}
            className="rounded-lg border border-slate-200 p-5 hover:border-navy-500"
          >
            <div className="font-display font-semibold text-navy-900">{p.title}</div>
            <div className="mt-1 text-sm text-slate-600">{p.description}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}
