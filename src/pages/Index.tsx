import AppSidebar from "@/components/AppSidebar";
import { Routes, Route } from "react-router-dom";
import DashboardPage from "@/pages/DashboardPage";
import TransactionsPage from "@/pages/TransactionsPage";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <Routes>
        <Route index element={<DashboardPage />} />
        <Route path="transactions" element={<TransactionsPage />} />
      </Routes>
    </div>
  );
};

export default Index;
