export function PressStrip() {
  const metrics = [
    { value: "35+", label: "Cards reviewed" },
    { value: "5", label: "Expert editors" },
    { value: "Updated", label: "daily" },
    { value: "0", label: "Paid placements" },
  ];

  return (
    <section className="border-y border-slate-100 bg-slate-50 py-5">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 sm:flex-row sm:justify-between">
        <div className="text-xs font-semibold uppercase tracking-widest text-slate-400">
          Built by independent editors
        </div>
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          {metrics.map((m) => (
            <div key={m.label} className="text-center">
              <div className="font-num text-lg font-bold text-navy-900">{m.value}</div>
              <div className="text-xs text-slate-500">{m.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
