import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Scan, Send, Download, Copy, Check, Clock, ArrowUpRight, ArrowDownLeft, Smartphone, CreditCard, Building2, Wallet, Link, Share2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QRPayments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [upiId, setUpiId] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const { toast } = useToast();

  const myUpiId = "arnavgarhwal@upi";
  const myQRData = `upi://pay?pa=${myUpiId}&pn=Arnav%20Garhwal`;

  const recentUPITransfers = [
    { id: 1, name: "Priya Sharma", upiId: "priya.sharma@paytm", type: "sent", amount: 2500.00, date: "Today, 2:30 PM", avatar: "P" },
    { id: 2, name: "Raj Patel", upiId: "raj.patel@ybl", type: "received", amount: 5000.00, date: "Today, 11:15 AM", avatar: "R" },
    { id: 3, name: "Swiggy", upiId: "swiggy@axisbank", type: "sent", amount: 450.00, date: "Yesterday", avatar: "S" },
    { id: 4, name: "Amit Kumar", upiId: "amit123@okhdfcbank", type: "received", amount: 3500.00, date: "Jan 28", avatar: "A" },
    { id: 5, name: "Amazon Pay", upiId: "amazon@apl", type: "sent", amount: 1299.00, date: "Jan 27", avatar: "A" },
  ];

  const savedBeneficiaries = [
    { id: 1, name: "Rent Payment", upiId: "landlord@ybl", amount: 25000, frequency: "Monthly", icon: Building2 },
    { id: 2, name: "Electricity Bill", upiId: "bescom@paytm", amount: 1500, frequency: "Monthly", icon: Wallet },
    { id: 3, name: "Mom", upiId: "mother.sharma@upi", amount: null, frequency: "As needed", icon: Smartphone },
  ];

  const upiApps = [
    { name: "Google Pay", icon: "🅶", color: "bg-blue-500" },
    { name: "PhonePe", icon: "📱", color: "bg-purple-500" },
    { name: "Paytm", icon: "₿", color: "bg-sky-500" },
    { name: "BHIM", icon: "🇮🇳", color: "bg-green-600" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(myUpiId);
    setCopied(true);
    toast({ title: "Copied!", description: "UPI ID copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateQR = () => {
    if (!amount) {
      toast({ title: "Enter amount", description: "Please enter an amount for the QR code", variant: "destructive" });
      return;
    }
    toast({ title: "QR Generated!", description: `UPI QR code for ₹${amount} created successfully` });
  };

  const handleSendMoney = () => {
    if (!upiId) {
      toast({ title: "Enter UPI ID", description: "Please enter recipient's UPI ID", variant: "destructive" });
      return;
    }
    if (!amount) {
      toast({ title: "Enter amount", description: "Please enter the amount to send", variant: "destructive" });
      return;
    }
    toast({ title: "Payment Initiated!", description: `₹${amount} sent to ${upiId}` });
    setUpiId("");
    setAmount("");
  };

  const handleScanQR = () => {
    setIsScanning(true);
    toast({ title: "Camera Opening", description: "Scanning for UPI QR code..." });
    setTimeout(() => {
      setIsScanning(false);
      toast({ title: "QR Scanned!", description: "merchant@upi detected. Ready to pay." });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-display font-bold text-foreground">UPI Payments</h1>
            <Badge className="bg-green-600">BHIM UPI</Badge>
          </div>
          <p className="text-muted-foreground">Send and receive money instantly with UPI</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">UPI Sent This Month</p>
                  <p className="text-2xl font-bold text-foreground">₹45,750.00</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">UPI Received</p>
                  <p className="text-2xl font-bold text-green-600">₹1,25,000.00</p>
                </div>
                <ArrowDownLeft className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">UPI Transactions</p>
                  <p className="text-2xl font-bold text-purple-600">156 this month</p>
                </div>
                <QrCode className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="pay" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pay">Pay via UPI</TabsTrigger>
            <TabsTrigger value="receive">Receive Money</TabsTrigger>
            <TabsTrigger value="scan">Scan & Pay</TabsTrigger>
            <TabsTrigger value="saved">Saved UPIs</TabsTrigger>
          </TabsList>

          <TabsContent value="pay">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Send Money via UPI
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>UPI ID / Mobile Number</Label>
                    <Input 
                      placeholder="example@upi or 9876543210@paytm"
                      value={upiId}
                      onChange={(e) => setUpiId(e.target.value)}
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8 text-2xl h-14"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Remarks (optional)</Label>
                    <Input 
                      placeholder="What's this for?" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <div className="pt-4">
                    <h4 className="font-medium text-foreground mb-3">Quick Amounts</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[500, 1000, 2000, 5000].map((val) => (
                        <Button 
                          key={val} 
                          variant="outline" 
                          onClick={() => setAmount(val.toString())}
                        >
                          ₹{val.toLocaleString('en-IN')}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <Button className="w-full" size="lg" onClick={handleSendMoney}>
                    <Send className="h-5 w-5 mr-2" />
                    Pay Now
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pay via UPI Apps</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    {upiApps.map((app) => (
                      <Button 
                        key={app.name} 
                        variant="outline" 
                        className="h-20 flex flex-col gap-2"
                        onClick={() => toast({ title: `Opening ${app.name}`, description: "Redirecting to app..." })}
                      >
                        <span className={`text-2xl w-10 h-10 rounded-lg ${app.color} flex items-center justify-center text-white`}>
                          {app.icon}
                        </span>
                        <span className="text-sm">{app.name}</span>
                      </Button>
                    ))}
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-foreground mb-3">Recent Payments</h4>
                    <div className="space-y-2">
                      {recentUPITransfers.slice(0, 3).filter(t => t.type === 'sent').map((transfer) => (
                        <div key={transfer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted cursor-pointer transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                              <span className="text-primary font-semibold">{transfer.avatar}</span>
                            </div>
                            <div>
                              <p className="font-medium text-foreground">{transfer.name}</p>
                              <p className="text-xs text-muted-foreground">{transfer.upiId}</p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">Pay Again</Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="receive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your UPI QR Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 bg-white rounded-2xl shadow-lg">
                      <div className="w-48 h-48 bg-gradient-to-br from-green-600/10 to-green-600/20 rounded-lg flex items-center justify-center relative border-4 border-green-600">
                        <div className="absolute top-2 left-2 w-6 h-6 border-t-4 border-l-4 border-green-600 rounded-tl-lg" />
                        <div className="absolute top-2 right-2 w-6 h-6 border-t-4 border-r-4 border-green-600 rounded-tr-lg" />
                        <div className="absolute bottom-2 left-2 w-6 h-6 border-b-4 border-l-4 border-green-600 rounded-bl-lg" />
                        <div className="absolute bottom-2 right-2 w-6 h-6 border-b-4 border-r-4 border-green-600 rounded-br-lg" />
                        <div className="absolute inset-4 grid grid-cols-8 grid-rows-8 gap-0.5">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-sm ${Math.random() > 0.4 ? 'bg-foreground' : 'bg-transparent'}`}
                            />
                          ))}
                        </div>
                        <div className="absolute bg-white p-1 rounded">
                          <span className="text-green-600 font-bold text-xs">BHIM</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="font-semibold text-foreground">Arnav Garhwal</p>
                    <div className="flex items-center justify-center gap-2">
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        {myUpiId}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy UPI ID"}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Save QR
                    </Button>
                    <Button variant="outline" className="gap-2">
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Request Specific Amount</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Amount (₹)</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground font-bold">₹</span>
                      <Input 
                        type="number" 
                        placeholder="0.00" 
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        className="pl-8 text-2xl h-14"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Note (optional)</Label>
                    <Input 
                      placeholder="Payment for..." 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <Button className="w-full" size="lg" onClick={handleGenerateQR}>
                    <QrCode className="h-5 w-5 mr-2" />
                    Generate Payment QR
                  </Button>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-foreground mb-3">Quick Amounts</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[100, 500, 1000, 2000].map((val) => (
                        <Button 
                          key={val} 
                          variant="outline" 
                          onClick={() => setAmount(val.toString())}
                        >
                          ₹{val}
                        </Button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-foreground mb-3">Payment Link</h4>
                    <div className="flex gap-2">
                      <Input value={`upi://pay?pa=${myUpiId}&am=${amount || '0'}`} readOnly className="text-xs" />
                      <Button variant="outline" size="icon">
                        <Link className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="scan">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Scan className="h-5 w-5" />
                    Scan UPI QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className={`aspect-square max-w-sm mx-auto rounded-2xl flex flex-col items-center justify-center border-2 border-dashed transition-all ${isScanning ? 'border-green-500 bg-green-500/10' : 'border-primary/30 bg-muted/50'}`}>
                    {isScanning ? (
                      <>
                        <div className="animate-pulse">
                          <Scan className="h-16 w-16 text-green-500 mb-4" />
                        </div>
                        <p className="text-green-600 font-medium">Scanning...</p>
                      </>
                    ) : (
                      <>
                        <Scan className="h-16 w-16 text-primary mb-4" />
                        <p className="text-muted-foreground text-center px-4 mb-4">
                          Position any UPI QR code within the frame
                        </p>
                        <Button className="gap-2" onClick={handleScanQR}>
                          <Scan className="h-4 w-4" />
                          Open Camera
                        </Button>
                      </>
                    )}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or enter UPI ID manually</p>
                    <div className="flex gap-2">
                      <Input 
                        placeholder="Enter UPI ID (e.g., name@upi)" 
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                      />
                      <Button onClick={() => {
                        if (upiId) {
                          toast({ title: "UPI ID Verified", description: `Ready to pay to ${upiId}` });
                        }
                      }}>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <Button variant="outline" className="flex flex-col h-20 gap-1">
                      <CreditCard className="h-5 w-5" />
                      <span className="text-xs">Bill Pay</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-1">
                      <Smartphone className="h-5 w-5" />
                      <span className="text-xs">Mobile Recharge</span>
                    </Button>
                    <Button variant="outline" className="flex flex-col h-20 gap-1">
                      <Building2 className="h-5 w-5" />
                      <span className="text-xs">Bank Transfer</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent UPI Transactions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentUPITransfers.map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className={`h-10 w-10 rounded-full flex items-center justify-center ${transfer.type === 'received' ? 'bg-green-500/10' : 'bg-primary/10'}`}>
                          <span className={`font-semibold ${transfer.type === 'received' ? 'text-green-600' : 'text-primary'}`}>{transfer.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transfer.name}</p>
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{transfer.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transfer.type === 'received' ? 'text-green-600' : 'text-foreground'}`}>
                          {transfer.type === 'received' ? '+' : '-'}₹{transfer.amount.toLocaleString('en-IN')}
                        </p>
                        <Badge variant={transfer.type === 'received' ? 'default' : 'secondary'} className="text-xs">
                          {transfer.type === 'received' ? 'Received' : 'Sent'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="saved">
            <Card>
              <CardHeader>
                <CardTitle>Saved UPI Beneficiaries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedBeneficiaries.map((beneficiary) => {
                    const IconComponent = beneficiary.icon;
                    return (
                      <div key={beneficiary.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                        <div className="flex items-start justify-between mb-3">
                          <div className="h-12 w-12 rounded-lg bg-green-600/10 flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-green-600" />
                          </div>
                          <Badge variant="outline">{beneficiary.frequency}</Badge>
                        </div>
                        <h3 className="font-semibold text-foreground mb-1">{beneficiary.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{beneficiary.upiId}</p>
                        {beneficiary.amount && (
                          <p className="text-lg font-bold text-foreground">₹{beneficiary.amount.toLocaleString('en-IN')}</p>
                        )}
                        <Button variant="outline" className="w-full mt-3" size="sm">
                          Pay Now
                        </Button>
                      </div>
                    );
                  })}
                  
                  <div className="p-4 rounded-lg border-2 border-dashed border-green-600/30 flex flex-col items-center justify-center min-h-[180px] hover:bg-green-600/5 transition-colors cursor-pointer">
                    <QrCode className="h-8 w-8 text-green-600 mb-2" />
                    <p className="font-medium text-green-600">Add New UPI ID</p>
                    <p className="text-sm text-muted-foreground">Save for quick payments</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default QRPayments;