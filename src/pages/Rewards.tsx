import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Gift, Star, DollarSign, TrendingUp, CreditCard, ShoppingBag, Plane, Coffee, Fuel } from "lucide-react";

const Rewards = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const rewardsCards = [
    {
      name: "Premium Platinum",
      points: 45680,
      cashback: 234.50,
      tier: "Platinum",
      nextTier: "Diamond",
      progress: 75
    },
    {
      name: "Travel Rewards",
      points: 28450,
      cashback: 156.20,
      tier: "Gold",
      nextTier: "Platinum",
      progress: 60
    }
  ];

  const recentRewards = [
    { merchant: "Amazon", category: "Shopping", points: 450, cashback: 4.50, icon: ShoppingBag, date: "Today" },
    { merchant: "Delta Airlines", category: "Travel", points: 2500, cashback: 25.00, icon: Plane, date: "Yesterday" },
    { merchant: "Starbucks", category: "Dining", points: 85, cashback: 0.85, icon: Coffee, date: "Jan 28" },
    { merchant: "Shell Gas", category: "Gas", points: 320, cashback: 3.20, icon: Fuel, date: "Jan 27" },
    { merchant: "Best Buy", category: "Shopping", points: 890, cashback: 8.90, icon: ShoppingBag, date: "Jan 26" },
  ];

  const redemptionOptions = [
    { name: "Statement Credit", value: "$50", points: 5000, popular: true },
    { name: "Gift Card", value: "$25", points: 2500, popular: false },
    { name: "Travel Credit", value: "$100", points: 8000, popular: true },
    { name: "Merchandise", value: "Various", points: 1000, popular: false },
    { name: "Charity Donation", value: "$25", points: 2000, popular: false },
  ];

  const totalPoints = rewardsCards.reduce((sum, card) => sum + card.points, 0);
  const totalCashback = rewardsCards.reduce((sum, card) => sum + card.cashback, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Rewards & Cashback</h1>
          <p className="text-muted-foreground">Track and redeem your earned rewards</p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-500/5 border-yellow-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-2xl font-bold text-yellow-600">{totalPoints.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-yellow-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Cashback Earned</p>
                  <p className="text-2xl font-bold text-green-600">${totalCashback.toFixed(2)}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-purple-600">+4,245</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold text-blue-600">1,250</p>
                </div>
                <Gift className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="redeem">Redeem</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {rewardsCards.map((card, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <CreditCard className="h-5 w-5" />
                        {card.name}
                      </CardTitle>
                      <Badge>{card.tier}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-foreground">{card.points.toLocaleString()}</p>
                        <p className="text-sm text-muted-foreground">Points</p>
                      </div>
                      <div className="text-center p-4 rounded-lg bg-muted/50">
                        <p className="text-2xl font-bold text-green-600">${card.cashback.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">Cashback</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Progress to {card.nextTier}</span>
                        <span className="font-medium text-foreground">{card.progress}%</span>
                      </div>
                      <Progress value={card.progress} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Recent Rewards</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {recentRewards.map((reward, index) => {
                  const Icon = reward.icon;
                  return (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium text-foreground">{reward.merchant}</p>
                          <p className="text-sm text-muted-foreground">{reward.category} • {reward.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-yellow-600">+{reward.points} pts</p>
                        <p className="text-sm text-green-600">+${reward.cashback.toFixed(2)}</p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="redeem">
            <Card>
              <CardHeader>
                <CardTitle>Redemption Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {redemptionOptions.map((option, index) => (
                    <div key={index} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors relative">
                      {option.popular && (
                        <Badge className="absolute -top-2 -right-2 bg-primary">Popular</Badge>
                      )}
                      <div className="text-center space-y-2">
                        <Gift className="h-8 w-8 mx-auto text-primary" />
                        <h3 className="font-semibold text-foreground">{option.name}</h3>
                        <p className="text-2xl font-bold text-foreground">{option.value}</p>
                        <p className="text-sm text-muted-foreground">{option.points.toLocaleString()} points</p>
                        <Button className="w-full" variant="outline" disabled={totalPoints < option.points}>
                          Redeem
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Rewards;
