import { motion } from "framer-motion";

export const ForOwners = () => {
  return (
    <section className="py-24 lg:py-32 bg-secondary bg-noise">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent font-body text-sm font-medium mb-6 uppercase tracking-wider">
              And Your Owners?
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-foreground mb-6">
              They finally see what you do.
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <p className="text-muted-foreground font-body text-lg leading-relaxed">
              Invite owners to their own dashboard. They see viewings, 
              inquiries, and progress — without calling you.
            </p>
            <p className="text-foreground font-body text-lg mt-4">
              No more weekly updates. Trust builds itself.
            </p>
          </motion.div>

          {/* Quote card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="border-l-4 border-accent bg-card rounded-r-xl p-8 shadow-soft">
              <p className="text-foreground font-display text-xl lg:text-2xl italic leading-relaxed">
                "When owners see the work,
                <br />
                they never question the commission."
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};