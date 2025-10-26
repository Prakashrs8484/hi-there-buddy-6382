import { ReactNode } from "react";
import { Brain, LayoutDashboard, Target, TrendingUp, Heart, Apple, Clock, BookOpen, Settings, LogOut, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { ThemeToggle } from "@/components/ThemeToggle";
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
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const DashboardLayout = ({ children, hideNavigation = false }: DashboardLayoutProps) => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen w-full flex flex-col bg-background">
        {/* Fixed Header - Always visible */}
        <header className="fixed top-0 left-0 right-0 z-50 h-16 bg-card/98 backdrop-blur-md border-b border-border shadow-sm">
          <div className="h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
            {/* Logo - Left */}
            <Link to="/" className="flex items-center gap-3 transition-all duration-300 hover:opacity-80">
              <div className="p-2 rounded-xl bg-primary/10 shadow-sm">
                <Brain className="w-6 h-6 text-primary flex-shrink-0" />
              </div>
              <div className="flex flex-col">
                <span className="text-lg font-bold text-foreground tracking-tight">NeuraDesk</span>
                <span className="text-xs text-muted-foreground hidden sm:block">AI Workspace</span>
              </div>
            </Link>

            {/* Controls - Right */}
            <div className="flex items-center gap-3">
              <ThemeToggle />
              <SidebarTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon"
                  className="rounded-xl border-border/40 bg-card/80 backdrop-blur-md hover:bg-card hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow-md"
                  aria-label="Toggle menu"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SidebarTrigger>
            </div>
          </div>
        </header>

        {/* Sidebar */}
        <AppSidebar isActive={isActive} />

        {/* Main Content - with top padding for fixed header */}
        <main className="flex-1 w-full pt-16 overflow-auto">
          <div className="w-full">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = ({ isActive }: { isActive: (path: string) => boolean }) => {
  return (
    <Sidebar 
      side="right"
      collapsible="offcanvas" 
      className="border-l border-sidebar-border bg-sidebar shadow-lg transition-all duration-300 top-16"
    >

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active}
                      className={`
                        transition-all duration-200 rounded-xl h-12
                        ${active 
                          ? 'bg-primary/10 text-primary font-medium shadow-sm border border-primary/20' 
                          : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground border border-transparent'
                        }
                      `}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-4 py-3">
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

      <SidebarFooter className="border-t border-sidebar-border p-4">
        <SidebarMenu className="space-y-2">
          <SidebarMenuItem>
            <SidebarMenuButton 
              className="transition-all duration-200 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground h-12"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              className="transition-all duration-200 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground h-12"
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
