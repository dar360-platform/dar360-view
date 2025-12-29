import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Building2, Users, Home, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const loginOptions = [
  {
    id: "agent",
    icon: Building2,
    title: "Agent Portal",
    description: "Manage properties, viewings, and contracts",
    color: "bg-accent",
    textColor: "text-accent-foreground",
  },
  {
    id: "owner",
    icon: Users,
    title: "Owner Portal",
    description: "Track your properties and agent activity",
    color: "bg-primary",
    textColor: "text-primary-foreground",
  },
  {
    id: "tenant",
    icon: Home,
    title: "Tenant Portal",
    description: "View contracts, payments, and maintenance",
    color: "bg-secondary",
    textColor: "text-secondary-foreground",
  },
];

export const AgentLogin = () => {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null);

  const handlePortalClick = (portalId: string, portalTitle: string) => {
    toast.info(`${portalTitle} coming soon!`, {
      description: "We're working hard to bring you the best experience.",
    });
  };

  return (
    <section id="login" className="py-16 md:py-24 lg:py-32 bg-background bg-geometric-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10 md:mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Get Started
          </span>
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-4">
            Choose Your Portal
          </h2>
          <p className="text-muted-foreground font-body text-base md:text-lg max-w-2xl mx-auto">
            Access the Dar360 platform based on your role. One ecosystem, tailored experiences.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
          {loginOptions.map((option, index) => (
            <motion.div
              key={option.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredOption(option.id)}
              onMouseLeave={() => setHoveredOption(null)}
              className="relative"
            >
              <button
                onClick={() => handlePortalClick(option.id, option.title)}
                className={`w-full p-6 md:p-8 rounded-2xl border border-border/50 bg-card hover:border-accent/50 transition-all duration-300 text-left group ${
                  hoveredOption === option.id ? "shadow-gold scale-[1.02]" : "shadow-soft"
                }`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 md:w-14 md:h-14 rounded-xl ${option.color} mb-4 md:mb-6 transition-transform duration-300 group-hover:scale-110`}
                >
                  <option.icon className={`w-6 h-6 md:w-7 md:h-7 ${option.textColor}`} />
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground mb-2">
                  {option.title}
                </h3>
                <p className="text-muted-foreground font-body text-sm md:text-base mb-4 md:mb-6">
                  {option.description}
                </p>
                <div className="flex items-center gap-2 text-accent font-medium text-sm md:text-base">
                  <span>Sign In</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </button>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8 md:mt-12"
        >
          <p className="text-muted-foreground font-body text-sm md:text-base">
            New to Dar360?{" "}
            <button
              onClick={() => toast.info("Registration coming soon!")}
              className="text-accent hover:text-accent/80 font-medium transition-colors"
            >
              Start your 14-day free trial
            </button>
          </p>
        </motion.div>
      </div>
    </section>
  );
};
