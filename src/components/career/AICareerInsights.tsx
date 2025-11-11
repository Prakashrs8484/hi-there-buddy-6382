import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Sparkles, TrendingUp, Target, BookOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const insights = [
  {
    icon: TrendingUp,
    title: "Next Skill Recommendation",
    description: "Based on your profile and market trends, learning Node.js would increase your job opportunities by 40%.",
    action: "Start Learning",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Target,
    title: "Career Path Opportunity",
    description: "Full Stack Developer roles matching your skills have increased by 25% this month in your area.",
    action: "View Jobs",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    icon: BookOpen,
    title: "Resume Optimization",
    description: "Adding project metrics and quantified achievements could improve your resume score by 35%.",
    action: "Optimize Now",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const AICareerInsights = () => {
  return (
    <Card className="card-elegant border-primary/20">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>AI Career Insights</CardTitle>
            <CardDescription>Personalized recommendations for your growth</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, idx) => (
          <div
            key={idx}
            className={`p-4 rounded-xl ${insight.bgColor} border border-border/50 transition-all hover:shadow-md`}
          >
            <div className="flex items-start gap-3">
              <div className={`w-10 h-10 rounded-lg bg-card flex items-center justify-center flex-shrink-0 ${insight.color}`}>
                <insight.icon className="w-5 h-5" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-sm mb-1">{insight.title}</h4>
                <p className="text-xs text-muted-foreground mb-2">{insight.description}</p>
                <Badge variant="outline" className="text-xs cursor-pointer hover:bg-card">
                  {insight.action} →
                </Badge>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
