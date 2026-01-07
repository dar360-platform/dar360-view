import { ReactNode, InputHTMLAttributes, forwardRef } from "react";
import { Input } from "@/components/atoms/Input";
import { Text } from "@/components/atoms/Text";
import { cn } from "@/lib/utils";

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  hint?: string;
  icon?: ReactNode;
  rightElement?: ReactNode;
}

export const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  ({ label, error, hint, icon, rightElement, className, id, ...props }, ref) => {
    const fieldId = id || label.toLowerCase().replace(/\s+/g, "-");

    return (
      <div className={cn("space-y-2", className)}>
        <Text as="label" variant="label" htmlFor={fieldId}>
          {label}
        </Text>
        <div className="relative">
          {icon && (
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">
              {icon}
            </div>
          )}
          <Input
            ref={ref}
            id={fieldId}
            error={error}
            className={cn(icon && "pl-12", rightElement && "pr-12")}
            {...props}
          />
          {rightElement && (
            <div className="absolute right-4 top-1/2 -translate-y-1/2">
              {rightElement}
            </div>
          )}
        </div>
        {hint && !error && (
          <Text variant="caption" color="muted">
            {hint}
          </Text>
        )}
      </div>
    );
  }
);

FormField.displayName = "FormField";
