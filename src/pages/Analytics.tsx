import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, Target, AlertCircle } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, BarChart, Bar } from "recharts";

const categoryData = [
  { name: "Shopping", value: 2450, color: "hsl(168, 76%, 42%)" },
  { name: "Food & Dining", value: 1820, color: "hsl(190, 80%, 45%)" },
  { name: "Transportation", value: 980, color: "hsl(38, 92%, 50%)" },
  { name: "Entertainment", value: 650, color: "hsl(280, 65%, 55%)" },
  { name: "Utilities", value: 520, color: "hsl(142, 76%, 36%)" },
  { name: "Healthcare", value: 380, color: "hsl(0, 72%, 51%)" },
];

const monthlyData = [
  { month: "Jul", income: 8500, expenses: 5200 },
  { month: "Aug", income: 9200, expenses: 6100 },
  { month: "Sep", income: 8800, expenses: 5800 },
  { month: "Oct", income: 9500, expenses: 6400 },
  { month: "Nov", income: 10200, expenses: 5900 },
  { month: "Dec", income: 11500, expenses: 6800 },
];

const budgetData = [
  { category: "Shopping", spent: 2450, budget: 3000, percentage: 82 },
  { category: "Food & Dining", spent: 1820, budget: 2000, percentage: 91 },
  { category: "Transportation", spent: 980, budget: 1500, percentage: 65 },
  { category: "Entertainment", spent: 650, budget: 800, percentage: 81 },
  { category: "Utilities", spent: 520, budget: 600, percentage: 87 },
];

const totalSpent = categoryData.reduce((acc, item) => acc + item.value, 0);

const Analytics = () => {
  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-64 p-8">
        <Header />
        
        <div className="grid grid-cols-12 gap-6">
          {/* Spending by Category */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="col-span-5 glass-card p-6"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Spending by Category
            </h3>
            
            <div className="flex items-center gap-6">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-2xl font-display font-bold text-foreground">
                    ${(totalSpent / 1000).toFixed(1)}k
                  </span>
                  <span className="text-xs text-muted-foreground">Total Spent</span>
                </div>
              </div>
              
              <div className="flex-1 space-y-3">
                {categoryData.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-sm text-muted-foreground flex-1">{item.name}</span>
                    <span className="text-sm font-medium text-foreground">
                      ${item.value.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Monthly Trends */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="col-span-7 glass-card p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-display font-semibold text-lg text-foreground">
                Monthly Trends
              </h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-xs text-muted-foreground">Income</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive" />
                  <span className="text-xs text-muted-foreground">Expenses</span>
                </div>
              </div>
            </div>
            
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false}
                  tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
                  tickFormatter={(value) => `$${value / 1000}k`}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'hsl(222, 47%, 10%)',
                    border: '1px solid hsl(222, 30%, 18%)',
                    borderRadius: '12px',
                    boxShadow: '0 8px 32px hsla(222, 47%, 4%, 0.5)',
                  }}
                  labelStyle={{ color: 'hsl(210, 40%, 98%)' }}
                  formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
                />
                <Area
                  type="monotone"
                  dataKey="income"
                  stroke="hsl(168, 76%, 42%)"
                  strokeWidth={2}
                  fill="url(#incomeGradient)"
                />
                <Area
                  type="monotone"
                  dataKey="expenses"
                  stroke="hsl(0, 72%, 51%)"
                  strokeWidth={2}
                  fill="url(#expenseGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Summary Cards */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="col-span-3 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Income</p>
                <p className="text-xl font-display font-bold text-foreground">$57,700</p>
              </div>
            </div>
            <p className="text-xs text-success">+12.5% from last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="col-span-3 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-destructive/20 flex items-center justify-center">
                <TrendingDown className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Total Expenses</p>
                <p className="text-xl font-display font-bold text-foreground">$36,200</p>
              </div>
            </div>
            <p className="text-xs text-destructive">+8.3% from last period</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="col-span-3 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Savings Rate</p>
                <p className="text-xl font-display font-bold text-foreground">37.3%</p>
              </div>
            </div>
            <p className="text-xs text-primary">On track with goals</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
            className="col-span-3 glass-card p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-warning/20 flex items-center justify-center">
                <AlertCircle className="w-5 h-5 text-warning" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Budget Alerts</p>
                <p className="text-xl font-display font-bold text-foreground">2</p>
              </div>
            </div>
            <p className="text-xs text-warning">Categories near limit</p>
          </motion.div>

          {/* Budget Tracking */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="col-span-12 glass-card p-6"
          >
            <h3 className="font-display font-semibold text-lg text-foreground mb-6">
              Budget Tracking
            </h3>
            
            <div className="space-y-5">
              {budgetData.map((item, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{item.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">
                        ${item.spent.toLocaleString()} / ${item.budget.toLocaleString()}
                      </span>
                      <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                        item.percentage >= 90 
                          ? 'bg-destructive/20 text-destructive'
                          : item.percentage >= 75
                          ? 'bg-warning/20 text-warning'
                          : 'bg-success/20 text-success'
                      }`}>
                        {item.percentage}%
                      </span>
                    </div>
                  </div>
                  <div className="h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${item.percentage}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full rounded-full ${
                        item.percentage >= 90 
                          ? 'bg-destructive'
                          : item.percentage >= 75
                          ? 'bg-warning'
                          : 'bg-primary'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Analytics;
