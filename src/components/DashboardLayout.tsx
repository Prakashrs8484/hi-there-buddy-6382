import { ReactNode } from "react";
import { Brain, LayoutDashboard, Target, TrendingUp, Heart, Apple, Clock, Settings, LogOut } from "lucide-react";
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
        <div className="min-h-screen w-full flex">
          <AppSidebar isActive={isActive} />
          <main className="flex-1 w-full overflow-auto relative">
            {/* Floating sidebar trigger */}
            <div className="fixed top-4 left-4 z-50">
              <SidebarTrigger className="bg-background/80 backdrop-blur-sm shadow-lg border border-border hover:bg-background" />
            </div>
            {children}
          </main>
        </div>
      </SidebarProvider>
    );
  }

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen w-full flex">
        <AppSidebar isActive={isActive} />
        <main className="flex-1 w-full overflow-auto">
          <div className="sticky top-0 z-40 bg-background/95 backdrop-blur-sm border-b border-border p-4 md:hidden">
            <SidebarTrigger />
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
    <Sidebar collapsible="offcanvas" className="border-r border-sidebar-border">
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Link to="/" className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-sidebar-primary flex-shrink-0" />
          {!collapsed && <span className="text-xl font-bold text-sidebar-foreground">NeuraDesk</span>}
        </Link>
      </SidebarHeader>

      <SidebarContent className="px-2 py-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.path}>
                  <SidebarMenuButton asChild isActive={isActive(item.path)} tooltip={item.label}>
                    <Link to={item.path} className="flex items-center gap-3">
                      <item.icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip="Settings">
              <Settings className="w-5 h-5" />
              <span>Settings</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild tooltip="Sign Out">
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
];

export default DashboardLayout;
