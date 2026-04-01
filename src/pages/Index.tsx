import AppSidebar from "@/components/AppSidebar";
import DashboardPage from "@/pages/DashboardPage";

const Index = () => {
  return (
    <div className="flex min-h-screen w-full">
      <AppSidebar />
      <DashboardPage />
    </div>
  );
};

export default Index;
