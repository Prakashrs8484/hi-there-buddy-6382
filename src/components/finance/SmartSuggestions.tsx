import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Lightbulb, TrendingDown, Calendar, Target } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const suggestions = [
  {
    icon: TrendingDown,
    title: "Reduce Transportation Costs",
    description: "You've spent ₹620 on transport. Try carpooling or public transit to save ~10%.",
    impact: "Save ₹62/month",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
  {
    icon: Calendar,
    title: "Optimize Bill Payment Timing",
    description: "Schedule utility bills around your income dates to avoid late fees.",
    impact: "Avoid ₹50 fees",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: Target,
    title: "Emergency Fund Progress",
    description: "You're 72% toward your ₹10,000 emergency fund. Keep up the momentum!",
    impact: "₹2,800 to go",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

export const SmartSuggestions = () => {
  return (
    <Card className="card-elegant border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Lightbulb className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>AI Smart Suggestions</CardTitle>
            <CardDescription>Personalized insights to improve your finances</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {suggestions.map((suggestion, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl ${suggestion.bgColor} border border-border/50 transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0 ${suggestion.color}`}>
                <suggestion.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{suggestion.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{suggestion.description}</p>
                <Badge variant="outline" className="text-xs">
                  {suggestion.impact}
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
