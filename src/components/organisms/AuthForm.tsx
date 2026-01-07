import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/atoms/Button";
import { FormField } from "@/components/molecules/FormField";
import { SocialButton } from "@/components/molecules/SocialButton";
import { Text } from "@/components/atoms/Text";
import uaePass from "@/assets/uae_pass.png";

export type UserRole = "agent" | "owner" | "tenant";

interface AuthFormProps {
  role: UserRole;
  mode: "signin" | "signup";
  onSubmit: (data: AuthFormData) => void;
  onUAEPassLogin: () => void;
  isLoading?: boolean;
  onModeSwitch: () => void;
}

export interface AuthFormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  // Role-specific
  reraBrokerId?: string; // Agent
  agencyName?: string; // Agent
  emiratesId?: string; // Owner/Tenant
}

const roleLabels: Record<UserRole, string> = {
  agent: "Agent",
  owner: "Owner",
  tenant: "Tenant",
};

const signupFields: Record<UserRole, string[]> = {
  agent: ["firstName", "lastName", "reraBrokerId", "agencyName", "phone"],
  owner: ["firstName", "lastName", "emiratesId", "phone"],
  tenant: ["firstName", "lastName", "emiratesId", "phone"],
};

export const AuthForm = ({
  role,
  mode,
  onSubmit,
  onUAEPassLogin,
  isLoading,
  onModeSwitch,
}: AuthFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phone: "",
    reraBrokerId: "",
    agencyName: "",
    emiratesId: "",
  });

  const isSignUp = mode === "signup";
  const fields = signupFields[role];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const updateField = (field: keyof AuthFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-soft">
        {/* UAE Pass */}
        <SocialButton
          icon={uaePass}
          label="Continue with UAE Pass"
          variant="uaepass"
          onClick={onUAEPassLogin}
          className="mb-6"
        />

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border/50" />
          </div>
          <div className="relative flex justify-center">
            <Text variant="caption" color="muted" className="bg-card px-4">
              or continue with email
            </Text>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <>
              {fields.includes("firstName") && (
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    label="First Name"
                    placeholder="Ahmed"
                    value={formData.firstName}
                    onChange={(e) => updateField("firstName", e.target.value)}
                    required
                  />
                  <FormField
                    label="Last Name"
                    placeholder="Khan"
                    value={formData.lastName}
                    onChange={(e) => updateField("lastName", e.target.value)}
                    required
                  />
                </div>
              )}

              {fields.includes("reraBrokerId") && (
                <FormField
                  label="RERA Broker ID"
                  placeholder="BRN-XXXXX"
                  value={formData.reraBrokerId}
                  onChange={(e) => updateField("reraBrokerId", e.target.value)}
                  required
                />
              )}

              {fields.includes("agencyName") && (
                <FormField
                  label="Agency Name"
                  placeholder="Your Real Estate Agency"
                  value={formData.agencyName}
                  onChange={(e) => updateField("agencyName", e.target.value)}
                  required
                />
              )}

              {fields.includes("emiratesId") && (
                <FormField
                  label="Emirates ID"
                  placeholder="784-XXXX-XXXXXXX-X"
                  value={formData.emiratesId}
                  onChange={(e) => updateField("emiratesId", e.target.value)}
                  required
                />
              )}
            </>
          )}

          <FormField
            label="Email Address"
            type="email"
            placeholder={`${role}@example.com`}
            value={formData.email}
            onChange={(e) => updateField("email", e.target.value)}
            required
          />

          <FormField
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={formData.password}
            onChange={(e) => updateField("password", e.target.value)}
            required
            rightElement={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            }
          />

          {isSignUp && fields.includes("phone") && (
            <FormField
              label="Phone (WhatsApp)"
              type="tel"
              placeholder="+971 50 XXX XXXX"
              value={formData.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              required
            />
          )}

          <Button
            type="submit"
            variant="gold"
            size="lg"
            className="w-full mt-6"
            loading={isLoading}
          >
            {isSignUp ? "Create Account" : "Sign In"}
          </Button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <Text variant="small" color="muted">
            {isSignUp ? "Already have an account? " : `New ${roleLabels[role]}? `}
            <button
              type="button"
              onClick={onModeSwitch}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              {isSignUp ? "Sign In" : "Create Account"}
            </button>
          </Text>
        </div>
      </div>
    </div>
  );
};
