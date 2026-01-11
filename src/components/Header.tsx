import { motion } from "framer-motion";
import { Search, ChevronDown, Sun, Moon, Menu } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import NotificationsDropdown from "./NotificationsDropdown";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
      <div className="flex items-center gap-4">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
        >
          <Menu size={20} className="text-foreground" />
        </button>
        <div>
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-2xl sm:text-3xl font-bold text-foreground"
          >
            Welcome back, Arnav 👋
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mt-1 text-sm sm:text-base"
          >
            Here's what's happening with your finances today.
          </motion.p>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        {/* Search - Hidden on mobile */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative hidden md:block"
        >
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search transactions..."
            className="w-48 lg:w-64 pl-11 pr-4 py-2.5 rounded-xl bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </motion.div>

        {/* Theme Toggle */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggleTheme}
          className="p-2.5 rounded-xl bg-secondary hover:bg-muted transition-colors"
        >
          {theme === "dark" ? (
            <Sun size={20} className="text-foreground" />
          ) : (
            <Moon size={20} className="text-foreground" />
          )}
        </motion.button>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <NotificationsDropdown />
        </motion.div>

        {/* Profile */}
        <motion.button
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.02 }}
          className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-2 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
        >
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <span className="font-display font-bold text-primary-foreground text-sm">A</span>
          </div>
          <div className="text-left hidden sm:block">
            <p className="text-sm font-medium text-foreground">Arnav Garhwal</p>
            <p className="text-xs text-muted-foreground">Premium</p>
          </div>
          <ChevronDown size={16} className="text-muted-foreground ml-1 hidden sm:block" />
        </motion.button>
      </div>
    </header>
  );
};

export default Header;