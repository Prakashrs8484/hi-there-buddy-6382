import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Target, Briefcase, GraduationCap, Award, CheckCircle2 } from "lucide-react";

const milestones = [
  {
    title: "Completed React Certification",
    description: "Advanced React Development - Udemy",
    date: "Nov 2025",
    icon: GraduationCap,
    status: "completed",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "First Remote Interview",
    description: "TechCorp Solutions - Senior Frontend Role",
    date: "Dec 2025",
    icon: Briefcase,
    status: "in-progress",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    title: "Portfolio Website Launch",
    description: "Personal portfolio showcasing 5+ projects",
    date: "Oct 2025",
    icon: Award,
    status: "completed",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    title: "100 Days of Code Challenge",
    description: "Consistent coding practice streak",
    date: "In Progress",
    icon: Target,
    status: "in-progress",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const CareerMilestones = () => {
  return (
    <Card className="card-elegant">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
            <Trophy className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle>Career Milestones</CardTitle>
            <CardDescription>Track your achievements and progress</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="relative">
          {milestones.map((milestone, idx) => (
            <div key={idx} className="relative pb-6 last:pb-0">
              {/* Timeline line */}
              {idx !== milestones.length - 1 && (
                <div className="absolute left-5 top-12 bottom-0 w-0.5 bg-border" />
              )}
              
              <div className="flex items-start gap-4">
                <div className={`w-10 h-10 rounded-full ${milestone.bgColor} flex items-center justify-center flex-shrink-0 relative z-10 ${milestone.color}`}>
                  {milestone.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <milestone.icon className="w-5 h-5" />
                  )}
                </div>
                
                <div className="flex-1 min-w-0 pt-1">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h5 className="font-semibold text-sm">{milestone.title}</h5>
                    <Badge 
                      variant={milestone.status === "completed" ? "default" : "outline"}
                      className="text-xs flex-shrink-0"
                    >
                      {milestone.status === "completed" ? "Done" : "Active"}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-1">{milestone.description}</p>
                  <p className="text-xs text-muted-foreground font-medium">{milestone.date}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
