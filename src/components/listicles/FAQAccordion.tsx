"use client";
import { useState } from "react";

export function FAQAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  return (
    <section className="my-10">
      <h2 className="font-display text-2xl font-bold text-navy-900">FAQ</h2>
      <div className="mt-6 divide-y divide-slate-200 border-y border-slate-200">
        {faqs.map((f) => <FAQItem key={f.q} {...f} />)}
      </div>
    </section>
  );
}
function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="py-4">
      <button onClick={() => setOpen(!open)} className="flex w-full items-center justify-between text-left">
        <span className="font-medium text-slate-900">{q}</span>
        <span className="font-num text-slate-400">{open ? "-" : "+"}</span>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-slate-700">{a}</p>}
    </div>
  );
}
