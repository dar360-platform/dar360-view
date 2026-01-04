import { motion } from "framer-motion";
import { Check, ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const features = [
  "Full platform access",
  "Owner portal for each property",
  "WhatsApp tracking",
  "RERA-compliant contracts",
  "Analytics dashboard",
];

export const Pricing = () => {
  const handleStartTrial = () => {
    toast.info("Free trial coming soon!", {
      description: "We're currently in beta. Join the waitlist!",
    });
  };

  const handleContact = () => {
    toast.info("Let's talk!", {
      description: "Our team will reach out shortly.",
    });
  };

  return (
    <section id="pricing" className="section-padding bg-background bg-noise">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider">
            Pricing
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Simple. Honest. Built for agents.
          </h2>
          <p className="text-muted-foreground font-body text-lg">
            No tiers. No confusion.
          </p>
        </motion.div>

        {/* Single Pricing Card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-md mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-large p-8 lg:p-10 border border-border/30">
            {/* Price */}
            <div className="text-center mb-8">
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-muted-foreground font-body text-lg">AED</span>
                <span className="font-display text-5xl lg:text-6xl font-bold text-foreground">199</span>
              </div>
              <p className="text-muted-foreground font-body">/agent/month</p>
              <div className="mt-4 p-3 rounded-lg bg-muted/50">
                <p className="text-foreground font-body font-medium">
                  Minimum 3 agents
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  (AED 597/month to start)
                </p>
              </div>
            </div>

            <div className="border-t border-border/50 my-6" />

            {/* Features */}
            <ul className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <motion.li 
                  key={feature} 
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                  viewport={{ once: true }}
                  className="flex items-center gap-3"
                >
                  <div className="w-5 h-5 rounded-full bg-accent/15 flex items-center justify-center flex-shrink-0">
                    <Check className="w-3 h-3 text-accent" />
                  </div>
                  <span className="text-foreground font-body">{feature}</span>
                </motion.li>
              ))}
            </ul>

            {/* CTA */}
            <Button
              variant="gold"
              size="lg"
              className="w-full rounded-xl text-base"
              onClick={handleStartTrial}
            >
              Start Free Trial
              <ArrowRight className="w-5 h-5" />
            </Button>
            <p className="text-center text-muted-foreground font-body text-sm mt-4">
              14 days free. No card needed.
            </p>

            <div className="border-t border-border/50 my-6" />

            {/* Transaction fees */}
            <div className="space-y-2 text-center mb-6">
              <p className="text-muted-foreground font-body text-sm">
                <span className="text-foreground font-medium">AED 25</span> per contract signed
              </p>
              <p className="text-muted-foreground font-body text-sm">
                <span className="text-foreground font-medium">AED 249</span> per Ejari registration
              </p>
            </div>

            <div className="border-t border-border/50 my-6" />

            {/* Enterprise */}
            <button 
              onClick={handleContact}
              className="flex items-center justify-center gap-2 w-full text-accent font-body font-medium hover:text-accent/80 transition-colors group"
            >
              <MessageCircle className="w-4 h-4" />
              10+ agents? Get agency pricing
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};