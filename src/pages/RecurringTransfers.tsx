import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Calendar, Clock, User, Trash2, Edit, Pause, Play, DollarSign, RefreshCw, ArrowUpRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RecurringTransfers = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const { toast } = useToast();

  const [transfers, setTransfers] = useState([
    {
      id: 1,
      recipient: "Rent - Landlord LLC",
      amount: 1800,
      frequency: "Monthly",
      nextDate: "Feb 1, 2024",
      account: "Checking ****4532",
      active: true,
      category: "Housing"
    },
    {
      id: 2,
      recipient: "Mom - Mary Garhwal",
      amount: 500,
      frequency: "Monthly",
      nextDate: "Feb 5, 2024",
      account: "Checking ****4532",
      active: true,
      category: "Family"
    },
    {
      id: 3,
      recipient: "Savings Goal - Emergency Fund",
      amount: 300,
      frequency: "Bi-weekly",
      nextDate: "Feb 2, 2024",
      account: "Savings ****7891",
      active: true,
      category: "Savings"
    },
    {
      id: 4,
      recipient: "Investment - Brokerage",
      amount: 200,
      frequency: "Weekly",
      nextDate: "Jan 31, 2024",
      account: "Checking ****4532",
      active: true,
      category: "Investment"
    },
    {
      id: 5,
      recipient: "Car Payment - Auto Loan",
      amount: 425,
      frequency: "Monthly",
      nextDate: "Feb 15, 2024",
      account: "Checking ****4532",
      active: false,
      category: "Auto"
    },
  ]);

  const [newTransfer, setNewTransfer] = useState({
    recipient: "",
    amount: "",
    frequency: "monthly",
    startDate: "",
    account: "checking"
  });

  const savedRecipients = [
    { id: 1, name: "Mom - Mary Garhwal", account: "****5678" },
    { id: 2, name: "Sarah Wilson", account: "****9012" },
    { id: 3, name: "Electric Company", account: "****3456" },
    { id: 4, name: "Gym Membership", account: "****7890" },
  ];

  const totalMonthly = transfers
    .filter(t => t.active)
    .reduce((sum, t) => {
      switch (t.frequency) {
        case "Weekly": return sum + (t.amount * 4);
        case "Bi-weekly": return sum + (t.amount * 2);
        default: return sum + t.amount;
      }
    }, 0);

  const activeCount = transfers.filter(t => t.active).length;
  const pausedCount = transfers.filter(t => !t.active).length;

  const toggleTransfer = (id: number) => {
    setTransfers(transfers.map(t => 
      t.id === id ? { ...t, active: !t.active } : t
    ));
    const transfer = transfers.find(t => t.id === id);
    toast({
      title: transfer?.active ? "Transfer paused" : "Transfer resumed",
      description: `${transfer?.recipient} has been ${transfer?.active ? 'paused' : 'resumed'}`
    });
  };

  const deleteTransfer = (id: number) => {
    const transfer = transfers.find(t => t.id === id);
    setTransfers(transfers.filter(t => t.id !== id));
    toast({
      title: "Transfer deleted",
      description: `${transfer?.recipient} has been removed`
    });
  };

  const handleAddTransfer = () => {
    if (!newTransfer.recipient || !newTransfer.amount) {
      toast({ title: "Missing fields", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const newItem = {
      id: transfers.length + 1,
      recipient: newTransfer.recipient,
      amount: parseFloat(newTransfer.amount),
      frequency: newTransfer.frequency === "weekly" ? "Weekly" : 
                 newTransfer.frequency === "biweekly" ? "Bi-weekly" : "Monthly",
      nextDate: "Feb 1, 2024",
      account: newTransfer.account === "checking" ? "Checking ****4532" : "Savings ****7891",
      active: true,
      category: "Other"
    };

    setTransfers([...transfers, newItem]);
    setNewTransfer({ recipient: "", amount: "", frequency: "monthly", startDate: "", account: "checking" });
    setIsAddModalOpen(false);
    toast({ title: "Transfer scheduled!", description: `Recurring transfer to ${newTransfer.recipient} has been set up` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Recurring Transfers</h1>
              <p className="text-muted-foreground">Manage your scheduled automatic payments</p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Schedule Transfer
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Schedule Recurring Transfer</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Recipient</Label>
                    <Select 
                      value={newTransfer.recipient} 
                      onValueChange={(v) => setNewTransfer({ ...newTransfer, recipient: v })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select or enter recipient" />
                      </SelectTrigger>
                      <SelectContent>
                        {savedRecipients.map((r) => (
                          <SelectItem key={r.id} value={r.name}>{r.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-8"
                        value={newTransfer.amount}
                        onChange={(e) => setNewTransfer({ ...newTransfer, amount: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Frequency</Label>
                    <Select 
                      value={newTransfer.frequency} 
                      onValueChange={(v) => setNewTransfer({ ...newTransfer, frequency: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="biweekly">Bi-weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>From Account</Label>
                    <Select 
                      value={newTransfer.account} 
                      onValueChange={(v) => setNewTransfer({ ...newTransfer, account: v })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="checking">Checking ****4532</SelectItem>
                        <SelectItem value="savings">Savings ****7891</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Start Date</Label>
                    <Input 
                      type="date" 
                      value={newTransfer.startDate}
                      onChange={(e) => setNewTransfer({ ...newTransfer, startDate: e.target.value })}
                    />
                  </div>

                  <Button className="w-full" onClick={handleAddTransfer}>Schedule Transfer</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Monthly Total</p>
                  <p className="text-2xl font-bold text-foreground">${totalMonthly.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Transfers</p>
                  <p className="text-2xl font-bold text-green-600">{activeCount}</p>
                </div>
                <RefreshCw className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Paused</p>
                  <p className="text-2xl font-bold text-orange-600">{pausedCount}</p>
                </div>
                <Pause className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Next Transfer</p>
                  <p className="text-2xl font-bold text-blue-600">Jan 31</p>
                </div>
                <Calendar className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Transfers List */}
        <Card>
          <CardHeader>
            <CardTitle>Scheduled Transfers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {transfers.map((transfer) => (
                <div 
                  key={transfer.id} 
                  className={`flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-lg border ${
                    transfer.active ? 'bg-card' : 'bg-muted/50 opacity-60'
                  }`}
                >
                  <div className="flex items-start gap-4 mb-4 sm:mb-0">
                    <div className={`h-12 w-12 rounded-full flex items-center justify-center ${
                      transfer.active ? 'bg-primary/10' : 'bg-muted'
                    }`}>
                      <User className={`h-6 w-6 ${transfer.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{transfer.recipient}</p>
                      <div className="flex flex-wrap items-center gap-2 mt-1">
                        <Badge variant="outline">{transfer.category}</Badge>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {transfer.frequency}
                        </span>
                        <span className="text-sm text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Next: {transfer.nextDate}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">From: {transfer.account}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">${transfer.amount.toLocaleString()}</p>
                      <Badge variant={transfer.active ? "default" : "secondary"}>
                        {transfer.active ? "Active" : "Paused"}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => toggleTransfer(transfer.id)}
                      >
                        {transfer.active ? (
                          <Pause className="h-4 w-4" />
                        ) : (
                          <Play className="h-4 w-4" />
                        )}
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => deleteTransfer(transfer.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Recipients */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Saved Recipients</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {savedRecipients.map((recipient) => (
                <div key={recipient.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors cursor-pointer text-center">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
                    <User className="h-6 w-6 text-primary" />
                  </div>
                  <p className="font-medium text-foreground text-sm">{recipient.name.split(' - ')[0]}</p>
                  <p className="text-xs text-muted-foreground">{recipient.account}</p>
                </div>
              ))}
              <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center hover:bg-primary/5 transition-colors cursor-pointer">
                <Plus className="h-6 w-6 text-primary mb-1" />
                <p className="text-sm font-medium text-primary">Add New</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default RecurringTransfers;
