export function dailyInterestCost(balance: number, apr: number): number {
  return +(balance * (apr / 365)).toFixed(4);
}
export function monthlyInterestCost(balance: number, apr: number): number {
  return +(balance * (apr / 12)).toFixed(2);
}
