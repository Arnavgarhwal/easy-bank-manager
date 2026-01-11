import { useState } from "react";
import { motion } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { 
  Send, 
  Download, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Clock, 
  CheckCircle2, 
  XCircle,
  User,
  Plus,
  Search
} from "lucide-react";
import TransferModal from "@/components/TransferModal";

interface Transfer {
  id: string;
  type: "sent" | "received";
  recipient: string;
  recipientAvatar: string;
  amount: number;
  date: string;
  status: "completed" | "pending" | "failed";
  note?: string;
}

interface Contact {
  id: string;
  name: string;
  avatar: string;
  accountEnding: string;
  lastTransfer?: string;
}

const recentTransfers: Transfer[] = [
  { id: "1", type: "sent", recipient: "Priya Sharma", recipientAvatar: "PS", amount: -500.00, date: "Today, 2:30 PM", status: "completed", note: "Rent split" },
  { id: "2", type: "received", recipient: "Vikram Patel", recipientAvatar: "VP", amount: 1200.00, date: "Today, 11:00 AM", status: "completed", note: "Project payment" },
  { id: "3", type: "sent", recipient: "Ananya Gupta", recipientAvatar: "AG", amount: -75.00, date: "Yesterday, 6:45 PM", status: "completed", note: "Dinner" },
  { id: "4", type: "sent", recipient: "Rahul Singh", recipientAvatar: "RS", amount: -250.00, date: "Yesterday, 3:20 PM", status: "pending" },
  { id: "5", type: "received", recipient: "Meera Reddy", recipientAvatar: "MR", amount: 350.00, date: "Jan 9, 2026", status: "completed" },
  { id: "6", type: "sent", recipient: "Karthik Iyer", recipientAvatar: "KI", amount: -1000.00, date: "Jan 8, 2026", status: "failed", note: "Investment" },
  { id: "7", type: "received", recipient: "Deepika Nair", recipientAvatar: "DN", amount: 800.00, date: "Jan 7, 2026", status: "completed", note: "Reimbursement" },
  { id: "8", type: "sent", recipient: "Arjun Menon", recipientAvatar: "AM", amount: -150.00, date: "Jan 6, 2026", status: "completed" },
];

const contacts: Contact[] = [
  { id: "1", name: "Priya Sharma", avatar: "PS", accountEnding: "4521", lastTransfer: "Today" },
  { id: "2", name: "Vikram Patel", avatar: "VP", accountEnding: "7834", lastTransfer: "Today" },
  { id: "3", name: "Ananya Gupta", avatar: "AG", accountEnding: "2156", lastTransfer: "Yesterday" },
  { id: "4", name: "Rahul Singh", avatar: "RS", accountEnding: "9087", lastTransfer: "Yesterday" },
  { id: "5", name: "Meera Reddy", avatar: "MR", accountEnding: "3412" },
  { id: "6", name: "Karthik Iyer", avatar: "KI", accountEnding: "6543" },
];

const Transfers = () => {
  const [isTransferOpen, setIsTransferOpen] = useState(false);
  const [searchContact, setSearchContact] = useState("");
  const [filterType, setFilterType] = useState<"all" | "sent" | "received">("all");

  const filteredTransfers = recentTransfers.filter(transfer => {
    if (filterType === "all") return true;
    return transfer.type === filterType;
  });

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchContact.toLowerCase())
  );

  const totalSent = recentTransfers.filter(t => t.type === "sent" && t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);
  const totalReceived = recentTransfers.filter(t => t.type === "received" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8 max-lg:ml-0 max-lg:pb-24">
        <Header />
        
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-foreground">Transfers</h2>
              <p className="text-muted-foreground text-sm mt-1">Send and receive money instantly</p>
            </div>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsTransferOpen(true)}
                className="flex items-center gap-2 px-4 py-2.5 bg-primary text-primary-foreground rounded-xl font-medium text-sm"
              >
                <Send size={18} />
                Send Money
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-4 py-2.5 bg-secondary hover:bg-muted text-foreground rounded-xl font-medium text-sm transition-colors"
              >
                <Download size={18} />
                Request
              </motion.button>
            </div>
          </div>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                  <ArrowDownLeft size={20} className="text-success" />
                </div>
                <span className="text-muted-foreground text-sm">Received</span>
              </div>
              <p className="font-display text-2xl font-bold text-success">+${totalReceived.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                  <ArrowUpRight size={20} className="text-destructive" />
                </div>
                <span className="text-muted-foreground text-sm">Sent</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">-${totalSent.toLocaleString()}</p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Clock size={20} className="text-warning" />
                </div>
                <span className="text-muted-foreground text-sm">Pending</span>
              </div>
              <p className="font-display text-2xl font-bold text-warning">
                {recentTransfers.filter(t => t.status === "pending").length}
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <User size={20} className="text-primary" />
                </div>
                <span className="text-muted-foreground text-sm">Contacts</span>
              </div>
              <p className="font-display text-2xl font-bold text-foreground">{contacts.length}</p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Quick Contacts */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-display font-semibold text-lg text-foreground">Quick Send</h3>
                <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
                  <Plus size={18} className="text-muted-foreground" />
                </button>
              </div>
              
              <div className="relative mb-4">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search contacts..."
                  value={searchContact}
                  onChange={(e) => setSearchContact(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <div className="space-y-2">
                {filteredContacts.map((contact, index) => (
                  <motion.button
                    key={contact.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => setIsTransferOpen(true)}
                    className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-secondary transition-colors text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-sm font-medium text-primary">{contact.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm truncate">{contact.name}</p>
                      <p className="text-xs text-muted-foreground">•••• {contact.accountEnding}</p>
                    </div>
                    <Send size={16} className="text-muted-foreground" />
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Recent Transfers */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2 bg-card rounded-2xl p-5 border border-border"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <h3 className="font-display font-semibold text-lg text-foreground">Recent Transfers</h3>
                <div className="flex gap-2">
                  {(["all", "sent", "received"] as const).map((type) => (
                    <button
                      key={type}
                      onClick={() => setFilterType(type)}
                      className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                        filterType === type
                          ? "bg-primary text-primary-foreground"
                          : "bg-secondary text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-3">
                {filteredTransfers.map((transfer, index) => (
                  <motion.div
                    key={transfer.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center ${
                        transfer.type === "received" ? "bg-success/10" : "bg-secondary"
                      }`}>
                        <span className={`text-sm font-medium ${
                          transfer.type === "received" ? "text-success" : "text-foreground"
                        }`}>{transfer.recipientAvatar}</span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-foreground">{transfer.recipient}</p>
                          {transfer.status === "completed" && <CheckCircle2 size={14} className="text-success" />}
                          {transfer.status === "pending" && <Clock size={14} className="text-warning" />}
                          {transfer.status === "failed" && <XCircle size={14} className="text-destructive" />}
                        </div>
                        <p className="text-xs text-muted-foreground">
                          {transfer.date}
                          {transfer.note && ` • ${transfer.note}`}
                        </p>
                      </div>
                    </div>
                    <p className={`font-display font-semibold ${
                      transfer.type === "received" ? "text-success" : "text-foreground"
                    }`}>
                      {transfer.type === "received" ? "+" : ""}{transfer.amount.toLocaleString("en-US", { style: "currency", currency: "USD" })}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        <TransferModal isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
      </main>
    </div>
  );
};

export default Transfers;
