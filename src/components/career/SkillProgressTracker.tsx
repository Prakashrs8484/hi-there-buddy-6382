import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Code, Database, Palette, Server } from "lucide-react";

const skills = [
  {
    name: "React & TypeScript",
    progress: 75,
    icon: Code,
    level: "Advanced",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    name: "Node.js & APIs",
    progress: 65,
    icon: Server,
    level: "Intermediate",
    color: "text-success",
    bgColor: "bg-success/10",
  },
  {
    name: "Database Design",
    progress: 55,
    icon: Database,
    level: "Intermediate",
    color: "text-accent",
    bgColor: "bg-accent/10",
  },
  {
    name: "UI/UX Design",
    progress: 45,
    icon: Palette,
    level: "Learning",
    color: "text-warning",
    bgColor: "bg-warning/10",
  },
];

export const SkillProgressTracker = () => {
  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle>Skill Progress Tracker</CardTitle>
        <CardDescription>Your learning journey and proficiency levels</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {skills.map((skill, idx) => (
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg ${skill.bgColor} flex items-center justify-center ${skill.color}`}>
                  <skill.icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-semibold text-sm">{skill.name}</p>
                  <Badge variant="outline" className="text-xs mt-1">
                    {skill.level}
                  </Badge>
                </div>
              </div>
              <span className="text-sm font-bold text-muted-foreground">{skill.progress}%</span>
            </div>
            <Progress value={skill.progress} className="h-2" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
