import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { clusteringMethods } from "@/data/clusteringMethods";

// Simple SVG diagram for each clustering type
function PartitioningDiagram() {
  const clusters = [
    { cx: 90, cy: 90, r: 55, color: "#22c55e", points: [{ x: 70, y: 80 }, { x: 95, y: 70 }, { x: 80, y: 110 }, { x: 110, y: 95 }] },
    { cx: 250, cy: 90, r: 50, color: "#3b82f6", points: [{ x: 235, y: 75 }, { x: 265, y: 80 }, { x: 245, y: 110 }, { x: 275, y: 100 }] },
    { cx: 170, cy: 200, r: 50, color: "#f97316", points: [{ x: 155, y: 185 }, { x: 185, y: 190 }, { x: 160, y: 215 }, { x: 185, y: 215 }] },
  ];
  return (
    <svg viewBox="0 0 340 280" className="w-full max-h-48">
      {clusters.map((c, i) => (
        <g key={i}>
          <circle cx={c.cx} cy={c.cy} r={c.r} fill={c.color} fillOpacity={0.1} stroke={c.color} strokeWidth="1.5" strokeDasharray="4 2" />
          <circle cx={c.cx} cy={c.cy} r={5} fill={c.color} />
          {c.points.map((p, j) => (
            <circle key={j} cx={p.x} cy={p.y} r={5} fill={c.color} fillOpacity={0.8} stroke="white" strokeWidth="1" />
          ))}
        </g>
      ))}
    </svg>
  );
}

function DensityDiagram() {
  const clusterA = [
    { x: 70, y: 100 }, { x: 85, y: 90 }, { x: 95, y: 110 }, { x: 75, y: 120 }, { x: 100, y: 95 }, { x: 80, y: 75 }
  ];
  const clusterB = [
    { x: 230, y: 80 }, { x: 250, y: 95 }, { x: 265, y: 80 }, { x: 240, y: 110 }, { x: 255, y: 120 }, { x: 270, y: 105 }
  ];
  const outliers = [{ x: 160, y: 50 }, { x: 165, y: 200 }];
  return (
    <svg viewBox="0 0 340 200" className="w-full max-h-48">
      {clusterA.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={6} fill="#22c55e" fillOpacity={0.8} stroke="white" strokeWidth="1" />)}
      {clusterB.map((p, i) => <circle key={i} cx={p.x} cy={p.y} r={6} fill="#3b82f6" fillOpacity={0.8} stroke="white" strokeWidth="1" />)}
      {outliers.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r={6} fill="#71717a" fillOpacity={0.6} stroke="white" strokeWidth="1" />
          <text x={p.x + 10} y={p.y + 4} fontSize="8" fill="#71717a" fontFamily="Inter">noise</text>
        </g>
      ))}
    </svg>
  );
}

function DistributionDiagram() {
  const ellipses = [
    { cx: 100, cy: 120, rx: 70, ry: 40, color: "#22c55e", rotate: -20 },
    { cx: 240, cy: 100, rx: 65, ry: 45, color: "#3b82f6", rotate: 15 },
  ];
  return (
    <svg viewBox="0 0 340 200" className="w-full max-h-48">
      <defs>
        {ellipses.map((e, i) => (
          <radialGradient key={i} id={`grad-${i}`} cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={e.color} stopOpacity={0.4} />
            <stop offset="100%" stopColor={e.color} stopOpacity={0.05} />
          </radialGradient>
        ))}
      </defs>
      {ellipses.map((e, i) => (
        <ellipse key={i} cx={e.cx} cy={e.cy} rx={e.rx} ry={e.ry}
          fill={`url(#grad-${i})`} stroke={e.color} strokeWidth="1.5"
          transform={`rotate(${e.rotate} ${e.cx} ${e.cy})`}
        />
      ))}
      <text x="170" y="160" textAnchor="middle" fontSize="8" fill="#71717a" fontFamily="Inter">Probabilistic boundaries</text>
    </svg>
  );
}

function HierarchicalDiagram() {
  // Simple dendrogram
  const leaves = [30, 80, 130, 190, 245, 300];
  const h = 170;
  return (
    <svg viewBox="0 0 340 200" className="w-full max-h-48">
      {leaves.map((x, i) => (
        <circle key={i} cx={x} cy={h} r={6} fill="#3b82f6" fillOpacity={0.8} stroke="white" strokeWidth="1" />
      ))}
      {/* Level 1 merges */}
      {[[30,80,40],[130,190,60],[245,300,60]].map(([x1, x2, y], i) => (
        <g key={i}>
          <line x1={x1} y1={h} x2={x1} y2={h - (y-20)} stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={x2} y1={h} x2={x2} y2={h - (y-20)} stroke="#3b82f6" strokeWidth="1.5" />
          <line x1={x1} y1={h - (y-20)} x2={x2} y2={h - (y-20)} stroke="#3b82f6" strokeWidth="1.5" />
        </g>
      ))}
      {/* Level 2 merges */}
      {[[55, 160, 100],[272, 272, 80]].map(([x1, x2, y], i) => (
        <g key={i}>
          <line x1={x1} y1={h - 20} x2={x1} y2={h - y} stroke="#f97316" strokeWidth="1.5" />
          <line x1={x2} y1={h - 40} x2={x2} y2={h - y} stroke="#f97316" strokeWidth="1.5" />
          <line x1={x1} y1={h - y} x2={x2} y2={h - y} stroke="#f97316" strokeWidth="1.5" />
        </g>
      ))}
      {/* Root */}
      <line x1={107} y1={h-100} x2={107} y2={h-130} stroke="#22c55e" strokeWidth="2" />
      <line x1={272} y1={h-80} x2={272} y2={h-130} stroke="#22c55e" strokeWidth="2" />
      <line x1={107} y1={h-130} x2={272} y2={h-130} stroke="#22c55e" strokeWidth="2" />
    </svg>
  );
}

const DIAGRAMS = {
  partitioning: PartitioningDiagram,
  density: DensityDiagram,
  distribution: DistributionDiagram,
  hierarchical: HierarchicalDiagram,
};

export default function ClusteringTypeTabs() {
  return (
    <div className="space-y-4">
      <h3 className="font-heading font-bold text-foreground text-lg">Clustering Methods</h3>
      <Tabs defaultValue="partitioning">
        <TabsList className="flex flex-wrap h-auto gap-1 p-1">
          {clusteringMethods.map((m) => (
            <TabsTrigger key={m.id} value={m.id} className="text-xs font-medium">
              {m.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {clusteringMethods.map((method) => {
          const Diagram = DIAGRAMS[method.id as keyof typeof DIAGRAMS];
          return (
            <TabsContent key={method.id} value={method.id}>
              <AnimatePresence mode="wait">
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                  className="rounded-xl border border-border bg-card p-5 space-y-4"
                  style={{ borderTopColor: method.color, borderTopWidth: 2 }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold" style={{ color: method.color }}>{method.label}</span>
                    <span className="text-xs text-muted-foreground">({method.subtitle})</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{method.description}</p>
                  {Diagram && <Diagram />}
                  <div className="flex flex-wrap gap-2">
                    {method.characteristics.map((c) => (
                      <span key={c} className="text-xs px-2.5 py-1 rounded-full"
                        style={{ background: `${method.color}15`, color: method.color }}>
                        {c}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          );
        })}
      </Tabs>
    </div>
  );
}
