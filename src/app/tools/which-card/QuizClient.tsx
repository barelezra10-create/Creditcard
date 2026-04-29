"use client";
import { useState } from "react";
import Link from "next/link";
import type { Card } from "@/lib/cards/types";
import { recommendFromAnswers, type Answers } from "@/lib/tools/quiz";
import { CardVisual } from "@/components/cards/CardVisual";

const QUESTIONS = [
  { key: "goal", label: "What's your main goal?", options: [["cashback", "Earn cashback"], ["travel", "Earn travel rewards"], ["build", "Build / rebuild credit"], ["balance-transfer", "Pay down a balance"], ["business", "Get a business card"]] },
  { key: "creditScore", label: "What's your credit score?", options: [[500, "Below 580"], [620, "580-669"], [700, "670-739"], [760, "740-799"], [820, "800+"]] },
  { key: "annualFeeOk", label: "OK paying an annual fee?", options: [[false, "No"], [true, "Yes, if it pays for itself"]] },
] as const;

export default function QuizClient({ cards }: { cards: Card[] }) {
  const [step, setStep] = useState(0);
  const [a, setA] = useState<Partial<Answers>>({ monthlySpend: 1500, categories: ["other"] });

  if (step >= QUESTIONS.length) {
    const recs = recommendFromAnswers(cards, a as Answers);
    return (
      <div className="mx-auto max-w-3xl px-6 py-10">
        <h1 className="font-display text-3xl font-bold text-navy-900">Your top picks</h1>
        {recs.length === 0 ? (
          <p className="mt-6 text-slate-600">No matches in our current database. Try widening your answers.</p>
        ) : (
          <ol className="mt-8 space-y-4">
            {recs.map((c, i) => (
              <li key={c.slug} className="flex items-center gap-4 rounded-lg border border-slate-200 p-4">
                <CardVisual card={c} size="sm" />
                <div className="flex-1">
                  <div className="font-num text-xs text-slate-500">#{i + 1}</div>
                  <div className="font-display font-semibold text-navy-900">{c.issuer} {c.name}</div>
                  <Link href={`/cards/${c.slug}`} className="text-sm text-navy-700 underline">Read review</Link>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    );
  }

  const q = QUESTIONS[step];
  return (
    <div className="mx-auto max-w-2xl px-6 py-16 text-center">
      <div className="text-sm font-semibold text-slate-500">Step {step + 1} of {QUESTIONS.length}</div>
      <h2 className="mt-2 font-display text-2xl font-bold text-navy-900">{q.label}</h2>
      <div className="mt-6 grid gap-3">
        {q.options.map(([val, label]) => (
          <button key={String(val)} onClick={() => { setA({ ...a, [q.key]: val } as any); setStep(step + 1); }} className="rounded-md border border-slate-300 px-4 py-3 text-left hover:border-navy-500">{label}</button>
        ))}
      </div>
    </div>
  );
}
