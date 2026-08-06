import { Link } from "react-router-dom";
import { Brain, Github, Heart } from "lucide-react";
import logoImage from "@/logo.png";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card/50 backdrop-blur-sm mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center gap-6 justify-between">
          {/* Brand */}
          <div className="flex items-center gap-2">
            <img src={logoImage} alt="LEARNML Logo" className="w-24 h-24 object-contain" />
            <div>
              <p className="font-heading font-bold text-foreground">
                LEARN<span className="text-green-500">ML</span>
              </p>
              <p className="text-xs text-muted-foreground">An interactive ML learning guide</p>
            </div>
          </div>

          {/* Links */}
          <div>
          <nav className="flex flex-wrap justify-end  items-end gap-x-6 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-foreground transition-colors">Home</Link>
            <Link to="/types-of-ml" className="hover:text-foreground transition-colors">Types of ML</Link>
            <Link to="/supervised" className="hover:text-foreground transition-colors">Supervised</Link>
            <Link to="/unsupervised" className="hover:text-foreground transition-colors">Unsupervised</Link>
            <Link to="/playground" className="hover:text-foreground transition-colors">Playground</Link>
            <Link to="/references" className="hover:text-foreground transition-colors">References</Link>
          </nav>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-border flex flex-col sm:flex-row justify-between items-center gap-2 text-xs text-muted-foreground">
          <p>© 2026 LEARNML. Educational content for learning purposes.</p>
        </div>
      </div>
    </footer>
  );
}
