"use client";
import { useState } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { dailyInterestCost, monthlyInterestCost } from "@/lib/tools/apr";

export default function AprTool() {
  const [balance, setBalance] = useState(2000);
  const [apr, setApr] = useState(24.99);
  const daily = dailyInterestCost(balance, apr / 100);
  const monthly = monthlyInterestCost(balance, apr / 100);
  return (
    <ToolFrame
      title="APR Cost Calculator"
      intro="See exactly what your APR costs in real dollars per day and per month."
      inputs={<>
        <NumberInput label="Balance carried" value={balance} onChange={setBalance} prefix="$" />
        <NumberInput label="APR" value={apr} onChange={setApr} suffix="%" step={0.01} />
      </>}
      results={<div className="space-y-4">
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Daily interest</div><div className="font-num text-2xl font-semibold">${daily.toFixed(4)}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Monthly interest</div><div className="font-num text-2xl font-semibold">${monthly.toFixed(2)}</div></div>
      </div>}
    />
  );
}
