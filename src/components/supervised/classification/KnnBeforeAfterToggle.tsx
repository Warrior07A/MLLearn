import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const W = 360, H = 260;

const CATEGORY_A = [
  { x: 80, y: 80 }, { x: 110, y: 120 }, { x: 60, y: 140 },
  { x: 90, y: 60 }, { x: 130, y: 90 }, { x: 70, y: 170 },
];
const CATEGORY_B = [
  { x: 240, y: 100 }, { x: 270, y: 140 }, { x: 300, y: 80 },
  { x: 250, y: 180 }, { x: 290, y: 160 }, { x: 320, y: 120 },
];

export default function KnnBeforeAfterToggle() {
  const [showAfter, setShowAfter] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <h3 className="font-heading font-bold text-foreground">KNN: Before & After</h3>
        <div className="inline-flex p-1 bg-muted rounded-lg gap-1">
          {["Before", "After"].map((label) => (
            <button
              key={label}
              onClick={() => setShowAfter(label === "After")}
              className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                (label === "After") === showAfter
                  ? "bg-green-500 text-white shadow"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-2xl mx-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full">
          {/* Category A */}
          {CATEGORY_A.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={8}
              fill="#22c55e" fillOpacity={0.85} stroke="white" strokeWidth="2" />
          ))}
          {/* Category B */}
          {CATEGORY_B.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={8}
              fill="#3b82f6" fillOpacity={0.85} stroke="white" strokeWidth="2" />
          ))}

          {/* New point in center */}
          <AnimatePresence>
            {!showAfter && (
              <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                <circle cx={180} cy={150} r={10} fill="#f97316" stroke="white" strokeWidth="2.5" />
                <text x={180} y={135} textAnchor="middle" fontSize="10" fill="#71717a" fontFamily="Inter">
                  New point?
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* After: show KNN lines + classification */}
          <AnimatePresence>
            {showAfter && (
              <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                {/* K=3 nearest: 2 are green, 1 blue — → classified as A (green) */}
                {[CATEGORY_A[0], CATEGORY_A[1], CATEGORY_B[0]].map((p, i) => (
                  <motion.line key={i}
                    x1={180} y1={150} x2={p.x} y2={p.y}
                    stroke={i < 2 ? "#22c55e" : "#3b82f6"}
                    strokeWidth="1.5" strokeDasharray="4 2"
                    initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                    transition={{ delay: i * 0.1, duration: 0.4 }}
                  />
                ))}
                <circle cx={180} cy={150} r={11} fill="#22c55e" stroke="white" strokeWidth="2.5" />
                <text x={180} y={135} textAnchor="middle" fontSize="10" fill="#22c55e" fontFamily="Inter" fontWeight="600">
                  Classified: A
                </text>
                <text x={180} y={123} textAnchor="middle" fontSize="9" fill="#71717a" fontFamily="Inter">
                  K=3, majority vote
                </text>
              </motion.g>
            )}
          </AnimatePresence>

          {/* Legends */}
          <circle cx={20} cy={20} r={5} fill="#22c55e" />
          <text x={30} y={24} fontSize="9" fill="#71717a" fontFamily="Inter">Category A</text>
          <circle cx={100} cy={20} r={5} fill="#3b82f6" />
          <text x={110} y={24} fontSize="9" fill="#71717a" fontFamily="Inter">Category B</text>
        </svg>
      </div>
    </div>
  );
}
