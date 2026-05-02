export function loanMonthlyPayment(
  principal: number,
  apr: number,
  termMonths: number
): { monthly: number; totalInterest: number; totalPaid: number } {
  const monthlyRate = apr / 12;
  if (monthlyRate === 0) {
    const monthly = principal / termMonths;
    return { monthly, totalInterest: 0, totalPaid: principal };
  }
  const monthly =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -termMonths));
  const totalPaid = monthly * termMonths;
  return {
    monthly: +monthly.toFixed(2),
    totalInterest: +(totalPaid - principal).toFixed(2),
    totalPaid: +totalPaid.toFixed(2),
  };
}
