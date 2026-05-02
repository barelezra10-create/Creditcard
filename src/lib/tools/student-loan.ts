export function studentLoanMonthlyPayment(
  principal: number,
  apr: number,
  termYears: number
): { monthly: number; totalInterest: number; totalPaid: number } {
  const monthlyRate = apr / 12;
  const months = termYears * 12;
  if (monthlyRate === 0) {
    const monthly = principal / months;
    return { monthly, totalInterest: 0, totalPaid: principal };
  }
  const monthly =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));
  const totalPaid = monthly * months;
  return {
    monthly: +monthly.toFixed(2),
    totalInterest: +(totalPaid - principal).toFixed(2),
    totalPaid: +totalPaid.toFixed(2),
  };
}
