import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import appMockup from "@/assets/app-mockup.png";

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-forest-light opacity-50" />
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <div className="max-w-xl">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-body text-sm font-medium mb-8 uppercase tracking-wider"
            >
              For UAE Rental Agents
            </motion.span>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-primary-foreground leading-tight mb-6"
            >
              Stop Chasing{" "}
              <br />
              Owners for Trust.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-cream/80 font-body leading-relaxed mb-10"
            >
              Every viewing logged. Every click tracked. 
              Every effort visible. Finally, proof that speaks for itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
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
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.5 }}
              className="text-cream/50 text-sm font-body mt-6"
            >
              14 days free • No credit card • RERA verified
            </motion.p>
          </div>

          {/* Right Side - App Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Glow effect behind mockup */}
              <div className="absolute -inset-4 bg-accent/10 rounded-3xl blur-2xl" />
              
              {/* Mockup image */}
              <img
                src={appMockup}
                alt="Dar360 Dashboard showing activity feed"
                className="relative w-full max-w-lg mx-auto rounded-2xl shadow-large"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-cream/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-cream/50" />
        </motion.div>
      </motion.div>
    </section>
  );
};