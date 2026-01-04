import { motion } from "framer-motion";
import uaePass from "@/assets/uae_pass.png";
import rera from "@/assets/rere.png";
import landDept from "@/assets/land_depart.png";
import dubaiGovt from "@/assets/dubai_govt.png";

const trustItems = [
  { name: "UAE Pass", subtitle: "Integrated", logo: uaePass },
  { name: "RERA", subtitle: "Verified", logo: rera },
  { name: "Ejari", subtitle: "Ready", logo: dubaiGovt },
  { name: "Dubai Land Department", subtitle: "Compliant", logo: landDept },
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
              {/* Logo */}
              <div className="w-24 h-24 rounded-xl bg-primary/5 border border-border/50 flex items-center justify-center mb-3 p-3">
                <img src={item.logo} alt={item.name} className="w-full h-full object-contain" />
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