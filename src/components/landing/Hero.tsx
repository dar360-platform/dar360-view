import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
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
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
              Now in Dubai • Coming Soon to MENA
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-semibold text-primary-foreground leading-tight mb-6"
          >
            Every Family Deserves a{" "}
            <span className="text-gradient-gold">Sakani</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-xl md:text-2xl text-primary-foreground/80 font-body leading-relaxed mb-10 max-w-2xl"
          >
            A place to call home, found without stress, managed without chaos. 
            The unified platform connecting agents, owners, and tenants across the UAE.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Button
              variant="gold"
              size="xl"
              onClick={() => scrollToSection("#agent-login")}
            >
              Get Started
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={() => scrollToSection("#what-we-do")}
            >
              <Play className="w-5 h-5" />
              Learn More
            </Button>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-primary-foreground/20"
          >
            <div className="grid grid-cols-3 gap-8 max-w-lg">
              {[
                { value: "100%", label: "Digital Contracts" },
                { value: "Real-time", label: "Owner Visibility" },
                { value: "UAE", label: "Compliance Ready" },
              ].map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl md:text-3xl font-semibold text-accent mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-primary-foreground/60 font-body">
                    {stat.label}
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
