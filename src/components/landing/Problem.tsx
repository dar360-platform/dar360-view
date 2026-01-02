import { motion } from "framer-motion";

const painPoints = [
  {
    quote: '"Where\'s the contract?"',
    attribution: "— Every owner",
    rotation: "-2deg",
  },
  {
    quote: '"Any updates?"',
    attribution: "— The 5pm call",
    rotation: "1deg",
  },
  {
    quote: '"What are you even doing?"',
    attribution: "— The trust killer",
    rotation: "-1deg",
  },
];

export const Problem = () => {
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
            Sound Familiar?
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground">
            The calls that drain you.
          </h2>
        </motion.div>

        {/* Pain Point Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 max-w-4xl mx-auto mb-16">
          {painPoints.map((point, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              style={{ transform: `rotate(${point.rotation})` }}
              className="relative"
            >
              <div className="bg-card rounded-2xl p-8 shadow-soft border border-border/30 hover:shadow-medium transition-shadow">
                {/* Large quotation mark */}
                <span className="absolute -top-2 -left-1 text-6xl font-display text-accent/30 leading-none">
                  "
                </span>
                
                <p className="font-display text-xl lg:text-2xl text-foreground mb-4 relative z-10">
                  {point.quote}
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  {point.attribution}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom text */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-center max-w-xl mx-auto"
        >
          <p className="text-muted-foreground font-body text-lg leading-relaxed">
            You're doing the work. They just can't see it.
          </p>
          <p className="text-foreground font-display text-xl mt-2">
            That changes today.
          </p>
        </motion.div>
      </div>
    </section>
  );
};