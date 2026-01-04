import { Mail, MessageCircle } from "lucide-react";
import logo from "@/assets/logo.png";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-footer text-cream/90 py-16">
      <div className="container mx-auto px-4">
        {/* Main footer content */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 mb-12">
          {/* Brand */}
          <div className="max-w-sm">
            <div className="flex items-center gap-2 mb-3">
              <img src={logo} alt="Dar360" className="w-8 h-8 object-contain" />
              <span className="font-display text-xl font-semibold">Dar360</span>
            </div>
            <p className="text-cream/50 font-body text-sm leading-relaxed">
              Helping UAE agents prove their value.
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center gap-6 lg:gap-8 font-body text-sm">
            <button 
              onClick={() => scrollToSection("#how-it-works")}
              className="text-cream/70 hover:text-cream transition-colors"
            >
              How It Works
            </button>
            <button 
              onClick={() => scrollToSection("#pricing")}
              className="text-cream/70 hover:text-cream transition-colors"
            >
              Pricing
            </button>
            <button 
              onClick={() => scrollToSection("#faq")}
              className="text-cream/70 hover:text-cream transition-colors"
            >
              FAQ
            </button>
            <a
              href="mailto:hello@dar360.ae"
              className="text-cream/70 hover:text-cream transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Contact */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="mailto:hello@dar360.ae"
              className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors font-body text-sm"
            >
              <Mail className="w-4 h-4" />
              hello@dar360.ae
            </a>
            <a
              href="https://w.app/dar360"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-cream/70 hover:text-cream transition-colors font-body text-sm"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <p className="text-cream/40 font-body text-sm">
              © {currentYear} Dar360 • <a href="#" className="hover:text-cream/60 transition-colors">Privacy</a> • <a href="#" className="hover:text-cream/60 transition-colors">Terms</a>
            </p>

            {/* Trust badges - subtle text only */}
            <p className="text-cream/30 font-body text-xs">
              UAE Pass • RERA • Ejari
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};