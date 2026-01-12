import { useState } from "react";
import { motion } from "framer-motion";
import {
  Activity,
  LogIn,
  LogOut,
  Key,
  Shield,
  Smartphone,
  Monitor,
  Globe,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Calendar,
  Search,
  Download,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface ActivityLog {
  id: string;
  type: "login" | "logout" | "password_change" | "2fa_enabled" | "2fa_disabled" | "failed_login" | "session_expired" | "device_added" | "settings_changed";
  description: string;
  timestamp: string;
  device: string;
  location: string;
  ipAddress: string;
  status: "success" | "warning" | "error";
  browser?: string;
}

const mockLogs: ActivityLog[] = [
  {
    id: "1",
    type: "login",
    description: "Successful login",
    timestamp: "2024-01-12T14:30:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "success",
    browser: "Chrome 120",
  },
  {
    id: "2",
    type: "password_change",
    description: "Password changed successfully",
    timestamp: "2024-01-11T10:15:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "success",
    browser: "Chrome 120",
  },
  {
    id: "3",
    type: "failed_login",
    description: "Failed login attempt - incorrect password",
    timestamp: "2024-01-10T22:45:00Z",
    device: "Mobile",
    location: "Los Angeles, USA",
    ipAddress: "10.0.0.55",
    status: "error",
    browser: "Safari Mobile",
  },
  {
    id: "4",
    type: "2fa_enabled",
    description: "Two-factor authentication enabled",
    timestamp: "2024-01-09T16:20:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "success",
    browser: "Chrome 120",
  },
  {
    id: "5",
    type: "device_added",
    description: "New device added - iPhone 15 Pro",
    timestamp: "2024-01-08T09:00:00Z",
    device: "Mobile",
    location: "New York, USA",
    ipAddress: "192.168.1.101",
    status: "warning",
    browser: "Safari Mobile",
  },
  {
    id: "6",
    type: "logout",
    description: "Manual logout",
    timestamp: "2024-01-07T18:30:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "success",
    browser: "Chrome 120",
  },
  {
    id: "7",
    type: "session_expired",
    description: "Session expired due to inactivity",
    timestamp: "2024-01-06T23:59:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "warning",
    browser: "Firefox 121",
  },
  {
    id: "8",
    type: "settings_changed",
    description: "Notification preferences updated",
    timestamp: "2024-01-05T11:45:00Z",
    device: "Desktop",
    location: "New York, USA",
    ipAddress: "192.168.1.100",
    status: "success",
    browser: "Chrome 120",
  },
  {
    id: "9",
    type: "login",
    description: "Successful login from new device",
    timestamp: "2024-01-04T08:15:00Z",
    device: "Tablet",
    location: "Boston, USA",
    ipAddress: "172.16.0.50",
    status: "warning",
    browser: "Safari",
  },
  {
    id: "10",
    type: "failed_login",
    description: "Failed login attempt - account locked temporarily",
    timestamp: "2024-01-03T02:30:00Z",
    device: "Unknown",
    location: "Unknown",
    ipAddress: "45.33.32.156",
    status: "error",
    browser: "Unknown",
  },
];

const ActivityLogs = () => {
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logs] = useState<ActivityLog[]>(mockLogs);
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredLogs = logs.filter((log) => {
    const matchesSearch =
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.ipAddress.includes(searchQuery);
    const matchesType = typeFilter === "all" || log.type === typeFilter;
    const matchesStatus = statusFilter === "all" || log.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getTypeIcon = (type: ActivityLog["type"]) => {
    switch (type) {
      case "login":
        return <LogIn className="w-4 h-4" />;
      case "logout":
        return <LogOut className="w-4 h-4" />;
      case "password_change":
        return <Key className="w-4 h-4" />;
      case "2fa_enabled":
      case "2fa_disabled":
        return <Shield className="w-4 h-4" />;
      case "failed_login":
        return <AlertTriangle className="w-4 h-4" />;
      case "device_added":
        return <Smartphone className="w-4 h-4" />;
      case "session_expired":
        return <Activity className="w-4 h-4" />;
      case "settings_changed":
        return <Activity className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  const getStatusIcon = (status: ActivityLog["status"]) => {
    switch (status) {
      case "success":
        return <CheckCircle className="w-4 h-4 text-emerald-500" />;
      case "warning":
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case "error":
        return <XCircle className="w-4 h-4 text-destructive" />;
    }
  };

  const getStatusBadge = (status: ActivityLog["status"]) => {
    switch (status) {
      case "success":
        return <Badge className="bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">Success</Badge>;
      case "warning":
        return <Badge className="bg-amber-500/20 text-amber-600 dark:text-amber-400">Warning</Badge>;
      case "error":
        return <Badge className="bg-destructive/20 text-destructive">Failed</Badge>;
    }
  };

  const getDeviceIcon = (device: string) => {
    switch (device.toLowerCase()) {
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "desktop":
        return <Monitor className="w-4 h-4" />;
      default:
        return <Globe className="w-4 h-4" />;
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleExport = () => {
    toast({
      title: "Export Started",
      description: "Your activity logs are being exported.",
    });
  };

  const successCount = logs.filter((l) => l.status === "success").length;
  const warningCount = logs.filter((l) => l.status === "warning").length;
  const errorCount = logs.filter((l) => l.status === "error").length;

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
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Activity Logs</h1>
              <p className="text-muted-foreground mt-1">Monitor your account security and activity</p>
            </div>
            <Button onClick={handleExport} variant="outline" className="gap-2">
              <Download className="w-4 h-4" />
              Export Logs
            </Button>
          </motion.div>

          {/* Summary Cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Events</p>
                      <p className="text-2xl font-bold text-foreground">{logs.length}</p>
                    </div>
                    <div className="p-3 bg-primary/20 rounded-full">
                      <Activity className="w-6 h-6 text-primary" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Successful</p>
                      <p className="text-2xl font-bold text-emerald-500">{successCount}</p>
                    </div>
                    <div className="p-3 bg-emerald-500/20 rounded-full">
                      <CheckCircle className="w-6 h-6 text-emerald-500" />
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
                      <p className="text-sm text-muted-foreground">Warnings</p>
                      <p className="text-2xl font-bold text-amber-500">{warningCount}</p>
                    </div>
                    <div className="p-3 bg-amber-500/20 rounded-full">
                      <AlertTriangle className="w-6 h-6 text-amber-500" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Failed</p>
                      <p className="text-2xl font-bold text-destructive">{errorCount}</p>
                    </div>
                    <div className="p-3 bg-destructive/20 rounded-full">
                      <XCircle className="w-6 h-6 text-destructive" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card>
              <CardContent className="p-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by description, location, or IP..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-9"
                    />
                  </div>
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                      <SelectValue placeholder="Event Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="login">Logins</SelectItem>
                      <SelectItem value="logout">Logouts</SelectItem>
                      <SelectItem value="password_change">Password Changes</SelectItem>
                      <SelectItem value="failed_login">Failed Logins</SelectItem>
                      <SelectItem value="2fa_enabled">2FA Changes</SelectItem>
                      <SelectItem value="device_added">Device Added</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Failed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Activity Log List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>
                  Showing {filteredLogs.length} of {logs.length} events
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredLogs.map((log, index) => (
                    <motion.div
                      key={log.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.05 }}
                      className="flex items-start gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className={`p-2.5 rounded-full ${
                        log.status === "success" 
                          ? "bg-emerald-500/20" 
                          : log.status === "warning" 
                            ? "bg-amber-500/20" 
                            : "bg-destructive/20"
                      }`}>
                        {getTypeIcon(log.type)}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-foreground">{log.description}</span>
                          {getStatusBadge(log.status)}
                        </div>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3.5 h-3.5" />
                            {formatDate(log.timestamp)}
                          </span>
                          <span className="flex items-center gap-1">
                            {getDeviceIcon(log.device)}
                            {log.device} • {log.browser}
                          </span>
                          <span className="flex items-center gap-1">
                            <Globe className="w-3.5 h-3.5" />
                            {log.location}
                          </span>
                          <span className="text-xs font-mono">{log.ipAddress}</span>
                        </div>
                      </div>

                      {getStatusIcon(log.status)}
                    </motion.div>
                  ))}

                  {filteredLogs.length === 0 && (
                    <div className="text-center py-12">
                      <Activity className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                      <p className="text-muted-foreground">No activity logs match your filters</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default ActivityLogs;
