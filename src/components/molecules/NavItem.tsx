import { Link, useLocation } from "react-router-dom";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItemProps {
  to: string;
  label: string;
  icon?: LucideIcon;
  onClick?: () => void;
}

export const NavItem = ({ to, label, icon: IconComponent, onClick }: NavItemProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors",
        isActive
          ? "bg-accent/10 text-accent"
          : "text-muted-foreground hover:text-foreground hover:bg-secondary"
      )}
    >
      {IconComponent && <IconComponent className="w-4 h-4" />}
      {label}
    </Link>
  );
};
