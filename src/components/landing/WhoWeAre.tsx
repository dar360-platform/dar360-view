import { motion } from "framer-motion";
import { Target, Heart, Lightbulb } from "lucide-react";

export const WhoWeAre = () => {
  return (
    <section id="who-we-are" className="py-24 lg:py-32 bg-primary text-primary-foreground relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full opacity-5">
        <svg viewBox="0 0 400 400" className="w-full h-full">
          <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary-foreground/10 text-primary-foreground/80 font-medium text-sm mb-4">
              Who We Are
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
              Every Family Deserves a{" "}
              <span className="text-gradient-gold">Sakani</span>
            </h2>
            <p className="text-primary-foreground/80 text-lg mb-8 font-body leading-relaxed">
              A place to call home, found without stress, managed without chaos. We're on a mission 
              to transform the UAE rental market by creating a unified platform where agents can work 
              efficiently, owners can see their investments being actively managed, and tenants can 
              find homes through a transparent, stress-free process.
            </p>
            <div className="flex flex-wrap gap-4 text-sm font-body">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-primary-foreground/80">Dubai, UAE</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10">
                <div className="w-2 h-2 rounded-full bg-accent"></div>
                <span className="text-primary-foreground/80">Founded 2025</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                icon: Target,
                title: "Our Mission",
                description: "To digitize the entire rental lifecycle, giving every stakeholder visibility, efficiency, and peace of mind.",
              },
              {
                icon: Heart,
                title: "Our Values",
                description: "Transparency first. We believe trust is built through data, not promises. Every action is visible, every effort is tracked.",
              },
              {
                icon: Lightbulb,
                title: "Our Approach",
                description: "Purpose-built for UAE rentals. Not a generic CRM adapted for real estate, but a platform designed from day one for the local market.",
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-5 p-6 rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 hover:bg-primary-foreground/8 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-primary-foreground/70 font-body leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};
