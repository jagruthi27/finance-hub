import { Transaction } from "@/data/mockData";

export function getTotalIncome(txns: Transaction[]): number {
  return txns.filter((t) => t.type === "income").reduce((s, t) => s + t.amount, 0);
}

export function getTotalExpenses(txns: Transaction[]): number {
  return txns.filter((t) => t.type === "expense").reduce((s, t) => s + t.amount, 0);
}

export function getBalance(txns: Transaction[]): number {
  return getTotalIncome(txns) - getTotalExpenses(txns);
}

export function getSpendingByCategory(txns: Transaction[]) {
  const map: Record<string, number> = {};
  txns
    .filter((t) => t.type === "expense")
    .forEach((t) => {
      map[t.category] = (map[t.category] || 0) + t.amount;
    });
  return Object.entries(map)
    .map(([name, value]) => ({ name, value: Math.round(value * 100) / 100 }))
    .sort((a, b) => b.value - a.value);
}

export function formatCurrency(n: number): string {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(n);
}
