import { motion } from "framer-motion";
import { Wifi } from "lucide-react";

interface CreditCardProps {
  cardNumber?: string;
  cardHolder?: string;
  expiryDate?: string;
  variant?: "primary" | "secondary";
}

const CreditCard = ({ 
  cardNumber = "4532 •••• •••• 7890",
  cardHolder = "ALEX JOHNSON",
  expiryDate = "12/28",
  variant = "primary"
}: CreditCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, rotateY: 5 }}
      transition={{ duration: 0.3 }}
      className={`relative w-full aspect-[1.586/1] rounded-2xl p-6 overflow-hidden cursor-pointer ${
        variant === "primary" 
          ? "bg-gradient-to-br from-primary via-primary/80 to-accent" 
          : "bg-gradient-to-br from-secondary via-muted to-secondary"
      }`}
      style={{ perspective: "1000px" }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 250">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="relative z-10 h-full flex flex-col justify-between">
        {/* Top row */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-8 rounded-md ${variant === "primary" ? "bg-warning/80" : "bg-primary/30"}`} />
            <Wifi size={20} className={variant === "primary" ? "text-primary-foreground/70" : "text-foreground/70"} />
          </div>
          <span className={`font-display font-bold text-lg ${variant === "primary" ? "text-primary-foreground" : "text-foreground"}`}>
            VAULT
          </span>
        </div>

        {/* Card number */}
        <p className={`font-mono text-lg tracking-widest ${variant === "primary" ? "text-primary-foreground" : "text-foreground"}`}>
          {cardNumber}
        </p>

        {/* Bottom row */}
        <div className="flex items-end justify-between">
          <div>
            <p className={`text-xs mb-1 ${variant === "primary" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
              Card Holder
            </p>
            <p className={`font-medium text-sm ${variant === "primary" ? "text-primary-foreground" : "text-foreground"}`}>
              {cardHolder}
            </p>
          </div>
          <div className="text-right">
            <p className={`text-xs mb-1 ${variant === "primary" ? "text-primary-foreground/60" : "text-muted-foreground"}`}>
              Expires
            </p>
            <p className={`font-medium text-sm ${variant === "primary" ? "text-primary-foreground" : "text-foreground"}`}>
              {expiryDate}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CreditCard;