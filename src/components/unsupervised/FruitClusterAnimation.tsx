import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const fruits = [
  { id: "apple1",     emoji: "🍎", label: "Apple",      color: "red",    size: "large"  },
  { id: "grape1",     emoji: "🍇", label: "Grapes",     color: "purple", size: "small"  },
  { id: "banana1",   emoji: "🍌", label: "Banana",     color: "yellow", size: "medium" },
  { id: "cherry1",   emoji: "🍒", label: "Cherry",     color: "red",    size: "small"  },
  { id: "lemon1",    emoji: "🍋", label: "Lemon",      color: "yellow", size: "medium" },
  { id: "blueberry", emoji: "🫐", label: "Blueberry",  color: "purple", size: "small"  },
  { id: "apple2",    emoji: "🍎", label: "Apple 2",    color: "red",    size: "large"  },
  { id: "mango1",    emoji: "🥭", label: "Mango",      color: "yellow", size: "large"  },
  { id: "plum1",     emoji: "🍑", label: "Plum",       color: "red",    size: "medium" },
  { id: "grape2",    emoji: "🍇", label: "Grapes 2",   color: "purple", size: "small"  },
  { id: "pineapple", emoji: "🍍", label: "Pineapple",  color: "yellow", size: "large"  },
  { id: "berry2",    emoji: "🫐", label: "Raspberry",  color: "purple", size: "small"  },
];

type GroupBy = "none" | "color" | "size";

const GROUP_META: Record<GroupBy, { keys: string[]; labels: Record<string, string>; color: Record<string, string> }> = {
  none: { keys: [], labels: {}, color: {} },
  color: {
    keys: ["red", "yellow", "purple"],
    labels: { red: "🔴 Red fruits", yellow: "🟡 Yellow fruits", purple: "🟣 Purple fruits" },
    color:  { red: "#ef4444",       yellow: "#eab308",           purple: "#a855f7" },
  },
  size: {
    keys: ["small", "medium", "large"],
    labels: { small: "🔵 Small",    medium: "🟠 Medium",          large: "🟢 Large" },
    color:  { small: "#3b82f6",     medium: "#f97316",             large: "#22c55e" },
  },
};

export default function FruitClusterAnimation() {
  const [groupBy, setGroupBy] = useState<GroupBy>("none");

  const meta = GROUP_META[groupBy];

  // Build the groups to render
  const grouped: Record<string, typeof fruits> =
    groupBy === "none"
      ? { all: fruits }
      : Object.fromEntries(
          meta.keys.map((key) => [
            key,
            fruits.filter((f) => (groupBy === "color" ? f.color : f.size) === key),
          ])
        );

  return (
    <div className="space-y-5">
      <div className="space-y-2">
        <h3 className="font-heading font-bold text-foreground text-lg">Clustering Without Labels</h3>
        <p className="text-sm text-muted-foreground">
          Unsupervised learning groups data by similarity — no labels needed. Watch how the same fruits
          cluster differently depending on which feature you choose.
        </p>
      </div>

      {/* Mode buttons */}
      <div className="flex gap-2 flex-wrap">
        {(["none", "color", "size"] as GroupBy[]).map((mode) => (
          <button
            key={mode}
            onClick={() => setGroupBy(mode)}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${
              groupBy === mode
                ? "bg-orange-500 text-white border-orange-500 shadow-lg shadow-orange-500/25"
                : "border-border text-muted-foreground hover:text-foreground hover:bg-muted/60"
            }`}
          >
            {mode === "none" ? "🔀 Mixed" : mode === "color" ? "🎨 Group by Colour" : "📏 Group by Size"}
          </button>
        ))}
      </div>

      {/* Cluster display */}
      <div className="rounded-xl border border-border bg-card p-5 min-h-[200px] flex items-center">
        <AnimatePresence mode="wait">
          {groupBy === "none" ? (
            /* UNGROUPED — simple wrapping grid */
            <motion.div
              key="none"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-wrap justify-center gap-4"
            >
              {fruits.map((f, i) => (
                <motion.div
                  key={f.id}
                  layout
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.04, type: "spring", stiffness: 200, damping: 20 }}
                  className="flex flex-col items-center gap-1"
                  title={f.label}
                >
                  <span className="text-3xl leading-none">{f.emoji}</span>
                  <span className="text-[10px] text-muted-foreground text-center w-14 truncate">{f.label}</span>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            /* GROUPED — one cluster per key */
            <motion.div
              key={groupBy}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="w-full flex flex-wrap justify-center gap-4"
            >
              {meta.keys.map((key) => {
                const items = grouped[key] ?? [];
                const clusterColor = meta.color[key];
                const clusterLabel = meta.labels[key];
                return (
                  <motion.div
                    key={key}
                    layout
                    className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 min-w-[130px]"
                    style={{ borderColor: clusterColor + "50", background: clusterColor + "08" }}
                  >
                    <span
                      className="text-xs font-semibold tracking-wide"
                      style={{ color: clusterColor }}
                    >
                      {clusterLabel}
                    </span>
                    <div className="flex flex-wrap justify-center gap-2">
                      {items.map((f, i) => (
                        <motion.span
                          key={f.id}
                          layout
                          initial={{ opacity: 0, scale: 0.4 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{
                            delay: i * 0.06,
                            type: "spring",
                            stiffness: 250,
                            damping: 22,
                          }}
                          className="text-3xl leading-none"
                          title={f.label}
                        >
                          {f.emoji}
                        </motion.span>
                      ))}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="text-xs text-muted-foreground text-center">
        The algorithm doesn't know "red" or "large" — it only sees numerical feature differences and groups by minimum distance.
      </p>
    </div>
  );
}
