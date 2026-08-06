import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

// Track visited paths globally across the SPA session
const visitedPages = new Set<string>();

interface GridItem {
  icon?: LucideIcon;
  emoji?: string;
  label: string;
  description?: string;
}

interface IconGridProps {
  items: GridItem[];
  color?: string;
  columns?: number;
}

export function IconGrid({ items, color = "#22c55e", columns = 3 }: IconGridProps) {
  const [isFirstVisit] = useState(() => {
    if (typeof window === "undefined") return true;
    return !visitedPages.has(window.location.pathname);
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      visitedPages.add(window.location.pathname);
    }
  }, []);

  const gridCols =
    columns === 2 ? "grid-cols-1 sm:grid-cols-2" :
    columns === 4 ? "grid-cols-2 sm:grid-cols-4" :
    "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid ${gridCols} gap-4`}>
      {items.map((item, i) => {
        const Icon = item.icon;
        
        const content = (
          <>
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${color}20` }}
            >
              {Icon ? (
                <Icon size={24} style={{ color }} />
              ) : (
                <span>{item.emoji}</span>
              )}
            </div>
            <p className="font-heading font-semibold text-sm text-foreground">{item.label}</p>
            {item.description && (
              <p className="text-xs text-muted-foreground">{item.description}</p>
            )}
          </>
        );

        if (!isFirstVisit) {
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card text-center transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              {content}
            </div>
          );
        }

        return (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border bg-card text-center transition-shadow hover:shadow-lg"
          >
            {content}
          </motion.div>
        );
      })}
    </div>
  );
}
