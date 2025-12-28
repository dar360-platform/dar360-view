import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "What We Do", href: "#what-we-do" },
  { label: "Who We Are", href: "#who-we-are" },
  { label: "The App", href: "#app" },
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
          <nav className="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="#" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center">
                <span className="font-display text-xl font-bold text-accent-foreground">S</span>
              </div>
              <span className={`font-display text-2xl font-semibold ${isScrolled ? "text-foreground" : "text-primary-foreground"}`}>
                Sakani
              </span>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
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
            <div className="hidden md:flex items-center gap-4">
              <Button
                variant={isScrolled ? "gold" : "hero-outline"}
                onClick={() => scrollToSection("#agent-login")}
              >
                Agent Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 rounded-lg transition-colors ${
                isScrolled ? "text-foreground" : "text-primary-foreground"
              }`}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-20 z-40 md:hidden"
          >
            <div className="bg-background/98 backdrop-blur-lg border-b border-border/50 shadow-medium">
              <div className="container mx-auto px-4 py-6 space-y-4">
                {navItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => scrollToSection(item.href)}
                    className="block w-full text-left font-body text-lg text-foreground hover:text-accent transition-colors py-2"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 border-t border-border/50">
                  <Button
                    variant="gold"
                    size="lg"
                    className="w-full"
                    onClick={() => scrollToSection("#agent-login")}
                  >
                    Agent Login
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
