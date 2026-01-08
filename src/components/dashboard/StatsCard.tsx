import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    positive: boolean;
  };
  variant?: "default" | "accent" | "success" | "warning";
  className?: string;
}

const variantStyles = {
  default: "bg-card border-border/50",
  accent: "bg-accent/10 border-accent/20",
  success: "bg-emerald-500/10 border-emerald-500/20",
  warning: "bg-amber-500/10 border-amber-500/20",
};

const iconStyles = {
  default: "bg-muted text-muted-foreground",
  accent: "bg-accent/20 text-accent",
  success: "bg-emerald-500/20 text-emerald-600",
  warning: "bg-amber-500/20 text-amber-600",
};

export const StatsCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = "default",
  className,
}: StatsCardProps) => {
  return (
    <div
      className={cn(
        "rounded-xl border p-5 transition-all duration-200 hover:shadow-soft",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground font-body">
            {title}
          </p>
          <p className="text-2xl font-semibold font-display">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground font-body">{subtitle}</p>
          )}
          {trend && (
            <p
              className={cn(
                "text-xs font-medium font-body",
                trend.positive ? "text-emerald-600" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {Math.abs(trend.value)}%{" "}
              <span className="text-muted-foreground">vs last month</span>
            </p>
          )}
        </div>
        <div className={cn("p-2.5 rounded-lg", iconStyles[variant])}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
};