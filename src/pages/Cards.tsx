import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Plus, 
  CreditCard as CardIcon, 
  Lock, 
  Unlock, 
  Eye, 
  EyeOff,
  Trash2,
  Settings,
  Wifi,
  X
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface Card {
  id: string;
  cardNumber: string;
  cardHolder: string;
  expiryDate: string;
  cvv: string;
  type: "credit" | "debit";
  variant: "primary" | "secondary" | "tertiary";
  spendingLimit: number;
  currentSpending: number;
  isLocked: boolean;
}

const initialCards: Card[] = [
  {
    id: "1",
    cardNumber: "4532 1234 5678 7890",
    cardHolder: "ARNAV GARHWAL",
    expiryDate: "12/28",
    cvv: "***",
    type: "credit",
    variant: "primary",
    spendingLimit: 10000,
    currentSpending: 4320,
    isLocked: false,
  },
  {
    id: "2",
    cardNumber: "5421 8765 4321 3456",
    cardHolder: "ARNAV GARHWAL",
    expiryDate: "08/27",
    cvv: "***",
    type: "debit",
    variant: "secondary",
    spendingLimit: 5000,
    currentSpending: 1250,
    isLocked: false,
  },
  {
    id: "3",
    cardNumber: "3782 8224 6310 0005",
    cardHolder: "ARNAV GARHWAL",
    expiryDate: "03/26",
    cvv: "***",
    type: "credit",
    variant: "tertiary",
    spendingLimit: 15000,
    currentSpending: 8900,
    isLocked: true,
  },
];

