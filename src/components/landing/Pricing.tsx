import { motion } from "framer-motion";
import { Check, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const plans = [
  {
    name: "Starter",
    price: "299",
    period: "/mo",
    description: "Perfect for independent agents",
    agents: "Up to 5 agents",
    features: [
      "Owner portal access",
      "WhatsApp sharing with tracking",
      "Basic analytics",
      "Digital contract signing",
      "Email support",
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Professional",
    price: "599",
    period: "/mo",
    description: "For growing agencies",
    agents: "Up to 15 agents",
    features: [
      "Everything in Starter",
      "Priority support",
      "Advanced analytics",
      "Custom branding",
      "Team management",
      "Cheque reminders",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "999",
    period: "/mo",
    description: "For large agencies",
    agents: "Unlimited agents",
    features: [
      "Everything in Professional",
      "Dedicated account manager",
      "API access",
      "Multi-branch support",
      "Custom integrations",
      "SLA guarantee",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

export const Pricing = () => {
  const handlePlanClick = (planName: string) => {
    toast.info(`${planName} plan coming soon!`, {
      description: "We're currently in beta. Join the waitlist!",
    });
  };

  return (
    <section id="pricing" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Pricing
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Simple, Transparent Pricing
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Start free for 14 days. No credit card required.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative p-8 rounded-2xl ${
                plan.popular
                  ? "bg-accent text-accent-foreground shadow-gold scale-105"
                  : "bg-card border border-border/50"
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                    <Zap className="w-3 h-3" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`font-display text-2xl font-semibold mb-2 ${plan.popular ? "" : "text-foreground"}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm mb-4 ${plan.popular ? "opacity-80" : "text-muted-foreground"}`}>
                  {plan.description}
                </p>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-sm">AED</span>
                  <span className="font-display text-4xl font-bold">{plan.price}</span>
                  <span className={`text-sm ${plan.popular ? "opacity-80" : "text-muted-foreground"}`}>{plan.period}</span>
                </div>
                <p className={`text-sm mt-2 ${plan.popular ? "opacity-80" : "text-muted-foreground"}`}>
                  {plan.agents}
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className={`flex items-center gap-2 text-sm font-body ${plan.popular ? "" : "text-muted-foreground"}`}>
                    <Check className={`w-4 h-4 flex-shrink-0 ${plan.popular ? "" : "text-accent"}`} />
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                variant={plan.popular ? "secondary" : "gold"}
                size="lg"
                className="w-full"
                onClick={() => handlePlanClick(plan.name)}
              >
                {plan.cta}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Per-transaction pricing */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="p-6 rounded-2xl bg-muted/50 border border-border/50 text-center">
            <p className="text-muted-foreground font-body">
              <span className="font-semibold text-foreground">+ AED 25</span> per contract signed
              <span className="mx-4 text-border">|</span>
              <span className="font-semibold text-foreground">+ AED 299</span> per Ejari registration
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
