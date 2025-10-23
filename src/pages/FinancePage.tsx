import { DollarSign, TrendingUp, Target, PiggyBank, Plus, FileText, Download } from "lucide-react";
import DashboardLayout from "@/components/DashboardLayout";
import AgentChat from "@/components/AgentChat";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { ExpenseTracker } from "@/components/finance/ExpenseTracker";
import { BudgetPlanner } from "@/components/finance/BudgetPlanner";
import { FinancialGoals } from "@/components/finance/FinancialGoals";
import { ExpenseForecast } from "@/components/finance/ExpenseForecast";
import { TransactionsList } from "@/components/finance/TransactionsList";
import { IncomeTracker } from "@/components/finance/IncomeTracker";

const FinancePage = () => {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [addIncomeOpen, setAddIncomeOpen] = useState(false);
  const [addGoalOpen, setAddGoalOpen] = useState(false);

  return (
    <DashboardLayout hideNavigation>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight">
              Finance Agent Workspace
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">AI-powered financial planning, tracking, and insights</p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs sm:text-sm">
              <DollarSign className="w-3 h-3 mr-1" />
              Active Agent
            </Badge>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2 text-xs sm:text-sm">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                <span className="hidden xs:inline">Add Expense</span>
                <span className="xs:hidden">Expense</span>
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

          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <FileText className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Generate Report</span>
            <span className="xs:hidden">Report</span>
          </Button>
          <Button variant="outline" className="gap-2 text-xs sm:text-sm">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" />
            <span className="hidden xs:inline">Export Data</span>
            <span className="xs:hidden">Export</span>
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Agent Chat */}
          <div className="xl:col-span-1 min-w-0">
            <div className="h-[500px] sm:h-[700px]">
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
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            {/* Overview Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {financialStats.map((stat, idx) => (
                <Card key={idx} className="p-3 sm:p-4 bg-card/50 backdrop-blur border-border hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-1.5 sm:p-2 rounded-lg ${stat.bgColor} flex-shrink-0`}>
                      <stat.icon className={`w-3 h-3 sm:w-4 sm:h-4 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1 truncate">{stat.label}</p>
                  <p className="text-lg sm:text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className={`text-xs mt-1 ${stat.changeColor} truncate`}>
                    {stat.change}
                  </p>
                </Card>
              ))}
            </div>

            {/* AI Expense Forecast */}
            <ExpenseForecast />

            {/* Expense & Income Tracking */}
            <Tabs defaultValue="expenses" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="expenses">Expense Tracker</TabsTrigger>
                <TabsTrigger value="income">Income Tracker</TabsTrigger>
              </TabsList>
              
              <TabsContent value="expenses" className="space-y-4">
                <ExpenseTracker />
              </TabsContent>

              <TabsContent value="income" className="space-y-4">
                <IncomeTracker />
              </TabsContent>
            </Tabs>

            {/* Budget Planner */}
            <BudgetPlanner />

            {/* Savings Goals Progress */}
            <FinancialGoals />

            {/* Transactions List */}
            <TransactionsList />
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
    icon: PiggyBank,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
    changeColor: "text-success"
  },
  { 
    label: "Net Savings", 
    value: "$2,020", 
    change: "+15%", 
    icon: DollarSign,
    bgColor: "bg-primary/10",
    iconColor: "text-primary",
    changeColor: "text-success"
  },
  { 
    label: "Active Goals", 
    value: "4", 
    change: "+1", 
    icon: Target,
    bgColor: "bg-accent/10",
    iconColor: "text-accent",
    changeColor: "text-success"
  },
];

export default FinancePage;
