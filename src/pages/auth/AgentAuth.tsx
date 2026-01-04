import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Shield, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import logo from "@/assets/logo.png";
import uaePass from "@/assets/uae_pass.png";

export const AgentAuth = () => {
  const [searchParams] = useSearchParams();
  const isSignUp = searchParams.get("mode") === "signup";
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      toast.info(isSignUp ? "Agent registration coming soon!" : "Agent login coming soon!", {
        description: "We're working hard to bring you the best experience.",
      });
    }, 1000);
  };

  const handleUAEPassLogin = () => {
    toast.info("UAE Pass integration coming soon!", {
      description: "Secure government-verified authentication.",
    });
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="p-4 md:p-6">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          <span className="font-body text-sm">Back to Home</span>
        </Link>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <img src={logo} alt="Dar360" className="w-16 h-16 mx-auto mb-4 object-contain" />
            <h1 className="font-display text-2xl md:text-3xl font-semibold text-foreground mb-2">
              {isSignUp ? "Create Agent Account" : "Agent Portal"}
            </h1>
            <p className="text-muted-foreground font-body text-sm md:text-base">
              {isSignUp 
                ? "Join Dar360 and start managing properties efficiently" 
                : "Sign in to manage your properties and contracts"}
            </p>
          </div>

          {/* Auth Card */}
          <div className="bg-card border border-border/50 rounded-2xl p-6 md:p-8 shadow-soft">
            {/* UAE Pass Button */}
            <Button
              type="button"
              variant="outline"
              size="lg"
              className="w-full mb-6 h-14 text-base font-medium border-2 hover:bg-accent/5"
              onClick={handleUAEPassLogin}
            >
              <img src={uaePass} alt="UAE Pass" className="w-20 h-20 mr-3 object-contain" />
              Continue with UAE Pass
            </Button>

            {/* Divider */}
            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/50"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-card px-4 text-muted-foreground font-body">or continue with email</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName" className="text-sm font-medium">First Name</Label>
                      <Input id="firstName" placeholder="Ahmed" className="h-12" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName" className="text-sm font-medium">Last Name</Label>
                      <Input id="lastName" placeholder="Khan" className="h-12" required />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="reraBrokerId" className="text-sm font-medium">RERA Broker ID</Label>
                    <Input id="reraBrokerId" placeholder="BRN-XXXXX" className="h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="agencyName" className="text-sm font-medium">Agency Name</Label>
                    <Input id="agencyName" placeholder="Your Real Estate Agency" className="h-12" required />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">Email Address</Label>
                <Input id="email" type="email" placeholder="agent@example.com" className="h-12" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">Password</Label>
                <div className="relative">
                  <Input 
                    id="password" 
                    type={showPassword ? "text" : "password"} 
                    placeholder="••••••••" 
                    className="h-12 pr-12" 
                    required 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm font-medium">Phone (WhatsApp)</Label>
                  <Input id="phone" type="tel" placeholder="+971 50 XXX XXXX" className="h-12" required />
                </div>
              )}

              <Button
                type="submit"
                variant="gold"
                size="lg"
                className="w-full h-14 text-base font-semibold mt-6"
                disabled={isLoading}
              >
                {isLoading ? "Please wait..." : isSignUp ? "Create Account" : "Sign In"}
              </Button>
            </form>

            {/* Footer Links */}
            <div className="mt-6 text-center">
              {isSignUp ? (
                <p className="text-sm text-muted-foreground font-body">
                  Already have an account?{" "}
                  <Link to="/agent/auth" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    Sign In
                  </Link>
                </p>
              ) : (
                <p className="text-sm text-muted-foreground font-body">
                  New to Dar360?{" "}
                  <Link to="/agent/auth?mode=signup" className="text-accent hover:text-accent/80 font-medium transition-colors">
                    Create Account
                  </Link>
                </p>
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-6 flex justify-center gap-4 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              RERA Verified
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-medium">
              <Shield className="w-3.5 h-3.5" />
              UAE Pass Integrated
            </span>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default AgentAuth;
