import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  CreditCard, 
  ArrowLeftRight, 
  PieChart, 
  Receipt, 
  Settings,
  HelpCircle,
  LogOut
} from "lucide-react";

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
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

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar border-r border-sidebar-border flex flex-col p-6">
      {/* Logo */}
      <div className="flex items-center gap-3 mb-10">
        <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center glow-effect">
          <span className="font-display font-bold text-primary-foreground text-lg">V</span>
        </div>
        <span className="font-display font-semibold text-xl text-foreground">Vault</span>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 space-y-2">
        <NavItem 
          icon={<LayoutDashboard size={20} />} 
          label="Dashboard" 
          active={location.pathname === "/"} 
          onClick={() => navigate("/")}
        />
        <NavItem icon={<CreditCard size={20} />} label="Cards" />
        <NavItem icon={<ArrowLeftRight size={20} />} label="Transfers" />
        <NavItem 
          icon={<PieChart size={20} />} 
          label="Analytics" 
          active={location.pathname === "/analytics"} 
          onClick={() => navigate("/analytics")}
        />
        <NavItem icon={<Receipt size={20} />} label="Transactions" />
      </nav>

      {/* Bottom Navigation */}
      <div className="space-y-2 pt-6 border-t border-sidebar-border">
        <NavItem icon={<Settings size={20} />} label="Settings" />
        <NavItem icon={<HelpCircle size={20} />} label="Help Center" />
        <NavItem 
          icon={<LogOut size={20} />} 
          label="Log Out" 
          onClick={() => navigate("/login")}
        />
      </div>
    </aside>
  );
};

export default Sidebar;
