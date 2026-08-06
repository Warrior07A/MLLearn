import { useState, useRef, useCallback } from "react";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";

interface Pt { x: number; y: number; category: "A" | "B"; }

const W = 420, H = 300, PAD = 20;

// Fixed training points
const TRAINING_POINTS: Pt[] = [
  { x: 70, y: 80, category: "A" }, { x: 100, y: 120, category: "A" }, { x: 55, y: 150, category: "A" },
  { x: 90, y: 60, category: "A" }, { x: 120, y: 90, category: "A" }, { x: 60, y: 190, category: "A" },
  { x: 140, y: 150, category: "A" }, { x: 80, y: 200, category: "A" },
  { x: 280, y: 90, category: "B" }, { x: 310, y: 130, category: "B" }, { x: 340, y: 80, category: "B" },
  { x: 300, y: 180, category: "B" }, { x: 350, y: 160, category: "B" }, { x: 370, y: 120, category: "B" },
  { x: 260, y: 160, category: "B" }, { x: 390, y: 200, category: "B" },
];

function euclidean(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
}

export default function KnnInteractiveDemo() {
  const [k, setK] = useState(3);
  const [newPoint, setNewPoint] = useState<{ x: number; y: number } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const handleClick = useCallback((e: React.MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    setNewPoint({ x, y });
  }, []);

  const distances = newPoint
    ? TRAINING_POINTS.map((p, i) => ({ i, dist: euclidean(p, newPoint), category: p.category }))
        .sort((a, b) => a.dist - b.dist)
    : [];

  const kNearest = distances.slice(0, k);
  const kNearestIds = new Set(kNearest.map((d) => d.i));

  const votes = kNearest.reduce((acc, d) => {
    acc[d.category] = (acc[d.category] ?? 0) + 1;
    return acc;
  }, {} as Record<string, number>);
  const prediction = kNearest.length > 0
    ? (votes["A"] ?? 0) >= (votes["B"] ?? 0) ? "A" : "B"
    : null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-heading font-bold text-foreground">KNN Interactive Demo</h3>
          <p className="text-sm text-muted-foreground">Click on the canvas to place a new point. Adjust K to see how it affects the classification.</p>
        </div>
        {prediction && (
          <Badge
            className="text-sm font-bold px-4 py-2"
            style={{
              background: prediction === "A" ? "#22c55e20" : "#3b82f620",
              color: prediction === "A" ? "#22c55e" : "#3b82f6",
              borderColor: prediction === "A" ? "#22c55e40" : "#3b82f640",
            }}
          >
            → Classified as Category {prediction}
          </Badge>
        )}
      </div>

      {/* K Slider */}
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground w-8">K =</span>
        <Slider
          min={1} max={8} step={1} value={[k]}
          onValueChange={([v]) => setK(v)}
          className="flex-1"
          id="knn-k-slider"
        />
        <span className="font-mono font-bold text-foreground w-4">{k}</span>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden cursor-crosshair max-w-3xl mx-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full"
          onClick={handleClick}
          aria-label="KNN interactive canvas"
        >
          {/* Decision boundary hint areas */}
          <defs>
            <radialGradient id="areaA" cx="25%" cy="50%">
              <stop offset="0%" stopColor="#22c55e" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="0" />
            </radialGradient>
            <radialGradient id="areaB" cx="80%" cy="50%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
            </radialGradient>
          </defs>
          <rect x="0" y="0" width={W} height={H} fill="url(#areaA)" />
          <rect x="0" y="0" width={W} height={H} fill="url(#areaB)" />

          {/* KNN connection lines */}
          {newPoint && kNearest.map((d) => {
            const pt = TRAINING_POINTS[d.i];
            return (
              <line key={d.i}
                x1={newPoint.x} y1={newPoint.y}
                x2={pt.x} y2={pt.y}
                stroke={pt.category === "A" ? "#22c55e" : "#3b82f6"}
                strokeWidth="1.5" strokeDasharray="5 3" opacity={0.7}
              />
            );
          })}

          {/* Training points */}
          {TRAINING_POINTS.map((p, i) => (
            <circle key={i}
              cx={p.x} cy={p.y} r={kNearestIds.has(i) ? 10 : 7}
              fill={p.category === "A" ? "#22c55e" : "#3b82f6"}
              fillOpacity={kNearestIds.has(i) ? 1 : 0.6}
              stroke="white" strokeWidth={kNearestIds.has(i) ? 2.5 : 1.5}
            />
          ))}

          {/* New point */}
          {newPoint && (
            <>
              <circle cx={newPoint.x} cy={newPoint.y} r={14}
                fill={prediction === "A" ? "#22c55e" : prediction === "B" ? "#3b82f6" : "#f97316"}
                fillOpacity={0.2} stroke="none"
              />
              <circle cx={newPoint.x} cy={newPoint.y} r={9}
                fill={prediction === "A" ? "#22c55e" : prediction === "B" ? "#3b82f6" : "#f97316"}
                stroke="white" strokeWidth="2.5"
              />
              <text x={newPoint.x} y={newPoint.y - 16}
                textAnchor="middle" fontSize="9" fill="#a1a1aa" fontFamily="Inter">
                New
              </text>
            </>
          )}

          {/* Hint when no point */}
          {!newPoint && (
            <text x={W / 2} y={H / 2} textAnchor="middle" fontSize="13" fill="#52525b" fontFamily="Inter">
              Click anywhere to classify a new point
            </text>
          )}

          {/* Legend */}
          <circle cx={16} cy={16} r={5} fill="#22c55e" />
          <text x={26} y={20} fontSize="9" fill="#71717a" fontFamily="Inter">Category A</text>
          <circle cx={100} cy={16} r={5} fill="#3b82f6" />
          <text x={110} y={20} fontSize="9" fill="#71717a" fontFamily="Inter">Category B</text>
        </svg>
      </div>

      {newPoint && (
        <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
          <span>Votes: A={votes["A"] ?? 0}, B={votes["B"] ?? 0}</span>
          <span>•</span>
          <span>{k} nearest neighbours highlighted</span>
          <span>•</span>
          <button onClick={() => setNewPoint(null)} className="text-red-400 hover:text-red-300 transition-colors">
            Clear point
          </button>
        </div>
      )}
    </div>
  );
}
