import { motion } from "framer-motion";
import ownerDashboard from "@/assets/owner_screen.png";

export const ForOwners = () => {
  return (
    <section className="section-padding bg-secondary bg-noise overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Side - Text */}
          <div className="max-w-lg">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
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
              className="mb-10"
            >
              <p className="text-muted-foreground font-body text-lg leading-relaxed mb-4">
                Invite owners to their own dashboard. They see viewings, 
                inquiries, and progress — without calling you.
              </p>
              <p className="text-foreground font-body text-lg font-medium">
                No more weekly updates. Trust builds itself.
              </p>
            </motion.div>

            {/* Quote card with decorative quote */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Large decorative quotation mark */}
              <span className="absolute -top-6 -left-2 text-7xl font-display text-accent/20 leading-none select-none">
                "
              </span>
              
              <div className="border-l-4 border-accent bg-card rounded-r-xl p-6 lg:p-8 shadow-soft relative">
                <p className="text-foreground font-display text-xl lg:text-2xl italic leading-relaxed mb-4">
                  When owners see the work,
                  <br />
                  they never question the commission.
                </p>
                <p className="text-muted-foreground font-body text-sm">
                  — Coming soon: real agent testimonials
                </p>
              </div>
            </motion.div>
          </div>

          {/* Right Side - Owner Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Subtle glow behind */}
              <div className="absolute -inset-8 bg-accent/8 rounded-3xl blur-3xl" />
              
              {/* Dashboard mockup */}
              <img
                src={ownerDashboard}
                alt="Dar360 Owner Dashboard showing property activity and viewing history"
                className="relative w-full max-w-2xl mx-auto rounded-2xl drop-shadow-2xl"
                style={{ filter: "drop-shadow(0 25px 50px rgba(0,0,0,0.15))" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
