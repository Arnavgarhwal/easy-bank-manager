import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Download, CreditCard, Receipt, Plus, QrCode } from "lucide-react";
import TransferModal from "./TransferModal";

interface ActionButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  primary?: boolean;
}

const ActionButton = ({ icon, label, onClick, primary }: ActionButtonProps) => (
  <motion.button
    whileHover={{ scale: 1.05, y: -2 }}
    whileTap={{ scale: 0.95 }}
    onClick={onClick}
    className={`flex flex-col items-center gap-3 p-4 rounded-2xl transition-all duration-200 ${
      primary 
        ? "bg-primary text-primary-foreground shadow-lg glow-effect" 
        : "bg-secondary hover:bg-muted text-foreground"
    }`}
  >
    {icon}
    <span className="text-xs font-medium">{label}</span>
  </motion.button>
);

const QuickActions = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const actions = [
    { icon: <Send size={22} />, label: "Transfer", primary: true, onClick: () => setIsTransferOpen(true) },
    { icon: <Download size={22} />, label: "Receive" },
    { icon: <CreditCard size={22} />, label: "Pay" },
    { icon: <Receipt size={22} />, label: "Bills" },
    { icon: <Plus size={22} />, label: "Top Up" },
    { icon: <QrCode size={22} />, label: "Scan" },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="bg-card rounded-3xl p-6 border border-border"
      >
        <h3 className="font-display font-semibold text-lg text-foreground mb-4">Quick Actions</h3>
        <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
          {actions.map((action) => (
            <ActionButton
              key={action.label}
              icon={action.icon}
              label={action.label}
              primary={action.primary}
              onClick={action.onClick}
            />
          ))}
        </div>
      </motion.div>

      <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
    </>
  );
};

export default QuickActions;
