import { IndianRupee, TrendingUp, Target, PiggyBank, Plus, FileText, Download } from "lucide-react";
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
      <div className="page-container animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <div className="min-w-0 flex-1">
            <h1 className="page-title">
              Finance Workspace
            </h1>
            <p className="page-subtitle">AI-powered financial planning, tracking, and insights</p>
          </div>
          <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
            <IndianRupee className="w-4 h-4 mr-1.5" />
            Active Agent
          </Badge>
        </div>

        {/* Action Buttons */}
        <div className="page-actions mb-4">
          <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="action-button gap-2">
                <Plus className="w-4 h-4" />
                <span>Add Expense</span>
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
              <Button variant="outline" className="action-button gap-2">
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
              <Button variant="outline" className="action-button gap-2">
                <Target className="w-4 h-4" />
                Add Goal
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

          <Button variant="outline" className="action-button gap-2">
            <FileText className="w-4 h-4" />
            Generate Report
          </Button>
          <Button variant="outline" className="action-button gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
        </div>

        {/* Two Column Layout */}
        <div className="workspace-grid">
          {/* Left Column - Agent Chat */}
          <div className="workspace-chat-column">
            <div className="h-[600px] sm:h-[750px] lg:h-[800px]">
              <AgentChat
                agentName="Finance Agent"
                agentIcon={IndianRupee}
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
          <div className="workspace-content-column">
            {/* Overview Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {financialStats.map((stat, idx) => (
                <Card key={idx} className="card-hover card-glass p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-xl ${stat.bgColor} flex-shrink-0`}>
                      <stat.icon className={`w-4 h-4 ${stat.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-1.5 font-medium">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground mb-1">{stat.value}</p>
                  <p className={`text-xs font-medium ${stat.changeColor}`}>
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
    value: "₹5,200", 
    change: "+8%", 
    icon: TrendingUp,
    bgColor: "bg-success/10",
    iconColor: "text-success",
    changeColor: "text-success"
  },
  { 
    label: "Total Expenses", 
    value: "₹3,180", 
    change: "-5%", 
    icon: PiggyBank,
    bgColor: "bg-destructive/10",
    iconColor: "text-destructive",
    changeColor: "text-success"
  },
  { 
    label: "Net Savings", 
    value: "₹2,020", 
    change: "+15%", 
    icon: IndianRupee,
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
