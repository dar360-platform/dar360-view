import { motion } from "framer-motion";
import { Shield, Eye, FileCheck, MessageSquare, FileText, Wallet } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "RERA-Verified Agent Profiles",
    description: "Display your RERA badge. Build instant credibility with property owners looking for trusted agents.",
  },
  {
    icon: Eye,
    title: "Real-Time Owner Visibility",
    description: "Owners see every viewing, every WhatsApp click, every effort — no more weekly update calls.",
  },
  {
    icon: FileCheck,
    title: "UAE Pass Digital Signing",
    description: "Generate RERA contracts in minutes. Tenants sign via UAE Pass or OTP — legally valid, no office visits.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Sharing + Analytics",
    description: "Share listings with trackable links. See who clicked, when, and how often. Prove your marketing efforts.",
  },
  {
    icon: FileText,
    title: "One-Click Ejari Submission",
    description: "Submit signed contracts for Ejari registration directly. Certificate delivered in 24 hours.",
  },
  {
    icon: Wallet,
    title: "Cheque Schedule & Reminders",
    description: "Track cheque deposits, send automatic reminders. Owners see payment status in real-time.",
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
            Everything Agents Need to Prove Their Value
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            One platform to list, share, sign, and submit — with full transparency for owners.
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
