import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QrCode, Scan, Send, Download, Copy, Check, User, Clock, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const QRPayments = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const myQRData = "pay://arnavgarhwal/ACC123456789";

  const recentQRTransfers = [
    { id: 1, name: "Sarah Wilson", type: "sent", amount: 45.00, date: "Today, 2:30 PM", avatar: "S" },
    { id: 2, name: "Mike Chen", type: "received", amount: 120.00, date: "Today, 11:15 AM", avatar: "M" },
    { id: 3, name: "Coffee Shop", type: "sent", amount: 6.50, date: "Yesterday", avatar: "C" },
    { id: 4, name: "Emma Davis", type: "received", amount: 75.00, date: "Jan 28", avatar: "E" },
    { id: 5, name: "Restaurant", type: "sent", amount: 52.30, date: "Jan 27", avatar: "R" },
  ];

  const savedQRCodes = [
    { id: 1, name: "Home Rent", recipient: "Landlord LLC", amount: 1800, frequency: "Monthly" },
    { id: 2, name: "Gym Membership", recipient: "FitLife Gym", amount: 49.99, frequency: "Monthly" },
    { id: 3, name: "Mom", recipient: "Mary Garhwal", amount: null, frequency: "As needed" },
  ];

  const handleCopy = () => {
    navigator.clipboard.writeText(myQRData);
    setCopied(true);
    toast({ title: "Copied!", description: "Payment link copied to clipboard" });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleGenerateQR = () => {
    if (!amount) {
      toast({ title: "Enter amount", description: "Please enter an amount for the QR code", variant: "destructive" });
      return;
    }
    toast({ title: "QR Generated!", description: `QR code for $${amount} created successfully` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">QR Payments</h1>
          <p className="text-muted-foreground">Send and receive money instantly with QR codes</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">QR Payments Sent</p>
                  <p className="text-2xl font-bold text-foreground">$1,245.80</p>
                </div>
                <ArrowUpRight className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">QR Payments Received</p>
                  <p className="text-2xl font-bold text-green-600">$890.00</p>
                </div>
                <ArrowDownLeft className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">24 transactions</p>
                </div>
                <QrCode className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="receive" className="space-y-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="receive">Receive Money</TabsTrigger>
            <TabsTrigger value="scan">Scan & Pay</TabsTrigger>
            <TabsTrigger value="saved">Saved QR Codes</TabsTrigger>
          </TabsList>

          <TabsContent value="receive">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Your Payment QR Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex justify-center">
                    <div className="p-6 bg-white rounded-2xl shadow-lg">
                      <div className="w-48 h-48 bg-gradient-to-br from-primary/10 to-primary/20 rounded-lg flex items-center justify-center relative">
                        <QrCode className="h-32 w-32 text-primary" />
                        <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 gap-0.5 p-4">
                          {Array.from({ length: 64 }).map((_, i) => (
                            <div 
                              key={i} 
                              className={`rounded-sm ${Math.random() > 0.5 ? 'bg-foreground' : 'bg-transparent'}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center space-y-2">
                    <p className="font-semibold text-foreground">Arnav Garhwal</p>
                    <p className="text-sm text-muted-foreground">@arnavgarhwal</p>
                  </div>

                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1 gap-2" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      {copied ? "Copied!" : "Copy Link"}
                    </Button>
                    <Button variant="outline" className="flex-1 gap-2">
                      <Download className="h-4 w-4" />
                      Download
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
                    <Label>Amount</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
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
                      placeholder="What's this for?" 
                      value={note}
                      onChange={(e) => setNote(e.target.value)}
                    />
                  </div>

                  <Button className="w-full" size="lg" onClick={handleGenerateQR}>
                    <QrCode className="h-5 w-5 mr-2" />
                    Generate QR Code
                  </Button>

                  <div className="pt-4 border-t">
                    <h4 className="font-medium text-foreground mb-3">Quick Amounts</h4>
                    <div className="grid grid-cols-4 gap-2">
                      {[10, 25, 50, 100].map((val) => (
                        <Button 
                          key={val} 
                          variant="outline" 
                          onClick={() => setAmount(val.toString())}
                        >
                          ${val}
                        </Button>
                      ))}
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
                  <CardTitle>Scan QR Code</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="aspect-square max-w-sm mx-auto bg-muted/50 rounded-2xl flex flex-col items-center justify-center border-2 border-dashed border-primary/30">
                    <Scan className="h-16 w-16 text-primary mb-4" />
                    <p className="text-muted-foreground text-center px-4">
                      Position a QR code within the frame to scan
                    </p>
                    <Button className="mt-4 gap-2">
                      <Scan className="h-4 w-4" />
                      Open Camera
                    </Button>
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-muted-foreground mb-2">Or enter payment code manually</p>
                    <div className="flex gap-2">
                      <Input placeholder="Enter payment code or username" />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Recent QR Transfers</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {recentQRTransfers.map((transfer) => (
                    <div key={transfer.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-semibold">{transfer.avatar}</span>
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{transfer.name}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="h-3 w-3" />
                            <span>{transfer.date}</span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-bold ${transfer.type === 'received' ? 'text-green-600' : 'text-foreground'}`}>
                          {transfer.type === 'received' ? '+' : '-'}${transfer.amount.toFixed(2)}
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
                <CardTitle>Saved QR Codes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {savedQRCodes.map((qr) => (
                    <div key={qr.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                      <div className="flex items-start justify-between mb-3">
                        <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <QrCode className="h-6 w-6 text-primary" />
                        </div>
                        <Badge variant="outline">{qr.frequency}</Badge>
                      </div>
                      <h3 className="font-semibold text-foreground mb-1">{qr.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3">{qr.recipient}</p>
                      {qr.amount && (
                        <p className="text-lg font-bold text-foreground">${qr.amount}</p>
                      )}
                      <Button variant="outline" className="w-full mt-3" size="sm">
                        Pay Now
                      </Button>
                    </div>
                  ))}
                  
                  <div className="p-4 rounded-lg border-2 border-dashed border-primary/30 flex flex-col items-center justify-center min-h-[180px] hover:bg-primary/5 transition-colors cursor-pointer">
                    <QrCode className="h-8 w-8 text-primary mb-2" />
                    <p className="font-medium text-primary">Save New QR Code</p>
                    <p className="text-sm text-muted-foreground">Scan or paste code</p>
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
