import { PiggyBank, TrendingUp, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BudgetCategory {
  name: string;
  spent: number;
  budget: number;
  icon?: string;
}

const budgetCategories: BudgetCategory[] = [
  { name: "Housing", spent: 1200, budget: 1500 },
  { name: "Food & Dining", spent: 450, budget: 600 },
  { name: "Transportation", spent: 280, budget: 400 },
  { name: "Entertainment", spent: 180, budget: 300 },
  { name: "Utilities", spent: 150, budget: 200 },
  { name: "Healthcare", spent: 120, budget: 250 },
];

export const BudgetPlanner = () => {
  const totalSpent = budgetCategories.reduce((sum, cat) => sum + cat.spent, 0);
  const totalBudget = budgetCategories.reduce((sum, cat) => sum + cat.budget, 0);
  const overallProgress = (totalSpent / totalBudget) * 100;

  return (
    <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur border-border">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <PiggyBank className="w-5 h-5 text-primary" />
            <h3 className="text-lg sm:text-xl font-semibold text-foreground">AI Budget Planner</h3>
          </div>
          <p className="text-sm text-muted-foreground">
            ₹{totalSpent.toLocaleString()} / ₹{totalBudget.toLocaleString()} spent
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-2">
          <TrendingUp className="w-4 h-4" />
          Regenerate Budget
        </Button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-foreground">Overall Budget</span>
          <Badge variant={overallProgress > 90 ? "destructive" : overallProgress > 75 ? "outline" : "default"}>
            {overallProgress.toFixed(0)}%
          </Badge>
        </div>
        <Progress value={overallProgress} className="h-3" />
      </div>

      <div className="space-y-4">
        {budgetCategories.map((category, idx) => {
          const percentage = (category.spent / category.budget) * 100;
          const isOverBudget = category.spent > category.budget;
          const isNearLimit = percentage > 80 && percentage <= 100;

          return (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-foreground">{category.name}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    ₹{category.spent} / ₹{category.budget}
                  </span>
                  {isOverBudget && <AlertCircle className="w-4 h-4 text-destructive" />}
                </div>
              </div>
              <Progress
                value={Math.min(percentage, 100)}
                className={`h-2 ${
                  isOverBudget
                    ? "[&>div]:bg-destructive"
                    : isNearLimit
                    ? "[&>div]:bg-warning"
                    : ""
                }`}
              />
              {isOverBudget && (
                <p className="text-xs text-destructive">
                  Over budget by ₹{category.spent - category.budget}
                </p>
              )}
              {isNearLimit && !isOverBudget && (
                <p className="text-xs text-warning">
                  {(100 - percentage).toFixed(0)}% remaining
                </p>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};
