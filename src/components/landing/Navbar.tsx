import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X, Building2, Users, Home, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";

const navItems = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "The App", href: "#app" },
  { label: "Pricing", href: "#pricing" },
];

const portalLinks = [
  {
    id: "agent",
    label: "Agent Portal",
    description: "Manage properties & contracts",
    icon: Building2,
    href: "/agent/auth",
    color: "bg-accent text-accent-foreground",
  },
  {
    id: "owner",
    label: "Owner Portal",
    description: "Track your investments",
    icon: Users,
    href: "/owner/auth",
    color: "bg-primary text-primary-foreground",
  },
  {
    id: "tenant",
    label: "Tenant Portal",
    description: "View contracts & payments",
    icon: Home,
    href: "/tenant/auth",
    color: "bg-green-600 text-white",
  },
];

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border/50 shadow-soft"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <a href="/" className="flex items-center gap-2">
              <img src={logo} alt="Dar360" className="w-9 h-9 md:w-10 md:h-10 object-contain" />
              <span className={`font-display text-xl md:text-2xl font-semibold ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
                Dar360
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.label}
                  onClick={() => scrollToSection(item.href)}
                  className={`font-body text-sm font-medium transition-colors ${
                    isScrolled
                      ? "text-muted-foreground hover:text-foreground"
                      : "text-primary-foreground/80 hover:text-primary-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <Link to="/agent/auth">
                <Button variant={isScrolled ? "gold" : "hero-outline"} size="sm">
                  Sign In
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu - Full Screen Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] lg:hidden bg-background"
          >
            {/* Header */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-border/50">
              <a href="/" className="flex items-center gap-2">
                <img src={logo} alt="Dar360" className="w-9 h-9 object-contain" />
                <span className="font-display text-xl font-semibold text-foreground">Dar360</span>
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-2 rounded-lg text-foreground"
                aria-label="Close menu"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Menu Content */}
            <div className="flex flex-col h-[calc(100vh-4rem)] overflow-y-auto">
              {/* Navigation Links */}
              <div className="px-4 py-6 space-y-1">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.label}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    className="flex items-center justify-between w-full py-4 text-lg font-display font-medium text-foreground hover:text-accent transition-colors border-b border-border/30"
                  >
                    {item.label}
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </motion.button>
                ))}
              </div>

              {/* Portal Links */}
              <div className="px-4 py-6 mt-auto">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-4">
                  Sign In / Sign Up
                </p>
                <div className="space-y-3">
                  {portalLinks.map((portal, index) => (
                    <motion.div
                      key={portal.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 + index * 0.05 }}
                    >
                      <Link
                        to={portal.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-accent/50 transition-all active:scale-[0.98]"
                      >
                        <div className={`w-12 h-12 rounded-xl ${portal.color} flex items-center justify-center flex-shrink-0`}>
                          <portal.icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-foreground">{portal.label}</p>
                          <p className="text-sm text-muted-foreground font-body">{portal.description}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="px-4 py-6 border-t border-border/30">
                <p className="text-xs text-muted-foreground text-center font-body">
                  © 2025 Dar360. Built for UAE Real Estate.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
