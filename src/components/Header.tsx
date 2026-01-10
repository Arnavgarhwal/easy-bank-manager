import { motion } from "framer-motion";
import { Bell, Search, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="flex items-center justify-between mb-8">
      <div>
        <motion.h1 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="font-display text-3xl font-bold text-foreground"
        >
          Welcome back, Alex 👋
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mt-1"
        >
          Here's what's happening with your finances today.
        </motion.p>
      </div>

      <div className="flex items-center gap-4">
        {/* Search */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-64 pl-11 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </motion.div>

        {/* Notifications */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors"
        >
          <Bell size={20} className="text-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-primary animate-pulse-glow" />
        </motion.button>

        {/* Profile */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-3 pl-3 pr-2 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">A</span>
          </div>
          <div className="text-left">
            <p className="text-sm font-medium text-foreground">Alex Johnson</p>
            <p className="text-xs text-muted-foreground">Premium</p>
          </div>
          <ChevronDown size={16} className="text-muted-foreground ml-1" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;