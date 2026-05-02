"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { loanMonthlyPayment } from "@/lib/tools/loan-payment";

export default function PersonalLoanCalculator() {
  const [principal, setPrincipal] = useState(15000);
  const [apr, setApr] = useState(12);
  const [termMonths, setTermMonths] = useState(48);
  const r = useMemo(() => loanMonthlyPayment(principal, apr / 100, termMonths), [principal, apr, termMonths]);

  return (
    <ToolFrame
      title="Personal Loan Calculator"
      intro="See your monthly payment and total interest cost for any personal loan amount, rate, and term."
      inputs={
        <>
          <NumberInput label="Loan amount" value={principal} onChange={setPrincipal} prefix="$" step={500} />
          <NumberInput label="APR" value={apr} onChange={setApr} suffix="%" step={0.1} />
          <NumberInput label="Term" value={termMonths} onChange={setTermMonths} suffix="months" />
        </>
      }
      results={
        <div className="space-y-4">
          <Stat label="Monthly payment" value={`$${r.monthly.toFixed(2)}`} highlight />
          <Stat label="Total interest" value={`$${r.totalInterest.toFixed(2)}`} />
          <Stat label="Total paid" value={`$${r.totalPaid.toFixed(2)}`} />
        </div>
      }
    />
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-md border p-4 ${highlight ? "border-green-300 bg-green-50" : "border-slate-200"}`}>
      <div className="text-xs uppercase tracking-wider text-slate-500">{label}</div>
      <div className="mt-1 font-num text-2xl font-semibold text-navy-900">{value}</div>
    </div>
  );
}
