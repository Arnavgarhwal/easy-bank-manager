import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, AlertTriangle, CheckCircle, TrendingUp, DollarSign, Target, Bell, Home, Utensils, Car, ShoppingBag, Film, Zap, Heart, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BudgetPlanner = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAddBudgetOpen, setIsAddBudgetOpen] = useState(false);
  const { toast } = useToast();

  const [budgets, setBudgets] = useState([
    { id: 1, name: "Housing", icon: Home, budget: 1800, spent: 1800, color: "bg-blue-500", alert: 90, alertEnabled: true },
    { id: 2, name: "Food & Dining", icon: Utensils, budget: 600, spent: 520, color: "bg-orange-500", alert: 80, alertEnabled: true },
    { id: 3, name: "Transportation", icon: Car, budget: 500, spent: 380, color: "bg-green-500", alert: 85, alertEnabled: true },
    { id: 4, name: "Shopping", icon: ShoppingBag, budget: 300, spent: 285, color: "bg-purple-500", alert: 75, alertEnabled: true },
    { id: 5, name: "Entertainment", icon: Film, budget: 200, spent: 120, color: "bg-pink-500", alert: 80, alertEnabled: false },
    { id: 6, name: "Utilities", icon: Zap, budget: 250, spent: 215, color: "bg-yellow-500", alert: 90, alertEnabled: true },
    { id: 7, name: "Healthcare", icon: Heart, budget: 150, spent: 45, color: "bg-red-500", alert: 80, alertEnabled: true },
    { id: 8, name: "Personal", icon: Briefcase, budget: 200, spent: 165, color: "bg-teal-500", alert: 75, alertEnabled: false },
  ]);

  const [newBudget, setNewBudget] = useState({
    name: "",
    budget: "",
    alert: "80",
    category: "other"
  });

  const totalBudget = budgets.reduce((sum, b) => sum + b.budget, 0);
  const totalSpent = budgets.reduce((sum, b) => sum + b.spent, 0);
  const remaining = totalBudget - totalSpent;

  const alerts = budgets.filter(b => {
    const percentage = (b.spent / b.budget) * 100;
    return b.alertEnabled && percentage >= b.alert;
  });

  const handleAddBudget = () => {
    if (!newBudget.name || !newBudget.budget) {
      toast({ title: "Missing fields", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }

    const newItem = {
      id: budgets.length + 1,
      name: newBudget.name,
      icon: Briefcase,
      budget: parseFloat(newBudget.budget),
      spent: 0,
      color: "bg-gray-500",
      alert: parseInt(newBudget.alert),
      alertEnabled: true
    };

    setBudgets([...budgets, newItem]);
    setNewBudget({ name: "", budget: "", alert: "80", category: "other" });
    setIsAddBudgetOpen(false);
    toast({ title: "Budget added!", description: `${newBudget.name} budget has been created` });
  };

  const toggleAlert = (id: number) => {
    setBudgets(budgets.map(b => 
      b.id === id ? { ...b, alertEnabled: !b.alertEnabled } : b
    ));
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Budget Planner</h1>
              <p className="text-muted-foreground">Set and track monthly spending limits</p>
            </div>
            <Dialog open={isAddBudgetOpen} onOpenChange={setIsAddBudgetOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add Budget
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Budget</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label>Category Name</Label>
                    <Input 
                      placeholder="e.g., Subscriptions" 
                      value={newBudget.name}
                      onChange={(e) => setNewBudget({ ...newBudget, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Monthly Budget</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        className="pl-8"
                        value={newBudget.budget}
                        onChange={(e) => setNewBudget({ ...newBudget, budget: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Alert Threshold</Label>
                    <Select value={newBudget.alert} onValueChange={(v) => setNewBudget({ ...newBudget, alert: v })}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="50">At 50% spent</SelectItem>
                        <SelectItem value="75">At 75% spent</SelectItem>
                        <SelectItem value="80">At 80% spent</SelectItem>
                        <SelectItem value="90">At 90% spent</SelectItem>
                        <SelectItem value="100">At 100% spent</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <Button className="w-full" onClick={handleAddBudget}>Create Budget</Button>
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
                  <p className="text-sm text-muted-foreground">Total Budget</p>
                  <p className="text-2xl font-bold text-foreground">${totalBudget.toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spent</p>
                  <p className="text-2xl font-bold text-blue-600">${totalSpent.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-2xl font-bold text-green-600">${remaining.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className={`bg-gradient-to-br ${alerts.length > 0 ? 'from-orange-500/10 to-orange-500/5 border-orange-500/20' : 'from-green-500/10 to-green-500/5 border-green-500/20'}`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Alerts</p>
                  <p className={`text-2xl font-bold ${alerts.length > 0 ? 'text-orange-600' : 'text-green-600'}`}>{alerts.length}</p>
                </div>
                {alerts.length > 0 ? (
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                ) : (
                  <CheckCircle className="h-8 w-8 text-green-600" />
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {alerts.length > 0 && (
          <Card className="mb-6 border-orange-500/30 bg-orange-500/5">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-orange-600">
                <AlertTriangle className="h-5 w-5" />
                Budget Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {alerts.map((alert) => {
                  const percentage = Math.round((alert.spent / alert.budget) * 100);
                  return (
                    <div key={alert.id} className="flex items-center justify-between p-3 rounded-lg bg-background">
                      <span className="font-medium text-foreground">{alert.name}</span>
                      <div className="flex items-center gap-3">
                        <span className="text-sm text-muted-foreground">
                          ${alert.spent} / ${alert.budget}
                        </span>
                        <Badge variant="destructive">{percentage}%</Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Budget Categories */}
        <Card>
          <CardHeader>
            <CardTitle>Budget Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {budgets.map((budget) => {
                const Icon = budget.icon;
                const percentage = Math.round((budget.spent / budget.budget) * 100);
                const isNearLimit = percentage >= budget.alert;
                const isOverBudget = percentage > 100;
                
                return (
                  <div key={budget.id} className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${budget.color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{budget.name}</p>
                          <p className="text-sm text-muted-foreground">
                            ${budget.spent.toLocaleString()} of ${budget.budget.toLocaleString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Bell className={`h-4 w-4 ${budget.alertEnabled ? 'text-primary' : 'text-muted-foreground'}`} />
                          <Switch 
                            checked={budget.alertEnabled} 
                            onCheckedChange={() => toggleAlert(budget.id)}
                          />
                        </div>
                        <Badge 
                          variant={isOverBudget ? "destructive" : isNearLimit ? "secondary" : "outline"}
                          className={isNearLimit && !isOverBudget ? "bg-orange-500/10 text-orange-600 border-orange-500/30" : ""}
                        >
                          {percentage}%
                        </Badge>
                      </div>
                    </div>
                    <div className="relative">
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className={`h-3 ${isOverBudget ? '[&>div]:bg-red-500' : isNearLimit ? '[&>div]:bg-orange-500' : ''}`}
                      />
                      {budget.alertEnabled && (
                        <div 
                          className="absolute top-0 bottom-0 w-0.5 bg-orange-500"
                          style={{ left: `${budget.alert}%` }}
                        />
                      )}
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Remaining: ${Math.max(0, budget.budget - budget.spent).toLocaleString()}</span>
                      {budget.alertEnabled && (
                        <span>Alert at {budget.alert}%</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default BudgetPlanner;
