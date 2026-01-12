import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Target,
  Plus,
  TrendingUp,
  Wallet,
  Car,
  Home,
  Plane,
  GraduationCap,
  Gift,
  Sparkles,
  Edit2,
  Trash2,
  X,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
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
import { useToast } from "@/hooks/use-toast";

interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  category: string;
  icon: React.ReactNode;
  color: string;
  monthlyContribution: number;
}

const categoryIcons: Record<string, React.ReactNode> = {
  emergency: <Wallet className="w-5 h-5" />,
  car: <Car className="w-5 h-5" />,
  home: <Home className="w-5 h-5" />,
  vacation: <Plane className="w-5 h-5" />,
  education: <GraduationCap className="w-5 h-5" />,
  gift: <Gift className="w-5 h-5" />,
  other: <Sparkles className="w-5 h-5" />,
};

const categoryColors: Record<string, string> = {
  emergency: "from-red-500 to-orange-500",
  car: "from-blue-500 to-cyan-500",
  home: "from-green-500 to-emerald-500",
  vacation: "from-purple-500 to-pink-500",
  education: "from-amber-500 to-yellow-500",
  gift: "from-rose-500 to-red-500",
  other: "from-indigo-500 to-violet-500",
};

const mockGoals: SavingsGoal[] = [
  {
    id: "1",
    name: "Emergency Fund",
    targetAmount: 10000,
    currentAmount: 7500,
    deadline: "2024-06-01",
    category: "emergency",
    icon: <Wallet className="w-5 h-5" />,
    color: "from-red-500 to-orange-500",
    monthlyContribution: 500,
  },
  {
    id: "2",
    name: "New Car",
    targetAmount: 25000,
    currentAmount: 12000,
    deadline: "2025-01-01",
    category: "car",
    icon: <Car className="w-5 h-5" />,
    color: "from-blue-500 to-cyan-500",
    monthlyContribution: 800,
  },
  {
    id: "3",
    name: "Dream Vacation",
    targetAmount: 5000,
    currentAmount: 3200,
    deadline: "2024-08-01",
    category: "vacation",
    icon: <Plane className="w-5 h-5" />,
    color: "from-purple-500 to-pink-500",
    monthlyContribution: 300,
  },
  {
    id: "4",
    name: "Home Down Payment",
    targetAmount: 50000,
    currentAmount: 18000,
    deadline: "2026-01-01",
    category: "home",
    icon: <Home className="w-5 h-5" />,
    color: "from-green-500 to-emerald-500",
    monthlyContribution: 1200,
  },
];

