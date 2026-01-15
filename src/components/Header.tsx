import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, ChevronDown, Sun, Moon, Menu, LogOut, Settings, User } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import NotificationsDropdown from "./NotificationsDropdown";

interface HeaderProps {
  onMenuClick?: () => void;
}

const Header = ({ onMenuClick }: HeaderProps) => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const displayName = user?.name || "Guest";
  const firstName = displayName.split(" ")[0];
  const initials = user?.avatar || displayName.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) || "G";

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
            Welcome back, {firstName} 👋
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
        <div className="relative">
          <motion.button
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setShowProfileMenu(!showProfileMenu)}
            className="flex items-center gap-2 sm:gap-3 pl-2 sm:pl-3 pr-2 py-2 rounded-xl bg-secondary hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="font-display font-bold text-primary-foreground text-sm">{initials[0]}</span>
            </div>
            <div className="text-left hidden sm:block">
              <p className="text-sm font-medium text-foreground">{displayName}</p>
              <p className="text-xs text-muted-foreground">{user?.isAdmin ? "Admin" : "Premium"}</p>
            </div>
            <ChevronDown size={16} className={`text-muted-foreground ml-1 hidden sm:block transition-transform ${showProfileMenu ? "rotate-180" : ""}`} />
          </motion.button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {showProfileMenu && (
              <>
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileMenu(false)}
                />
                <motion.div
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-56 bg-card rounded-xl border border-border shadow-lg z-50 overflow-hidden"
                >
                  <div className="p-3 border-b border-border">
                    <p className="font-medium text-foreground">{displayName}</p>
                    <p className="text-xs text-muted-foreground truncate">{user?.email}</p>
                  </div>
                  <div className="p-1">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                    >
                      <User size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Profile</span>
                    </button>
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/settings");
                      }}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-secondary transition-colors text-left"
                    >
                      <Settings size={16} className="text-muted-foreground" />
                      <span className="text-sm text-foreground">Settings</span>
                    </button>
                    <div className="border-t border-border my-1" />
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-destructive/10 transition-colors text-left"
                    >
                      <LogOut size={16} className="text-destructive" />
                      <span className="text-sm text-destructive">Logout</span>
                    </button>
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default Header;
