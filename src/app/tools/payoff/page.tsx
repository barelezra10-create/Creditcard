"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { payoffTimeline } from "@/lib/tools/payoff";

export default function PayoffTool() {
  const [balance, setBalance] = useState(3000);
  const [apr, setApr] = useState(22);
  const [payment, setPayment] = useState(150);
  const r = useMemo(() => payoffTimeline({ balance, apr: apr / 100, monthlyPayment: payment }), [balance, apr, payment]);

  return (
    <ToolFrame
      title="Credit Card Payoff Calculator"
      intro="See how long it'll take to pay off your card and how much interest you'll pay."
      inputs={<>
        <NumberInput label="Balance" value={balance} onChange={setBalance} prefix="$" />
        <NumberInput label="APR" value={apr} onChange={setApr} suffix="%" step={0.1} />
        <NumberInput label="Monthly payment" value={payment} onChange={setPayment} prefix="$" />
      </>}
      results={<div className="space-y-4">
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Months to payoff</div><div className="font-num text-2xl font-semibold">{r.months === Infinity ? "Never (raise payment)" : r.months}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Total interest</div><div className="font-num text-2xl font-semibold">{r.totalInterest === Infinity ? "-" : `$${r.totalInterest.toFixed(2)}`}</div></div>
        <div className="rounded-md border border-slate-200 p-4"><div className="text-xs uppercase text-slate-500">Total paid</div><div className="font-num text-2xl font-semibold">{r.totalPaid === Infinity ? "-" : `$${r.totalPaid.toFixed(2)}`}</div></div>
      </div>}
    />
  );
}
