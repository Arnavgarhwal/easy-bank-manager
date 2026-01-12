import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Receipt,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Wifi,
  Tv,
  Zap,
  Home,
  Phone,
  CreditCard,
  Search,
  Filter,
  Bell,
  X,
  DollarSign,
  Users,
} from "lucide-react";
import SplitBillModal from "@/components/SplitBillModal";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";

interface Bill {
  id: string;
  name: string;
  category: string;
  amount: number;
  dueDate: string;
  status: "paid" | "pending" | "overdue";
  isRecurring: boolean;
  frequency?: string;
  autopay: boolean;
  icon: React.ReactNode;
  lastPaid?: string;
}

const mockBills: Bill[] = [
  {
    id: "1",
    name: "Netflix",
    category: "Entertainment",
    amount: 15.99,
    dueDate: "2024-01-15",
    status: "pending",
    isRecurring: true,
    frequency: "Monthly",
    autopay: true,
    icon: <Tv className="w-5 h-5" />,
    lastPaid: "2023-12-15",
  },
  {
    id: "2",
    name: "Internet - Comcast",
    category: "Utilities",
    amount: 79.99,
    dueDate: "2024-01-18",
    status: "pending",
    isRecurring: true,
    frequency: "Monthly",
    autopay: false,
    icon: <Wifi className="w-5 h-5" />,
    lastPaid: "2023-12-18",
  },
  {
    id: "3",
    name: "Electric Bill",
    category: "Utilities",
    amount: 124.50,
    dueDate: "2024-01-10",
    status: "overdue",
    isRecurring: true,
    frequency: "Monthly",
    autopay: false,
    icon: <Zap className="w-5 h-5" />,
    lastPaid: "2023-12-10",
  },
  {
    id: "4",
    name: "Rent",
    category: "Housing",
    amount: 2500.00,
    dueDate: "2024-01-01",
    status: "paid",
    isRecurring: true,
    frequency: "Monthly",
    autopay: true,
    icon: <Home className="w-5 h-5" />,
    lastPaid: "2024-01-01",
  },
  {
    id: "5",
    name: "Phone - Verizon",
    category: "Utilities",
    amount: 85.00,
    dueDate: "2024-01-20",
    status: "pending",
    isRecurring: true,
    frequency: "Monthly",
    autopay: true,
    icon: <Phone className="w-5 h-5" />,
    lastPaid: "2023-12-20",
  },
  {
    id: "6",
    name: "Credit Card Payment",
    category: "Finance",
    amount: 450.00,
    dueDate: "2024-01-25",
    status: "pending",
    isRecurring: true,
    frequency: "Monthly",
    autopay: false,
    icon: <CreditCard className="w-5 h-5" />,
    lastPaid: "2023-12-25",
  },
];

