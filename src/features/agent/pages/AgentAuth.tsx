import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { AuthTemplate } from "@/components/templates/AuthTemplate";
import { AuthForm, AuthFormData } from "@/components/organisms/AuthForm";

export const AgentAuth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const mode = searchParams.get("mode") === "signup" ? "signup" : "signin";

  const handleSubmit = (data: AuthFormData) => {
    setIsLoading(true);
    // Dummy auth - navigate to dashboard
    setTimeout(() => {
      setIsLoading(false);
      toast.success(mode === "signup" ? "Account created!" : "Welcome back!");
      navigate("/agent/dashboard");
    }, 800);
  };

  const handleUAEPassLogin = () => {
    toast.info("UAE Pass integration coming soon!", {
      description: "Secure government-verified authentication.",
    });
  };

  const handleModeSwitch = () => {
    navigate(mode === "signup" ? "/agent/auth" : "/agent/auth?mode=signup");
  };

  return (
    <AuthTemplate
      title={mode === "signup" ? "Create Agent Account" : "Agent Portal"}
      subtitle={
        mode === "signup"
          ? "Join Dar360 and start managing properties efficiently"
          : "Sign in to manage your properties and contracts"
      }
    >
      <AuthForm
        role="agent"
        mode={mode}
        onSubmit={handleSubmit}
        onUAEPassLogin={handleUAEPassLogin}
        isLoading={isLoading}
        onModeSwitch={handleModeSwitch}
      />
    </AuthTemplate>
  );
};

export default AgentAuth;
