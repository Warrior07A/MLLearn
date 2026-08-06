import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Brain, Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useThemeStore } from "@/store/themeStore";
import logoImage from "@/logo.png";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/types-of-ml", label: "Types of ML" },
  { href: "/supervised", label: "Supervised" },
  { href: "/unsupervised", label: "Unsupervised" },
  { href: "/playground", label: "Playground" },
  { href: "/references", label: "References" },
];

const accentMap: Record<string, string> = {
  "/supervised": "#22c55e",
  "/unsupervised": "#f97316",
  "/types-of-ml": "#3b82f6",
  "/playground": "#a855f7",
  "/references": "#64748b",
};

export default function Navbar() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useThemeStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const accent = accentMap[location.pathname] ?? "#22c55e";

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-500 ${scrolled
          ? "bg-white/50 dark:bg-zinc-950/60 backdrop-blur-2xl border-b border-zinc-200/50 dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-md"
          : "bg-transparent"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img src={logoImage} alt="LEARNML Logo" className="pt-2 w-20 h-20 object-contain transition-all duration-300 group-hover:scale-110" />
            <span className="font-heading font-extrabold text-2xl tracking-tight text-foreground">
              LEARN<span style={{ color: accent }}>ML</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`relative px-4 py-2 text-base font-semibold rounded-lg transition-all duration-200 ${isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/80"
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-active"
                      className="absolute inset-0 rounded-lg -z-10"
                      style={{ background: `${accent}15` }}
                      transition={{ type: "spring", stiffness: 400, damping: 35 }}
                    />
                  )}
                </Link>
              );
            })}

            <Button variant="ghost" size="icon" onClick={toggleTheme} className="ml-2 rounded-full text-foreground hover:bg-muted/80 transition-colors">
              {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </Button>
          </nav>

          {/* Mobile menu */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu size={20} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64 pt-12">
              <div className="flex items-center gap-2 mb-8">
                <img src={logoImage} alt="LEARNML Logo" className="w-12 h-12 object-contain" />
                <span className="font-heading font-bold text-lg">
                  LEARN<span style={{ color: accent }}>ML</span>
                </span>
              </div>
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const isActive = location.pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      to={link.href}
                      onClick={() => setMobileOpen(false)}
                      className={`px-4 py-3 rounded-xl text-sm font-medium transition-colors ${isActive
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                        }`}
                      style={isActive ? { background: `${accent}15`, color: accent } : undefined}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="mt-8 pt-4 border-t border-border">
                <Button variant="outline" className="w-full justify-start gap-2" onClick={toggleTheme}>
                  {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
                  {theme === "dark" ? "Light Mode" : "Dark Mode"}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
