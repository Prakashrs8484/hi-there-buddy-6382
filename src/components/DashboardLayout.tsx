import { ReactNode } from "react";
import { Brain, LayoutDashboard, Target, TrendingUp, Heart, Apple, Clock, Settings, LogOut } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

interface DashboardLayoutProps {
  children: ReactNode;
  hideNavigation?: boolean;
}

const DashboardLayout = ({ children, hideNavigation = false }: DashboardLayoutProps) => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`w-64 bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 ${
        hideNavigation ? 'hidden' : 'block'
      }`}>
        <div className="p-6 border-b border-sidebar-border">
          <Link to="/" className="flex items-center gap-2">
            <Brain className="w-8 h-8 text-sidebar-primary" />
            <span className="text-xl font-bold text-sidebar-foreground">NeuraDesk</span>
          </Link>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <button
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive(item.path)
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </button>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border space-y-2">
          <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </button>
          <Link to="/auth">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <LogOut className="w-5 h-5" />
              <span>Sign Out</span>
            </button>
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
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
