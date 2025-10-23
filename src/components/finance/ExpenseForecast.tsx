import { TrendingUp, AlertCircle, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const forecastData = [
  { month: "Oct", actual: 3180, predicted: 3180, optimal: 2800 },
  { month: "Nov", actual: null, predicted: 3250, optimal: 2800 },
  { month: "Dec", actual: null, predicted: 3400, optimal: 2800 },
  { month: "Jan", actual: null, predicted: 3100, optimal: 2800 },
];

const insights = [
  {
    type: "warning",
    title: "Higher spending expected in December",
    description: "Holiday season typically increases spending by 15-20%. Consider setting aside extra budget.",
  },
  {
    type: "tip",
    title: "Optimize subscription costs",
    description: "You could save $85/month by reviewing unused subscriptions and switching to annual plans.",
  },
  {
    type: "success",
    title: "Great savings trajectory",
    description: "You're on track to exceed your emergency fund goal by February 2025.",
  },
];

export const ExpenseForecast = () => {
  return (
    <Card className="p-4 sm:p-6 bg-card/50 backdrop-blur border-border">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h3 className="text-lg sm:text-xl font-semibold text-foreground">AI Expense Forecast</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Predicted spending based on your patterns and upcoming events
        </p>
      </div>

      <div className="h-[280px] w-full mb-6">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={forecastData}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="actual"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              name="Actual"
              connectNulls={false}
            />
            <Line
              type="monotone"
              dataKey="predicted"
              stroke="hsl(var(--accent))"
              strokeWidth={2}
              strokeDasharray="5 5"
              name="Predicted"
            />
            <Line
              type="monotone"
              dataKey="optimal"
              stroke="hsl(var(--success))"
              strokeWidth={2}
              strokeDasharray="3 3"
              name="Optimal"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="space-y-3">
        <h4 className="text-sm font-semibold text-foreground">AI Insights & Recommendations</h4>
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`p-3 rounded-lg border ${
              insight.type === "warning"
                ? "bg-destructive/5 border-destructive/20"
                : insight.type === "success"
                ? "bg-success/5 border-success/20"
                : "bg-accent/5 border-accent/20"
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="mt-0.5">
                {insight.type === "warning" ? (
                  <AlertCircle className="w-4 h-4 text-destructive" />
                ) : insight.type === "success" ? (
                  <TrendingUp className="w-4 h-4 text-success" />
                ) : (
                  <Lightbulb className="w-4 h-4 text-accent" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground mb-1">{insight.title}</p>
                <p className="text-xs text-muted-foreground">{insight.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};
