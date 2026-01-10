import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  Calendar,
  FileText,
  Settings,
  LogOut,
  Menu,
  X,
  Plus,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";

type Tab = "overview" | "properties" | "viewings" | "contracts" | "settings";

interface AgentSidebarProps {
  activeTab: Tab;
  onTabChange: (tab: Tab) => void;
}

const navItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "properties", label: "Properties", icon: Building2 },
  { id: "viewings", label: "Viewings", icon: Calendar },
  { id: "contracts", label: "Contracts", icon: FileText },
  { id: "settings", label: "Settings", icon: Settings },
];

const NavContent = ({
  activeTab,
  onTabChange,
  onClose,
}: AgentSidebarProps & { onClose?: () => void }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="h-full flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-border/50">
        <Link to="/agent/dashboard" className="flex items-center gap-2">
          <img src={logo} alt="Dar360" className="w-8 h-8 object-contain" />
          <span className="font-display text-xl font-semibold">Dar360</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => {
                onTabChange(item.id);
                onClose?.();
              }}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all",
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon className="w-5 h-5" />
              {item.label}
              {isActive && (
                <ChevronRight className="w-4 h-4 ml-auto" />
              )}
            </button>
          );
        })}
      </nav>

      {/* Quick Actions */}
      <div className="p-3 border-t border-border/50">
        <p className="text-xs text-muted-foreground px-3 mb-2 uppercase tracking-wider">
          Quick Actions
        </p>
        <button
          onClick={() => {
            onTabChange("properties");
            onClose?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Plus className="w-4 h-4" />
          Add Property
        </button>
        <button
          onClick={() => {
            onTabChange("viewings");
            onClose?.();
          }}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
        >
          <Calendar className="w-4 h-4" />
          Schedule Viewing
        </button>
      </div>

      {/* User */}
      <div className="p-3 border-t border-border/50">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-accent">AK</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Ahmed Khan</p>
            <p className="text-xs text-muted-foreground truncate">
              ABC Real Estate
            </p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign Out
        </button>
      </div>
    </div>
  );
};

export const AgentSidebar = ({ activeTab, onTabChange }: AgentSidebarProps) => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-64 border-r border-border/50 bg-card">
        <NavContent activeTab={activeTab} onTabChange={onTabChange} />
      </aside>

      {/* Mobile Header & Drawer */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-card border-b border-border/50">
        <div className="flex items-center justify-between px-4 h-14">
          <Link to="/agent/dashboard" className="flex items-center gap-2">
            <img src={logo} alt="Dar360" className="w-7 h-7 object-contain" />
            <span className="font-display text-lg font-semibold">Dar360</span>
          </Link>
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="p-0 w-72">
              <NavContent
                activeTab={activeTab}
                onTabChange={onTabChange}
                onClose={() => setMobileOpen(false)}
              />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </>
  );
};