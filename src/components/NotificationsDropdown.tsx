import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, ArrowUpRight, ArrowDownLeft, Shield, CreditCard, Receipt, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";

interface Notification {
  id: string;
  type: "transaction" | "transfer" | "security" | "card" | "bill";
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: "1",
    type: "transaction",
    title: "Payment Received",
    message: "You received $2,500.00 from Tech Corp",
    time: "2 min ago",
    read: false,
  },
  {
    id: "2",
    type: "transfer",
    title: "Transfer Completed",
    message: "Your transfer of $500 to Sarah has been completed",
    time: "15 min ago",
    read: false,
  },
  {
    id: "3",
    type: "security",
    title: "New Login Detected",
    message: "New login from iPhone 15 in New York",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "4",
    type: "bill",
    title: "Bill Due Tomorrow",
    message: "Netflix subscription payment of $15.99 is due",
    time: "2 hours ago",
    read: true,
  },
  {
    id: "5",
    type: "card",
    title: "Card Transaction",
    message: "Purchase of $89.99 at Amazon.com",
    time: "3 hours ago",
    read: true,
  },
  {
    id: "6",
    type: "transfer",
    title: "Transfer Request",
    message: "Mike requested $200 from you",
    time: "5 hours ago",
    read: true,
  },
  {
    id: "7",
    type: "security",
    title: "Password Changed",
    message: "Your account password was successfully changed",
    time: "1 day ago",
    read: true,
  },
];

const getNotificationIcon = (type: Notification["type"]) => {
  switch (type) {
    case "transaction":
      return <ArrowDownLeft className="w-4 h-4 text-emerald-500" />;
    case "transfer":
      return <ArrowUpRight className="w-4 h-4 text-blue-500" />;
    case "security":
      return <Shield className="w-4 h-4 text-amber-500" />;
    case "card":
      return <CreditCard className="w-4 h-4 text-purple-500" />;
    case "bill":
      return <Receipt className="w-4 h-4 text-rose-500" />;
  }
};

const NotificationsDropdown = () => {
  const [notifications, setNotifications] = useState(mockNotifications);
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
  };

  const removeNotification = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center font-medium"
              >
                {unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h3 className="font-semibold text-foreground">Notifications</h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className="text-xs text-primary hover:text-primary"
              onClick={markAllAsRead}
            >
              Mark all as read
            </Button>
          )}
        </div>
        <ScrollArea className="h-[400px]">
          <div className="divide-y divide-border">
            {notifications.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>No notifications yet</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <motion.div
                  key={notification.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className={`p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group ${
                    !notification.read ? "bg-primary/5" : ""
                  }`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="flex gap-3">
                    <div className="p-2 bg-muted rounded-full shrink-0">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-sm text-foreground truncate">
                          {notification.title}
                        </p>
                        {!notification.read && (
                          <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                        {notification.message}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex gap-1">
                    {!notification.read && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          markAsRead(notification.id);
                        }}
                      >
                        <Check className="w-3 h-3" />
                      </Button>
                    )}
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeNotification(notification.id);
                      }}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
        <div className="p-3 border-t border-border">
          <Button variant="ghost" className="w-full text-sm" onClick={() => setIsOpen(false)}>
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationsDropdown;
