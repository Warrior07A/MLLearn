import { useLocation, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const pages = [
  { path: "/", label: "Home", color: "#22c55e" },
  { path: "/types-of-ml", label: "Types of ML", color: "#3b82f6" },
  { path: "/supervised", label: "Supervised", color: "#22c55e" },
  { path: "/unsupervised", label: "Unsupervised", color: "#f97316" },
  { path: "/playground", label: "Playground", color: "#a855f7" },
  { path: "/references", label: "References", color: "#64748b" },
];

export default function ProgressDots() {
  const { pathname } = useLocation();

  return (
    <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-2.5">
      {pages.map((page) => {
        const isActive = pathname === page.path;
        return (
          <Tooltip key={page.path}>
            <TooltipTrigger asChild>
              <Link to={page.path}>
                <motion.div
                  animate={{
                    scale: isActive ? 1.3 : 1,
                    opacity: isActive ? 1 : 0.4,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  className="w-2.5 h-2.5 rounded-full cursor-pointer transition-all hover:opacity-80"
                  style={{ background: isActive ? page.color : "#71717a" }}
                />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{page.label}</p>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}
