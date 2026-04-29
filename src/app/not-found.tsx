import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <h1 className="font-display text-5xl font-bold text-navy-900">404</h1>
      <p className="mt-4 text-lg text-slate-600">
        We could not find that page. Try the homepage or our card index.
      </p>
      <div className="mt-6 flex justify-center gap-3">
        <Link href="/" className="rounded-md bg-navy-900 px-4 py-2 text-sm font-semibold text-white hover:bg-navy-700 transition-colors">
          Home
        </Link>
        <Link href="/cards" className="rounded-md border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition-colors">
          All cards
        </Link>
      </div>
    </div>
  );
}
