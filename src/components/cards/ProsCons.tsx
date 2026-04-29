export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <div className="my-6 grid gap-6 md:grid-cols-2">
      <div className="rounded-md border border-green-200 bg-green-50 p-5">
        <h3 className="font-display text-sm font-semibold text-green-700">Pros</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
          {pros.map((p) => <li key={p}>+ {p}</li>)}
        </ul>
      </div>
      <div className="rounded-md border border-amber-200 bg-amber-50 p-5">
        <h3 className="font-display text-sm font-semibold text-amber-700">Cons</h3>
        <ul className="mt-3 space-y-1.5 text-sm text-slate-800">
          {cons.map((c) => <li key={c}>- {c}</li>)}
        </ul>
      </div>
    </div>
  );
}
