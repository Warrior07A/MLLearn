import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const W = 400, H = 280;

interface TreeNode {
  x: number;
  y: number;
  children?: number[];
  label?: string;
  level: number;
}

const nodes: TreeNode[] = [
  // Leaves (level 0)
  { x: 40, y: 240, level: 0, label: "🍎" },
  { x: 90, y: 240, level: 0, label: "🍒" },
  { x: 150, y: 240, level: 0, label: "🐕" },
  { x: 200, y: 240, level: 0, label: "🐈" },
  { x: 260, y: 240, level: 0, label: "🚗" },
  { x: 310, y: 240, level: 0, label: "🚙" },
  { x: 360, y: 240, level: 0, label: "🚌" },

  // Level 1 merges
  { x: 65, y: 180, level: 1, children: [0, 1] },
  { x: 175, y: 180, level: 1, children: [2, 3] },
  { x: 310, y: 180, level: 1, children: [5, 6] },

  // Level 2 merges
  { x: 120, y: 120, level: 2, children: [7, 8] },
  { x: 310, y: 120, level: 2, children: [4, 9] },

  // Root
  { x: 215, y: 60, level: 3, children: [10, 11] },
];

const edges: [number, number][] = [
  [12, 10], [12, 11],
  [10, 7], [10, 8],
  [11, 4], [11, 9],
  [7, 0], [7, 1],
  [8, 2], [8, 3],
  [9, 5], [9, 6],
];

const levelColors = ["#22c55e", "#22c55e", "#f97316", "#3b82f6", "#a855f7"];

export default function DendrogramAnimation() {
  const ref = useRef<SVGSVGElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-heading font-bold text-foreground text-lg">Hierarchical Clustering Dendrogram</h3>
        <p className="text-sm text-muted-foreground">
          The dendrogram builds a tree of cluster merges. Scroll into view to watch it draw — each merge combines the two most similar groups.
        </p>
      </div>
      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <svg ref={ref} viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Dendrogram">
          {/* Leaf labels */}
          {nodes.slice(0, 7).map((n, i) => (
            <text key={i} x={n.x} y={n.y + 20} textAnchor="middle" fontSize="16">
              {n.label}
            </text>
          ))}

          {/* Intermediate nodes */}
          {nodes.slice(7).map((n, i) => {
            const color = levelColors[n.level] ?? "#888";
            return (
              <motion.circle
                key={`node-${i + 7}`}
                cx={n.x} cy={n.y} r={5}
                fill={color} fillOpacity={0.8}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ delay: n.level * 0.3 + 0.2, duration: 0.3 }}
              />
            );
          })}

          {/* Edges */}
          {edges.map(([parent, child], ei) => {
            const p = nodes[parent];
            const c = nodes[child];
            const pLevel = p?.level ?? 0;
            const color = levelColors[pLevel] ?? "#888";
            const midY = (p.y + c.y) / 2;
            return (
              <motion.path
                key={`edge-${ei}`}
                d={`M ${c.x} ${c.y} V ${midY} H ${p.x} V ${p.y}`}
                stroke={color} strokeWidth="1.5" fill="none" strokeOpacity={0.7}
                initial={{ pathLength: 0, opacity: 0 }}
                animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
                transition={{ delay: pLevel * 0.3, duration: 0.5, ease: "easeOut" }}
              />
            );
          })}

          {/* Level labels */}
          {[
            { y: 60, label: "Root", color: "#a855f7" },
            { y: 120, label: "Level 2", color: "#3b82f6" },
            { y: 180, label: "Level 1", color: "#f97316" },
            { y: 240, label: "Leaves", color: "#22c55e" },
          ].map((l) => (
            <text key={l.y} x={8} y={l.y} fontSize="7" fill={l.color} fontFamily="Outfit" fontWeight="600">
              {l.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}
