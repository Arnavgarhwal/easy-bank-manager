import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calculator, DollarSign, Percent, Calendar, TrendingDown, PieChart } from "lucide-react";

const LoanCalculator = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Personal Loan State
  const [loanAmount, setLoanAmount] = useState(25000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(36);

  // Mortgage State
  const [homePrice, setHomePrice] = useState(350000);
  const [downPayment, setDownPayment] = useState(70000);
  const [mortgageRate, setMortgageRate] = useState(6.5);
  const [mortgageTerm, setMortgageTerm] = useState(30);

  // Credit Card Payoff State
  const [cardBalance, setCardBalance] = useState(5000);
  const [cardAPR, setCardAPR] = useState(19.99);
  const [monthlyPayment, setMonthlyPayment] = useState(200);

  // Calculate Personal Loan EMI
  const calculateEMI = (principal: number, rate: number, months: number) => {
    const monthlyRate = rate / 100 / 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
    return isNaN(emi) || !isFinite(emi) ? 0 : emi;
  };

  const personalLoanEMI = calculateEMI(loanAmount, interestRate, loanTerm);
  const totalPersonalPayment = personalLoanEMI * loanTerm;
  const totalPersonalInterest = totalPersonalPayment - loanAmount;

  // Calculate Mortgage
  const mortgagePrincipal = homePrice - downPayment;
  const mortgageMonths = mortgageTerm * 12;
  const mortgageEMI = calculateEMI(mortgagePrincipal, mortgageRate, mortgageMonths);
  const totalMortgagePayment = mortgageEMI * mortgageMonths;
  const totalMortgageInterest = totalMortgagePayment - mortgagePrincipal;

  // Calculate Credit Card Payoff
  const calculatePayoffMonths = () => {
    const monthlyRate = cardAPR / 100 / 12;
    if (monthlyPayment <= cardBalance * monthlyRate) return Infinity;
    const months = Math.log(monthlyPayment / (monthlyPayment - cardBalance * monthlyRate)) / Math.log(1 + monthlyRate);
    return Math.ceil(months);
  };

  const payoffMonths = calculatePayoffMonths();
  const totalCardPayment = payoffMonths === Infinity ? 0 : monthlyPayment * payoffMonths;
  const totalCardInterest = totalCardPayment - cardBalance;

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Loan Calculator</h1>
          <p className="text-muted-foreground">Calculate EMI, mortgage payments, and debt payoff</p>
        </div>

        <Tabs defaultValue="personal" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="personal">Personal Loan</TabsTrigger>
            <TabsTrigger value="mortgage">Mortgage</TabsTrigger>
            <TabsTrigger value="creditcard">Credit Card</TabsTrigger>
          </TabsList>

          {/* Personal Loan Tab */}
          <TabsContent value="personal">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Personal Loan EMI Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Loan Amount</Label>
                      <span className="text-sm font-medium text-foreground">${loanAmount.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[loanAmount]}
                      onValueChange={([v]) => setLoanAmount(v)}
                      min={1000}
                      max={100000}
                      step={1000}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Interest Rate</Label>
                      <span className="text-sm font-medium text-foreground">{interestRate}%</span>
                    </div>
                    <Slider
                      value={[interestRate]}
                      onValueChange={([v]) => setInterestRate(v)}
                      min={1}
                      max={30}
                      step={0.1}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Loan Term</Label>
                      <span className="text-sm font-medium text-foreground">{loanTerm} months</span>
                    </div>
                    <Slider
                      value={[loanTerm]}
                      onValueChange={([v]) => setLoanTerm(v)}
                      min={6}
                      max={84}
                      step={6}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle>Payment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">Monthly EMI</p>
                    <p className="text-4xl font-bold text-primary">${personalLoanEMI.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg bg-background/50 text-center">
                      <DollarSign className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                      <p className="text-lg font-bold text-foreground">${totalPersonalPayment.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Total Payment</p>
                    </div>
                    <div className="p-4 rounded-lg bg-background/50 text-center">
                      <Percent className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                      <p className="text-lg font-bold text-red-600">${totalPersonalInterest.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Total Interest</p>
                    </div>
                  </div>

                  <Button className="w-full">Apply for Loan</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Mortgage Tab */}
          <TabsContent value="mortgage">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Mortgage Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Home Price</Label>
                      <span className="text-sm font-medium text-foreground">${homePrice.toLocaleString()}</span>
                    </div>
                    <Slider
                      value={[homePrice]}
                      onValueChange={([v]) => setHomePrice(v)}
                      min={50000}
                      max={1000000}
                      step={10000}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Down Payment</Label>
                      <span className="text-sm font-medium text-foreground">${downPayment.toLocaleString()} ({((downPayment / homePrice) * 100).toFixed(0)}%)</span>
                    </div>
                    <Slider
                      value={[downPayment]}
                      onValueChange={([v]) => setDownPayment(v)}
                      min={0}
                      max={homePrice * 0.5}
                      step={5000}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Interest Rate</Label>
                      <span className="text-sm font-medium text-foreground">{mortgageRate}%</span>
                    </div>
                    <Slider
                      value={[mortgageRate]}
                      onValueChange={([v]) => setMortgageRate(v)}
                      min={1}
                      max={15}
                      step={0.125}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Loan Term</Label>
                      <span className="text-sm font-medium text-foreground">{mortgageTerm} years</span>
                    </div>
                    <Slider
                      value={[mortgageTerm]}
                      onValueChange={([v]) => setMortgageTerm(v)}
                      min={10}
                      max={30}
                      step={5}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-blue-500/5 to-blue-500/10">
                <CardHeader>
                  <CardTitle>Mortgage Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">Monthly Payment</p>
                    <p className="text-4xl font-bold text-blue-600">${mortgageEMI.toFixed(2)}</p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-lg font-bold text-foreground">${mortgagePrincipal.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Principal</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-lg font-bold text-foreground">${totalMortgagePayment.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Total Payment</p>
                    </div>
                    <div className="p-3 rounded-lg bg-background/50 text-center">
                      <p className="text-lg font-bold text-red-600">${totalMortgageInterest.toFixed(0)}</p>
                      <p className="text-xs text-muted-foreground">Interest</p>
                    </div>
                  </div>

                  <Button className="w-full">Get Pre-Approved</Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Credit Card Tab */}
          <TabsContent value="creditcard">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingDown className="h-5 w-5" />
                    Credit Card Payoff Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <Label>Current Balance</Label>
                    <Input
                      type="number"
                      value={cardBalance}
                      onChange={(e) => setCardBalance(Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>APR</Label>
                      <span className="text-sm font-medium text-foreground">{cardAPR}%</span>
                    </div>
                    <Slider
                      value={[cardAPR]}
                      onValueChange={([v]) => setCardAPR(v)}
                      min={5}
                      max={30}
                      step={0.01}
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Label>Monthly Payment</Label>
                      <span className="text-sm font-medium text-foreground">${monthlyPayment}</span>
                    </div>
                    <Slider
                      value={[monthlyPayment]}
                      onValueChange={([v]) => setMonthlyPayment(v)}
                      min={25}
                      max={1000}
                      step={25}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-500/5 to-green-500/10">
                <CardHeader>
                  <CardTitle>Payoff Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center p-6 rounded-xl bg-background/50">
                    <p className="text-sm text-muted-foreground mb-2">Time to Pay Off</p>
                    <p className="text-4xl font-bold text-green-600">
                      {payoffMonths === Infinity ? "∞" : `${payoffMonths} months`}
                    </p>
                    {payoffMonths !== Infinity && payoffMonths > 12 && (
                      <p className="text-sm text-muted-foreground mt-1">
                        ({Math.floor(payoffMonths / 12)} years {payoffMonths % 12} months)
                      </p>
                    )}
                  </div>

                  {payoffMonths !== Infinity && (
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg bg-background/50 text-center">
                        <Calendar className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-lg font-bold text-foreground">${totalCardPayment.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">Total Payment</p>
                      </div>
                      <div className="p-4 rounded-lg bg-background/50 text-center">
                        <PieChart className="h-5 w-5 mx-auto text-muted-foreground mb-1" />
                        <p className="text-lg font-bold text-red-600">${totalCardInterest.toFixed(0)}</p>
                        <p className="text-xs text-muted-foreground">Total Interest</p>
                      </div>
                    </div>
                  )}

                  {payoffMonths === Infinity && (
                    <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20 text-center">
                      <p className="text-red-600 font-medium">Payment too low to pay off balance</p>
                      <p className="text-sm text-muted-foreground">Increase monthly payment above ${(cardBalance * (cardAPR / 100 / 12)).toFixed(2)}</p>
                    </div>
                  )}

                  <Button className="w-full" disabled={payoffMonths === Infinity}>
                    Create Payoff Plan
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default LoanCalculator;
