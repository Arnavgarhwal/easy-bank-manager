import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Search, Check, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Recipient {
  id: string;
  name: string;
  accountNumber: string;
  avatar?: string;
  bank: string;
}

const recipients: Recipient[] = [
  { id: "1", name: "Sarah Johnson", accountNumber: "****4521", bank: "Chase Bank" },
  { id: "2", name: "Mike Williams", accountNumber: "****7832", bank: "Bank of America" },
  { id: "3", name: "Emma Davis", accountNumber: "****9156", bank: "Wells Fargo" },
  { id: "4", name: "James Brown", accountNumber: "****2847", bank: "Citibank" },
  { id: "5", name: "Lisa Anderson", accountNumber: "****6293", bank: "TD Bank" },
];

interface TransferModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type Step = "recipient" | "amount" | "confirm";

const TransferModal = ({ isOpen, onClose }: TransferModalProps) => {
  const [step, setStep] = useState<Step>("recipient");
  const [selectedRecipient, setSelectedRecipient] = useState<Recipient | null>(null);
  const [amount, setAmount] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [note, setNote] = useState("");

  const filteredRecipients = recipients.filter(
    (r) =>
      r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.bank.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectRecipient = (recipient: Recipient) => {
    setSelectedRecipient(recipient);
    setStep("amount");
  };

  const handleAmountSubmit = () => {
    if (parseFloat(amount) > 0) {
      setStep("confirm");
    }
  };

  const handleConfirm = () => {
    // Simulate transfer
    setTimeout(() => {
      onClose();
      // Reset state
      setStep("recipient");
      setSelectedRecipient(null);
      setAmount("");
      setNote("");
    }, 1000);
  };

  const handleBack = () => {
    if (step === "amount") setStep("recipient");
    if (step === "confirm") setStep("amount");
  };

  const resetAndClose = () => {
    setStep("recipient");
    setSelectedRecipient(null);
    setAmount("");
    setNote("");
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md z-50"
          >
            <div className="glass-card p-6 mx-4">
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-display font-semibold text-xl text-foreground">
                  {step === "recipient" && "Select Recipient"}
                  {step === "amount" && "Enter Amount"}
                  {step === "confirm" && "Confirm Transfer"}
                </h2>
                <button
                  onClick={resetAndClose}
                  className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Progress Indicator */}
              <div className="flex items-center gap-2 mb-6">
                {["recipient", "amount", "confirm"].map((s, i) => (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                        step === s
                          ? "bg-primary text-primary-foreground"
                          : ["recipient", "amount", "confirm"].indexOf(step) > i
                          ? "bg-success text-success-foreground"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {["recipient", "amount", "confirm"].indexOf(step) > i ? (
                        <Check size={16} />
                      ) : (
                        i + 1
                      )}
                    </div>
                    {i < 2 && (
                      <div
                        className={`w-12 h-0.5 ${
                          ["recipient", "amount", "confirm"].indexOf(step) > i
                            ? "bg-success"
                            : "bg-secondary"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>

              {/* Step Content */}
              <AnimatePresence mode="wait">
                {step === "recipient" && (
                  <motion.div
                    key="recipient"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-4"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search recipients..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10 bg-secondary border-border"
                      />
                    </div>

                    <div className="space-y-2 max-h-64 overflow-y-auto">
                      {filteredRecipients.map((recipient) => (
                        <motion.button
                          key={recipient.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => handleSelectRecipient(recipient)}
                          className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors text-left"
                        >
                          <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                            <User className="w-5 h-5 text-primary" />
                          </div>
                          <div className="flex-1">
                            <p className="font-medium text-foreground">{recipient.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {recipient.bank} • {recipient.accountNumber}
                            </p>
                          </div>
                          <ArrowRight className="w-4 h-4 text-muted-foreground" />
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {step === "amount" && (
                  <motion.div
                    key="amount"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Selected Recipient */}
                    <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
                      <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{selectedRecipient?.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {selectedRecipient?.bank}
                        </p>
                      </div>
                    </div>

                    {/* Amount Input */}
                    <div className="text-center space-y-2">
                      <p className="text-sm text-muted-foreground">Enter Amount</p>
                      <div className="flex items-center justify-center gap-2">
                        <span className="text-4xl font-display font-bold text-muted-foreground">$</span>
                        <input
                          type="number"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                          placeholder="0.00"
                          className="text-4xl font-display font-bold text-foreground bg-transparent border-none outline-none w-40 text-center"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground">Available: $24,562.00</p>
                    </div>

                    {/* Quick Amounts */}
                    <div className="flex justify-center gap-2">
                      {[100, 250, 500, 1000].map((amt) => (
                        <button
                          key={amt}
                          onClick={() => setAmount(amt.toString())}
                          className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary/80 transition-colors"
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>

                    {/* Note */}
                    <Input
                      placeholder="Add a note (optional)"
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                      className="bg-secondary border-border"
                    />

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleBack} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handleAmountSubmit}
                        disabled={!amount || parseFloat(amount) <= 0}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Continue
                      </Button>
                    </div>
                  </motion.div>
                )}

                {step === "confirm" && (
                  <motion.div
                    key="confirm"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="space-y-6"
                  >
                    {/* Transfer Summary */}
                    <div className="text-center py-6 rounded-xl bg-secondary/30">
                      <p className="text-sm text-muted-foreground mb-2">You're sending</p>
                      <p className="text-4xl font-display font-bold gradient-text">
                        ${parseFloat(amount).toLocaleString()}
                      </p>
                      <p className="text-sm text-muted-foreground mt-2">
                        to {selectedRecipient?.name}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="space-y-3">
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">To</span>
                        <span className="text-sm font-medium text-foreground">
                          {selectedRecipient?.name}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Bank</span>
                        <span className="text-sm font-medium text-foreground">
                          {selectedRecipient?.bank}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Account</span>
                        <span className="text-sm font-medium text-foreground">
                          {selectedRecipient?.accountNumber}
                        </span>
                      </div>
                      <div className="flex justify-between py-2 border-b border-border">
                        <span className="text-sm text-muted-foreground">Fee</span>
                        <span className="text-sm font-medium text-success">Free</span>
                      </div>
                      {note && (
                        <div className="flex justify-between py-2">
                          <span className="text-sm text-muted-foreground">Note</span>
                          <span className="text-sm font-medium text-foreground">{note}</span>
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      <Button variant="outline" onClick={handleBack} className="flex-1">
                        Back
                      </Button>
                      <Button
                        onClick={handleConfirm}
                        className="flex-1 bg-primary hover:bg-primary/90"
                      >
                        Confirm Transfer
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default TransferModal;
