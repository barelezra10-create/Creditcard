import { AUTHORS, type AuthorSlug } from "@/lib/authors";

export function AuthorByline({ slug, updatedAt }: { slug: AuthorSlug; updatedAt: string }) {
  const a = AUTHORS[slug];
  return (
    <div className="my-6 flex items-center gap-3 rounded-lg border border-slate-100 bg-slate-50 px-4 py-3">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={a.photo} alt={a.name} className="h-10 w-10 rounded-full object-cover ring-2 ring-slate-200" />
      <div className="text-sm">
        <div className="text-slate-500">
          Written by <span className="font-semibold text-slate-900">{a.name}</span>
          <span className="mx-1 text-slate-300">|</span>
          <span className="text-slate-500">{a.role}</span>
        </div>
        <div className="text-xs text-slate-400">Updated {updatedAt}</div>
      </div>
    </div>
  );
}
