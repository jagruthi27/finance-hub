import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { Transaction, transactions as initialTransactions, Role } from "@/data/mockData";

interface AppState {
  transactions: Transaction[];
  role: Role;
  setRole: (role: Role) => void;
  addTransaction: (txn: Omit<Transaction, "id">) => void;
  updateTransaction: (id: string, txn: Partial<Omit<Transaction, "id">>) => void;
  deleteTransaction: (id: string) => void;
  isAdmin: boolean;
}

const AppContext = createContext<AppState | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>(initialTransactions);
  const [role, setRole] = useState<Role>("Admin");

  const addTransaction = useCallback((txn: Omit<Transaction, "id">) => {
    setTransactions((prev) => [
      { ...txn, id: crypto.randomUUID() },
      ...prev,
    ]);
  }, []);

  const updateTransaction = useCallback((id: string, updates: Partial<Omit<Transaction, "id">>) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  }, []);

  const deleteTransaction = useCallback((id: string) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <AppContext.Provider
      value={{
        transactions,
        role,
        setRole,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        isAdmin: role === "Admin",
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppState() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppState must be used within AppProvider");
  return ctx;
}
