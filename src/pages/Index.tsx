import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import BalanceCard from "@/components/BalanceCard";
import CreditCard from "@/components/CreditCard";
import QuickActions from "@/components/QuickActions";
import TransactionList from "@/components/TransactionList";
import SpendingChart from "@/components/SpendingChart";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header />
        
        <div className="grid grid-cols-12 gap-6">
          {/* Left Column - Balance & Cards */}
          <div className="col-span-8 space-y-6">
            <BalanceCard />
            <QuickActions />
            <TransactionList />
          </div>

          {/* Right Column - Cards & Chart */}
          <div className="col-span-4 space-y-6">
            <div className="space-y-4">
              <h3 className="font-display font-semibold text-lg text-foreground">My Cards</h3>
              <CreditCard />
              <CreditCard 
                variant="secondary" 
                cardNumber="5421 •••• •••• 3456"
                cardHolder="ALEX JOHNSON"
                expiryDate="08/27"
              />
            </div>
            <SpendingChart />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;