import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, Download, Calendar, TrendingUp, TrendingDown, DollarSign, PieChart } from "lucide-react";

const FinancialReports = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState("monthly");

  const reports = [
    { 
      name: "January 2024 Statement", 
      type: "Monthly", 
      date: "Feb 1, 2024", 
      size: "2.4 MB",
      income: 8500,
      expenses: 5200
    },
    { 
      name: "December 2023 Statement", 
      type: "Monthly", 
      date: "Jan 1, 2024", 
      size: "2.1 MB",
      income: 8500,
      expenses: 7800
    },
    { 
      name: "Q4 2023 Report", 
      type: "Quarterly", 
      date: "Jan 5, 2024", 
      size: "5.6 MB",
      income: 25500,
      expenses: 18400
    },
    { 
      name: "November 2023 Statement", 
      type: "Monthly", 
      date: "Dec 1, 2023", 
      size: "1.9 MB",
      income: 8500,
      expenses: 4900
    },
    { 
      name: "Annual Report 2023", 
      type: "Annual", 
      date: "Jan 15, 2024", 
      size: "12.3 MB",
      income: 102000,
      expenses: 68500
    },
  ];

  const summaryData = {
    totalIncome: 153000,
    totalExpenses: 104800,
    netSavings: 48200,
    savingsRate: 31.5
  };

  const monthlyBreakdown = [
    { month: "Jan", income: 8500, expenses: 5200 },
    { month: "Feb", income: 8500, expenses: 4800 },
    { month: "Mar", income: 9200, expenses: 6100 },
    { month: "Apr", income: 8500, expenses: 5500 },
    { month: "May", income: 8500, expenses: 4200 },
    { month: "Jun", income: 10000, expenses: 7800 },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Financial Reports</h1>
              <p className="text-muted-foreground">View and download your financial statements</p>
            </div>
            <Button className="gap-2">
              <Download className="h-4 w-4" />
              Generate Custom Report
            </Button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">${summaryData.totalIncome.toLocaleString()}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-500/10 to-red-500/5 border-red-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${summaryData.totalExpenses.toLocaleString()}</p>
                </div>
                <TrendingDown className="h-8 w-8 text-red-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Net Savings</p>
                  <p className="text-2xl font-bold text-blue-600">${summaryData.netSavings.toLocaleString()}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Savings Rate</p>
                  <p className="text-2xl font-bold text-purple-600">{summaryData.savingsRate}%</p>
                </div>
                <PieChart className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="statements" className="space-y-4">
          <TabsList>
            <TabsTrigger value="statements">Statements</TabsTrigger>
            <TabsTrigger value="breakdown">Monthly Breakdown</TabsTrigger>
          </TabsList>

          <TabsContent value="statements">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Available Reports</CardTitle>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="annual">Annual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {reports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <FileText className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{report.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{report.date}</span>
                          <span>•</span>
                          <span>{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <Badge variant="outline">{report.type}</Badge>
                      <div className="text-right hidden sm:block">
                        <p className="text-sm text-green-600">+${report.income.toLocaleString()}</p>
                        <p className="text-sm text-red-600">-${report.expenses.toLocaleString()}</p>
                      </div>
                      <Button variant="outline" size="sm" className="gap-2">
                        <Download className="h-4 w-4" />
                        PDF
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="breakdown">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Income vs Expenses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyBreakdown.map((month) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium text-foreground">{month.month} 2024</span>
                        <span className="text-muted-foreground">
                          Net: ${(month.income - month.expenses).toLocaleString()}
                        </span>
                      </div>
                      <div className="flex gap-2 h-6">
                        <div 
                          className="bg-green-500 rounded-l"
                          style={{ width: `${(month.income / 10000) * 100}%` }}
                        />
                        <div 
                          className="bg-red-500 rounded-r"
                          style={{ width: `${(month.expenses / 10000) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Income: ${month.income.toLocaleString()}</span>
                        <span>Expenses: ${month.expenses.toLocaleString()}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default FinancialReports;
