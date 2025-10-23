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
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight">
              Career Agent Workspace
            </h1>
            <p className="text-sm sm:text-base text-muted-foreground">
              Your AI-powered Career Coach for growth, learning, and professional development
            </p>
          </div>
          <div className="flex items-center gap-2 flex-shrink-0">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30 text-xs sm:text-sm">
              <Target className="w-3 h-3 mr-1" />
              Active Agent
            </Badge>
            <Button variant="outline" size="sm" className="gap-2" onClick={handleExportReport}>
              <Download className="w-4 h-4" />
              <span className="hidden sm:inline">Export Report</span>
            </Button>
          </div>
        </div>

        {/* Career Overview Dashboard */}
        <CareerDashboard />

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
          {/* Left Column - Agent Chat */}
          <div className="xl:col-span-1 min-w-0">
            <div className="h-[500px] sm:h-[700px]">
              <AgentChat
                agentName="Career Coach"
                agentIcon={Target}
                placeholder="Ask about goals, skills, resume, jobs, learning paths..."
                initialMessages={[
                  {
                    role: "agent",
                    content: "Hello! I'm your Career Coach. I can help you set goals, track skills, optimize your resume, plan learning paths, and find job opportunities. What would you like to work on today?",
                    timestamp: new Date(Date.now() - 60000),
                  },
                ]}
              />
            </div>
          </div>

          {/* Right Column - Career Modules */}
          <div className="xl:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            {/* Career Goals Planner */}
            <CareerGoalsPlanner />

            {/* Skill Matrix */}
            <SkillMatrix />

            {/* Resume Optimizer */}
            <ResumeOptimizer />

            {/* Job Application Tracker */}
            <JobTracker />

            {/* Learning Pathways */}
            <LearningPathways />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CareerPage;
