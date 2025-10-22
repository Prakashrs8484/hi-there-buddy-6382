import { DollarSign, TrendingUp, Target, PiggyBank, Wallet, TrendingDown, Plus, FileText, ArrowUpRight, ArrowDownRight } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AIModuleCard from "@/components/AIModuleCard";
import AgentChat from "@/components/AgentChat";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { useState } from "react";

const FinancePage = () => {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [addIncomeOpen, setAddIncomeOpen] = useState(false);
  const [addGoalOpen, setAddGoalOpen] = useState(false);

  return (
    <DashboardLayout hideNavigation>
      <div className="p-8 space-y-8 max-w-[1600px] mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-3 tracking-tight">
              Finance Agent Workspace
            </h1>
            <p className="text-muted-foreground text-base">AI-powered financial planning, tracking, and insights</p>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              <DollarSign className="w-3 h-3 mr-1" />
              Active Agent
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-3 flex-wrap">
          <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food & Dining</SelectItem>
                      <SelectItem value="transport">Transportation</SelectItem>
                      <SelectItem value="bills">Bills & Utilities</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="shopping">Shopping</SelectItem>
                      <SelectItem value="health">Healthcare</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="What was this expense for?" />
                </div>
                <Button className="w-full">Add Expense</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={addIncomeOpen} onOpenChange={setAddIncomeOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                Add Income
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Income</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Source</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="salary">Salary</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                      <SelectItem value="business">Business</SelectItem>
                      <SelectItem value="investment">Investment Returns</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Description</Label>
                  <Input placeholder="Income source details" />
                </div>
                <Button className="w-full">Add Income</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog open={addGoalOpen} onOpenChange={setAddGoalOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Target className="w-4 h-4" />
                Add Financial Goal
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Financial Goal</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label>Goal Name</Label>
                  <Input placeholder="e.g., Emergency Fund, Vacation" />
                </div>
                <div className="space-y-2">
                  <Label>Target Amount</Label>
                  <Input type="number" placeholder="0.00" />
                </div>
                <div className="space-y-2">
                  <Label>Deadline</Label>
                  <Input type="date" />
                </div>
                <Button className="w-full">Create Goal</Button>
              </div>
            </DialogContent>
          </Dialog>

          <Button variant="outline" className="gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Left Column - Agent Chat */}
          <div className="xl:col-span-1 min-w-0">
            <div className="h-[700px]">
              <AgentChat
                agentName="Finance Agent"
                agentIcon={DollarSign}
                placeholder="Ask about budgets, expenses, savings, investments..."
                initialMessages={[
                  {
                    role: "agent",
                    content: "Hello! I'm your Finance Agent. I can help you track expenses, create budgets, analyze spending patterns, set financial goals, and provide investment insights. What would you like to explore today?",
                    timestamp: new Date(Date.now() - 60000),
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Column - Dashboard Modules */}
          <div className="xl:col-span-2 space-y-6 min-w-0">
            {/* Overview Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {financialStats.map((stat, idx) => (
                <Card key={idx} className="p-4 bg-card/50 backdrop-blur border-border">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                      <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.changeColor}`}>
                    {stat.change} vs last month
                  </p>
                </Card>
              ))}
            </div>

            {/* Expense & Income Tracking */}
            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expenses">Expense Tracker</TabsTrigger>
                <TabsTrigger value="income">Income Tracker</TabsTrigger>
              </TabsList>
              
              <TabsContent value="expenses" className="space-y-4">
                <AIModuleCard
                  title="Expense Breakdown"
                  description="Your spending by category this month"
                  status="active"
                  icon={TrendingDown}
                >
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={expenseData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="category" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Bar dataKey="amount" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </AIModuleCard>
              </TabsContent>

              <TabsContent value="income" className="space-y-4">
                <AIModuleCard
                  title="Income Trends"
                  description="Your income over the last 6 months"
                  status="active"
                  icon={TrendingUp}
                >
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={incomeData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: "hsl(var(--card))", 
                            border: "1px solid hsl(var(--border))",
                            borderRadius: "8px"
                          }}
                        />
                        <Line type="monotone" dataKey="amount" stroke="hsl(var(--primary))" strokeWidth={2} />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </AIModuleCard>
              </TabsContent>
            </Tabs>

            {/* Budget Planner */}
            <AIModuleCard
              title="AI Budget Planner"
              description="Personalized budget recommendations"
              status="completed"
              icon={PiggyBank}
              actions={
                <Button variant="outline" size="sm">
                  Regenerate Budget
                </Button>
              }
            >
              <div className="space-y-3">
                {budgetCategories.map((category, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-foreground font-medium">{category.name}</span>
                      <span className="text-muted-foreground">
                        ${category.spent} / ${category.budget}
                      </span>
                    </div>
                    <Progress 
                      value={(category.spent / category.budget) * 100} 
                      className="h-2"
                    />
                    {category.spent > category.budget && (
                      <p className="text-xs text-destructive mt-1">Over budget by ${category.spent - category.budget}</p>
                    )}
                  </div>
                ))}
              </div>
            </AIModuleCard>

            {/* Savings Goals Progress */}
            <AIModuleCard
              title="Savings & Goal Progress"
              description="Track your financial goals"
              status="active"
              icon={Target}
            >
              <div className="space-y-4">
                {savingsGoals.map((goal, idx) => (
                  <Card key={idx} className="p-4 bg-secondary/20">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-foreground">{goal.name}</h4>
                        <p className="text-sm text-muted-foreground">Target: {goal.deadline}</p>
                      </div>
                      <Badge variant="outline" className="bg-primary/10">
                        {goal.progress}%
                      </Badge>
                    </div>
                    <Progress value={goal.progress} className="h-2 mb-2" />
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${goal.current.toLocaleString()} saved
                      </span>
                      <span className="text-foreground font-medium">
                        ${goal.target.toLocaleString()} goal
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            </AIModuleCard>

            {/* Expense Log Table */}
            <AIModuleCard
              title="Recent Transactions"
              description="Your latest financial activities"
              status="active"
              icon={Wallet}
            >
              <div className="rounded-lg border border-border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Description</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentTransactions.map((transaction, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-muted-foreground">{transaction.date}</TableCell>
                        <TableCell className="font-medium">{transaction.description}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="text-xs">
                            {transaction.category}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <span className={transaction.type === 'income' ? 'text-success' : 'text-foreground'}>
                            {transaction.type === 'income' ? '+' : '-'}${transaction.amount}
                          </span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </AIModuleCard>

            {/* AI Insights */}
            <AIModuleCard
              title="AI Financial Insights"
              description="Smart recommendations from your Finance Agent"
              status="active"
              icon={TrendingUp}
            >
              <div className="space-y-3">
                {aiInsights.map((insight, idx) => (
                  <Card key={idx} className="p-4 bg-secondary/20">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${insight.type === 'warning' ? 'bg-destructive/10' : insight.type === 'success' ? 'bg-success/10' : 'bg-accent/10'} mt-0.5`}>
                        {insight.type === 'warning' ? (
                          <ArrowUpRight className={`w-4 h-4 ${insight.type === 'warning' ? 'text-destructive' : 'text-accent'}`} />
                        ) : (
                          <ArrowDownRight className="w-4 h-4 text-success" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground mb-1">{insight.title}</p>
                        <p className="text-xs text-muted-foreground">{insight.description}</p>
                        {insight.action && (
                          <Button variant="link" className="h-auto p-0 mt-2 text-xs text-primary">
                            {insight.action}
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </AIModuleCard>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

// Data
const financialStats = [
  { 
    label: "Monthly Income", 
    value: "$5,200", 
    change: "+8%", 
    icon: TrendingUp,
    bgColor: "bg-success/10",
    iconColor: "text-success",
    changeColor: "text-success"
  },
  { 
    label: "Total Expenses", 
    value: "$3,180", 
    change: "-5%", 
    icon: TrendingDown,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
    changeColor: "text-success"
  },
  { 
    label: "Net Savings", 
    value: "$2,020", 
    change: "+15%", 
    icon: PiggyBank,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    changeColor: "text-success"
  },
  { 
    label: "Active Goals", 
    value: "3", 
    change: "+1", 
    icon: Target,
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    changeColor: "text-success"
  },
];

const expenseData = [
  { category: "Food", amount: 680 },
  { category: "Transport", amount: 420 },
  { category: "Bills", amount: 850 },
  { category: "Entertainment", amount: 320 },
  { category: "Shopping", amount: 560 },
  { category: "Healthcare", amount: 350 },
];

const incomeData = [
  { month: "May", amount: 4800 },
  { month: "Jun", amount: 5100 },
  { month: "Jul", amount: 4900 },
  { month: "Aug", amount: 5300 },
  { month: "Sep", amount: 5000 },
  { month: "Oct", amount: 5200 },
];

const budgetCategories = [
  { name: "Housing", spent: 1200, budget: 1500 },
  { name: "Food & Dining", spent: 450, budget: 600 },
  { name: "Transportation", spent: 280, budget: 400 },
  { name: "Entertainment", spent: 180, budget: 300 },
  { name: "Utilities", spent: 150, budget: 200 },
];

const savingsGoals = [
  { name: "Emergency Fund", current: 8500, target: 15000, progress: 57, deadline: "Dec 2025" },
  { name: "Vacation", current: 2800, target: 5000, progress: 56, deadline: "Jun 2025" },
  { name: "New Laptop", current: 900, target: 2000, progress: 45, deadline: "Mar 2025" },
];

const recentTransactions = [
  { date: "Oct 15", description: "Grocery Shopping", category: "Food", amount: "125", type: "expense" },
  { date: "Oct 14", description: "Freelance Project", category: "Income", amount: "800", type: "income" },
  { date: "Oct 13", description: "Electricity Bill", category: "Bills", amount: "85", type: "expense" },
  { date: "Oct 12", description: "Movie Tickets", category: "Entertainment", amount: "45", type: "expense" },
  { date: "Oct 11", description: "Salary Credit", category: "Income", amount: "5200", type: "income" },
  { date: "Oct 10", description: "Gas Station", category: "Transport", amount: "60", type: "expense" },
];

const aiInsights = [
  { 
    type: "warning",
    title: "Entertainment Spending Up 25%", 
    description: "You spent 25% more on entertainment this month. Consider reducing to save $120/month.",
    action: "View Recommendations"
  },
  { 
    type: "info",
    title: "Unused Subscriptions Detected", 
    description: "3 subscriptions haven't been used in 60 days. Cancel them to save $45/month.",
    action: "Review Subscriptions"
  },
  { 
    type: "success",
    title: "Excellent Savings Progress", 
    description: "You're ahead on your emergency fund goal by 12%. Consider investing the extra $200.",
    action: "Explore Investments"
  },
];

export default FinancePage;
