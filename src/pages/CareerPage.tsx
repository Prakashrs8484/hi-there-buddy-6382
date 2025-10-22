import DashboardLayout from "@/components/DashboardLayout";
import AgentChat from "@/components/AgentChat";
import AIModuleCard from "@/components/AIModuleCard";
import { Target, BookOpen, TrendingUp, Award, Upload, Briefcase, Calendar, CheckCircle2, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

const CareerPage = () => {
  const { toast } = useToast();
  const [goalDialogOpen, setGoalDialogOpen] = useState(false);
  const [resumeDialogOpen, setResumeDialogOpen] = useState(false);

  const handleAddGoal = () => {
    setGoalDialogOpen(false);
    toast({
      title: "Goal Added",
      description: "Career Agent is processing your new goal and updating your plan.",
    });
  };

  const handleResumeUpload = () => {
    setResumeDialogOpen(false);
    toast({
      title: "Resume Uploaded",
      description: "Career Agent is analyzing your resume and generating insights.",
    });
  };

  const handleChatMessage = (message: string) => {
    toast({
      title: "Agent Processing",
      description: "Career Agent is analyzing your request and generating insights.",
    });
  };

  return (
    <DashboardLayout hideNavigation>
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-[1600px] mx-auto">
        {/* Header */}
        <div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent mb-2 sm:mb-3 tracking-tight">
            Career Agent Workspace
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground">
            Your AI-powered Career Coach for growth, learning, and professional development
          </p>
        </div>

        {/* Career Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg sm:text-xl">Career Overview</CardTitle>
            <CardDescription className="text-sm">Your professional profile and milestones</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {careerStats.map((stat, idx) => (
                <div key={idx} className="p-3 sm:p-4 rounded-lg bg-secondary/50 border border-border">
                  <p className="text-xs sm:text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-base sm:text-lg font-semibold text-foreground truncate">{stat.value}</p>
                </div>
              ))}
            </div>

            <div>
              <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Career Milestones
              </h4>
              <div className="space-y-3">
                {careerMilestones.map((milestone, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1">
                      <CheckCircle2 className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">{milestone.title}</p>
                      <p className="text-xs text-muted-foreground">{milestone.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          {/* Chat Interface - 2 columns */}
          <div className="lg:col-span-2 space-y-4 sm:space-y-6 min-w-0">
            <div className="h-[400px] sm:h-[500px]">
              <AgentChat
                agentName="Career Coach"
                agentIcon={Target}
                placeholder="Ask about career goals, skills, resume feedback, or job opportunities..."
                onSendMessage={handleChatMessage}
                initialMessages={[
                  {
                    role: "agent",
                    content: "Hello! I'm your Career Coach. I can help you set goals, build learning paths, optimize your resume, and find job opportunities. What would you like to work on today?",
                    timestamp: new Date(Date.now() - 3600000),
                  },
                ]}
              />
            </div>

            {/* Career Goals & Planning */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Smart Career Planner</CardTitle>
                    <CardDescription>AI-suggested goals with actionable steps</CardDescription>
                  </div>
                  <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Target className="w-4 h-4 mr-2" />
                        Add Goal
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add Career Goal</DialogTitle>
                        <DialogDescription>Define a new professional goal</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label>Goal Title</Label>
                          <Input placeholder="e.g., Become a Senior Developer" />
                        </div>
                        <div>
                          <Label>Timeline</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select timeline" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3months">3 Months</SelectItem>
                              <SelectItem value="6months">6 Months</SelectItem>
                              <SelectItem value="1year">1 Year</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>Priority</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="Select priority" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="high">High</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="low">Low</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button onClick={handleAddGoal} className="w-full">Add Goal</Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {careerGoals.map((goal, idx) => (
                    <div key={idx} className="p-4 rounded-lg bg-secondary/50 border border-border">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{goal.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1">{goal.deadline}</p>
                        </div>
                        <Badge variant={goal.priority === "high" ? "destructive" : "secondary"}>
                          {goal.priority}
                        </Badge>
                      </div>
                      <Progress value={goal.progress} className="mb-2" />
                      <p className="text-xs text-primary font-semibold">{goal.progress}% Complete</p>
                      <div className="mt-3 space-y-1">
                        {goal.steps.map((step, sidx) => (
                          <p key={sidx} className="text-xs text-muted-foreground flex items-center gap-2">
                            <Clock className="w-3 h-3" />
                            {step}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skill Development */}
            <Card>
              <CardHeader>
                <CardTitle>Personalized Learning Paths</CardTitle>
                <CardDescription>AI-recommended courses based on your goals</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="recommended">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="recommended">Recommended</TabsTrigger>
                    <TabsTrigger value="inprogress">In Progress</TabsTrigger>
                  </TabsList>
                  <TabsContent value="recommended" className="space-y-3">
                    {learningRecommendations.map((course, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-accent/10 border border-accent/30">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <p className="font-medium">{course.title}</p>
                            <p className="text-xs text-muted-foreground">{course.platform} • {course.duration}</p>
                          </div>
                          <Award className="w-4 h-4 text-accent" />
                        </div>
                        <p className="text-xs text-muted-foreground mb-2">{course.skillGap}</p>
                        <Button size="sm" variant="outline" className="w-full">
                          Add to Learning Plan
                        </Button>
                      </div>
                    ))}
                  </TabsContent>
                  <TabsContent value="inprogress" className="space-y-3">
                    {learningInProgress.map((course, idx) => (
                      <div key={idx} className="p-4 rounded-lg bg-secondary/50 border border-border">
                        <p className="font-medium mb-2">{course.title}</p>
                        <Progress value={course.progress} className="mb-1" />
                        <p className="text-xs text-muted-foreground">{course.progress}% complete</p>
                      </div>
                    ))}
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Sidebar - 1 column */}
          <div className="space-y-4 sm:space-y-6 min-w-0">
            {/* Skill Progress */}
            <AIModuleCard
              title="Skill Progress"
              description="Your current skill levels"
              status="active"
              icon={TrendingUp}
            >
              <div className="space-y-3">
                {skillProgress.map((skill) => (
                  <div key={skill.name}>
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-foreground truncate">{skill.name}</span>
                      <span className="text-muted-foreground flex-shrink-0 ml-2">{skill.level}%</span>
                    </div>
                    <Progress value={skill.level} />
                  </div>
                ))}
              </div>
            </AIModuleCard>

            {/* Resume Optimizer */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Resume Optimizer</CardTitle>
                <CardDescription className="text-xs">AI-powered resume analysis</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Dialog open={resumeDialogOpen} onOpenChange={setResumeDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload Resume
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Upload Resume</DialogTitle>
                      <DialogDescription>Get AI-powered feedback on your resume</DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="border-2 border-dashed rounded-lg p-8 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                        <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                        <p className="text-xs text-muted-foreground mt-1">PDF, DOC, DOCX (Max 5MB)</p>
                      </div>
                      <Button onClick={handleResumeUpload} className="w-full">Analyze Resume</Button>
                    </div>
                  </DialogContent>
                </Dialog>
                
                <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Resume Score</span>
                    <span className="text-2xl font-bold text-primary">85/100</span>
                  </div>
                  <Progress value={85} className="mb-2" />
                  <p className="text-xs text-muted-foreground">Last updated: 2 days ago</p>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-semibold">AI Suggestions:</p>
                  {resumeSuggestions.map((suggestion, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">• {suggestion}</p>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Job Opportunities */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Career Opportunities</CardTitle>
                <CardDescription className="text-xs">AI-curated job matches</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {jobOpportunities.map((job, idx) => (
                  <div key={idx} className="p-3 rounded-lg bg-accent/10 border border-accent/30">
                    <div className="flex items-start gap-2 mb-2">
                      <Briefcase className="w-4 h-4 text-accent mt-0.5" />
                      <div className="flex-1">
                        <p className="text-sm font-medium">{job.title}</p>
                        <p className="text-xs text-muted-foreground">{job.company}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="text-xs">{job.match}% Match</Badge>
                      <span className="text-xs text-muted-foreground">{job.salary}</span>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="w-full">
                  View All Opportunities
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

const careerStats = [
  { label: "Current Role", value: "Full Stack Developer" },
  { label: "Experience", value: "5 Years" },
  { label: "Skills Tracked", value: "12" },
  { label: "Goal Progress", value: "68%" },
];

const careerMilestones = [
  { title: "Joined TechCorp as Senior Developer", date: "January 2024" },
  { title: "Completed AWS Solutions Architect Certification", date: "November 2023" },
  { title: "Promoted to Team Lead", date: "June 2023" },
  { title: "Published Open Source Project", date: "March 2023" },
];

const careerGoals = [
  { 
    title: "Master TypeScript & Advanced Patterns", 
    progress: 75, 
    deadline: "End of Q1 2025",
    priority: "high",
    steps: [
      "Complete Advanced TypeScript Course (Week 1-2)",
      "Build 2 TypeScript Projects (Week 3-4)",
      "Pass TypeScript Certification Exam (Week 5)"
    ]
  },
  { 
    title: "AWS Solutions Architect Certification", 
    progress: 45, 
    deadline: "March 2025",
    priority: "high",
    steps: [
      "Study AWS Core Services (Week 1-3)",
      "Complete Practice Labs (Week 4-6)",
      "Take Mock Exams (Week 7-8)"
    ]
  },
  { 
    title: "Build Full-Stack Portfolio Project", 
    progress: 60, 
    deadline: "February 2025",
    priority: "medium",
    steps: [
      "Design System Architecture (Week 1)",
      "Develop Backend APIs (Week 2-3)",
      "Build Frontend UI (Week 4-5)"
    ]
  },
];

const learningRecommendations = [
  { 
    title: "Advanced TypeScript Patterns", 
    platform: "Frontend Masters",
    duration: "4 weeks",
    skillGap: "Fills gap: Advanced TypeScript knowledge"
  },
  { 
    title: "System Design Fundamentals", 
    platform: "Educative",
    duration: "6 weeks",
    skillGap: "Fills gap: Architecture & scalability"
  },
  { 
    title: "AWS Solutions Architect Path", 
    platform: "A Cloud Guru",
    duration: "8 weeks",
    skillGap: "Fills gap: Cloud infrastructure"
  },
];

const learningInProgress = [
  { title: "React Performance Optimization", progress: 65 },
  { title: "Node.js Best Practices", progress: 40 },
];

const skillProgress = [
  { name: "TypeScript", level: 85 },
  { name: "React", level: 90 },
  { name: "Node.js", level: 70 },
  { name: "AWS", level: 55 },
  { name: "System Design", level: 60 },
];

const resumeSuggestions = [
  "Add quantifiable achievements to experience section",
  "Include AWS certification in certifications",
  "Optimize keywords for senior developer roles",
];

const jobOpportunities = [
  { title: "Senior Full Stack Developer", company: "TechStart Inc", match: 92, salary: "$120K-$150K" },
  { title: "Lead Frontend Engineer", company: "CloudBase", match: 88, salary: "$130K-$160K" },
  { title: "Solutions Architect", company: "DataFlow Systems", match: 85, salary: "$140K-$170K" },
];

export default CareerPage;
