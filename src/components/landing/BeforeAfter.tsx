import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    old: "Excel + WhatsApp + memory",
    new: "2-minute form, Owner notified",
  },
  {
    old: 'Weekly "any news?" calls',
    new: "They check dashboard",
  },
  {
    old: "Print → Meet → Scan (3 days)",
    new: "UAE Pass link, 10 minutes",
  },
  {
    old: "Drive to typing center (2 hrs)",
    new: "One click, 24-hour delivery",
  },
];

const stats = [
  { old: "3 days to sign", new: "10 minutes" },
  { old: "5 calls/week", new: "Zero calls" },
  { old: "No proof", new: "Full audit trail" },
];

export const BeforeAfter = () => {
  return (
    <section className="section-padding bg-background bg-noise">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider">
            The Difference
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            Same work. Different life.
          </h2>
        </motion.div>

        {/* Two Cards Side by Side */}
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* THE OLD WAY - Painful, desaturated */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-muted/60 rounded-2xl p-6 lg:p-8 border border-border/50 h-full"
              style={{ 
                background: "linear-gradient(135deg, hsl(0 5% 94%), hsl(0 3% 91%))" 
              }}
            >
              <h3 className="font-display text-xl font-semibold text-muted-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-destructive/10 flex items-center justify-center">
                  <X className="w-4 h-4 text-destructive/60" />
                </span>
                THE OLD WAY
              </h3>
              
              <ul className="space-y-4 mb-8">
                {comparisons.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <X className="w-5 h-5 text-destructive/50 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body">
                      {item.old}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats - Old */}
              <div className="border-t border-border/50 pt-6 space-y-2">
                {stats.map((stat, i) => (
                  <p key={i} className="text-muted-foreground font-body text-sm">
                    {stat.old}
                  </p>
                ))}
              </div>
            </div>
          </motion.div>

          {/* WITH DAR360 - Clean, vibrant */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="bg-primary rounded-2xl p-6 lg:p-8 border border-primary-foreground/10 h-full shadow-large">
              <h3 className="font-display text-xl font-semibold text-primary-foreground mb-6 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                  <Check className="w-4 h-4 text-accent" />
                </span>
                WITH DAR360
              </h3>
              
              <ul className="space-y-4 mb-8">
                {comparisons.map((item, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-start gap-3"
                  >
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground font-body">
                      {item.new}
                    </span>
                  </motion.li>
                ))}
              </ul>

              {/* Stats - New (LARGE and prominent) */}
              <div className="border-t border-primary-foreground/10 pt-6 space-y-2">
                {stats.map((stat, i) => (
                  <motion.p 
                    key={i} 
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
                    viewport={{ once: true }}
                    className="text-accent font-display text-xl lg:text-2xl font-semibold"
                  >
                    {stat.new}
                  </motion.p>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};