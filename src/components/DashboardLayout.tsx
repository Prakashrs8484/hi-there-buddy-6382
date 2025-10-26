import { ReactNode } from "react";
import { Brain, LayoutDashboard, Target, TrendingUp, Heart, Apple, Clock, BookOpen, Settings, LogOut } from "lucide-react";
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
            {/* Floating controls */}
            <div className="fixed top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8 z-50 flex items-center gap-3">
              <SidebarTrigger className="bg-card backdrop-blur-md shadow-lg border border-border hover:bg-card hover:shadow-xl hover:border-primary/30 transition-all duration-200 rounded-2xl p-3" />
              <ThemeToggle />
            </div>
            {/* Add padding to prevent overlap */}
            <div className="pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
              {children}
            </div>
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
          {/* Mobile header with proper height */}
          <div className="sticky top-0 z-40 bg-card/98 backdrop-blur-md border-b border-border px-4 py-4 md:hidden shadow-md flex items-center justify-between min-h-[60px]">
            <SidebarTrigger className="hover:bg-sidebar-accent transition-all duration-200 rounded-xl" />
            <ThemeToggle />
          </div>
          {/* Content wrapper with padding to prevent overlap */}
          <div className="w-full">
            {children}
          </div>
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
      <SidebarHeader className="border-b border-sidebar-border p-6">
        <Link to="/" className="flex items-center gap-3 transition-all duration-300">
          <div className="p-2.5 rounded-2xl bg-primary/10 shadow-sm">
            <Brain className="w-6 h-6 text-primary flex-shrink-0" />
          </div>
          {!collapsed && (
            <div className="flex flex-col">
              <span className="text-lg font-bold text-sidebar-foreground tracking-tight">NeuraDesk</span>
              <span className="text-xs text-muted-foreground">AI Workspace</span>
            </div>
          )}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-3 py-6">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navItems.map((item) => {
                const active = isActive(item.path);
                return (
                  <SidebarMenuItem key={item.path}>
                    <SidebarMenuButton 
                      asChild 
                      isActive={active} 
                      tooltip={item.label}
                      className={`
                        transition-all duration-200 rounded-xl h-11
                        ${active 
                          ? 'bg-primary/10 text-primary font-medium shadow-sm border border-primary/20' 
                          : 'hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground border border-transparent'
                        }
                      `}
                    >
                      <Link to={item.path} className="flex items-center gap-3 px-4 py-2.5">
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
        <SidebarMenu className="space-y-1.5">
          <SidebarMenuItem>
            <div className="flex items-center justify-center px-2 py-1">
              <ThemeToggle />
            </div>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              tooltip="Settings"
              className="transition-all duration-200 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground h-11"
            >
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Sign Out"
              className="transition-all duration-200 rounded-xl hover:bg-sidebar-accent text-sidebar-foreground/80 hover:text-sidebar-foreground h-11"
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
