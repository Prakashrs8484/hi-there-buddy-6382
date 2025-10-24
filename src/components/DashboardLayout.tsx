import { ReactNode } from "react";
import { Brain, LayoutDashboard, Target, TrendingUp, Heart, Apple, Clock, BookOpen, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";

interface DashboardLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const DashboardLayout = ({ children, hideNavigation = false }: DashboardLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  if (hideNavigation) {
    // Full-screen mode with floating toggle
    return (
      <SidebarProvider defaultOpen={false}>
        <div className="min-h-screen w-full flex bg-background">
          <AppSidebar isActive={isActive} />
          <main className="flex-1 w-full overflow-auto relative">
            {/* Floating sidebar trigger */}
            <div className="fixed top-6 left-6 z-50">
              <SidebarTrigger className="bg-card/95 backdrop-blur-md shadow-lg border border-border/50 hover:bg-card hover:shadow-xl hover:border-border transition-all duration-200 rounded-xl p-2.5" />
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex bg-background">
        <AppSidebar isActive={isActive} />
        <main className="flex-1 w-full overflow-auto">
          <div className="sticky top-0 z-40 bg-card/95 backdrop-blur-md border-b border-border/50 p-4 md:hidden shadow-sm">
            <SidebarTrigger className="hover:bg-sidebar-accent/50 transition-all duration-200 rounded-lg" />
          </div>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = ({ isActive }: { isActive: (path: string) => boolean }) => {
  const { state } = useSidebar();
  const collapsed = state === "collapsed";

  return (
    <Sidebar 
      collapsible="offcanvas" 
      className="border-r border-sidebar-border bg-sidebar shadow-sm transition-all duration-300"
    >
      <SidebarHeader className="border-b border-sidebar-border p-5">
        <Link to="/" className="flex items-center gap-3 transition-all duration-300">
          <div className="p-2 rounded-xl bg-primary/10">
            <Brain className="w-6 h-6 text-primary flex-shrink-0" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground">NeuraDesk</span>
              <span className="text-xs text-muted-foreground">AI Workspace</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active} 
                      tooltip={item.label}
                      className={`
                        transition-all duration-200 rounded-lg
                        ${active 
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm' 
                          : 'hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground'
                        }
                      `}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-3 py-2">
                        <item.icon className="w-5 h-5 flex-shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-3">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Settings"
              className="transition-all duration-200 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Sign Out"
              className="transition-all duration-200 rounded-lg hover:bg-sidebar-accent/50 text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <Link to="/auth" className="flex items-center gap-3">
                <LogOut className="w-5 h-5" />
                <span>Sign Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/dashboard" },
  { icon: Target, label: "Career", path: "/career" },
  { icon: TrendingUp, label: "Finance", path: "/finance" },
  { icon: Heart, label: "Health & Fitness", path: "/health" },
  { icon: Apple, label: "Nutrition", path: "/nutrition" },
  { icon: Clock, label: "Lifestyle", path: "/lifestyle" },
  { icon: BookOpen, label: "NeuraNotes", path: "/neuranotes" },
];

export default DashboardLayout;
