import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Search, 
  Filter, 
  Download, 
  ShoppingCart, 
  Coffee, 
  Zap, 
  Music, 
  Plane, 
  Building2,
  Car,
  Home,
  Smartphone,
  Utensils,
  Heart,
  ChevronDown,
  X,
  Calendar
} from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  timestamp: Date;
  icon: React.ReactNode;
  type: "income" | "expense";
  status: "completed" | "pending" | "failed";
}

const allTransactions: Transaction[] = [
  { id: "1", name: "Amazon Purchase", category: "Shopping", amount: -156.99, date: "Jan 11, 2026", timestamp: new Date("2026-01-11"), icon: <ShoppingCart size={18} />, type: "expense", status: "completed" },
  { id: "2", name: "Salary Deposit", category: "Income", amount: 5200.00, date: "Jan 11, 2026", timestamp: new Date("2026-01-11"), icon: <Building2 size={18} />, type: "income", status: "completed" },
  { id: "3", name: "Starbucks", category: "Food & Drink", amount: -8.50, date: "Jan 10, 2026", timestamp: new Date("2026-01-10"), icon: <Coffee size={18} />, type: "expense", status: "completed" },
  { id: "4", name: "Electric Bill", category: "Utilities", amount: -124.00, date: "Jan 10, 2026", timestamp: new Date("2026-01-10"), icon: <Zap size={18} />, type: "expense", status: "completed" },
  { id: "5", name: "Spotify Premium", category: "Entertainment", amount: -9.99, date: "Jan 8, 2026", timestamp: new Date("2026-01-08"), icon: <Music size={18} />, type: "expense", status: "completed" },
  { id: "6", name: "Flight Booking", category: "Travel", amount: -450.00, date: "Jan 7, 2026", timestamp: new Date("2026-01-07"), icon: <Plane size={18} />, type: "expense", status: "completed" },
  { id: "7", name: "Uber Ride", category: "Transport", amount: -23.50, date: "Jan 6, 2026", timestamp: new Date("2026-01-06"), icon: <Car size={18} />, type: "expense", status: "completed" },
  { id: "8", name: "Freelance Payment", category: "Income", amount: 1500.00, date: "Jan 5, 2026", timestamp: new Date("2026-01-05"), icon: <Building2 size={18} />, type: "income", status: "completed" },
  { id: "9", name: "Rent Payment", category: "Housing", amount: -1800.00, date: "Jan 4, 2026", timestamp: new Date("2026-01-04"), icon: <Home size={18} />, type: "expense", status: "completed" },
  { id: "10", name: "iPhone Accessories", category: "Electronics", amount: -89.99, date: "Jan 3, 2026", timestamp: new Date("2026-01-03"), icon: <Smartphone size={18} />, type: "expense", status: "pending" },
  { id: "11", name: "Restaurant Dinner", category: "Food & Drink", amount: -67.80, date: "Jan 2, 2026", timestamp: new Date("2026-01-02"), icon: <Utensils size={18} />, type: "expense", status: "completed" },
  { id: "12", name: "Gym Membership", category: "Health", amount: -45.00, date: "Jan 1, 2026", timestamp: new Date("2026-01-01"), icon: <Heart size={18} />, type: "expense", status: "completed" },
  { id: "13", name: "Investment Return", category: "Income", amount: 320.00, date: "Dec 30, 2025", timestamp: new Date("2025-12-30"), icon: <Building2 size={18} />, type: "income", status: "completed" },
  { id: "14", name: "Netflix Subscription", category: "Entertainment", amount: -15.99, date: "Dec 28, 2025", timestamp: new Date("2025-12-28"), icon: <Music size={18} />, type: "expense", status: "failed" },
  { id: "15", name: "Gas Station", category: "Transport", amount: -55.00, date: "Dec 27, 2025", timestamp: new Date("2025-12-27"), icon: <Car size={18} />, type: "expense", status: "completed" },
];

const categories = ["All", "Shopping", "Income", "Food & Drink", "Utilities", "Entertainment", "Travel", "Transport", "Housing", "Electronics", "Health"];

const Transactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [amountRange, setAmountRange] = useState({ min: "", max: "" });
  const [showFilters, setShowFilters] = useState(false);
  const [transactionType, setTransactionType] = useState<"all" | "income" | "expense">("all");

  const filteredTransactions = useMemo(() => {
    return allTransactions.filter(transaction => {
      const matchesSearch = transaction.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           transaction.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || transaction.category === selectedCategory;
      const matchesType = transactionType === "all" || transaction.type === transactionType;
      
      let matchesDate = true;
      if (dateRange.from) {
        matchesDate = matchesDate && transaction.timestamp >= new Date(dateRange.from);
      }
      if (dateRange.to) {
        matchesDate = matchesDate && transaction.timestamp <= new Date(dateRange.to);
      }

      let matchesAmount = true;
      const absAmount = Math.abs(transaction.amount);
      if (amountRange.min) {
        matchesAmount = matchesAmount && absAmount >= parseFloat(amountRange.min);
      }
      if (amountRange.max) {
        matchesAmount = matchesAmount && absAmount <= parseFloat(amountRange.max);
      }

      return matchesSearch && matchesCategory && matchesType && matchesDate && matchesAmount;
    });
  }, [searchQuery, selectedCategory, transactionType, dateRange, amountRange]);

  const exportTransactions = () => {
    const csv = [
      ["Date", "Name", "Category", "Amount", "Type", "Status"].join(","),
      ...filteredTransactions.map(t => 
        [t.date, t.name, t.category, t.amount, t.type, t.status].join(",")
      )
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("All");
    setDateRange({ from: "", to: "" });
    setAmountRange({ min: "", max: "" });
    setTransactionType("all");
  };

  const totalIncome = filteredTransactions.filter(t => t.type === "income").reduce((sum, t) => sum + t.amount, 0);
  const totalExpense = filteredTransactions.filter(t => t.type === "expense").reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 max-lg:ml-0 max-lg:pb-24">
        <Header />
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Transactions</h2>
              <p className="text-muted-foreground text-sm mt-1">View and manage all your transactions</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={exportTransactions}
              className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-muted text-foreground rounded-xl font-medium text-sm transition-colors"
            >
              <Download size={18} />
              Export CSV
            </motion.button>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <p className="text-muted-foreground text-sm">Total Transactions</p>
              <p className="font-display text-2xl font-bold text-foreground mt-1">{filteredTransactions.length}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <p className="text-muted-foreground text-sm">Total Income</p>
              <p className="font-display text-2xl font-bold text-success mt-1">+${totalIncome.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <p className="text-muted-foreground text-sm">Total Expenses</p>
              <p className="font-display text-2xl font-bold text-destructive mt-1">-${totalExpense.toLocaleString()}</p>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <div className="bg-card rounded-2xl p-5 border border-border space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search transactions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border transition-colors ${
                  showFilters ? "bg-primary text-primary-foreground border-primary" : "bg-secondary border-border text-foreground hover:bg-muted"
                }`}
              >
                <Filter size={18} />
                Filters
                <ChevronDown size={16} className={`transition-transform ${showFilters ? "rotate-180" : ""}`} />
              </button>
              {(searchQuery || selectedCategory !== "All" || dateRange.from || dateRange.to || amountRange.min || amountRange.max || transactionType !== "all") && (
                <button
                  onClick={clearFilters}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
                >
                  <X size={18} />
                  Clear
                </button>
              )}
            </div>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-border"
              >
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Type</label>
                  <select
                    value={transactionType}
                    onChange={(e) => setTransactionType(e.target.value as "all" | "income" | "expense")}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  >
                    <option value="all">All Types</option>
                    <option value="income">Income</option>
                    <option value="expense">Expense</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">From Date</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">To Date</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Min Amount</label>
                  <input
                    type="number"
                    placeholder="$0"
                    value={amountRange.min}
                    onChange={(e) => setAmountRange(prev => ({ ...prev, min: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Max Amount</label>
                  <input
                    type="number"
                    placeholder="$10,000"
                    value={amountRange.max}
                    onChange={(e) => setAmountRange(prev => ({ ...prev, max: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </motion.div>
            )}
          </div>

          {/* Transactions List */}
          <div className="bg-card rounded-2xl border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground">Transaction</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden sm:table-cell">Category</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden md:table-cell">Date</th>
                    <th className="text-left py-4 px-6 text-sm font-medium text-muted-foreground hidden lg:table-cell">Status</th>
                    <th className="text-right py-4 px-6 text-sm font-medium text-muted-foreground">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.map((transaction, index) => (
                    <motion.tr
                      key={transaction.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: index * 0.03 }}
                      className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                            transaction.type === "income" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
                          }`}>
                            {transaction.icon}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{transaction.name}</p>
                            <p className="text-xs text-muted-foreground sm:hidden">{transaction.category}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-muted-foreground hidden sm:table-cell">{transaction.category}</td>
                      <td className="py-4 px-6 text-sm text-muted-foreground hidden md:table-cell">{transaction.date}</td>
                      <td className="py-4 px-6 hidden lg:table-cell">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                          transaction.status === "completed" ? "bg-success/10 text-success" :
                          transaction.status === "pending" ? "bg-warning/10 text-warning" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {transaction.status}
                        </span>
                      </td>
                      <td className={`py-4 px-6 text-right font-display font-semibold ${
                        transaction.type === "income" ? "text-success" : "text-foreground"
                      }`}>
                        {transaction.type === "income" ? "+" : ""}{transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {filteredTransactions.length === 0 && (
              <div className="py-12 text-center">
                <p className="text-muted-foreground">No transactions found matching your criteria</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Transactions;
