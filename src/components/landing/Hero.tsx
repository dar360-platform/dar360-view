import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play, Shield, FileCheck, Clock, Banknote } from "lucide-react";
import heroImage from "@/assets/hero-dubai.jpg";

export const Hero = () => {
  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Dubai Marina Skyline"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/60"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-transparent to-primary/50"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-10 w-96 h-96 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 pt-20">
        <div className="max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground/80 text-sm font-body mb-6">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              Live in Dubai • RERA Verified Agents
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6"
          >
            Prove Your Worth.{" "}
            <span className="text-gradient-gold">Close More Deals.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-foreground/80 font-body leading-relaxed mb-8 max-w-3xl"
          >
            The only UAE rental platform where owners see every viewing, every share, every effort. 
            Sign contracts via UAE Pass. Submit Ejari in one click.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 mb-8"
          >
            <Button
              variant="gold"
              size="xl"
              onClick={() => scrollToSection("#pricing")}
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={() => scrollToSection("#what-we-do")}
            >
              <Play className="w-5 h-5" />
              Watch 2-Min Demo
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="flex flex-wrap gap-3 mb-12"
          >
            {[
              "UAE Pass Integrated",
              "RERA Verified Agents",
              "Ejari Ready",
              "UAE PDPL Compliant",
            ].map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-primary-foreground/70 text-xs font-body"
              >
                <Shield className="w-3 h-3 text-accent" />
                {badge}
              </span>
            ))}
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="pt-8 border-t border-primary-foreground/20"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-2xl">
              {[
                { icon: Shield, value: "UAE Pass", label: "Signatures" },
                { icon: FileCheck, value: "RERA", label: "Verified" },
                { icon: Clock, value: "24hrs", label: "Ejari Delivery" },
                { icon: Banknote, value: "AED 25", label: "Per Contract" },
              ].map((stat) => (
                <div key={stat.label} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/20 flex items-center justify-center">
                    <stat.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div>
                    <div className="font-display text-lg md:text-xl font-semibold text-primary-foreground">
                      {stat.value}
                    </div>
                    <div className="text-xs text-primary-foreground/60 font-body">
                      {stat.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border-2 border-primary-foreground/30 flex items-start justify-center pt-2"
        >
          <div className="w-1.5 h-3 rounded-full bg-primary-foreground/50"></div>
        </motion.div>
      </motion.div>
    </section>
  );
};