const SavingsGoals = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [goals, setGoals] = useState<SavingsGoal[]>(mockGoals);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isContributeModalOpen, setIsContributeModalOpen] = useState(false);
  const [selectedGoal, setSelectedGoal] = useState<SavingsGoal | null>(null);
  const [contributionAmount, setContributionAmount] = useState("");

  const [newGoal, setNewGoal] = useState({
    name: "",
    targetAmount: "",
    deadline: "",
    category: "other",
    monthlyContribution: "",
  });

  const totalSaved = goals.reduce((sum, goal) => sum + goal.currentAmount, 0);
  const totalTarget = goals.reduce((sum, goal) => sum + goal.targetAmount, 0);
  const overallProgress = (totalSaved / totalTarget) * 100;

  const handleAddGoal = () => {
    if (!newGoal.name || !newGoal.targetAmount || !newGoal.deadline) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const goal: SavingsGoal = {
      id: Date.now().toString(),
      name: newGoal.name,
      targetAmount: parseFloat(newGoal.targetAmount),
      currentAmount: 0,
      deadline: newGoal.deadline,
      category: newGoal.category,
      icon: categoryIcons[newGoal.category],
      color: categoryColors[newGoal.category],
      monthlyContribution: parseFloat(newGoal.monthlyContribution) || 0,
    };

    setGoals([...goals, goal]);
    setIsAddModalOpen(false);
    setNewGoal({
      name: "",
      targetAmount: "",
      deadline: "",
      category: "other",
      monthlyContribution: "",
    });

    toast({
      title: "Goal Created",
      description: `${goal.name} has been added to your savings goals.`,
    });
  };

  const handleContribute = () => {
    if (!selectedGoal || !contributionAmount) return;

    const amount = parseFloat(contributionAmount);
    setGoals(
      goals.map((goal) =>
        goal.id === selectedGoal.id
          ? { ...goal, currentAmount: Math.min(goal.currentAmount + amount, goal.targetAmount) }
          : goal
      )
    );

    toast({
      title: "Contribution Added",
      description: `$${amount.toFixed(2)} added to ${selectedGoal.name}.`,
    });

    setIsContributeModalOpen(false);
    setSelectedGoal(null);
    setContributionAmount("");
  };

  const handleDeleteGoal = (goalId: string) => {
    setGoals(goals.filter((goal) => goal.id !== goalId));
    toast({
      title: "Goal Deleted",
      description: "The savings goal has been removed.",
    });
  };

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-emerald-500";
    if (progress >= 50) return "bg-amber-500";
    return "bg-primary";
  };

  const calculateMonthsRemaining = (deadline: string) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const months = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24 * 30));
    return Math.max(0, months);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Savings Goals</h1>
              <p className="text-muted-foreground mt-1">Track your progress toward financial targets</p>
            </div>
            <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  New Goal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create Savings Goal</DialogTitle>
                  <DialogDescription>Set a new financial target to work towards</DialogDescription>
                </DialogHeader>
                <div className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="goalName">Goal Name</Label>
                    <Input
                      id="goalName"
                      placeholder="e.g., Emergency Fund, New Car"
                      value={newGoal.name}
                      onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="targetAmount">Target Amount</Label>
                      <Input
                        id="targetAmount"
                        type="number"
                        placeholder="10000"
                        value={newGoal.targetAmount}
                        onChange={(e) => setNewGoal({ ...newGoal, targetAmount: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        value={newGoal.category}
                        onValueChange={(value) => setNewGoal({ ...newGoal, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="emergency">Emergency Fund</SelectItem>
                          <SelectItem value="car">Car</SelectItem>
                          <SelectItem value="home">Home</SelectItem>
                          <SelectItem value="vacation">Vacation</SelectItem>
                          <SelectItem value="education">Education</SelectItem>
                          <SelectItem value="gift">Gift</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Target Date</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={newGoal.deadline}
                        onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="monthly">Monthly Contribution</Label>
                      <Input
                        id="monthly"
                        type="number"
                        placeholder="500"
                        value={newGoal.monthlyContribution}
                        onChange={(e) => setNewGoal({ ...newGoal, monthlyContribution: e.target.value })}
                      />
                    </div>
                  </div>
                  <Button onClick={handleAddGoal} className="w-full">
                    Create Goal
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>

          {/* Overview Cards */}
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
                      <p className="text-sm text-muted-foreground">Total Saved</p>
                      <p className="text-2xl font-bold text-foreground">${totalSaved.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                      <Wallet className="w-6 h-6 text-emerald-500" />
                    </div>
                  </div>
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
                      <p className="text-sm text-muted-foreground">Target Total</p>
                      <p className="text-2xl font-bold text-foreground">${totalTarget.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-primary/20 rounded-full">
                      <Target className="w-6 h-6 text-primary" />
                    </div>
                  </div>
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
                      <p className="text-sm text-muted-foreground">Overall Progress</p>
                      <p className="text-2xl font-bold text-foreground">{overallProgress.toFixed(1)}%</p>
                    </div>
                    <div className="p-3 bg-amber-500/20 rounded-full">
                      <TrendingUp className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                  <Progress value={overallProgress} className="mt-3 h-2" />
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Goals Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            <AnimatePresence>
              {goals.map((goal, index) => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100;
                const remaining = goal.targetAmount - goal.currentAmount;
                const monthsLeft = calculateMonthsRemaining(goal.deadline);

                return (
                  <motion.div
                    key={goal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.5, delay: 0.1 * index }}
                  >
                    <Card className="overflow-hidden">
                      <div className={`h-2 bg-gradient-to-r ${goal.color}`} />
                      <CardHeader className="pb-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl bg-gradient-to-br ${goal.color} text-white`}>
                              {categoryIcons[goal.category]}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{goal.name}</CardTitle>
                              <CardDescription>{monthsLeft} months remaining</CardDescription>
                            </div>
                          </div>
                          <div className="flex gap-1">
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => handleDeleteGoal(goal.id)}
                            >
                              <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">
                              ${goal.currentAmount.toLocaleString()} saved
                            </span>
                            <span className="font-medium text-foreground">
                              ${goal.targetAmount.toLocaleString()}
                            </span>
                          </div>
                          <div className="relative">
                            <Progress value={progress} className="h-3" />
                          </div>
                          <div className="flex justify-between items-center">
                            <Badge variant="secondary" className="text-xs">
                              {progress.toFixed(0)}% complete
                            </Badge>
                            <span className="text-xs text-muted-foreground">
                              ${remaining.toLocaleString()} to go
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-2 border-t border-border">
                          <div className="text-sm">
                            <span className="text-muted-foreground">Monthly: </span>
                            <span className="font-medium text-foreground">
                              ${goal.monthlyContribution}/mo
                            </span>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => {
                              setSelectedGoal(goal);
                              setIsContributeModalOpen(true);
                            }}
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Funds
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>

          {goals.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">No savings goals yet</h3>
              <p className="text-muted-foreground mb-4">Create your first goal to start tracking your progress</p>
              <Button onClick={() => setIsAddModalOpen(true)}>
                <Plus className="w-4 h-4 mr-2" />
                Create Goal
              </Button>
            </motion.div>
          )}
        </div>
      </main>

      {/* Contribute Modal */}
      <Dialog open={isContributeModalOpen} onOpenChange={setIsContributeModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Funds to {selectedGoal?.name}</DialogTitle>
            <DialogDescription>
              Current balance: ${selectedGoal?.currentAmount.toLocaleString()} of $
              {selectedGoal?.targetAmount.toLocaleString()}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="space-y-2">
              <Label htmlFor="contribution">Amount to Add</Label>
              <Input
                id="contribution"
                type="number"
                placeholder="Enter amount"
                value={contributionAmount}
                onChange={(e) => setContributionAmount(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              {[50, 100, 250, 500].map((amount) => (
                <Button
                  key={amount}
                  variant="outline"
                  size="sm"
                  onClick={() => setContributionAmount(amount.toString())}
                >
                  ${amount}
                </Button>
              ))}
            </div>
            <Button onClick={handleContribute} className="w-full">
              Add Funds
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SavingsGoals;
