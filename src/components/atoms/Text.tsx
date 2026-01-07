import { ElementType, ComponentPropsWithoutRef } from "react";
import { cn } from "@/lib/utils";

interface TextOwnProps<T extends ElementType = "span"> {
  as?: T;
  variant?: "display" | "h1" | "h2" | "h3" | "h4" | "body" | "small" | "label" | "caption";
  color?: "default" | "muted" | "accent" | "light";
}

type TextProps<T extends ElementType> = TextOwnProps<T> &
  Omit<ComponentPropsWithoutRef<T>, keyof TextOwnProps<T>>;

const variantStyles = {
  display: "font-display text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight",
  h1: "font-display text-3xl md:text-4xl font-bold tracking-tight",
  h2: "font-display text-2xl md:text-3xl font-semibold",
  h3: "font-display text-xl md:text-2xl font-semibold",
  h4: "font-display text-lg md:text-xl font-medium",
  body: "font-body text-base leading-relaxed",
  small: "font-body text-sm leading-relaxed",
  label: "font-body text-sm font-medium",
  caption: "font-body text-xs",
};

const colorStyles = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  accent: "text-accent",
  light: "text-cream",
};

const defaultElements: Record<string, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  body: "p",
  small: "p",
  label: "label",
  caption: "span",
};

export const Text = <T extends ElementType = "span">({
  as,
  variant = "body",
  color = "default",
  className,
  children,
  ...props
}: TextProps<T>) => {
  const Component = as || defaultElements[variant] || "span";
  
  return (
    <Component
      className={cn(variantStyles[variant], colorStyles[color], className)}
      {...props}
    >
      {children}
    </Component>
  );
};
