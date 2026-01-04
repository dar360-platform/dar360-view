import { motion } from "framer-motion";

const trustItems = [
  { name: "UAE Pass", subtitle: "Integrated" },
  { name: "RERA", subtitle: "Verified" },
  { name: "Ejari", subtitle: "Ready" },
  { name: "Dubai Land Dept", subtitle: "Compliant" },
];

export const TrustIntegrations = () => {
  return (
    <section className="py-16 lg:py-20 bg-cream-dark">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h3 className="font-display text-xl lg:text-2xl font-semibold text-foreground">
            Built for UAE Compliance
          </h3>
        </motion.div>

        {/* Trust badges in a row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center items-center gap-8 lg:gap-16"
        >
          {trustItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.15 + index * 0.08 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center"
            >
              {/* Placeholder for logo - using styled text badge */}
              <div className="w-14 h-14 rounded-xl bg-primary/5 border border-border/50 flex items-center justify-center mb-3">
                <span className="font-display text-lg font-semibold text-primary">
                  {item.name.charAt(0)}
                </span>
              </div>
              <p className="font-body text-sm font-medium text-foreground">
                {item.name}
              </p>
              <p className="font-body text-xs text-muted-foreground">
                {item.subtitle}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};