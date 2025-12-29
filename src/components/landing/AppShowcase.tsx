import { motion } from "framer-motion";
import { Check } from "lucide-react";
import appMockup from "@/assets/app-mockup.png";

const agentFeatures = [
  "Property inventory management",
  "Viewing scheduler & tracking",
  "RERA-compliant contract generation",
  "UAE Pass + OTP signing",
  "WhatsApp sharing with analytics",
  "One-click Ejari submission",
  "RERA-verified agent badge",
  "Commission tracking",
];

const ownerFeatures = [
  "Real-time property dashboard",
  "Agent activity reports",
  "Viewing history visibility",
  "Cheque schedule & reminders",
  "Maintenance request visibility",
  "Income dashboard",
  "Ejari certificate storage",
  "Secure document vault",
];

const tenantFeatures = [
  "Verified property listings",
  "UAE Pass / OTP contract signing",
  "Online rent payments",
  "Maintenance requests",
  "Photo documentation",
  "Status tracking",
];

export const AppShowcase = () => {
  return (
    <section id="app" className="py-24 lg:py-32 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            The App
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            One Platform, Three Perspectives
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Whether you're an agent closing deals, an owner tracking investments, or a tenant finding 
            your next home — Dar360 is built for you.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative mx-auto max-w-sm lg:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-accent/5 rounded-3xl blur-3xl"></div>
              <motion.img
                src={appMockup}
                alt="Dar360 App Interface"
                className="relative w-full h-auto drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Agent Features */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <span className="text-xl">🔵</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">For Agents</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {agentFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Owner Features */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <span className="text-xl">🟣</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">For Owners</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {ownerFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tenant Features */}
            <div className="p-6 rounded-2xl bg-card border border-border/50 shadow-soft">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span className="text-xl">🟢</span>
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground">For Tenants</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {tenantFeatures.map((feature) => (
                  <div key={feature} className="flex items-center gap-2 text-sm text-muted-foreground font-body">
                    <Check className="w-4 h-4 text-accent flex-shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
