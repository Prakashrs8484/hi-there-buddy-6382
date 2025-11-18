import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TrendingUp, AlertCircle, CheckCircle, Lightbulb } from "lucide-react";

interface InsightItem {
  type: "success" | "warning" | "info" | "tip";
  message: string;
  icon: any;
  color: string;
  bgColor: string;
}

const INSIGHTS: InsightItem[] = [
  {
    type: "warning",
    message: "Your health expenses rose by 20% this month.",
    icon: AlertCircle,
    color: "text-destructive",
    bgColor: "bg-destructive/10",
  },
  {
    type: "info",
    message: "Social spending exceeded your goal by ₹500.",
    icon: TrendingUp,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    type: "success",
    message: "You saved 15% more than October — great consistency!",
    icon: CheckCircle,
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    type: "tip",
    message: "Try cutting down transport costs by 10% next month.",
    icon: Lightbulb,
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
];

export const AIFinanceInsights = () => {
  return (
    <Card className="card-hover card-glass w-full overflow-hidden">
      <CardHeader className="p-3 sm:p-6">
        <CardTitle className="text-base sm:text-lg font-semibold">AI Financial Insights</CardTitle>
      </CardHeader>
      <CardContent className="p-3 sm:p-6">
        <div className="grid grid-cols-1 gap-2 sm:gap-3">
          {INSIGHTS.map((insight, idx) => (
            <Card 
              key={idx} 
              className="card-hover p-4 border border-border transition-all duration-200 hover:shadow-md animate-fade-in"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${insight.bgColor} flex-shrink-0`}>
                  <insight.icon className={`w-4 h-4 ${insight.color}`} />
                </div>
                <p className="text-sm text-foreground leading-relaxed">{insight.message}</p>
              </div>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
