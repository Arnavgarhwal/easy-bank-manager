import { useState } from "react";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, ShoppingBag, Utensils, Plane, Fuel, Film, ShoppingCart, Zap, Star, TrendingUp } from "lucide-react";

const CardRewards = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const cards = [
    {
      name: "Premium Platinum",
      lastFour: "4532",
      color: "bg-gradient-to-br from-slate-700 to-slate-900",
      rewards: [
        { category: "Dining", icon: Utensils, rate: 4, color: "text-orange-500" },
        { category: "Travel", icon: Plane, rate: 3, color: "text-blue-500" },
        { category: "Groceries", icon: ShoppingCart, rate: 2, color: "text-green-500" },
        { category: "Other", icon: ShoppingBag, rate: 1, color: "text-gray-500" },
      ],
      totalEarned: 4560
    },
    {
      name: "Travel Rewards",
      lastFour: "8921",
      color: "bg-gradient-to-br from-blue-600 to-indigo-800",
      rewards: [
        { category: "Travel", icon: Plane, rate: 5, color: "text-blue-500" },
        { category: "Gas", icon: Fuel, rate: 3, color: "text-amber-500" },
        { category: "Entertainment", icon: Film, rate: 2, color: "text-purple-500" },
        { category: "Other", icon: ShoppingBag, rate: 1, color: "text-gray-500" },
      ],
      totalEarned: 3280
    },
    {
      name: "Cashback Plus",
      lastFour: "6734",
      color: "bg-gradient-to-br from-emerald-600 to-teal-800",
      rewards: [
        { category: "Groceries", icon: ShoppingCart, rate: 5, color: "text-green-500" },
        { category: "Gas", icon: Fuel, rate: 3, color: "text-amber-500" },
        { category: "Utilities", icon: Zap, rate: 2, color: "text-yellow-500" },
        { category: "Other", icon: ShoppingBag, rate: 1.5, color: "text-gray-500" },
      ],
      totalEarned: 2890
    }
  ];

  const categories = [
    { name: "Dining", icon: Utensils, bestCard: "Premium Platinum", bestRate: 4, monthlySpend: 450 },
    { name: "Travel", icon: Plane, bestCard: "Travel Rewards", bestRate: 5, monthlySpend: 800 },
    { name: "Groceries", icon: ShoppingCart, bestCard: "Cashback Plus", bestRate: 5, monthlySpend: 600 },
    { name: "Gas", icon: Fuel, bestCard: "Travel Rewards", bestRate: 3, monthlySpend: 200 },
    { name: "Entertainment", icon: Film, bestCard: "Travel Rewards", bestRate: 2, monthlySpend: 150 },
    { name: "Utilities", icon: Zap, bestCard: "Cashback Plus", bestRate: 2, monthlySpend: 250 },
  ];

  const recommendations = [
    { spend: "Restaurant dinner at $85", use: "Premium Platinum", earn: "$3.40 back", icon: Utensils },
    { spend: "Flight tickets $450", use: "Travel Rewards", earn: "$22.50 back", icon: Plane },
    { spend: "Weekly groceries $120", use: "Cashback Plus", earn: "$6.00 back", icon: ShoppingCart },
    { spend: "Gas station $45", use: "Travel Rewards", earn: "$1.35 back", icon: Fuel },
  ];

  const totalEarned = cards.reduce((sum, card) => sum + card.totalEarned, 0);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <main className="lg:ml-64 p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <div className="mb-6">
          <h1 className="text-2xl font-display font-bold text-foreground">Card Rewards Tracker</h1>
          <p className="text-muted-foreground">Optimize your spending across all cards</p>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Rewards Earned</p>
                  <p className="text-2xl font-bold text-foreground">${totalEarned.toLocaleString()}</p>
                </div>
                <Star className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">This Month</p>
                  <p className="text-2xl font-bold text-green-600">$245.80</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-500/10 to-purple-500/5 border-purple-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Cards</p>
                  <p className="text-2xl font-bold text-purple-600">{cards.length}</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="cards" className="space-y-4">
          <TabsList>
            <TabsTrigger value="cards">My Cards</TabsTrigger>
            <TabsTrigger value="categories">By Category</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>

          <TabsContent value="cards" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {cards.map((card, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <div className={`h-32 rounded-lg ${card.color} p-4 text-white mb-4`}>
                      <div className="flex justify-between items-start">
                        <CreditCard className="h-8 w-8" />
                        <Badge variant="secondary" className="bg-white/20 text-white">
                          •••• {card.lastFour}
                        </Badge>
                      </div>
                      <p className="mt-8 font-semibold">{card.name}</p>
                    </div>
                    <CardTitle className="text-lg">Reward Rates</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {card.rewards.map((reward, idx) => {
                      const Icon = reward.icon;
                      return (
                        <div key={idx} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Icon className={`h-4 w-4 ${reward.color}`} />
                            <span className="text-sm text-foreground">{reward.category}</span>
                          </div>
                          <Badge variant="outline">{reward.rate}%</Badge>
                        </div>
                      );
                    })}
                    <div className="pt-3 border-t">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Total Earned</span>
                        <span className="font-bold text-foreground">${card.totalEarned.toLocaleString()}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="categories">
            <Card>
              <CardHeader>
                <CardTitle>Best Card by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {categories.map((category, index) => {
                    const Icon = category.icon;
                    const monthlyReward = category.monthlySpend * (category.bestRate / 100);
                    
                    return (
                      <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                        <div className="flex items-center gap-4">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <Icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{category.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Best: {category.bestCard} ({category.bestRate}%)
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-foreground">${category.monthlySpend}/mo</p>
                          <p className="text-sm text-green-600">+${monthlyReward.toFixed(2)} rewards</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="recommendations">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Smart Spending Tips</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {recommendations.map((rec, index) => {
                    const Icon = rec.icon;
                    return (
                      <div key={index} className="p-4 rounded-lg bg-muted/50 space-y-2">
                        <div className="flex items-center gap-2">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-medium text-foreground">{rec.spend}</span>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Use: <span className="text-foreground font-medium">{rec.use}</span></span>
                          <Badge variant="secondary" className="bg-green-500/10 text-green-600">{rec.earn}</Badge>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Optimization</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center p-6 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5">
                    <p className="text-sm text-muted-foreground mb-2">Potential Monthly Savings</p>
                    <p className="text-4xl font-bold text-primary">$48.50</p>
                    <p className="text-sm text-muted-foreground mt-2">by using optimal cards</p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Current rewards rate</span>
                      <span className="font-medium text-foreground">1.8% avg</span>
                    </div>
                    <Progress value={45} className="h-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Optimal rewards rate</span>
                      <span className="font-medium text-green-600">3.2% avg</span>
                    </div>
                    <Progress value={80} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default CardRewards;
