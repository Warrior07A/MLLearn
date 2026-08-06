"use client";
import { motion } from "framer-motion";
import { type ReactNode, useEffect, useState } from "react";

// Track visited paths globally across the SPA session
const visitedPages = new Set<string>();

interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  y?: number;
  direction?: "up" | "left" | "right";
  className?: string;
}

export function ScrollReveal({
  children,
  delay = 0,
  duration = 2,  
  y = 24,
  direction = "up",
  className,  
}: ScrollRevealProps) { 
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return true;
    return !visitedPages.has(window.location.pathname);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      visitedPages.add(window.location.pathname);
    }
  }, []);

  if (!isFirstVisit) {
    return <div className={className}>{children}</div>;
  }

  const initialX = direction === "left" ? -60 : direction === "right" ? 60 : 0;
  const initialY = direction === "up" ? y : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY, x: initialX }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}    
    </motion.div> 
  );
}
