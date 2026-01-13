import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Download, TrendingUp, Receipt, Building, Heart, GraduationCap, Home, Car, Briefcase } from "lucide-react";

const TaxSummary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedYear, setSelectedYear] = useState("2024");

  const taxCategories = [
    { name: "Medical Expenses", icon: Heart, amount: 3250, limit: 10000, color: "bg-rose-500" },
    { name: "Education", icon: GraduationCap, amount: 5600, limit: 8000, color: "bg-blue-500" },
    { name: "Home Mortgage Interest", icon: Home, amount: 12400, limit: 25000, color: "bg-green-500" },
    { name: "Vehicle Expenses", icon: Car, amount: 2800, limit: 5000, color: "bg-orange-500" },
    { name: "Business Expenses", icon: Briefcase, amount: 8900, limit: 15000, color: "bg-purple-500" },
    { name: "Charitable Donations", icon: Building, amount: 1500, limit: 5000, color: "bg-teal-500" },
  ];

  const taxDocuments = [
    { name: "W-2 Form", status: "received", date: "Jan 15, 2024" },
    { name: "1099-INT", status: "received", date: "Jan 20, 2024" },
    { name: "1099-DIV", status: "pending", date: "Expected Feb 1" },
    { name: "Property Tax Statement", status: "received", date: "Dec 28, 2023" },
    { name: "Mortgage Interest Statement", status: "received", date: "Jan 18, 2024" },
  ];

  const totalDeductions = taxCategories.reduce((sum, cat) => sum + cat.amount, 0);
  const estimatedSavings = totalDeductions * 0.22;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-display font-bold text-foreground">Tax Summary</h1>
              <p className="text-muted-foreground">Track deductible expenses and tax documents</p>
            </div>
            <div className="flex gap-3">
              <Select value={selectedYear} onValueChange={setSelectedYear}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2024">2024</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                </SelectContent>
              </Select>
              <Button className="gap-2">
                <Download className="h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Deductions</p>
                  <p className="text-2xl font-bold text-foreground">${totalDeductions.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Receipt className="h-6 w-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Estimated Savings</p>
                  <p className="text-2xl font-bold text-green-600">${estimatedSavings.toLocaleString()}</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Tax Bracket</p>
                  <p className="text-2xl font-bold text-blue-600">22%</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Documents</p>
                  <p className="text-2xl font-bold text-purple-600">4/5</p>
                </div>
                <div className="h-12 w-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                  <FileText className="h-6 w-6 text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Deductible Categories */}
          <Card>
            <CardHeader>
              <CardTitle>Deductible Expenses by Category</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {taxCategories.map((category) => {
                const Icon = category.icon;
                const percentage = (category.amount / category.limit) * 100;
                return (
                  <div key={category.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg ${category.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">{category.name}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ${category.amount.toLocaleString()} / ${category.limit.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Tax Documents */}
          <Card>
            <CardHeader>
              <CardTitle>Tax Documents</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {taxDocuments.map((doc, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-foreground">{doc.name}</p>
                      <p className="text-sm text-muted-foreground">{doc.date}</p>
                    </div>
                  </div>
                  <Badge variant={doc.status === "received" ? "default" : "secondary"}>
                    {doc.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default TaxSummary;
