import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const comparisons = [
  {
    old: "Excel + WhatsApp + memory",
    new: "2-minute form\nOwner notified",
  },
  {
    old: 'Weekly "any news?" calls',
    new: "They check dashboard",
  },
  {
    old: "Print → Meet → Scan\n(3 days)",
    new: "UAE Pass link\n10 minutes",
  },
  {
    old: "Drive to typing center\n(2 hrs)",
    new: "One click\n24-hour delivery",
  },
];

const stats = [
  { old: "3 days to sign", new: "10 minutes" },
  { old: "5 calls/week", new: "Zero calls" },
  { old: "No proof", new: "Full audit trail" },
];

export const BeforeAfter = () => {
  return (
    <section className="py-24 lg:py-32 bg-background bg-noise">
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

        {/* Comparison table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-card rounded-2xl shadow-medium overflow-hidden border border-border/30">
            {/* Headers */}
            <div className="grid grid-cols-2">
              <div className="p-6 bg-muted/50 border-b border-border/30">
                <h3 className="font-display text-lg font-semibold text-muted-foreground">
                  THE OLD WAY
                </h3>
              </div>
              <div className="p-6 bg-primary border-b border-primary-foreground/10">
                <h3 className="font-display text-lg font-semibold text-primary-foreground">
                  WITH DAR360
                </h3>
              </div>
            </div>

            {/* Comparison rows */}
            {comparisons.map((item, index) => (
              <div key={index} className="grid grid-cols-2">
                <div className="p-5 border-b border-border/30 bg-muted/30">
                  <div className="flex items-start gap-3">
                    <X className="w-5 h-5 text-destructive/60 flex-shrink-0 mt-0.5" />
                    <span className="text-muted-foreground font-body text-sm whitespace-pre-line">
                      {item.old}
                    </span>
                  </div>
                </div>
                <div className="p-5 border-b border-primary-foreground/10 bg-primary">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span className="text-primary-foreground font-body text-sm whitespace-pre-line">
                      {item.new}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {/* Stats row */}
            <div className="grid grid-cols-2">
              <div className="p-6 bg-muted/30">
                <div className="space-y-2">
                  {stats.map((stat, i) => (
                    <p key={i} className="text-muted-foreground font-body text-sm">
                      {stat.old}
                    </p>
                  ))}
                </div>
              </div>
              <div className="p-6 bg-primary">
                <div className="space-y-2">
                  {stats.map((stat, i) => (
                    <p key={i} className="text-accent font-display text-lg font-semibold">
                      {stat.new}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};