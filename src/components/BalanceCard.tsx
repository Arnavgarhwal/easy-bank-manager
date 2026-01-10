import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";

const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-primary/20 via-card to-card border border-primary/20"
    >
      {/* Glow effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-muted-foreground text-sm mb-1">Total Balance</p>
            <div className="flex items-center gap-3">
              <h2 className="font-display text-4xl font-bold text-foreground">
                {showBalance ? "$48,562.00" : "••••••••"}
              </h2>
              <button
                onClick={() => setShowBalance(!showBalance)}
                className="p-2 rounded-lg hover:bg-secondary transition-colors"
              >
                {showBalance ? (
                  <EyeOff size={18} className="text-muted-foreground" />
                ) : (
                  <Eye size={18} className="text-muted-foreground" />
                )}
              </button>
            </div>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 text-success text-sm font-medium">
            <TrendingUp size={14} />
            <span>+12.5%</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-muted-foreground text-xs mb-1">Income</p>
            <p className="font-display text-xl font-semibold text-foreground">$12,450.00</p>
          </div>
          <div>
            <p className="text-muted-foreground text-xs mb-1">Expenses</p>
            <p className="font-display text-xl font-semibold text-foreground">$4,320.00</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BalanceCard;