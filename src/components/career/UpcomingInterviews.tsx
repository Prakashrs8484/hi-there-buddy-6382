import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Video, MapPin, Building2 } from "lucide-react";

const interviews = [
  {
    company: "TechCorp Solutions",
    position: "Senior Frontend Developer",
    date: "Dec 15, 2025",
    time: "10:00 AM",
    type: "Video Call",
    status: "upcoming",
    icon: Video,
  },
  {
    company: "Digital Innovations",
    position: "Full Stack Engineer",
    date: "Dec 18, 2025",
    time: "2:30 PM",
    type: "On-site",
    status: "confirmed",
    icon: MapPin,
  },
  {
    company: "StartupX",
    position: "React Developer",
    date: "Dec 20, 2025",
    time: "11:00 AM",
    type: "Video Call",
    status: "pending",
    icon: Video,
  },
];

const applications = [
  { company: "CloudBase Inc", position: "Backend Engineer", status: "Interview Scheduled", count: 3 },
  { company: "DataFlow Systems", position: "DevOps Engineer", status: "Under Review", count: 2 },
  { company: "Mobile First", position: "React Native Dev", status: "Applied", count: 5 },
];

export const UpcomingInterviews = () => {
  return (
    <Card className="card-elegant">
      <CardHeader>
        <CardTitle>Interviews & Applications</CardTitle>
        <CardDescription>Track your upcoming interviews and application status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Upcoming Interviews */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Upcoming Interviews</h4>
          {interviews.map((interview, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl bg-primary/5 border border-border/50 hover:shadow-md transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h5 className="font-semibold text-sm">{interview.company}</h5>
                    <p className="text-xs text-muted-foreground">{interview.position}</p>
                  </div>
                </div>
                <Badge 
                  variant={interview.status === "confirmed" ? "default" : "outline"}
                  className="text-xs"
                >
                  {interview.status}
                </Badge>
              </div>
              <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                <span className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {interview.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {interview.time}
                </span>
                <span className="flex items-center gap-1">
                  <interview.icon className="w-3 h-3" />
                  {interview.type}
                </span>
              </div>
              <Button size="sm" variant="outline" className="w-full">
                View Details
              </Button>
            </div>
          ))}
        </div>

        {/* Application Summary */}
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">Recent Applications</h4>
          {applications.map((app, idx) => (
            <div
              key={idx}
              className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
            >
              <div>
                <p className="font-semibold text-sm">{app.company}</p>
                <p className="text-xs text-muted-foreground">{app.position}</p>
              </div>
              <Badge variant="outline" className="text-xs">
                {app.status}
              </Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
