import { motion } from "framer-motion";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="font-display text-xl font-bold text-accent-foreground">S</span>
              </div>
              <span className="font-display text-2xl font-semibold">Sakani</span>
            </div>
            <p className="text-primary-foreground/70 font-body max-w-sm mb-6">
              Transforming the UAE rental market with transparency, efficiency, and trust. 
              One platform for agents, owners, and tenants.
            </p>
            <div className="flex items-center gap-2 text-primary-foreground/60 font-body text-sm">
              <MapPin className="w-4 h-4" />
              <span>Dubai, United Arab Emirates</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 font-body">
              {["For Agents", "For Owners", "For Tenants", "Pricing"].map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 font-body">
              <li>
                <a
                  href="mailto:hello@sakani.ae"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@sakani.ae
                </a>
              </li>
              <li>
                <a
                  href="tel:+97141234567"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +971 4 123 4567
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {currentYear} Sakani. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-body">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
