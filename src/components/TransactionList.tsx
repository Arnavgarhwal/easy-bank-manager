import { motion } from "framer-motion";
import { ShoppingCart, Coffee, Zap, Music, Plane, Building2 } from "lucide-react";

interface Transaction {
  id: string;
  name: string;
  category: string;
  amount: number;
  date: string;
  icon: React.ReactNode;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  { id: "1", name: "Amazon Purchase", category: "Shopping", amount: -156.99, date: "Today, 2:30 PM", icon: <ShoppingCart size={18} />, type: "expense" },
  { id: "2", name: "Salary Deposit", category: "Income", amount: 5200.00, date: "Today, 9:00 AM", icon: <Building2 size={18} />, type: "income" },
  { id: "3", name: "Starbucks", category: "Food & Drink", amount: -8.50, date: "Yesterday, 4:15 PM", icon: <Coffee size={18} />, type: "expense" },
  { id: "4", name: "Electric Bill", category: "Utilities", amount: -124.00, date: "Yesterday, 11:00 AM", icon: <Zap size={18} />, type: "expense" },
  { id: "5", name: "Spotify", category: "Entertainment", amount: -9.99, date: "Jan 8, 2026", icon: <Music size={18} />, type: "expense" },
  { id: "6", name: "Flight Booking", category: "Travel", amount: -450.00, date: "Jan 7, 2026", icon: <Plane size={18} />, type: "expense" },
];

const TransactionItem = ({ transaction, index }: { transaction: Transaction; index: number }) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ duration: 0.3, delay: index * 0.05 }}
    className="flex items-center justify-between py-4 border-b border-border last:border-0 hover:bg-secondary/30 px-2 -mx-2 rounded-lg transition-colors cursor-pointer"
  >
    <div className="flex items-center gap-4">
      <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
        transaction.type === "income" ? "bg-success/10 text-success" : "bg-secondary text-muted-foreground"
      }`}>
        {transaction.icon}
      </div>
      <div>
        <p className="font-medium text-foreground">{transaction.name}</p>
        <p className="text-xs text-muted-foreground">{transaction.category} • {transaction.date}</p>
      </div>
    </div>
    <p className={`font-display font-semibold ${
      transaction.type === "income" ? "text-success" : "text-foreground"
    }`}>
      {transaction.type === "income" ? "+" : ""}{transaction.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
    </p>
  </motion.div>
);

const TransactionList = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-card rounded-3xl p-6 border border-border"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-display font-semibold text-lg text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:text-primary/80 font-medium transition-colors">
          View All
        </button>
      </div>
      <div>
        {transactions.map((transaction, index) => (
          <TransactionItem key={transaction.id} transaction={transaction} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default TransactionList;