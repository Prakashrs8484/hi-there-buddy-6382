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
import { FinancialGoals } from "@/components/finance/FinancialGoals";
import { TransactionsList } from "@/components/finance/TransactionsList";
import { IncomeTracker } from "@/components/finance/IncomeTracker";
import { ExpenseSummaryBar } from "@/components/finance/ExpenseSummaryBar.tsx";
import { AnalyticsDashboard } from "@/components/finance/AnalyticsDashboard";
import { BudgetPlanner } from "@/components/finance/BudgetPlanner";

const FinancePage = () => {
  const [addExpenseOpen, setAddExpenseOpen] = useState(false);
  const [addIncomeOpen, setAddIncomeOpen] = useState(false);
  const [addGoalOpen, setAddGoalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  return (
    <DashboardLayout hideNavigation>
      <div className="page-container animate-fade-in">
        {/* Header with Action Buttons */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div className="min-w-0">
            <h1 className="page-title">
              Finance Workspace
            </h1>
            <p className="page-subtitle">AI-powered financial planning, tracking, and insights</p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
          <Dialog open={addExpenseOpen} onOpenChange={setAddExpenseOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">Add Expense</span>
                <span className="sm:hidden">Expense</span>
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
                <span className="hidden sm:inline">Add Income</span>
                <span className="sm:hidden">Income</span>
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
                <span className="hidden sm:inline">Add Goal</span>
                <span className="sm:hidden">Goal</span>
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
            <span className="hidden md:inline">Generate Report</span>
            <span className="md:hidden">Report</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="w-4 h-4" />
            Export Data
          </Button>
            
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <IndianRupee className="w-4 h-4 mr-1.5" />
              Active Agent
            </Badge>
          </div>
        </div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column - Functional & Interactive Sections */}
          <div className="space-y-6">
            {/* Finance Agent Chat */}
            <div className="h-[600px]">
              <AgentChat
                agentName="Finance Agent"
                agentIcon={IndianRupee}
                placeholder="Ask about budgets, expenses, savings, investments..."
                initialMessages={[
                  {
                    role: "agent",
                    content: "Hello! I'm your finance agent. I can help you track expenses, plan budgets, and reach your financial goals.",
                    timestamp: new Date(),
                  },
                ]}
              />
            </div>

            {/* Recent Transactions */}
            <TransactionsList />

            {/* Financial Goals */}
            <FinancialGoals />

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
          </div>

          {/* Right Column - Analytics & Insights */}
          <div className="space-y-6">
            {/* Overview Summary Stats */}
            <div className="grid grid-cols-2 gap-4">
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

            {/* Expense Summary Bar */}
            <ExpenseSummaryBar />

            {/* Budget Planner - Separate Entity */}
            <BudgetPlanner />

            {/* Unified Analytics Dashboard */}
            <AnalyticsDashboard 
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
            />
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
