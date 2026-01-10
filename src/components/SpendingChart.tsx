import { motion } from "framer-motion";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "Mon", income: 2400, expense: 1200 },
  { name: "Tue", income: 1398, expense: 800 },
  { name: "Wed", income: 3200, expense: 1600 },
  { name: "Thu", income: 2780, expense: 1400 },
  { name: "Fri", income: 1890, expense: 900 },
  { name: "Sat", income: 2390, expense: 1100 },
  { name: "Sun", income: 3490, expense: 1500 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border border-border rounded-xl p-3 shadow-lg">
        <p className="text-xs text-muted-foreground mb-2">{label}</p>
        <p className="text-sm text-success font-medium">Income: ${payload[0]?.value}</p>
        <p className="text-sm text-destructive font-medium">Expense: ${payload[1]?.value}</p>
      </div>
    );
  }
  return null;
};

const SpendingChart = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="bg-card rounded-3xl p-6 border border-border"
    >
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display font-semibold text-lg text-foreground">Weekly Overview</h3>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-primary" />
            <span className="text-muted-foreground">Income</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-destructive/60" />
            <span className="text-muted-foreground">Expense</span>
          </div>
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(168, 76%, 42%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0.2} />
                <stop offset="95%" stopColor="hsl(0, 72%, 51%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false}
              tick={{ fill: 'hsl(215, 20%, 55%)', fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="income"
              stroke="hsl(168, 76%, 42%)"
              strokeWidth={2}
              fill="url(#incomeGradient)"
            />
            <Area
              type="monotone"
              dataKey="expense"
              stroke="hsl(0, 72%, 51%)"
              strokeWidth={2}
              fill="url(#expenseGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SpendingChart;