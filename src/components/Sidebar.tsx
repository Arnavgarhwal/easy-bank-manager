import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowLeftRight, 
  PieChart, 
  Receipt, 
  Settings,
  HelpCircle,
  LogOut,
  X,
  FileText,
  Target,
  Activity,
  Calculator,
  Gift,
  QrCode,
  Calendar,
  TrendingUp,
  Wallet,
  RefreshCw,
  DollarSign
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

const NavItem = ({ icon, label, active, onClick }: NavItemProps) => (
  <motion.button
    whileHover={{ x: 4 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
      active 
        ? "bg-primary text-primary-foreground shadow-lg" 
        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
    }`}
  >
    {icon}
    <span>{label}</span>
    {active && (
      <motion.div
        layoutId="activeIndicator"
        className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-foreground"
      />
    )}
  </motion.button>
);

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path: string) => {
    navigate(path);
    onClose?.();
  };

  const sidebarContent = (
    <>
      {/* Logo */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-effect">
            <span className="font-display font-bold text-primary-foreground text-lg">V</span>
          </div>
          <span className="font-display font-semibold text-xl text-foreground">Vault</span>
        </div>
        <button
          onClick={onClose}
          className="lg:hidden p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <X size={20} className="text-muted-foreground" />
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-1 overflow-y-auto">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={location.pathname === "/"} 
          onClick={() => handleNavigation("/")}
        />
        <NavItem 
          icon={<CreditCard size={20} />} 
          label="Cards" 
          active={location.pathname === "/cards"}
          onClick={() => handleNavigation("/cards")}
        />
        <NavItem 
          icon={<ArrowLeftRight size={20} />} 
          label="Transfers"
          active={location.pathname === "/transfers"}
          onClick={() => handleNavigation("/transfers")}
        />
        <NavItem 
          icon={<RefreshCw size={20} />} 
          label="Recurring Transfers"
          active={location.pathname === "/recurring-transfers"}
          onClick={() => handleNavigation("/recurring-transfers")}
        />
        <NavItem 
          icon={<Receipt size={20} />} 
          label="Transactions"
          active={location.pathname === "/transactions"}
          onClick={() => handleNavigation("/transactions")}
        />
        <NavItem 
          icon={<PieChart size={20} />} 
          label="Analytics" 
          active={location.pathname === "/analytics"} 
          onClick={() => handleNavigation("/analytics")}
        />
        <NavItem 
          icon={<TrendingUp size={20} />} 
          label="Expense Analytics"
          active={location.pathname === "/expense-analytics"}
          onClick={() => handleNavigation("/expense-analytics")}
        />
        <NavItem 
          icon={<Wallet size={20} />} 
          label="Budget Planner"
          active={location.pathname === "/budget"}
          onClick={() => handleNavigation("/budget")}
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="Bills & Payments"
          active={location.pathname === "/bills"}
          onClick={() => handleNavigation("/bills")}
        />
        <NavItem 
          icon={<Calendar size={20} />} 
          label="Bill Calendar"
          active={location.pathname === "/bill-calendar"}
          onClick={() => handleNavigation("/bill-calendar")}
        />
        <NavItem 
          icon={<Target size={20} />} 
          label="Savings Goals"
          active={location.pathname === "/savings"}
          onClick={() => handleNavigation("/savings")}
        />
        <NavItem 
          icon={<Gift size={20} />} 
          label="Rewards"
          active={location.pathname === "/rewards"}
          onClick={() => handleNavigation("/rewards")}
        />
        <NavItem 
          icon={<CreditCard size={20} />} 
          label="Card Rewards"
          active={location.pathname === "/card-rewards"}
          onClick={() => handleNavigation("/card-rewards")}
        />
        <NavItem 
          icon={<QrCode size={20} />} 
          label="QR Payments"
          active={location.pathname === "/qr-payments"}
          onClick={() => handleNavigation("/qr-payments")}
        />
        <NavItem 
          icon={<DollarSign size={20} />} 
          label="Currency Converter"
          active={location.pathname === "/currency"}
          onClick={() => handleNavigation("/currency")}
        />
        <NavItem 
          icon={<Calculator size={20} />} 
          label="Loan Calculator"
          active={location.pathname === "/loan-calculator"}
          onClick={() => handleNavigation("/loan-calculator")}
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="Financial Reports"
          active={location.pathname === "/reports"}
          onClick={() => handleNavigation("/reports")}
        />
        <NavItem 
          icon={<FileText size={20} />} 
          label="Tax Summary"
          active={location.pathname === "/tax-summary"}
          onClick={() => handleNavigation("/tax-summary")}
        />
        <NavItem 
          icon={<Activity size={20} />} 
          label="Activity Logs"
          active={location.pathname === "/activity"}
          onClick={() => handleNavigation("/activity")}
        />
      </nav>

      {/* Bottom Navigation */}
      <div className="space-y-2 pt-6 border-t border-sidebar-border">
        <NavItem 
          icon={<Settings size={20} />} 
          label="Settings" 
          active={location.pathname === "/settings"}
          onClick={() => handleNavigation("/settings")}
        />
        <NavItem 
          icon={<HelpCircle size={20} />} 
          label="Help Center" 
          active={location.pathname === "/help"}
          onClick={() => handleNavigation("/help")}
        />
        <NavItem 
          icon={<LogOut size={20} />} 
          label="Log Out" 
          onClick={() => handleNavigation("/login")}
        />
      </div>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex-col p-6 z-40">
        {sidebarContent}
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={onClose}
              className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="lg:hidden fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col p-6 z-50"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
