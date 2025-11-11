import DashboardLayout from "@/components/DashboardLayout";
import AgentChat from "@/components/AgentChat";
import { Target, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { CareerDashboard } from "@/components/career/CareerDashboard";
import { CareerGoalsPlanner } from "@/components/career/CareerGoalsPlanner";
import { SkillMatrix } from "@/components/career/SkillMatrix";
import { ResumeOptimizer } from "@/components/career/ResumeOptimizer";
import { JobTracker } from "@/components/career/JobTracker";
import { LearningPathways } from "@/components/career/LearningPathways";
import { SkillProgressTracker } from "@/components/career/SkillProgressTracker";
import { UpcomingInterviews } from "@/components/career/UpcomingInterviews";
import { CareerMilestones } from "@/components/career/CareerMilestones";
import { AICareerInsights } from "@/components/career/AICareerInsights";
import { Card, CardHeader } from "@/components/ui/card";

const CareerPage = () => {
  const { toast } = useToast();

  const handleExportReport = () => {
    toast({
      title: "Career Report Generated",
      description: "Your comprehensive career progress report is being downloaded.",
    });
  };

  return (
    <DashboardLayout hideNavigation>
      <div className="page-container animate-fade-in">
        {/* Header */}
        <div className="page-header">
          <div className="min-w-0 flex-1">
            <h1 className="page-title">
              Career Workspace
            </h1>
            <p className="page-subtitle">
              Your AI-powered Career Coach for growth, learning, and professional development
            </p>
          </div>
          <div className="page-actions">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              <Target className="w-4 h-4 mr-1.5" />
              Active Agent
            </Badge>
            <Button variant="outline" size="sm" className="action-button gap-2" onClick={handleExportReport}>
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Career Overview Dashboard */}
        <CareerDashboard />

        {/* Two Column Layout with Compact Chat */}
        <div className="workspace-compact-grid">
          {/* Left Column - Compact Chat & Insights */}
          <div className="workspace-compact-chat">
            <Card className="card-elegant border-primary/20 h-[700px] flex flex-col">
              <CardHeader className="flex-shrink-0">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Career Coach</h3>
                    <p className="text-xs text-muted-foreground">Your career mentor</p>
                  </div>
                </div>
              </CardHeader>
              <div className="flex-1 min-h-0">
                <AgentChat
                  agentName="Career Coach"
                  agentIcon={Target}
                  placeholder="Ask about goals, skills, resume..."
                  initialMessages={[
                    {
                      role: "agent",
                      content: "Hello! I can help you set goals, track skills, optimize your resume, and find opportunities. What would you like to work on today?",
                      timestamp: new Date(Date.now() - 60000),
                    },
                  ]}
                />
              </div>
            </Card>

            {/* AI Career Insights */}
            <AICareerInsights />
          </div>

          {/* Right Column - Rich Career Content */}
          <div className="workspace-compact-content">
            {/* Career Goals Planner */}
            <CareerGoalsPlanner />

            {/* Two-column grid for skill tracking */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <SkillProgressTracker />
              <SkillMatrix />
            </div>

            {/* Interviews & Applications */}
            <UpcomingInterviews />

            {/* Career Milestones Timeline */}
            <CareerMilestones />

            {/* Two-column grid for resume and jobs */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ResumeOptimizer />
              <JobTracker />
            </div>

            {/* Learning Pathways */}
            <LearningPathways />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareerPage;
