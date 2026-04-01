import { transactions } from "@/data/mockData";
import { getBalance, getTotalIncome, getTotalExpenses, formatCurrency } from "@/utils/finance";
import SummaryCard from "@/components/SummaryCard";
import BalanceChart from "@/components/BalanceChart";
import SpendingChart from "@/components/SpendingChart";
import TransactionsTable from "@/components/TransactionsTable";
import Topbar from "@/components/Topbar";

export default function DashboardPage() {
  const balance = getBalance(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background">
      <Topbar title="Dashboard" />
      <main className="flex-1 p-6 space-y-6 overflow-auto">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard label="Total Balance" value={formatCurrency(balance)} trend={8.2} />
          <SummaryCard label="Income" value={formatCurrency(income)} trend={12.5} variant="income" />
          <SummaryCard label="Expenses" value={formatCurrency(expenses)} trend={3.1} variant="expense" />
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BalanceChart />
          <SpendingChart />
        </div>

        {/* Transactions */}
        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Recent Transactions</h2>
          <TransactionsTable data={transactions} />
        </div>
      </main>
    </div>
  );
}
