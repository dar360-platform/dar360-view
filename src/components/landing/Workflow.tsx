import { motion } from "framer-motion";
import { Upload, Eye, FileSignature, Send } from "lucide-react";

const steps = [
  {
    number: 1,
    title: "LIST & SHARE",
    time: "2 min",
    icon: Upload,
    bullets: [
      "Add property with photos",
      "Owner notified instantly",
      "Trackable WhatsApp link",
    ],
    size: "large",
  },
  {
    number: 2,
    title: "TRACK",
    time: "Real-time",
    icon: Eye,
    bullets: [
      "Every click tracked",
      "Viewing outcomes logged",
      "Owner sees activity live",
    ],
    size: "small",
  },
  {
    number: 3,
    title: "SIGN",
    time: "10 min",
    icon: FileSignature,
    bullets: [
      "RERA-compliant contract",
      "UAE Pass or OTP",
      "No printing, no meeting",
    ],
    size: "large",
  },
  {
    number: 4,
    title: "SUBMIT",
    time: "1 click",
    icon: Send,
    bullets: [
      "Submit from dashboard",
      "Cert in 24 hours",
      "No typing center",
    ],
    size: "small",
  },
];

export const Workflow = () => {
  return (
    <section id="how-it-works" className="section-padding bg-primary bg-grain">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/20 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-primary-foreground">
            List it. Track it. Sign it. Done.
          </h2>
        </motion.div>

        {/* Bento Grid Layout */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5 mb-16 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative group ${
                step.size === "large" ? "lg:row-span-1" : "lg:row-span-1"
              }`}
            >
              <div className={`
                relative h-full bg-primary-foreground/5 rounded-2xl p-6 
                border border-primary-foreground/10 
                transition-all duration-300 
                hover:-translate-y-1 hover:shadow-lg hover:bg-primary-foreground/8
                ${step.size === "large" ? "lg:min-h-[280px]" : "lg:min-h-[280px]"}
              `}>
                {/* Step number badge */}
                <div className="absolute -top-3 -left-1 w-8 h-8 rounded-full bg-accent flex items-center justify-center shadow-gold">
                  <span className="text-sm font-bold text-accent-foreground font-body">
                    {step.number}
                  </span>
                </div>
                
                {/* Icon */}
                <div className="w-12 h-12 rounded-xl bg-accent/15 flex items-center justify-center mb-4 mt-2 group-hover:bg-accent/25 transition-colors">
                  <step.icon className="w-5 h-5 text-accent" />
                </div>

                {/* Title */}
                <h3 className="font-display text-lg font-semibold text-primary-foreground mb-2">
                  {step.title}
                </h3>
                
                {/* Time badge */}
                <div className="inline-block px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-body font-medium mb-4">
                  {step.time}
                </div>
                
                {/* Bullets */}
                <ul className="space-y-2">
                  {step.bullets.map((bullet, i) => (
                    <li key={i} className="text-cream/70 font-body text-sm flex items-start gap-2">
                      <span className="text-accent mt-1.5 text-xs">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom quote */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <div className="border border-accent/30 rounded-xl p-6 text-center bg-primary-foreground/5 backdrop-blur-sm">
            <p className="text-cream/80 font-body text-lg italic">
              "Owners see every step. You never explain yourself again."
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};