const CardVisual = ({ card, showDetails }: { card: Card; showDetails: boolean }) => {
  const variants = {
    primary: "bg-gradient-to-br from-primary via-primary/80 to-accent",
    secondary: "bg-gradient-to-br from-secondary via-muted to-secondary",
    tertiary: "bg-gradient-to-br from-warning/80 via-warning/60 to-warning/40",
  };

  const textColor = card.variant === "secondary" ? "text-foreground" : "text-primary-foreground";
  const mutedColor = card.variant === "secondary" ? "text-muted-foreground" : "text-primary-foreground/60";

  return (
    <div className={`relative w-full aspect-[1.586/1] rounded-2xl p-5 overflow-hidden ${variants[card.variant]} ${card.isLocked ? "opacity-60" : ""}`}>
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" viewBox="0 0 400 250">
          <pattern id={`grid-${card.id}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="20" cy="20" r="1" fill="currentColor" />
          </pattern>
          <rect width="100%" height="100%" fill={`url(#grid-${card.id})`} />
        </svg>
      </div>

      {card.isLocked && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm z-20">
          <Lock size={32} className="text-muted-foreground" />
        </div>
      )}

      <div className="relative z-10 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-8 rounded-md ${card.variant === "primary" ? "bg-warning/80" : card.variant === "tertiary" ? "bg-primary-foreground/30" : "bg-primary/30"}`} />
            <Wifi size={18} className={mutedColor} />
          </div>
          <span className={`font-display font-bold text-lg ${textColor}`}>VAULT</span>
        </div>

        <p className={`font-mono text-base tracking-widest ${textColor}`}>
          {showDetails ? card.cardNumber : card.cardNumber.replace(/\d{4}(?=.)/g, "•••• ")}
        </p>

        <div className="flex items-end justify-between">
          <div>
            <p className={`text-xs mb-0.5 ${mutedColor}`}>Card Holder</p>
            <p className={`font-medium text-sm ${textColor}`}>{card.cardHolder}</p>
          </div>
          <div className="text-right">
            <p className={`text-xs mb-0.5 ${mutedColor}`}>Expires</p>
            <p className={`font-medium text-sm ${textColor}`}>{card.expiryDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Cards = () => {
  const [cards, setCards] = useState<Card[]>(initialCards);
  const [showDetails, setShowDetails] = useState<Record<string, boolean>>({});
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCard, setNewCard] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    type: "credit" as "credit" | "debit",
    spendingLimit: 5000,
  });

  const toggleCardDetails = (cardId: string) => {
    setShowDetails(prev => ({ ...prev, [cardId]: !prev[cardId] }));
  };

  const toggleCardLock = (cardId: string) => {
    setCards(prev => prev.map(card => 
      card.id === cardId ? { ...card, isLocked: !card.isLocked } : card
    ));
  };

  const deleteCard = (cardId: string) => {
    setCards(prev => prev.filter(card => card.id !== cardId));
  };

  const addCard = () => {
    const variants: ("primary" | "secondary" | "tertiary")[] = ["primary", "secondary", "tertiary"];
    const newCardData: Card = {
      id: Date.now().toString(),
      cardNumber: newCard.cardNumber || "4532 •••• •••• " + Math.floor(1000 + Math.random() * 9000),
      cardHolder: "ARNAV GARHWAL",
      expiryDate: newCard.expiryDate || "12/28",
      cvv: "***",
      type: newCard.type,
      variant: variants[cards.length % 3],
      spendingLimit: newCard.spendingLimit,
      currentSpending: 0,
      isLocked: false,
    };
    setCards(prev => [...prev, newCardData]);
    setIsAddModalOpen(false);
    setNewCard({ cardNumber: "", expiryDate: "", cvv: "", type: "credit", spendingLimit: 5000 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 max-lg:ml-0 max-lg:pb-24">
        <Header />
        
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">My Cards</h2>
              <p className="text-muted-foreground text-sm mt-1">Manage your credit and debit cards</p>
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsAddModalOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm"
            >
              <Plus size={18} />
              Add New Card
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cards.map((card, index) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-card rounded-3xl p-5 border border-border space-y-4"
              >
                <CardVisual card={card} showDetails={showDetails[card.id] || false} />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground capitalize">{card.type} Card</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleCardDetails(card.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        {showDetails[card.id] ? <EyeOff size={16} className="text-muted-foreground" /> : <Eye size={16} className="text-muted-foreground" />}
                      </button>
                      <button
                        onClick={() => toggleCardLock(card.id)}
                        className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      >
                        {card.isLocked ? <Lock size={16} className="text-warning" /> : <Unlock size={16} className="text-success" />}
                      </button>
                      <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                        <Settings size={16} className="text-muted-foreground" />
                      </button>
                      <button
                        onClick={() => deleteCard(card.id)}
                        className="p-2 rounded-lg hover:bg-destructive/10 transition-colors"
                      >
                        <Trash2 size={16} className="text-destructive" />
                      </button>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Spending Limit</span>
                      <span className="text-foreground font-medium">
                        ${card.currentSpending.toLocaleString()} / ${card.spendingLimit.toLocaleString()}
                      </span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(card.currentSpending / card.spendingLimit) * 100}%` }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className={`h-full rounded-full ${
                          card.currentSpending / card.spendingLimit > 0.8 ? "bg-destructive" : 
                          card.currentSpending / card.spendingLimit > 0.6 ? "bg-warning" : "bg-primary"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogContent className="bg-card border-border">
            <DialogHeader>
              <DialogTitle className="font-display text-xl text-foreground">Add New Card</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-4">
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  value={newCard.cardNumber}
                  onChange={(e) => setNewCard(prev => ({ ...prev, cardNumber: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">Expiry Date</label>
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiryDate}
                    onChange={(e) => setNewCard(prev => ({ ...prev, expiryDate: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-1.5 block">CVV</label>
                  <input
                    type="password"
                    placeholder="•••"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-secondary border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">Card Type</label>
                <div className="flex gap-3">
                  <button
                    onClick={() => setNewCard(prev => ({ ...prev, type: "credit" }))}
                    className={`flex-1 py-2.5 rounded-xl border transition-all ${
                      newCard.type === "credit" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Credit
                  </button>
                  <button
                    onClick={() => setNewCard(prev => ({ ...prev, type: "debit" }))}
                    className={`flex-1 py-2.5 rounded-xl border transition-all ${
                      newCard.type === "debit" 
                        ? "bg-primary text-primary-foreground border-primary" 
                        : "bg-secondary border-border text-foreground hover:bg-muted"
                    }`}
                  >
                    Debit
                  </button>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-1.5 block">
                  Spending Limit: ${newCard.spendingLimit.toLocaleString()}
                </label>
                <input
                  type="range"
                  min="1000"
                  max="50000"
                  step="1000"
                  value={newCard.spendingLimit}
                  onChange={(e) => setNewCard(prev => ({ ...prev, spendingLimit: parseInt(e.target.value) }))}
                  className="w-full accent-primary"
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={addCard}
                className="w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium"
              >
                Add Card
              </motion.button>
            </div>
          </DialogContent>
        </Dialog>
      </main>
    </div>
  );
};

export default Cards;
