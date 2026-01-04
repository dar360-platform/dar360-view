import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import phoneMockup from "@/assets/phone-mockup.png";

export const Hero = () => {
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
      <div className="container mx-auto px-4 relative z-10 pt-24 pb-32 lg:pt-32 lg:pb-40">
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 lg:gap-8 items-center">
          {/* Left Side - Text (60%) */}
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
              className="text-lg sm:text-xl text-cream/80 font-body leading-relaxed mb-10"
            >
              Every viewing logged. Every click tracked. 
              Every effort visible. Finally, proof that speaks for itself.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
              className="mb-8"
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
              className="text-cream/50 text-sm font-body mb-8"
            >
              14 days free • No credit card • RERA verified
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

          {/* Right Side - Phone Mockup (40%) */}
          <motion.div
            initial={{ opacity: 0, x: 60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            className="relative hidden lg:flex justify-center lg:justify-end"
          >
            <div className="relative">
              {/* Glow effect behind mockup */}
              <div className="absolute -inset-8 bg-accent/10 rounded-[60px] blur-3xl" />
              
              {/* Phone mockup with float animation */}
              <motion.img
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                src={phoneMockup}
                alt="Dar360 Agent Dashboard showing property management"
                className="relative w-[280px] xl:w-[340px] drop-shadow-2xl"
                style={{ 
                  transform: "rotate(3deg)",
                  filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.3))"
                }}
              />
            </div>
          </motion.div>

          {/* Mobile mockup - shown below on mobile/tablet */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="lg:hidden flex justify-center mt-8"
          >
            <img
              src={phoneMockup}
              alt="Dar360 Agent Dashboard"
              className="w-[240px] sm:w-[280px] drop-shadow-2xl"
              style={{ filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25))" }}
            />
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
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