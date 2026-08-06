import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { mlTypes, type MLTypeId } from "@/data/mlTypes";

interface MLTypeDetailPanelProps {
  selected: MLTypeId | null;
  onClose: () => void;
}

const emojis: Record<MLTypeId, string> = {
  supervised: "🎯",
  unsupervised: "🔍",
  reinforcement: "🎮",
};

export default function MLTypeDetailPanel({ selected, onClose }: MLTypeDetailPanelProps) {
  const type = mlTypes.find((t) => t.id === selected);

  return (
    <AnimatePresence>
      {type && (
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 30 }}
          transition={{ type: "spring", stiffness: 280, damping: 28 }}
          className="relative rounded-2xl border border-border bg-card p-6 shadow-xl"
          style={{ borderLeftColor: type.color, borderLeftWidth: 3 }}
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-7 h-7 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Close panel"
          >
            <X size={14} />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
              style={{ background: `${type.color}20` }}
            >
              {emojis[type.id as MLTypeId]}
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold" style={{ color: type.color }}>
                {type.label}
              </h3>
              <p className="text-sm text-muted-foreground italic">{type.tagline}</p>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">{type.description}</p>

          {/* Key characteristics */}
          <div className="mb-5">
            <h4 className="font-heading font-semibold text-sm text-foreground mb-2">Key Characteristics</h4>
            <ul className="flex flex-col gap-1.5">
              {type.bullets.map((b) => (
                <li key={b} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 size={14} style={{ color: type.color }} className="flex-shrink-0" />
                  {b}
                </li>
              ))}
            </ul>
          </div>

          {/* Examples */}
          <div>
            <h4 className="font-heading font-semibold text-sm text-foreground mb-2">Examples</h4>
            <div className="flex flex-wrap gap-2">
              {type.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{ background: `${type.color}15`, color: type.color }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
