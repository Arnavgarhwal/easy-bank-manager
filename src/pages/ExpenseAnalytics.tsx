import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, TrendingDown, Lightbulb, AlertTriangle, DollarSign, ShoppingBag, Utensils, Home, Car, Film, Zap, Target } from "lucide-react";

const ExpenseAnalytics = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [period, setPeriod] = useState("month");

  const spendingByCategory = [
    { name: "Housing", amount: 1800, budget: 1800, icon: Home, color: "bg-blue-500", trend: 0 },
    { name: "Food & Dining", amount: 680, budget: 600, icon: Utensils, color: "bg-orange-500", trend: 13 },
    { name: "Transportation", amount: 420, budget: 500, icon: Car, color: "bg-green-500", trend: -16 },
    { name: "Shopping", amount: 350, budget: 300, icon: ShoppingBag, color: "bg-purple-500", trend: 17 },
    { name: "Entertainment", amount: 180, budget: 200, icon: Film, color: "bg-pink-500", trend: -10 },
    { name: "Utilities", amount: 245, budget: 250, icon: Zap, color: "bg-yellow-500", trend: -2 },
  ];

  const insights = [
    {
      type: "warning",
      icon: AlertTriangle,
      title: "Food spending 13% over budget",
      description: "You've spent $80 more than planned on dining this month. Consider meal prepping to save.",
      action: "View Details"
    },
    {
      type: "success",
      icon: TrendingDown,
      title: "Transportation costs down 16%",
      description: "Great job! Working from home has saved you $80 in commuting costs.",
      action: "See Savings"
    },
    {
      type: "tip",
      icon: Lightbulb,
      title: "Subscription audit suggested",
      description: "You have 8 active subscriptions totaling $124/mo. Review for unused services.",
      action: "Review Subscriptions"
    },
    {
      type: "goal",
      icon: Target,
      title: "Savings goal on track",
      description: "You're 78% toward your emergency fund goal. Keep it up!",
      action: "View Progress"
    },
  ];

  const monthlyTrend = [
    { month: "Aug", spending: 4200 },
    { month: "Sep", spending: 4800 },
    { month: "Oct", spending: 4100 },
    { month: "Nov", spending: 5200 },
    { month: "Dec", spending: 6100 },
    { month: "Jan", spending: 3675 },
  ];

  const savingsTips = [
    { tip: "Switch to annual billing on subscriptions", potential: 180 },
    { tip: "Use cashback cards for groceries", potential: 120 },
    { tip: "Negotiate car insurance renewal", potential: 200 },
    { tip: "Cancel unused gym membership", potential: 600 },
  ];

  const totalSpending = spendingByCategory.reduce((sum, cat) => sum + cat.amount, 0);
  const totalBudget = spendingByCategory.reduce((sum, cat) => sum + cat.budget, 0);
  const maxSpending = Math.max(...monthlyTrend.map(m => m.spending));

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Expense Analytics</h1>
              <p className="text-muted-foreground">AI-powered insights on your spending</p>
            </div>
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
                <SelectItem value="year">This Year</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Spending</p>
                  <p className="text-2xl font-bold text-foreground">${totalSpending.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-primary" />
              </div>
              <div className="mt-2 flex items-center gap-1 text-sm">
                <TrendingDown className="h-4 w-4 text-green-600" />
                <span className="text-green-600">12% less than last month</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Budget Remaining</p>
                  <p className="text-2xl font-bold text-green-600">${(totalBudget - totalSpending).toLocaleString()}</p>
                </div>
                <Target className="h-8 w-8 text-green-600" />
              </div>
              <Progress value={(totalSpending / totalBudget) * 100} className="mt-2 h-2" />
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Daily Spend</p>
                  <p className="text-2xl font-bold text-blue-600">${Math.round(totalSpending / 30)}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Potential Savings</p>
                  <p className="text-2xl font-bold text-purple-600">$1,100</p>
                </div>
                <Lightbulb className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Spending by Category */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Spending by Category</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {spendingByCategory.map((category) => {
                  const Icon = category.icon;
                  const percentage = (category.amount / category.budget) * 100;
                  const isOverBudget = category.amount > category.budget;
                  
                  return (
                    <div key={category.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`h-10 w-10 rounded-lg ${category.color} flex items-center justify-center`}>
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <div>
                            <span className="font-medium text-foreground">{category.name}</span>
                            <div className="flex items-center gap-1 text-sm">
                              {category.trend > 0 ? (
                                <TrendingUp className="h-3 w-3 text-red-500" />
                              ) : (
                                <TrendingDown className="h-3 w-3 text-green-500" />
                              )}
                              <span className={category.trend > 0 ? 'text-red-500' : 'text-green-500'}>
                                {Math.abs(category.trend)}% vs last month
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`font-bold ${isOverBudget ? 'text-red-600' : 'text-foreground'}`}>
                            ${category.amount}
                          </span>
                          <span className="text-muted-foreground text-sm"> / ${category.budget}</span>
                        </div>
                      </div>
                      <Progress 
                        value={Math.min(percentage, 100)} 
                        className={`h-2 ${isOverBudget ? '[&>div]:bg-red-500' : ''}`}
                      />
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            {/* Monthly Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Spending Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-end justify-between h-48 gap-2">
                  {monthlyTrend.map((month) => (
                    <div key={month.month} className="flex-1 flex flex-col items-center gap-2">
                      <div 
                        className="w-full bg-primary/20 rounded-t hover:bg-primary/30 transition-colors relative group"
                        style={{ height: `${(month.spending / maxSpending) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-foreground text-background text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          ${month.spending.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{month.month}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Insights & Tips */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {insights.map((insight, index) => {
                  const Icon = insight.icon;
                  const bgColor = insight.type === 'warning' ? 'bg-orange-500/10' : 
                                  insight.type === 'success' ? 'bg-green-500/10' :
                                  insight.type === 'tip' ? 'bg-blue-500/10' : 'bg-purple-500/10';
                  const iconColor = insight.type === 'warning' ? 'text-orange-500' : 
                                    insight.type === 'success' ? 'text-green-500' :
                                    insight.type === 'tip' ? 'text-blue-500' : 'text-purple-500';
                  
                  return (
                    <div key={index} className={`p-4 rounded-lg ${bgColor}`}>
                      <div className="flex items-start gap-3">
                        <Icon className={`h-5 w-5 mt-0.5 ${iconColor}`} />
                        <div className="flex-1">
                          <p className="font-medium text-foreground text-sm">{insight.title}</p>
                          <p className="text-xs text-muted-foreground mt-1">{insight.description}</p>
                          <Button variant="link" className="h-auto p-0 text-xs mt-2">
                            {insight.action} →
                          </Button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Savings Opportunities</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {savingsTips.map((tip, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <p className="text-sm text-foreground flex-1">{tip.tip}</p>
                    <Badge variant="secondary" className="bg-green-500/10 text-green-600">
                      +${tip.potential}/yr
                    </Badge>
                  </div>
                ))}
                <div className="pt-3 border-t">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total potential savings</span>
                    <span className="font-bold text-green-600">
                      ${savingsTips.reduce((sum, t) => sum + t.potential, 0)}/yr
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ExpenseAnalytics;
