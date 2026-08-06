import { BlockMath } from "react-katex";
import "katex/dist/katex.min.css";

interface FormulaBlockProps {
  math: string;
  className?: string;
}

export function FormulaBlock({ math, className }: FormulaBlockProps) {
  return (
    <div
      className={`rounded-xl border border-border bg-muted/50 px-6 py-4 text-center overflow-x-auto ${className ?? ""}`}
    >
      <BlockMath math={math} />
    </div>
  );
}
