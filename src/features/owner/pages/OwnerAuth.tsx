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

  const handleSubmit = (data: AuthFormData) => {
    setIsLoading(true);
    // TODO: Connect to backend auth service
    setTimeout(() => {
      setIsLoading(false);
      toast.info(
        mode === "signup"
          ? "Owner registration coming soon!"
          : "Owner login coming soon!",
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
    navigate(mode === "signup" ? "/owner/auth" : "/owner/auth?mode=signup");
  };

  return (
    <AuthTemplate
      title={mode === "signup" ? "Create Owner Account" : "Owner Portal"}
      subtitle={
        mode === "signup"
          ? "Track your property's performance in real-time"
          : "Sign in to view your property activity"
      }
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
