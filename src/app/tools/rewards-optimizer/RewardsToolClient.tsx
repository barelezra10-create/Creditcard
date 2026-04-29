"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { yearlyRewardsValue } from "@/lib/tools/rewards-optimizer";
import type { Card } from "@/lib/cards/types";

export default function RewardsToolClient({ cards }: { cards: Card[] }) {
  const [groceries, setGroceries] = useState(500);
  const [dining, setDining] = useState(200);
  const [travel, setTravel] = useState(150);
  const [other, setOther] = useState(1000);

  const ranked = useMemo(() => {
    const spend = { groceries, dining, travel, other };
    return [...cards]
      .map((c) => ({ card: c, value: yearlyRewardsValue(c, spend) }))
      .sort((a, b) => b.value - a.value);
  }, [cards, groceries, dining, travel, other]);

  return (
    <ToolFrame
      title="Rewards Optimizer"
      intro="Tell us your monthly spend. We'll rank every card by yearly rewards value."
      inputs={<>
        <NumberInput label="Groceries / mo" value={groceries} onChange={setGroceries} prefix="$" />
        <NumberInput label="Dining / mo" value={dining} onChange={setDining} prefix="$" />
        <NumberInput label="Travel / mo" value={travel} onChange={setTravel} prefix="$" />
        <NumberInput label="Other / mo" value={other} onChange={setOther} prefix="$" />
      </>}
      results={<ol className="space-y-2">
        {ranked.map(({ card, value }, i) => (
          <li key={card.slug} className="flex items-center justify-between rounded-md border border-slate-200 p-3">
            <div><span className="font-num text-sm text-slate-500">#{i + 1}</span> <span className="font-semibold">{card.issuer} {card.name}</span></div>
            <div className="font-num font-semibold text-green-600">${value.toFixed(0)}/yr</div>
          </li>
        ))}
      </ol>}
    />
  );
}
