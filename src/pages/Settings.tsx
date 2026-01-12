import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { User, Bell, Shield, Eye, EyeOff, Camera, Save, Smartphone, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [saving, setSaving] = useState(false);

  const [profile, setProfile] = useState({
    firstName: "Arnav",
    lastName: "Garhwal",
    email: "arnav.garhwal@email.com",
    phone: "+1 (555) 123-4567",
    address: "123 Finance Street, New York, NY 10001",
  });

  const [notifications, setNotifications] = useState({
    emailTransactions: true,
    emailTransfers: true,
    emailSecurity: true,
    emailMarketing: false,
    pushTransactions: true,
    pushTransfers: true,
    pushBills: true,
    pushPromotions: false,
    smsTransactions: false,
    smsSecurity: true,
  });

  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: "",
  });

  const handleSaveProfile = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Profile Updated",
        description: "Your profile has been saved successfully.",
      });
    }, 1000);
  };

  const handleSaveNotifications = () => {
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      toast({
        title: "Preferences Saved",
        description: "Your notification preferences have been updated.",
      });
    }, 1000);
  };

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    if (passwords.new.length < 8) {
      toast({
        title: "Error",
        description: "Password must be at least 8 characters.",
        variant: "destructive",
      });
      return;
    }
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
      setPasswords({ current: "", new: "", confirm: "" });
      toast({
        title: "Password Changed",
        description: "Your password has been updated successfully.",
      });
    }, 1000);
  };

  const handleToggle2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    toast({
      title: twoFactorEnabled ? "2FA Disabled" : "2FA Enabled",
      description: twoFactorEnabled
        ? "Two-factor authentication has been disabled."
        : "Two-factor authentication is now active.",
    });
  };

  return (
    <div className="space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-4"
      >
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft className="w-5 h-5" />
        </Button>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">Settings</h1>
          <p className="text-muted-foreground mt-1">Manage your account settings and preferences</p>
        </div>
      </motion.div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="profile" className="flex items-center gap-2">
            <User className="w-4 h-4" />
            <span className="hidden sm:inline">Profile</span>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="flex items-center gap-2">
            <Bell className="w-4 h-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="w-4 h-4" />
            <span className="hidden sm:inline">Security</span>
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&h=80&fit=crop&crop=face" />
                    <AvatarFallback className="text-xl">AG</AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Camera className="w-4 h-4" />
                      Change Photo
                    </Button>
                    <p className="text-xs text-muted-foreground mt-2">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profile.firstName}
                      onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profile.lastName}
                      onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input
                    id="address"
                    value={profile.address}
                    onChange={(e) => setProfile({ ...profile, address: e.target.value })}
                  />
                </div>

                <Button onClick={handleSaveProfile} disabled={saving} className="gap-2">
                  <Save className="w-4 h-4" />
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Email Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Email Notifications</CardTitle>
                <CardDescription>Choose what emails you want to receive</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "emailTransactions", label: "Transaction Alerts", desc: "Get notified for every transaction" },
                  { key: "emailTransfers", label: "Transfer Updates", desc: "Notifications for sent and received transfers" },
                  { key: "emailSecurity", label: "Security Alerts", desc: "Important security notifications" },
                  { key: "emailMarketing", label: "Marketing & Promotions", desc: "News, offers, and product updates" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Push Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>Push Notifications</CardTitle>
                <CardDescription>Manage your mobile and browser notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "pushTransactions", label: "Transaction Alerts", desc: "Instant alerts for transactions" },
                  { key: "pushTransfers", label: "Transfer Notifications", desc: "Real-time transfer updates" },
                  { key: "pushBills", label: "Bill Reminders", desc: "Upcoming bill payment reminders" },
                  { key: "pushPromotions", label: "Promotions", desc: "Special offers and rewards" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* SMS Notifications */}
            <Card>
              <CardHeader>
                <CardTitle>SMS Notifications</CardTitle>
                <CardDescription>Text message alerts for important updates</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { key: "smsTransactions", label: "Transaction SMS", desc: "SMS for large transactions" },
                  { key: "smsSecurity", label: "Security SMS", desc: "OTP and security alerts" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) =>
                        setNotifications({ ...notifications, [item.key]: checked })
                      }
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button onClick={handleSaveNotifications} disabled={saving} className="gap-2">
              <Save className="w-4 h-4" />
              {saving ? "Saving..." : "Save Preferences"}
            </Button>
          </motion.div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {/* Change Password */}
            <Card>
              <CardHeader>
                <CardTitle>Change Password</CardTitle>
                <CardDescription>Update your password regularly to keep your account secure</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? "text" : "password"}
                      value={passwords.current}
                      onChange={(e) => setPasswords({ ...passwords, current: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="newPassword">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? "text" : "password"}
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                    />
                    <button
                      type="button"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <Button onClick={handleChangePassword} disabled={saving}>
                  {saving ? "Updating..." : "Update Password"}
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card>
              <CardHeader>
                <CardTitle>Two-Factor Authentication</CardTitle>
                <CardDescription>Add an extra layer of security to your account</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-full">
                      <Smartphone className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Authenticator App</p>
                      <p className="text-sm text-muted-foreground">
                        Use an authenticator app to generate codes
                      </p>
                    </div>
                  </div>
                  <Switch checked={twoFactorEnabled} onCheckedChange={handleToggle2FA} />
                </div>

                {twoFactorEnabled && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="p-4 border border-primary/20 rounded-lg bg-primary/5"
                  >
                    <p className="text-sm text-foreground">
                      ✓ Two-factor authentication is enabled. You'll need to enter a code from your
                      authenticator app when signing in.
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card>
              <CardHeader>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Manage devices where you're currently logged in</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { device: "MacBook Pro", location: "New York, USA", current: true, lastActive: "Now" },
                  { device: "iPhone 15", location: "New York, USA", current: false, lastActive: "2 hours ago" },
                  { device: "Chrome on Windows", location: "Boston, USA", current: false, lastActive: "3 days ago" },
                ].map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                    <div>
                      <p className="font-medium text-foreground">
                        {session.device}
                        {session.current && (
                          <span className="ml-2 text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">
                            Current
                          </span>
                        )}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {session.location} • {session.lastActive}
                      </p>
                    </div>
                    {!session.current && (
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Revoke
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Settings;
