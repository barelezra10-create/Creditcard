import { AUTHORS } from "@/lib/authors";

export const metadata = {
  title: "Our Editorial Team",
  description: "Independent credit card editors and analysts behind The Credit Card Pick.",
};

export default function TeamPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <header className="mb-10">
        <h1 className="font-display text-3xl font-bold text-navy-900 md:text-4xl">Editorial team</h1>
        <p className="mt-3 text-slate-600">
          Independent credit card analysts. We don&apos;t take money to feature or promote specific
          cards. Every recommendation is editorially driven first, monetized second.
        </p>
      </header>

      <div className="space-y-10">
        {Object.entries(AUTHORS).map(([slug, a]) => (
          <article key={slug} className="flex flex-col gap-5 sm:flex-row sm:gap-6">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={a.photo}
              alt={a.name}
              className="h-24 w-24 rounded-full object-cover sm:h-28 sm:w-28"
            />
            <div className="flex-1">
              <h2 className="font-display text-xl font-bold text-navy-900">{a.name}</h2>
              <div className="mt-0.5 text-sm font-medium text-slate-500">{a.role}</div>
              <p className="mt-3 text-sm leading-relaxed text-slate-700">{a.bio}</p>
            </div>
          </article>
        ))}
      </div>

      <section className="mt-16 rounded-xl border border-slate-200 bg-slate-50 p-8">
        <h3 className="font-display text-lg font-bold text-navy-900">How we work</h3>
        <ul className="mt-4 space-y-3 text-sm leading-relaxed text-slate-700">
          <li>Editorial picks are made BEFORE we check which cards have affiliate offers.</li>
          <li>We review issuer terms quarterly and update card data within 48 hours of changes.</li>
          <li>We disclose every commission relationship on the relevant page.</li>
          <li>We do not accept payment to feature or rank specific cards.</li>
        </ul>
      </section>
    </div>
  );
}
