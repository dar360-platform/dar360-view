import { motion } from "framer-motion";
import { Phone, FileText, Car, BarChart3, AlertCircle, Check, X, ArrowDown, CheckCircle2, XCircle } from "lucide-react";

const comparisons = [
  {
    icon: Phone,
    without: "Weekly calls from owners asking \"what are you doing?\"",
    with: "Owners check dashboard themselves",
  },
  {
    icon: FileText,
    without: "3 days to sign a contract",
    with: "10 minutes via UAE Pass",
  },
  {
    icon: Car,
    without: "Drive to typing center for Ejari",
    with: "One-click Ejari submission, Certificate in 24hrs",
  },
  {
    icon: BarChart3,
    without: "Can't prove marketing efforts",
    with: "Every WhatsApp click tracked",
  },
  {
    icon: AlertCircle,
    without: "Commission disputes",
    with: "Full audit trail of your work",
  },
];

const stats = [
  { label: "Contract Time", before: "3 days", after: "10 mins", improvement: "99% faster" },
  { label: "Owner Calls", before: "5/week", after: "0", improvement: "100% fewer" },
  { label: "Ejari Process", before: "2 hours", after: "1 click", improvement: "98% faster" },
];

const competitorComparison = [
  { feature: "Owner visibility", dar360: true, propspace: false, excel: false },
  { feature: "Agent-inclusive", dar360: true, propspace: true, excel: true },
  { feature: "UAE Pass signing", dar360: true, propspace: false, excel: false },
  { feature: "Ejari submission", dar360: true, propspace: false, excel: false },
  { feature: "WhatsApp tracking", dar360: true, propspace: false, excel: false },
  { feature: "RERA verification", dar360: true, propspace: false, excel: false },
  { feature: "Cheque reminders", dar360: true, propspace: false, excel: false },
];

export const WhyDar360 = () => {
  return (
    <section id="why" className="py-24 lg:py-32 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-medium text-sm mb-4">
            Why Dar360
          </span>
          <h2 className="font-display text-4xl lg:text-5xl font-semibold text-foreground mb-6">
            Why Agents Choose Dar360
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto font-body">
            See the difference between working the old way and working with Dar360.
          </p>
        </motion.div>

        {/* Before/After Comparison */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="grid md:grid-cols-2 gap-6">
            {/* Without Column */}
            <div className="p-6 rounded-2xl bg-card border border-destructive/20">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <X className="w-5 h-5 text-destructive" />
                Without Dar360
              </h3>
              <div className="space-y-4">
                {comparisons.map((item) => (
                  <div key={item.without} className="flex items-start gap-3 text-muted-foreground font-body">
                    <item.icon className="w-5 h-5 text-destructive/60 flex-shrink-0 mt-0.5" />
                    <span>{item.without}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* With Column */}
            <div className="p-6 rounded-2xl bg-accent text-accent-foreground shadow-gold">
              <h3 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Check className="w-5 h-5" />
                With Dar360
              </h3>
              <div className="space-y-4">
                {comparisons.map((item) => (
                  <div key={item.with} className="flex items-start gap-3 font-body">
                    <item.icon className="w-5 h-5 opacity-80 flex-shrink-0 mt-0.5" />
                    <span>{item.with}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-16"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="p-6 rounded-2xl bg-card border border-border/50 text-center">
              <h4 className="font-display text-lg font-semibold text-foreground mb-4">{stat.label}</h4>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-muted-foreground font-body">
                  <span className="text-sm">Before:</span>
                  <span className="font-medium line-through">{stat.before}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground font-body">
                  <span className="text-sm">After:</span>
                  <span className="font-semibold text-accent">{stat.after}</span>
                </div>
              </div>
              <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-accent/10 text-accent text-sm font-medium">
                <ArrowDown className="w-3 h-3" />
                {stat.improvement}
              </div>
            </div>
          ))}
        </motion.div>

        {/* Competitor Comparison Table */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <h3 className="font-display text-2xl font-semibold text-foreground text-center mb-8">
            How Dar360 Compares
          </h3>
          <div className="overflow-x-auto -mx-4 px-4">
            <table className="w-full bg-card rounded-2xl border border-border/50 overflow-hidden min-w-[400px]">
              <thead>
                <tr className="border-b border-border/50">
                  <th className="p-3 md:p-4 text-left font-display font-semibold text-foreground text-sm md:text-base">Feature</th>
                  <th className="p-3 md:p-4 text-center font-display font-semibold text-accent text-sm md:text-base">Dar360</th>
                  <th className="p-3 md:p-4 text-center font-display font-semibold text-muted-foreground text-sm md:text-base">PropSpace</th>
                  <th className="p-3 md:p-4 text-center font-display font-semibold text-muted-foreground text-sm md:text-base">Excel+WhatsApp</th>
                </tr>
              </thead>
              <tbody>
                {competitorComparison.map((row, index) => (
                  <tr key={row.feature} className={index !== competitorComparison.length - 1 ? "border-b border-border/30" : ""}>
                    <td className="p-3 md:p-4 text-muted-foreground font-body text-sm md:text-base">{row.feature}</td>
                    <td className="p-3 md:p-4 text-center">
                      {row.dar360 ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent mx-auto" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 text-destructive mx-auto" />}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      {row.propspace ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent mx-auto" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/50 mx-auto" />}
                    </td>
                    <td className="p-3 md:p-4 text-center">
                      {row.excel ? <CheckCircle2 className="w-4 h-4 md:w-5 md:h-5 text-accent mx-auto" /> : <XCircle className="w-4 h-4 md:w-5 md:h-5 text-muted-foreground/50 mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
