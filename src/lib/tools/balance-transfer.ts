export function balanceTransferSavings(p: {
  balance: number; currentApr: number; transferApr: number; transferAprMonths: number; transferFeePct: number; monthlyPayment: number;
}) {
  const transferFee = +(p.balance * p.transferFeePct).toFixed(2);

  let bal = p.balance, mo = 0, totalInterestA = 0;
  while (bal > 0 && mo < 600) {
    const interest = bal * (p.currentApr / 12);
    totalInterestA += interest;
    bal = Math.max(0, bal + interest - p.monthlyPayment);
    mo++;
  }
  let balB = p.balance + transferFee, moB = 0, totalInterestB = 0;
  while (balB > 0 && moB < 600) {
    const apr = moB < p.transferAprMonths ? p.transferApr : p.currentApr;
    const interest = balB * (apr / 12);
    totalInterestB += interest;
    balB = Math.max(0, balB + interest - p.monthlyPayment);
    moB++;
  }
  return {
    transferFee,
    payoffMonths: moB,
    payoffMonthsCurrent: mo,
    totalInterestSaved: +(totalInterestA - totalInterestB).toFixed(2),
    totalCostCurrent: +(p.balance + totalInterestA).toFixed(2),
    totalCostTransfer: +(p.balance + transferFee + totalInterestB).toFixed(2),
  };
}
