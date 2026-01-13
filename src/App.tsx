import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cards from "./pages/Cards";
import Transactions from "./pages/Transactions";
import Transfers from "./pages/Transfers";
import Settings from "./pages/Settings";
import Bills from "./pages/Bills";
import SavingsGoals from "./pages/SavingsGoals";
import HelpCenter from "./pages/HelpCenter";
import ActivityLogs from "./pages/ActivityLogs";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import TaxSummary from "./pages/TaxSummary";
import FinancialReports from "./pages/FinancialReports";
import Rewards from "./pages/Rewards";
import CurrencyConverter from "./pages/CurrencyConverter";
import LoanCalculator from "./pages/LoanCalculator";
import BillCalendar from "./pages/BillCalendar";
import CardRewards from "./pages/CardRewards";
import QRPayments from "./pages/QRPayments";
import ExpenseAnalytics from "./pages/ExpenseAnalytics";
import BudgetPlanner from "./pages/BudgetPlanner";
import RecurringTransfers from "./pages/RecurringTransfers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/cards" element={<Cards />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/transfers" element={<Transfers />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/bills" element={<Bills />} />
            <Route path="/savings" element={<SavingsGoals />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/activity" element={<ActivityLogs />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/tax-summary" element={<TaxSummary />} />
            <Route path="/reports" element={<FinancialReports />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/currency" element={<CurrencyConverter />} />
            <Route path="/loan-calculator" element={<LoanCalculator />} />
            <Route path="/bill-calendar" element={<BillCalendar />} />
            <Route path="/card-rewards" element={<CardRewards />} />
            <Route path="/qr-payments" element={<QRPayments />} />
            <Route path="/expense-analytics" element={<ExpenseAnalytics />} />
            <Route path="/budget" element={<BudgetPlanner />} />
            <Route path="/recurring-transfers" element={<RecurringTransfers />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
