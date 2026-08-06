import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProgressDots from "./ProgressDots";
import bgPatternDark from "@/bg-pattern.png";
import bgPatternLight from "@/bg-pattern-light.png";
import { useProgressStore } from "@/store/progressStore";
import { useThemeStore } from "@/store/themeStore";
import { useEffect } from "react";

export default function RootLayout() {
  const location = useLocation();
  const visitPage = useProgressStore((s) => s.visitPage);
  const theme = useThemeStore((s) => s.theme);

  useEffect(() => {
    visitPage(location.pathname);
  }, [location.pathname, visitPage]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <TooltipProvider>
      <div
        className="min-h-screen flex flex-col bg-background text-foreground transition-colors duration-500"
        style={{
          backgroundImage: theme === "dark"
            ? `linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${bgPatternDark})`
            : `linear-gradient(to bottom, rgba(230,235,240,0.3), rgba(240,245,250,0.5)), url(${bgPatternLight})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundAttachment: "fixed"
        }}
      >
        <Navbar />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
        <Footer />
        <ProgressDots />
      </div>
    </TooltipProvider>
  );
}
