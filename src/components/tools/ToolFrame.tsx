export function ToolFrame({ title, intro, inputs, results }: { title: string; intro: string; inputs: React.ReactNode; results: React.ReactNode }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="font-display text-3xl font-bold text-navy-900">{title}</h1>
      <p className="mt-2 max-w-2xl text-slate-600">{intro}</p>
      <div className="mt-8 grid gap-8 md:grid-cols-[1fr_1.2fr]">
        <aside className="space-y-4 md:sticky md:top-6 md:self-start">{inputs}</aside>
        <section>{results}</section>
      </div>
    </div>
  );
}
