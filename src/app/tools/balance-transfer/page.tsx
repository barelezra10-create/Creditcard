"use client";
import { useState, useMemo } from "react";
import { ToolFrame } from "@/components/tools/ToolFrame";
import { NumberInput } from "@/components/tools/NumberInput";
import { balanceTransferSavings } from "@/lib/tools/balance-transfer";

export default function BalanceTransferTool() {
  const [balance, setBalance] = useState(5000);
  const [currentApr, setCurrentApr] = useState(24);
  const [transferApr, setTransferApr] = useState(0);
  const [transferMonths, setTransferMonths] = useState(18);
  const [feePct, setFeePct] = useState(3);
  const [payment, setPayment] = useState(300);

  const r = useMemo(() => balanceTransferSavings({ balance, currentApr: currentApr / 100, transferApr: transferApr / 100, transferAprMonths: transferMonths, transferFeePct: feePct / 100, monthlyPayment: payment }), [balance, currentApr, transferApr, transferMonths, feePct, payment]);

  return (
    <ToolFrame
      title="Balance Transfer Calculator"
      intro="See how much you'd save (or pay) by moving your balance to a 0% intro APR card."
      inputs={
        <>
          <NumberInput label="Current balance" value={balance} onChange={setBalance} prefix="$" />
          <NumberInput label="Current APR" value={currentApr} onChange={setCurrentApr} suffix="%" step={0.1} />
          <NumberInput label="Transfer APR" value={transferApr} onChange={setTransferApr} suffix="%" step={0.1} />
          <NumberInput label="Intro period" value={transferMonths} onChange={setTransferMonths} suffix="months" />
          <NumberInput label="Transfer fee" value={feePct} onChange={setFeePct} suffix="%" step={0.5} />
          <NumberInput label="Monthly payment" value={payment} onChange={setPayment} prefix="$" />
        </>
      }
      results={
        <div className="space-y-4">
          <Stat label="Transfer fee" value={`$${r.transferFee.toFixed(2)}`} />
          <Stat label="Months to pay off (transfer)" value={`${r.payoffMonths}`} />
          <Stat label="Months to pay off (current)" value={`${r.payoffMonthsCurrent}`} />
          <Stat label="Total interest saved" value={`$${r.totalInterestSaved.toFixed(2)}`} highlight />
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
