import { useAppState } from "@/context/AppContext";
import { getBalance, getTotalIncome, getTotalExpenses, formatCurrency } from "@/utils/finance";
import SummaryCard from "@/components/SummaryCard";
import BalanceChart from "@/components/BalanceChart";
import SpendingChart from "@/components/SpendingChart";
import TransactionsTable from "@/components/TransactionsTable";
import InsightsPanel from "@/components/InsightsPanel";
import TransactionForm from "@/components/TransactionForm";
import Topbar from "@/components/Topbar";
import MobileNav from "@/components/MobileNav";

export default function DashboardPage() {
  const { transactions, isAdmin } = useAppState();
  const balance = getBalance(transactions);
  const income = getTotalIncome(transactions);
  const expenses = getTotalExpenses(transactions);

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background min-w-0">
      <Topbar title="Dashboard">
        {isAdmin && <TransactionForm />}
      </Topbar>
      <MobileNav />
      <main className="flex-1 p-4 md:p-6 space-y-5 overflow-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <SummaryCard label="Total Balance" value={formatCurrency(balance)} trend={8.2} />
          <SummaryCard label="Income" value={formatCurrency(income)} trend={12.5} variant="income" />
          <SummaryCard label="Expenses" value={formatCurrency(expenses)} trend={3.1} variant="expense" />
        </div>

        <InsightsPanel />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BalanceChart />
          <SpendingChart />
        </div>

        <div>
          <h2 className="text-base font-semibold text-foreground mb-3">Recent Transactions</h2>
          <TransactionsTable data={transactions} />
        </div>
      </main>
    </div>
  );
}
