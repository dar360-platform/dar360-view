import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRight, Building2, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

export const AgentLogin = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    toast.info("Agent login coming soon!", {
      description: "The agent portal is currently under development.",
    });
    
    setIsLoading(false);
  };

  return (
    <section id="agent-login" className="py-24 lg:py-32 bg-muted/50 bg-geometric-pattern">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary mb-6">
              <Building2 className="w-8 h-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-3xl lg:text-4xl font-semibold text-foreground mb-3">
              Agent Portal
            </h2>
            <p className="text-muted-foreground font-body">
              Access your dashboard to manage properties, viewings, and contracts.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-card border border-border/50 shadow-medium">
              <div className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground font-body">
                    Email Address
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="agent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-11 h-12 bg-background border-border/50 focus:border-accent font-body"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground font-body">
                      Password
                    </Label>
                    <button
                      type="button"
                      className="text-sm text-accent hover:text-accent/80 font-body transition-colors"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="pl-11 pr-11 h-12 bg-background border-border/50 focus:border-accent font-body"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <AnimatePresence mode="wait">
                        {showPassword ? (
                          <motion.div
                            key="hide"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <EyeOff className="w-5 h-5" />
                          </motion.div>
                        ) : (
                          <motion.div
                            key="show"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                          >
                            <Eye className="w-5 h-5" />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </button>
                  </div>
                </div>

                <Button
                  type="submit"
                  variant="gold"
                  size="lg"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full"
                    />
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </Button>
              </div>

              <div className="mt-6 pt-6 border-t border-border/50 text-center">
                <p className="text-sm text-muted-foreground font-body">
                  New to Sakani?{" "}
                  <button
                    type="button"
                    className="text-accent hover:text-accent/80 font-medium transition-colors"
                    onClick={() => toast.info("Registration coming soon!")}
                  >
                    Request agent access
                  </button>
                </p>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
