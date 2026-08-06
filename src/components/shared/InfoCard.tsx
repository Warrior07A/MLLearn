import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface InfoCardProps {
  children: ReactNode;
  className?: string;
  accent?: string;
}

export function InfoCard({ children, className, accent }: InfoCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-border bg-card p-5 shadow-sm",
        className
      )}
      style={accent ? { borderLeftColor: accent, borderLeftWidth: 3 } : undefined}
    >
      {children}
    </div>
  );
}
