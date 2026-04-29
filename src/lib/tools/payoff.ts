export function payoffTimeline(p: { balance: number; apr: number; monthlyPayment: number }) {
  const monthlyRate = p.apr / 12;
  if (p.monthlyPayment <= p.balance * monthlyRate) {
    return { months: Infinity, totalInterest: Infinity, totalPaid: Infinity };
  }
  let bal = p.balance, totalInterest = 0, months = 0;
  while (bal > 0 && months < 600) {
    const interest = bal * monthlyRate;
    totalInterest += interest;
    bal = Math.max(0, bal + interest - p.monthlyPayment);
    months++;
  }
  return { months, totalInterest: +totalInterest.toFixed(2), totalPaid: +(p.balance + totalInterest).toFixed(2) };
}
