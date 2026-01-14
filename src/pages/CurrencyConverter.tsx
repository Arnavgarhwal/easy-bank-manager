import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRightLeft, TrendingUp, TrendingDown, RefreshCw, Star, Plus } from "lucide-react";

const CurrencyConverter = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [amount, setAmount] = useState("1000");
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");

  const currencies = [
    { code: "USD", name: "US Dollar", symbol: "$", flag: "🇺🇸" },
    { code: "EUR", name: "Euro", symbol: "€", flag: "🇪🇺" },
    { code: "GBP", name: "British Pound", symbol: "£", flag: "🇬🇧" },
    { code: "JPY", name: "Japanese Yen", symbol: "¥", flag: "🇯🇵" },
    { code: "CAD", name: "Canadian Dollar", symbol: "C$", flag: "🇨🇦" },
    { code: "AUD", name: "Australian Dollar", symbol: "A$", flag: "🇦🇺" },
    { code: "CHF", name: "Swiss Franc", symbol: "CHF", flag: "🇨🇭" },
    { code: "INR", name: "Indian Rupee", symbol: "₹", flag: "🇮🇳" },
  ];

  const exchangeRates: Record<string, Record<string, number>> = {
    USD: { EUR: 0.92, GBP: 0.79, JPY: 148.50, CAD: 1.35, AUD: 1.53, CHF: 0.88, INR: 90.10 },
    EUR: { USD: 1.09, GBP: 0.86, JPY: 161.50, CAD: 1.47, AUD: 1.66, CHF: 0.96, INR: 98.01 },
    GBP: { USD: 1.27, EUR: 1.16, JPY: 188.20, CAD: 1.71, AUD: 1.94, CHF: 1.12, INR: 114.03 },
    JPY: { USD: 0.0067, EUR: 0.0062, GBP: 0.0053, CAD: 0.0091, AUD: 0.010, CHF: 0.0059, INR: 0.61 },
    CAD: { USD: 0.74, EUR: 0.68, GBP: 0.58, JPY: 110.00, AUD: 1.13, CHF: 0.65, INR: 66.74 },
    AUD: { USD: 0.65, EUR: 0.60, GBP: 0.52, JPY: 97.00, CAD: 0.88, CHF: 0.57, INR: 58.57 },
    CHF: { USD: 1.14, EUR: 1.04, GBP: 0.89, JPY: 168.75, CAD: 1.53, AUD: 1.74, INR: 102.71 },
    INR: { USD: 0.0111, EUR: 0.0102, GBP: 0.0088, JPY: 1.65, CAD: 0.015, AUD: 0.017, CHF: 0.0097 },
  };

  const getRate = (from: string, to: string) => {
    if (from === to) return 1;
    return exchangeRates[from]?.[to] || 1;
  };

  const convertedAmount = (parseFloat(amount) || 0) * getRate(fromCurrency, toCurrency);

  const popularPairs = [
    { from: "USD", to: "EUR", rate: 0.92, change: -0.15 },
    { from: "USD", to: "GBP", rate: 0.79, change: 0.22 },
    { from: "EUR", to: "GBP", rate: 0.86, change: 0.08 },
    { from: "USD", to: "JPY", rate: 148.50, change: -0.45 },
    { from: "GBP", to: "EUR", rate: 1.16, change: -0.12 },
    { from: "USD", to: "INR", rate: 90.10, change: 0.25 },
  ];

  const myWallets = [
    { currency: "INR", balance: 1121745.00, flag: "🇮🇳" },
    { currency: "USD", balance: 12450.00, flag: "🇺🇸" },
    { currency: "EUR", balance: 3200.50, flag: "🇪🇺" },
  ];

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Currency Converter</h1>
          <p className="text-muted-foreground">Convert currencies with real-time exchange rates</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Converter */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Convert Currency
                  <Button variant="ghost" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Refresh Rates
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[1fr,auto,1fr] gap-4 items-end">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">From</label>
                    <Select value={fromCurrency} onValueChange={setFromCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.code}</span>
                              <span className="text-muted-foreground">- {c.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input 
                      type="number" 
                      value={amount} 
                      onChange={(e) => setAmount(e.target.value)}
                      className="text-2xl font-bold h-14"
                    />
                  </div>

                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="rounded-full h-12 w-12"
                    onClick={swapCurrencies}
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                  </Button>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">To</label>
                    <Select value={toCurrency} onValueChange={setToCurrency}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {currencies.map((c) => (
                          <SelectItem key={c.code} value={c.code}>
                            <span className="flex items-center gap-2">
                              <span>{c.flag}</span>
                              <span>{c.code}</span>
                              <span className="text-muted-foreground">- {c.name}</span>
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className="h-14 px-4 rounded-lg bg-muted/50 flex items-center">
                      <span className="text-2xl font-bold text-foreground">
                        {convertedAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                  <span className="text-muted-foreground">Exchange Rate</span>
                  <span className="font-medium text-foreground">
                    1 {fromCurrency} = {getRate(fromCurrency, toCurrency).toFixed(4)} {toCurrency}
                  </span>
                </div>

                <Button className="w-full" size="lg">
                  Convert Now
                </Button>
              </CardContent>
            </Card>

            {/* Popular Pairs */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Exchange Rates</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {popularPairs.map((pair, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors cursor-pointer">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground">{pair.from}/{pair.to}</span>
                        <Button variant="ghost" size="icon" className="h-6 w-6">
                          <Star className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-foreground">{pair.rate}</span>
                        <span className={`flex items-center gap-1 text-sm ${pair.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {pair.change > 0 ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                          {Math.abs(pair.change)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Wallets */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  My Wallets
                  <Button variant="ghost" size="icon">
                    <Plus className="h-5 w-5" />
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {myWallets.map((wallet, index) => (
                  <div key={index} className="p-4 rounded-lg bg-muted/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{wallet.flag}</span>
                        <span className="font-medium text-foreground">{wallet.currency}</span>
                      </div>
                      <span className="font-bold text-foreground">
                        {wallet.balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" className="w-full mt-4">
                  Add New Wallet
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Quick Convert</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-between">
                  <span>USD → EUR</span>
                  <span className="text-muted-foreground">0.92</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>USD → GBP</span>
                  <span className="text-muted-foreground">0.79</span>
                </Button>
                <Button variant="outline" className="w-full justify-between">
                  <span>EUR → GBP</span>
                  <span className="text-muted-foreground">0.86</span>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CurrencyConverter;
