import { motion } from "framer-motion";
import { Building2, Users, Eye, FileCheck, MessageSquare, Shield } from "lucide-react";

const features = [
  {
    icon: Building2,
    title: "Unified Property Management",
    description: "One dashboard for all your listings, viewings, and contracts. No more juggling spreadsheets and WhatsApp.",
  },
  {
    icon: Eye,
    title: "Owner Transparency",
    description: "Property owners see agent activity in real-time. Every viewing, every inquiry, every effort is visible.",
  },
  {
    icon: FileCheck,
    title: "Digital Contracts",
    description: "Generate RERA-compliant contracts in minutes. Tenants sign via OTP — no office visits required.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Integration",
    description: "Share properties via WhatsApp with trackable links. See who clicked, when, and how often.",
  },
  {
    icon: Users,
    title: "Tenant Self-Service",
    description: "Tenants browse listings, sign contracts digitally, and submit maintenance requests with ease.",
  },
  {
    icon: Shield,
    title: "Built-In Compliance",
    description: "Automated reminders for Ejari and Tawtheeq registration. Never miss a compliance deadline.",
  },
];

export const WhatWeDo = () => {
  return (
    <section id="what-we-do" className="py-24 lg:py-32 bg-background bg-geometric-pattern">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            What We Do
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Transforming UAE Real Estate
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            Sakani connects agents, property owners, and tenants in one transparent ecosystem — 
            replacing fragmented tools with a single source of truth.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="h-full p-8 rounded-2xl bg-card border border-border/50 shadow-soft hover:shadow-medium transition-all duration-300 hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <feature.icon className="w-7 h-7 text-accent" />
                </div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground font-body leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
