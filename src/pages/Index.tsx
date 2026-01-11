import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import CreditCard from "@/components/CreditCard";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import SpendingChart from "@/components/SpendingChart";

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Left Column - Balance & Cards */}
          <div className="xl:col-span-8 space-y-6">
            <BalanceCard />
            <QuickActions />
            <TransactionList />
          </div>

          {/* Right Column - Cards & Chart */}
          <div className="xl:col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">My Cards</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-1 gap-4">
                <CreditCard />
                <CreditCard 
                  variant="secondary" 
                  cardNumber="5421 •••• •••• 3456"
                  cardHolder="ARNAV GARHWAL"
                  expiryDate="08/27"
                />
              </div>
            </div>
            <SpendingChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;