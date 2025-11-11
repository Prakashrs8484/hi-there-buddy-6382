import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, IndianRupee } from "lucide-react";

export const MonthlySummary = () => {
  const income = 5200;
  const expenses = 3180;
  const savings = income - expenses;
  const savingsRate = ((savings / income) * 100).toFixed(1);

  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IndianRupee className="w-5 h-5 text-primary" />
          Monthly Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-success/10 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Income</p>
              <p className="text-2xl font-bold text-success">₹{income.toLocaleString()}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-success" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-destructive/10 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Expenses</p>
              <p className="text-2xl font-bold text-destructive">₹{expenses.toLocaleString()}</p>
            </div>
            <TrendingDown className="w-8 h-8 text-destructive" />
          </div>
          
          <div className="flex items-center justify-between p-4 bg-primary/10 rounded-xl">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Net Savings</p>
              <p className="text-2xl font-bold text-primary">₹{savings.toLocaleString()}</p>
              <p className="text-xs text-muted-foreground mt-1">
                {savingsRate}% savings rate
              </p>
            </div>
            <IndianRupee className="w-8 h-8 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
