export function MethodologyBlock({ text }: { text: string }) {
  return (
    <section className="my-10 rounded-md border-l-4 border-navy-500 bg-slate-50 p-5">
      <h3 className="font-display text-base font-semibold text-navy-900">How we ranked these cards</h3>
      <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
    </section>
  );
}
