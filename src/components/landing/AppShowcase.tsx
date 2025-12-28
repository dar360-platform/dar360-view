import { motion } from "framer-motion";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import appMockup from "@/assets/app-mockup.png";

const agentFeatures = [
  "Property inventory management",
  "Viewing scheduler & tracking",
  "Digital contract generation",
  "OTP-based e-signatures",
  "WhatsApp sharing with analytics",
  "Commission tracking",
];

const ownerFeatures = [
  "Real-time property dashboard",
  "Agent activity reports",
  "Viewing history visibility",
  "Rent collection tracking",
  "Maintenance request visibility",
  "Secure document vault",
];

const tenantFeatures = [
  "Verified property listings",
  "Digital contract signing",
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
            your next home — Sakani is built for you.
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
                alt="Sakani App Interface"
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

        {/* Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
            Why Sakani?
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                label: "Today's Reality",
                items: ["WhatsApp chaos", "Excel spreadsheets", "Paper contracts", "No visibility"],
                highlight: false,
              },
              {
                label: "With Sakani",
                items: ["One dashboard", "Digital contracts", "Real-time tracking", "Full transparency"],
                highlight: true,
              },
              {
                label: "The Result",
                items: ["Close faster", "Build trust", "Reduce admin", "Scale easily"],
                highlight: false,
              },
            ].map((column) => (
              <div
                key={column.label}
                className={`p-6 rounded-2xl ${
                  column.highlight
                    ? "bg-accent text-accent-foreground shadow-gold"
                    : "bg-card border border-border/50"
                }`}
              >
                <h4 className={`font-display text-lg font-semibold mb-4 ${column.highlight ? "" : "text-foreground"}`}>
                  {column.label}
                </h4>
                <ul className="space-y-3">
                  {column.items.map((item) => (
                    <li key={item} className={`flex items-center gap-2 text-sm font-body ${column.highlight ? "" : "text-muted-foreground"}`}>
                      {column.highlight ? (
                        <Check className="w-4 h-4" />
                      ) : (
                        <ArrowRight className="w-4 h-4" />
                      )}
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
