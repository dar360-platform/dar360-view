import { ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SocialButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: string;
  label: string;
  variant?: "default" | "uaepass";
}

export const SocialButton = ({
  icon,
  label,
  variant = "default",
  className,
  ...props
}: SocialButtonProps) => {
  return (
    <button
      className={cn(
        "w-full flex items-center justify-center gap-3 h-14 rounded-xl border-2 text-base font-medium transition-all",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        variant === "uaepass"
          ? "border-[#00A884] hover:bg-[#00A884]/5"
          : "border-border hover:bg-secondary",
        className
      )}
      {...props}
    >
      <img src={icon} alt="" className="w-20 h-8 object-contain" />
      {label}
    </button>
  );
};
