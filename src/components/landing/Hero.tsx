import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import agentScreen from "@/assets/agent_screen.png";

export const Hero = () => {
  const navigate = useNavigate();
  
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary bg-grain">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-forest-light opacity-60 z-0" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-20 lg:py-0">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-4 items-center min-h-[calc(100vh-80px)]">
          {/* Left Side - Text */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider"
            >
              For UAE Rental Agents
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="hero-headline font-display font-semibold text-primary-foreground mb-6"
            >
              Stop Chasing{" "}
              <br className="hidden sm:block" />
              Owners for <span className="text-accent">Trust.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-cream/80 font-body leading-relaxed mb-8"
            >
              Every viewing logged. Every click tracked. 
              Every effort visible. Finally, proof that speaks for itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="flex flex-wrap gap-3 mb-6"
            >
              <Button
                variant="gold"
                size="xl"
                onClick={() => scrollToSection("#pricing")}
                className="rounded-xl"
              >
                Start Free Trial
                <ArrowRight className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="xl"
                onClick={() => navigate("/properties")}
                className="rounded-xl border-accent/50 bg-transparent text-accent hover:bg-accent/10 hover:text-accent"
              >
                <Search className="w-5 h-5" />
                Browse Properties
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-cream/50 text-sm font-body mb-6"
            >
            </motion.p>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-4 text-cream/60 font-body text-sm"
            >
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                UAE Pass Integrated
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                RERA Verified
              </span>
              <span className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                Ejari Ready
              </span>
            </motion.div>
          </div>

          {/* Right Side - Phone Mockup (Desktop) */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center items-center"
          >
            <div className="relative" style={{ transform: "rotate(8deg)" }}>
              {/* Glow effect behind mockup */}
              <div className="absolute -inset-12 bg-accent/15 rounded-[80px] blur-3xl" />

              {/* Phone mockup with float animation and rotation */}
              <motion.img
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={agentScreen}
                alt="Dar360 Agent Dashboard showing property management"
                className="relative w-[300px] xl:w-[340px] 2xl:w-[380px]"
                style={{
                  filter: "drop-shadow(0 30px 60px rgba(0,0,0,0.4))"
                }}
              />
            </div>
          </motion.div>

          {/* Mobile mockup - shown below on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:hidden flex justify-center"
          >
            <img
              src={agentScreen}
              alt="Dar360 Agent Dashboard"
              className="w-[160px] sm:w-[200px]"
              style={{
                transform: "rotate(6deg)",
                filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.35))"
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
