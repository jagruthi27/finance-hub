import { useAppState } from "@/context/AppContext";
import TransactionsTable from "@/components/TransactionsTable";
import TransactionForm from "@/components/TransactionForm";
import Topbar from "@/components/Topbar";
import MobileNav from "@/components/MobileNav";

export default function TransactionsPage() {
  const { transactions, isAdmin } = useAppState();

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-background min-w-0">
      <Topbar title="Transactions">
        {isAdmin && <TransactionForm />}
      </Topbar>
      <MobileNav />
      <main className="flex-1 p-4 md:p-6 overflow-auto">
        <TransactionsTable data={transactions} />
      </main>
    </div>
  );
}
