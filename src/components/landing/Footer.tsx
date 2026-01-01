import { Mail, Phone, MapPin, MessageCircle, Shield, FileCheck, Building2 } from "lucide-react";
import logo from "@/assets/logo.png";
export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-primary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="Dar360" className="w-10 h-10 object-contain" />
              <span className="font-display text-2xl font-semibold">Dar360</span>
            </div>
            <p className="text-primary-foreground/70 font-body max-w-sm mb-6">
              Helping UAE rental agents prove their value through transparency. 
              One platform for listings, contracts, and Ejari.
            </p>
            <div className="flex items-center gap-2 text-primary-foreground/60 font-body text-sm mb-4">
              <MapPin className="w-4 h-4" />
              <span>Dubai, United Arab Emirates</span>
            </div>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-xs">
                <Shield className="w-3 h-3 text-accent" />
                <span>UAE Pass</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-xs">
                <Building2 className="w-3 h-3 text-accent" />
                <span>RERA</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 text-xs">
                <FileCheck className="w-3 h-3 text-accent" />
                <span>Ejari Ready</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display text-lg font-semibold mb-4">Platform</h4>
            <ul className="space-y-3 font-body">
              {["For Agents", "For Owners", "For Tenants", "The App"].map((link) => (
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
            
            <h4 className="font-display text-lg font-semibold mb-4 mt-8">Resources</h4>
            <ul className="space-y-3 font-body">
              {["Pricing", "FAQ", "Blog", "Help Center"].map((link) => (
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
                  href="mailto:hello@dar360.ae"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@dar360.ae
                </a>
              </li>
              <li>
                <a
                  href="tel:+971501234567"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +971 50 123 4567
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/971501234567"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/50 font-body">
            © {currentYear} Dar360. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm font-body">
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-primary-foreground/50 hover:text-primary-foreground transition-colors">
              PDPL
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
