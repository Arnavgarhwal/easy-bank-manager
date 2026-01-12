import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {
  Users,
  CreditCard,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
  AlertTriangle,
  CheckCircle,
  Eye,
  Ban,
  MoreVertical,
  Search,
  Download,
  RefreshCw,
  LogOut,
  Settings,
  Bell,
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { useTheme } from "@/hooks/useTheme";

interface User {
  id: string;
  name: string;
  email: string;
  status: "active" | "suspended" | "pending";
  balance: number;
  transactions: number;
  joinDate: string;
  avatar?: string;
}

interface Transaction {
  id: string;
  user: string;
  type: "credit" | "debit" | "transfer";
  amount: number;
  status: "completed" | "pending" | "failed";
  date: string;
}

const mockUsers: User[] = [
  { id: "1", name: "Arnav Garhwal", email: "arnav.garhwal@email.com", status: "active", balance: 45230.50, transactions: 156, joinDate: "2023-06-15" },
  { id: "2", name: "Sarah Johnson", email: "sarah.j@email.com", status: "active", balance: 28450.00, transactions: 89, joinDate: "2023-08-22" },
  { id: "3", name: "Michael Chen", email: "m.chen@email.com", status: "pending", balance: 0, transactions: 0, joinDate: "2024-01-10" },
  { id: "4", name: "Emily Davis", email: "emily.d@email.com", status: "active", balance: 67890.25, transactions: 234, joinDate: "2022-11-05" },
  { id: "5", name: "James Wilson", email: "james.w@email.com", status: "suspended", balance: 12340.00, transactions: 45, joinDate: "2023-03-18" },
  { id: "6", name: "Lisa Anderson", email: "lisa.a@email.com", status: "active", balance: 89120.75, transactions: 312, joinDate: "2022-07-30" },
];

const mockTransactions: Transaction[] = [
  { id: "1", user: "Arnav Garhwal", type: "credit", amount: 5000, status: "completed", date: "2024-01-12" },
  { id: "2", user: "Sarah Johnson", type: "transfer", amount: 1500, status: "completed", date: "2024-01-12" },
  { id: "3", user: "Emily Davis", type: "debit", amount: 890, status: "pending", date: "2024-01-11" },
  { id: "4", user: "Lisa Anderson", type: "credit", amount: 12000, status: "completed", date: "2024-01-11" },
  { id: "5", user: "James Wilson", type: "transfer", amount: 500, status: "failed", date: "2024-01-10" },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<User[]>(mockUsers);

  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.status === "active").length;
  const totalBalance = users.reduce((sum, u) => sum + u.balance, 0);
  const totalTransactions = users.reduce((sum, u) => sum + u.transactions, 0);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSuspendUser = (userId: string) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "suspended" ? "active" : "suspended" }
          : user
      )
    );
    toast({
      title: "User Status Updated",
      description: "The user's account status has been changed.",
    });
  };

  const handleLogout = () => {
    navigate("/login");
  };

  const getStatusBadge = (status: User["status"]) => {
    switch (status) {
      case "active":
        return <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Active</Badge>;
      case "suspended":
        return <Badge className="bg-destructive/20 text-destructive">Suspended</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Pending</Badge>;
    }
  };

  const getTransactionBadge = (status: Transaction["status"]) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Completed</Badge>;
      case "pending":
        return <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Pending</Badge>;
      case "failed":
        return <Badge className="bg-destructive/20 text-destructive">Failed</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="font-display font-bold text-lg text-foreground">Vault Admin</h1>
                <p className="text-xs text-muted-foreground">Dashboard</p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {theme === "dark" ? "🌙" : "☀️"}
            </Button>
            <Button variant="ghost" size="icon">
              <Bell className="w-5 h-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-2">
                  <Avatar className="w-8 h-8">
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline">Admin</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => navigate("/settings")}>
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <main className="p-6 lg:p-8">
        <div className="space-y-6">
          {/* Stats Cards */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold text-foreground">{totalUsers}</p>
                      <p className="text-xs text-emerald-500 mt-1">+12% from last month</p>
                    </div>
                    <div className="p-4 bg-primary/20 rounded-full">
                      <Users className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Active Users</p>
                      <p className="text-3xl font-bold text-foreground">{activeUsers}</p>
                      <p className="text-xs text-muted-foreground mt-1">{Math.round((activeUsers/totalUsers)*100)}% of total</p>
                    </div>
                    <div className="p-4 bg-emerald-500/20 rounded-full">
                      <Activity className="w-6 h-6 text-emerald-500" />
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
                      <p className="text-sm text-muted-foreground">Total Balance</p>
                      <p className="text-3xl font-bold text-foreground">${(totalBalance/1000).toFixed(0)}k</p>
                      <p className="text-xs text-emerald-500 mt-1">+8.5% from last month</p>
                    </div>
                    <div className="p-4 bg-amber-500/20 rounded-full">
                      <DollarSign className="w-6 h-6 text-amber-500" />
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
                      <p className="text-sm text-muted-foreground">Transactions</p>
                      <p className="text-3xl font-bold text-foreground">{totalTransactions}</p>
                      <p className="text-xs text-emerald-500 mt-1">+23% from last month</p>
                    </div>
                    <div className="p-4 bg-purple-500/20 rounded-full">
                      <TrendingUp className="w-6 h-6 text-purple-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {/* Users Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <CardTitle>User Management</CardTitle>
                      <CardDescription>Manage all registered users</CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          placeholder="Search users..."
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="pl-9 w-[200px]"
                        />
                      </div>
                      <Button variant="outline" size="icon">
                        <RefreshCw className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="icon">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>User</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="hidden md:table-cell">Balance</TableHead>
                        <TableHead className="hidden sm:table-cell">Transactions</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredUsers.map((user) => (
                        <TableRow key={user.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar className="w-9 h-9">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback>
                                  {user.name.split(" ").map((n) => n[0]).join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium text-foreground">{user.name}</p>
                                <p className="text-xs text-muted-foreground">{user.email}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{getStatusBadge(user.status)}</TableCell>
                          <TableCell className="hidden md:table-cell font-medium">
                            ${user.balance.toLocaleString()}
                          </TableCell>
                          <TableCell className="hidden sm:table-cell">{user.transactions}</TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                  <Eye className="w-4 h-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleSuspendUser(user.id)}>
                                  <Ban className="w-4 h-4 mr-2" />
                                  {user.status === "suspended" ? "Activate" : "Suspend"}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Transactions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest platform activity</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-full ${
                          tx.type === "credit" 
                            ? "bg-emerald-500/20" 
                            : tx.type === "debit" 
                              ? "bg-destructive/20" 
                              : "bg-primary/20"
                        }`}>
                          <DollarSign className={`w-4 h-4 ${
                            tx.type === "credit" 
                              ? "text-emerald-500" 
                              : tx.type === "debit" 
                                ? "text-destructive" 
                                : "text-primary"
                          }`} />
                        </div>
                        <div>
                          <p className="font-medium text-foreground text-sm">{tx.user}</p>
                          <p className="text-xs text-muted-foreground capitalize">{tx.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-medium text-sm ${
                          tx.type === "credit" ? "text-emerald-500" : "text-foreground"
                        }`}>
                          {tx.type === "credit" ? "+" : "-"}${tx.amount.toLocaleString()}
                        </p>
                        {getTransactionBadge(tx.status)}
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Security Alerts */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Security Alerts
                </CardTitle>
                <CardDescription>Recent security events that need attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-3">
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-amber-500/50 bg-amber-500/10">
                    <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Suspicious Login</p>
                      <p className="text-sm text-muted-foreground">3 failed attempts from unknown IP</p>
                      <p className="text-xs text-muted-foreground mt-1">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-emerald-500/50 bg-emerald-500/10">
                    <CheckCircle className="w-5 h-5 text-emerald-500 mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">Security Scan Complete</p>
                      <p className="text-sm text-muted-foreground">No vulnerabilities detected</p>
                      <p className="text-xs text-muted-foreground mt-1">5 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 rounded-lg border border-primary/50 bg-primary/10">
                    <Activity className="w-5 h-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium text-foreground">High Traffic Detected</p>
                      <p className="text-sm text-muted-foreground">150% increase in API calls</p>
                      <p className="text-xs text-muted-foreground mt-1">1 day ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
