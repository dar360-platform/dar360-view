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
    <section className="py-24 lg:py-32 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center max-w-2xl mx-auto"
        >
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground mb-4">
            Ready to stop explaining yourself?
          </h2>
          <p className="text-cream/80 font-body text-lg mb-10">
            Let your dashboard do the talking.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
            <Button
              variant="gold"
              size="xl"
              onClick={handleTrial}
              className="rounded-xl"
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <Button
              variant="hero-outline"
              size="xl"
              onClick={handleDemo}
              className="rounded-xl"
            >
              <Calendar className="w-5 h-5" />
              Book a Demo
            </Button>
          </div>

          <p className="text-cream/50 font-body text-sm">
            14 days free • Set up in 5 minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
};