import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { AuthForm, AuthFormData } from "@/components/organisms/AuthForm";

export const OwnerAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";
  const returnTo = searchParams.get("returnTo") ?? "/auth";

  const handleSubmit = (data: AuthFormData) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (mode === "signup") {
        toast.success("Account created! Please sign in to continue.", {
          description: "Redirecting to sign in page...",
        });
        const returnToParam = searchParams.get("returnTo");
        const qs = returnToParam ? `?returnTo=${returnToParam}` : "";
        navigate(`/owner/auth${qs}`);
      } else {
        toast.success("Welcome back!");
        navigate("/owner/dashboard");
      }
    }, 800);
  };

  const handleUAEPassLogin = () => {
    toast.info("UAE Pass integration coming soon!", {
      description: "Secure government-verified authentication.",
    });
  };

  const handleModeSwitch = () => {
    const params = new URLSearchParams();
    const nextMode = mode === "signup" ? "signin" : "signup";

    if (nextMode === "signup") params.set("mode", "signup");

    const returnToParam = searchParams.get("returnTo");
    if (returnToParam) params.set("returnTo", returnToParam);

    const qs = params.toString();
    navigate(`/owner/auth${qs ? `?${qs}` : ""}`);
  };

  return (
    <AuthTemplate
      title={mode === "signup" ? "Create Owner Account" : "Owner Portal"}
      subtitle={
        mode === "signup"
          ? "Track your property's performance in real-time"
          : "Sign in to view your property activity"
      }
      backTo={returnTo}
    >
      <AuthForm
        role="owner"
        mode={mode}
        onSubmit={handleSubmit}
        onUAEPassLogin={handleUAEPassLogin}
        isLoading={isLoading}
        onModeSwitch={handleModeSwitch}
      />
    </AuthTemplate>
  );
};

export default OwnerAuth;
