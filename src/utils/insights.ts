import { Transaction } from "@/data/mockData";
import { getSpendingByCategory, formatCurrency, getTotalExpenses } from "@/utils/finance";

export interface Insight {
  label: string;
  value: string;
  description: string;
}

export function generateInsights(transactions: Transaction[]): Insight[] {
  const insights: Insight[] = [];
  const expenses = transactions.filter((t) => t.type === "expense");

  if (expenses.length === 0) return [];

  // Highest spending category
  const byCategory = getSpendingByCategory(transactions);
  if (byCategory.length > 0) {
    const top = byCategory[0];
    const totalExp = getTotalExpenses(transactions);
    const pct = totalExp > 0 ? Math.round((top.value / totalExp) * 100) : 0;
    insights.push({
      label: "Top Spending",
      value: top.name,
      description: `${formatCurrency(top.value)} (${pct}% of expenses)`,
    });
  }

  // Average transaction size
  const avgExpense = expenses.reduce((s, t) => s + t.amount, 0) / expenses.length;
  insights.push({
    label: "Avg Expense",
    value: formatCurrency(avgExpense),
    description: `Across ${expenses.length} expense transactions`,
  });

  // Largest single expense
  const largest = expenses.reduce((max, t) => (t.amount > max.amount ? t : max), expenses[0]);
  insights.push({
    label: "Largest Expense",
    value: formatCurrency(largest.amount),
    description: `${largest.description} on ${largest.date}`,
  });

  // Income vs expenses ratio
  const income = transactions.filter((t) => t.type === "income");
  const totalIncome = income.reduce((s, t) => s + t.amount, 0);
  const totalExpenses = getTotalExpenses(transactions);
  if (totalIncome > 0) {
    const savingsRate = Math.round(((totalIncome - totalExpenses) / totalIncome) * 100);
    insights.push({
      label: "Savings Rate",
      value: `${savingsRate}%`,
      description: savingsRate > 20 ? "Healthy savings rate" : savingsRate > 0 ? "Consider saving more" : "Spending exceeds income",
    });
  }

  return insights;
}
