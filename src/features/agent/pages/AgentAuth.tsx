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
    // TODO: Connect to backend auth service
    setTimeout(() => {
      setIsLoading(false);
      toast.info(
        mode === "signup"
          ? "Agent registration coming soon!"
          : "Agent login coming soon!",
        { description: "We're working hard to bring you the best experience." }
      );
    }, 1000);
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