const Bills = () => {
  const { toast } = useToast();
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isReminderModalOpen, setIsReminderModalOpen] = useState(false);
  const [isSplitModalOpen, setIsSplitModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);

  const [newBill, setNewBill] = useState({
    name: "",
    category: "Utilities",
    amount: "",
    dueDate: "",
    isRecurring: false,
    frequency: "Monthly",
    autopay: false,
  });

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalPending = bills
    .filter((b) => b.status === "pending")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalOverdue = bills
    .filter((b) => b.status === "overdue")
    .reduce((sum, b) => sum + b.amount, 0);
  const totalPaid = bills
    .filter((b) => b.status === "paid")
    .reduce((sum, b) => sum + b.amount, 0);

  const handleAddBill = () => {
    if (!newBill.name || !newBill.amount || !newBill.dueDate) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const bill: Bill = {
      id: Date.now().toString(),
      name: newBill.name,
      category: newBill.category,
      amount: parseFloat(newBill.amount),
      dueDate: newBill.dueDate,
      status: "pending",
      isRecurring: newBill.isRecurring,
      frequency: newBill.frequency,
      autopay: newBill.autopay,
      icon: <Receipt className="w-5 h-5" />,
    };

    setBills([...bills, bill]);
    setIsAddModalOpen(false);
    setNewBill({
      name: "",
      category: "Utilities",
      amount: "",
      dueDate: "",
      isRecurring: false,
      frequency: "Monthly",
      autopay: false,
    });

    toast({
      title: "Bill Added",
      description: `${bill.name} has been added to your bills.`,
    });
  };

  const handlePayBill = (billId: string) => {
    setBills(
      bills.map((bill) =>
        bill.id === billId
          ? { ...bill, status: "paid" as const, lastPaid: new Date().toISOString().split("T")[0] }
          : bill
      )
    );
    toast({
      title: "Payment Successful",
      description: "Your bill has been paid.",
    });
  };

  const handleSetReminder = () => {
    if (selectedBill) {
      toast({
        title: "Reminder Set",
        description: `You'll be reminded before ${selectedBill.name} is due.`,
      });
      setIsReminderModalOpen(false);
      setSelectedBill(null);
    }
  };

  const getStatusBadge = (status: Bill["status"]) => {
    switch (status) {
      case "paid":
        return (
          <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/30">
            <CheckCircle className="w-3 h-3 mr-1" />
            Paid
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400 hover:bg-amber-500/30">
            <Clock className="w-3 h-3 mr-1" />
            Pending
          </Badge>
        );
      case "overdue":
        return (
          <Badge className="bg-destructive/20 text-destructive hover:bg-destructive/30">
            <AlertCircle className="w-3 h-3 mr-1" />
            Overdue
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Bills & Payments</h1>
          <p className="text-muted-foreground mt-1">Manage your recurring bills and payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="gap-2" onClick={() => setIsSplitModalOpen(true)}>
            <Users className="w-4 h-4" />
            Split Bill
          </Button>
          <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="w-4 h-4" />
                Add Bill
              </Button>
            </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>Schedule a new bill or recurring payment</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="billName">Bill Name</Label>
                <Input
                  id="billName"
                  placeholder="e.g., Netflix, Electric Bill"
                  value={newBill.name}
                  onChange={(e) => setNewBill({ ...newBill, name: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={newBill.category}
                    onValueChange={(value) => setNewBill({ ...newBill, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Utilities">Utilities</SelectItem>
                      <SelectItem value="Entertainment">Entertainment</SelectItem>
                      <SelectItem value="Housing">Housing</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Insurance">Insurance</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount</Label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="pl-9"
                      value={newBill.amount}
                      onChange={(e) => setNewBill({ ...newBill, amount: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="dueDate">Due Date</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={newBill.dueDate}
                  onChange={(e) => setNewBill({ ...newBill, dueDate: e.target.value })}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Recurring Payment</p>
                  <p className="text-sm text-muted-foreground">This bill repeats automatically</p>
                </div>
                <Switch
                  checked={newBill.isRecurring}
                  onCheckedChange={(checked) => setNewBill({ ...newBill, isRecurring: checked })}
                />
              </div>
              {newBill.isRecurring && (
                <div className="space-y-2">
                  <Label>Frequency</Label>
                  <Select
                    value={newBill.frequency}
                    onValueChange={(value) => setNewBill({ ...newBill, frequency: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Weekly">Weekly</SelectItem>
                      <SelectItem value="Bi-weekly">Bi-weekly</SelectItem>
                      <SelectItem value="Monthly">Monthly</SelectItem>
                      <SelectItem value="Quarterly">Quarterly</SelectItem>
                      <SelectItem value="Yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-foreground">Auto-pay</p>
                  <p className="text-sm text-muted-foreground">Pay automatically when due</p>
                </div>
                <Switch
                  checked={newBill.autopay}
                  onCheckedChange={(checked) => setNewBill({ ...newBill, autopay: checked })}
                />
              </div>
              <Button onClick={handleAddBill} className="w-full">
                Add Bill
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>
      </motion.div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-foreground">${totalPending.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-amber-500/20 rounded-full">
                  <Clock className="w-6 h-6 text-amber-500" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {bills.filter((b) => b.status === "pending").length} bills due
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Overdue</p>
                  <p className="text-2xl font-bold text-destructive">${totalOverdue.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-destructive/20 rounded-full">
                  <AlertCircle className="w-6 h-6 text-destructive" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {bills.filter((b) => b.status === "overdue").length} bills overdue
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paid This Month</p>
                  <p className="text-2xl font-bold text-emerald-500">${totalPaid.toFixed(2)}</p>
                </div>
                <div className="p-3 bg-emerald-500/20 rounded-full">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {bills.filter((b) => b.status === "paid").length} bills paid
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Monthly Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Monthly Bill Progress</CardTitle>
            <CardDescription>Track your bill payments for this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {bills.filter((b) => b.status === "paid").length} of {bills.length} bills paid
                </span>
                <span className="font-medium text-foreground">
                  {Math.round((bills.filter((b) => b.status === "paid").length / bills.length) * 100)}%
                </span>
              </div>
              <Progress
                value={(bills.filter((b) => b.status === "paid").length / bills.length) * 100}
                className="h-3"
              />
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search bills..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <Filter className="w-4 h-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Bills</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="overdue">Overdue</SelectItem>
            <SelectItem value="paid">Paid</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Bills List */}
      <div className="space-y-4">
        <AnimatePresence>
          {filteredBills.map((bill, index) => (
            <motion.div
              key={bill.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Card className={bill.status === "overdue" ? "border-destructive/50" : ""}>
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div
                        className={`p-3 rounded-full ${
                          bill.status === "overdue"
                            ? "bg-destructive/20"
                            : bill.status === "paid"
                            ? "bg-emerald-500/20"
                            : "bg-muted"
                        }`}
                      >
                        {bill.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="font-semibold text-foreground">{bill.name}</h3>
                          {bill.isRecurring && (
                            <Badge variant="outline" className="text-xs">
                              {bill.frequency}
                            </Badge>
                          )}
                          {bill.autopay && (
                            <Badge variant="secondary" className="text-xs">
                              Auto-pay
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">{bill.category}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            Due: {new Date(bill.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="text-right">
                        <p className="text-xl font-bold text-foreground">${bill.amount.toFixed(2)}</p>
                        {getStatusBadge(bill.status)}
                      </div>
                      <div className="flex gap-2">
                        {bill.status !== "paid" && (
                          <>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedBill(bill);
                                setIsReminderModalOpen(true);
                              }}
                            >
                              <Bell className="w-4 h-4" />
                            </Button>
                            <Button size="sm" onClick={() => handlePayBill(bill.id)}>
                              Pay Now
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {filteredBills.length === 0 && (
        <div className="text-center py-12">
          <Receipt className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium text-foreground">No bills found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}

      {/* Reminder Modal */}
      <Dialog open={isReminderModalOpen} onOpenChange={setIsReminderModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Set Payment Reminder</DialogTitle>
            <DialogDescription>
              Choose when you'd like to be reminded about this bill
            </DialogDescription>
          </DialogHeader>
          {selectedBill && (
            <div className="space-y-4 mt-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-background rounded-full">{selectedBill.icon}</div>
                  <div>
                    <p className="font-medium text-foreground">{selectedBill.name}</p>
                    <p className="text-sm text-muted-foreground">
                      ${selectedBill.amount.toFixed(2)} due{" "}
                      {new Date(selectedBill.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Remind me</Label>
                <Select defaultValue="1day">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1day">1 day before</SelectItem>
                    <SelectItem value="3days">3 days before</SelectItem>
                    <SelectItem value="1week">1 week before</SelectItem>
                    <SelectItem value="2weeks">2 weeks before</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" className="flex-1" onClick={() => setIsReminderModalOpen(false)}>
                  Cancel
                </Button>
                <Button className="flex-1" onClick={handleSetReminder}>
                  Set Reminder
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Bills;
