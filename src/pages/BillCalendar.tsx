import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Calendar, Bell, ChevronLeft, ChevronRight, Zap, Wifi, Home, Car, CreditCard, Smartphone } from "lucide-react";

const BillCalendar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const bills = [
    { id: 1, name: "Electricity", amount: 145, dueDate: 5, icon: Zap, color: "bg-yellow-500", reminder: true },
    { id: 2, name: "Internet", amount: 79.99, dueDate: 8, icon: Wifi, color: "bg-blue-500", reminder: true },
    { id: 3, name: "Rent", amount: 1800, dueDate: 1, icon: Home, color: "bg-green-500", reminder: true },
    { id: 4, name: "Car Insurance", amount: 156, dueDate: 15, icon: Car, color: "bg-purple-500", reminder: false },
    { id: 5, name: "Credit Card", amount: 450, dueDate: 20, icon: CreditCard, color: "bg-red-500", reminder: true },
    { id: 6, name: "Phone", amount: 85, dueDate: 12, icon: Smartphone, color: "bg-teal-500", reminder: false },
  ];

  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const daysInMonth = getDaysInMonth(currentMonth);
  const firstDay = getFirstDayOfMonth(currentMonth);
  const today = new Date().getDate();
  const isCurrentMonth = currentMonth.getMonth() === new Date().getMonth() && 
                         currentMonth.getFullYear() === new Date().getFullYear();

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const navigateMonth = (direction: number) => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + direction, 1));
  };

  const getBillsForDay = (day: number) => {
    return bills.filter(bill => bill.dueDate === day);
  };

  const upcomingBills = bills
    .filter(bill => bill.dueDate >= today || !isCurrentMonth)
    .sort((a, b) => a.dueDate - b.dueDate)
    .slice(0, 5);

  const totalDue = bills.reduce((sum, bill) => sum + bill.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Bill Calendar</h1>
          <p className="text-muted-foreground">View and manage your upcoming bill payments</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Due This Month</p>
                  <p className="text-2xl font-bold text-foreground">${totalDue.toLocaleString()}</p>
                </div>
                <Calendar className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Upcoming Bills</p>
                  <p className="text-2xl font-bold text-orange-600">{upcomingBills.length}</p>
                </div>
                <Bell className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Reminders Active</p>
                  <p className="text-2xl font-bold text-green-600">{bills.filter(b => b.reminder).length}/{bills.length}</p>
                </div>
                <Bell className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</CardTitle>
                  <div className="flex gap-2">
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(-1)}>
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={() => navigateMonth(1)}>
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-7 gap-1">
                  {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                    <div key={day} className="text-center text-sm font-medium text-muted-foreground py-2">
                      {day}
                    </div>
                  ))}
                  
                  {Array.from({ length: firstDay }).map((_, i) => (
                    <div key={`empty-${i}`} className="p-2" />
                  ))}
                  
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayBills = getBillsForDay(day);
                    const isToday = isCurrentMonth && day === today;
                    
                    return (
                      <div 
                        key={day} 
                        className={`min-h-[80px] p-2 rounded-lg border ${
                          isToday ? 'bg-primary/10 border-primary' : 'border-border hover:bg-muted/50'
                        } transition-colors`}
                      >
                        <span className={`text-sm font-medium ${isToday ? 'text-primary' : 'text-foreground'}`}>
                          {day}
                        </span>
                        <div className="mt-1 space-y-1">
                          {dayBills.map((bill) => {
                            const Icon = bill.icon;
                            return (
                              <div 
                                key={bill.id} 
                                className={`flex items-center gap-1 px-1 py-0.5 rounded text-xs ${bill.color} text-white`}
                              >
                                <Icon className="h-3 w-3" />
                                <span className="truncate">${bill.amount}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upcoming Bills & Reminders */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Upcoming Bills</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {upcomingBills.map((bill) => {
                  const Icon = bill.icon;
                  const daysUntil = bill.dueDate - today;
                  
                  return (
                    <div key={bill.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-lg ${bill.color} flex items-center justify-center`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{bill.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {daysUntil === 0 ? "Due today" : 
                             daysUntil < 0 ? "Overdue" : 
                             `Due in ${daysUntil} days`}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-foreground">${bill.amount}</p>
                        {daysUntil <= 3 && daysUntil >= 0 && (
                          <Badge variant="destructive" className="text-xs">Soon</Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Reminder Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {bills.map((bill) => {
                  const Icon = bill.icon;
                  return (
                    <div key={bill.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`h-8 w-8 rounded-lg ${bill.color} flex items-center justify-center`}>
                          <Icon className="h-4 w-4 text-white" />
                        </div>
                        <span className="font-medium text-foreground">{bill.name}</span>
                      </div>
                      <Switch checked={bill.reminder} />
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BillCalendar;
