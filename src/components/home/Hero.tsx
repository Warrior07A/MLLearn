import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import Hero3DCanvas from "./Hero3DCanvas";

export default function Hero() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden -mt-20 pt-20">
      {/* Background canvas */}
      <Hero3DCanvas />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/20 to-background/10 dark:from-background/30 dark:via-background/50 dark:to-background/80 pointer-events-none" />

      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-green-500/8 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-blue-500/8 blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-heading text-5xl sm:text-6xl lg:text-7xl font-extrabold text-foreground leading-[1.05] tracking-tight mb-6"
          >
            Understand
            <br />
            <span className="bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent">
              Machine Learning
            </span>
            <br />
            <span className="text-muted-foreground text-4xl sm:text-5xl lg:text-6xl font-bold">
              by doing it.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            Explore Supervised Learning, Unsupervised Learning, and the math behind them —
            through draggable demos, interactive quizzes, and hands-on experiments.
            No ML background required.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <Link to="/playground">
              <Button
                size="lg"
                className="font-heading font-semibold px-8 h-12 text-base bg-green-500 hover:bg-green-600 text-white shadow-lg shadow-green-500/25 transition-all hover:shadow-green-500/40 hover:scale-105"
              >
                Start Exploring
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link to="/playground">
              <Button
                size="lg"
                variant="outline"
                className="font-heading font-semibold px-8 h-12 text-base border-border hover:bg-muted/60 transition-all hover:scale-105"
              >
                <Sparkles size={16} className="mr-2" />
                Open Playground
              </Button>
            </Link>
          </motion.div>

          {/* Stats row — centered */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center gap-10 sm:gap-16 mt-16 pt-8 border-t border-border/50"
          >
            {[
              { value: "3", label: "ML Paradigms" },
              { value: "10+", label: "Interactive Demos" },
              { value: "10", label: "Quiz Questions" },
              { value: "∞", label: "Fun" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-heading text-2xl font-bold text-foreground">{stat.value}</p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator — hides on scroll */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
      >
        <p className="text-xs text-muted-foreground font-medium tracking-widest uppercase">Scroll</p>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeOut" }}
          className="w-5 h-8 rounded-full border-2 border-muted-foreground/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-green-500" />
        </motion.div>
      </motion.div>
    </section>
  );
} 
