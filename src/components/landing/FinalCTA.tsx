import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { toast } from "sonner";

export const FinalCTA = () => {
  const handleTrial = () => {
    toast.info("Free trial coming soon!", {
      description: "We're currently in beta. Join the waitlist!",
    });
  };

  const handleDemo = () => {
    toast.info("Demo booking coming soon!", {
      description: "Our team will reach out shortly.",
    });
  };

  return (
    <section className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-10 right-20 w-64 h-64 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-10 left-20 w-48 h-48 rounded-full bg-accent/10 blur-3xl"
          animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
            Ready to Prove Your Worth?
          </h2>
          <p className="text-primary-foreground/80 text-xl mb-10 font-body">
            Join 50+ UAE agents who've stopped chasing owners for trust.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
            <Button
              variant="gold"
              size="xl"
              onClick={handleTrial}
            >
              Start 14-Day Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={handleDemo}
            >
              <Calendar className="w-5 h-5" />
              Book a Demo
            </Button>
          </div>

          <p className="text-primary-foreground/60 text-sm font-body">
            No credit card required • Full access to all features
          </p>
        </motion.div>
      </div>
    </section>
  );
};
