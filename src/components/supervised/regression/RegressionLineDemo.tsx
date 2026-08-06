import { useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { leastSquares } from "@/lib/math/leastSquares";
import { Badge } from "@/components/ui/badge";

interface Pt { x: number; y: number; }

const W = 500, H = 320, PAD = 40;

const INITIAL_POINTS: Pt[] = [
  { x: 80, y: 240 }, { x: 120, y: 200 }, { x: 160, y: 220 },
  { x: 200, y: 170 }, { x: 240, y: 150 }, { x: 280, y: 130 },
  { x: 320, y: 100 }, { x: 360, y: 140 }, { x: 400, y: 80 },
];

// Converts SVG y to data space (SVG y is flipped)
const toData = (pt: Pt) => ({ x: (pt.x - PAD) / (W - 2 * PAD), y: 1 - (pt.y - PAD) / (H - 2 * PAD) });
const toSvg = (pt: { x: number; y: number }) => ({
  x: pt.x * (W - 2 * PAD) + PAD,
  y: (1 - pt.y) * (H - 2 * PAD) + PAD,
});

export default function RegressionLineDemo() {
  const [points, setPoints] = useState<Pt[]>(INITIAL_POINTS);
  const [dragging, setDragging] = useState<number | null>(null);
  const [lineY1, setLineY1] = useState(0.7);
  const [lineY2, setLineY2] = useState(0.2);
  const [dragTarget, setDragTarget] = useState<"line" | "start" | "end" | null>(null);
  const [fitted, setFitted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  const dataPoints = points.map(toData);
  const xs = dataPoints.map((p) => p.x);
  const ys = dataPoints.map((p) => p.y);
  const { slope, intercept, r2 } = leastSquares(xs, ys);

  // User's line (x goes 0 to 1)
  const userLine = {
    x1: 0, y1: lineY1,
    x2: 1, y2: lineY2,
  };
  const userSlope = userLine.y2 - userLine.y1;
  const userIntercept = userLine.y1;
  // Sum of squared residuals for user's line
  const userSS = dataPoints.reduce((acc, p) => {
    const pred = userSlope * p.x + userIntercept;
    return acc + (p.y - pred) ** 2;
  }, 0);
  const bestSS = dataPoints.reduce((acc, p) => {
    const pred = slope * p.x + intercept;
    return acc + (p.y - pred) ** 2;
  }, 0);

  const getSvgCoords = useCallback((e: React.MouseEvent) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * W;
    const y = ((e.clientY - rect.top) / rect.height) * H;
    return { x: Math.max(PAD, Math.min(W - PAD, x)), y: Math.max(PAD, Math.min(H - PAD, y)) };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const pt = getSvgCoords(e);
    if (!pt) return;
    const dx = (pt.x - PAD) / (W - 2 * PAD);
    const dy = 1 - (pt.y - PAD) / (H - 2 * PAD);

    if (dragging !== null) {
      setPoints((prev) => prev.map((p, i) => i === dragging ? pt : p));
      setFitted(false);
    } else if (dragTarget === "start") {
      setLineY1(Math.max(0, Math.min(1, dy)));
      setFitted(false);
    } else if (dragTarget === "end") {
      setLineY2(Math.max(0, Math.min(1, dy)));
      setFitted(false);
    }
  }, [dragging, dragTarget, getSvgCoords]);

  const handleMouseUp = () => { setDragging(null); setDragTarget(null); };

  const fitLine = () => {
    setLineY1(intercept);
    setLineY2(slope + intercept);
    setFitted(true);
  };

  const reset = () => {
    setPoints(INITIAL_POINTS);
    setLineY1(0.7);
    setLineY2(0.2);
    setFitted(false);
  };

  // Convert line endpoints to SVG
  const svgL1 = toSvg({ x: 0, y: lineY1 });
  const svgL2 = toSvg({ x: 1, y: lineY2 });
  const bestL1 = toSvg({ x: 0, y: intercept });
  const bestL2 = toSvg({ x: 1, y: slope + intercept });

  const diffPct = Math.max(0, Math.round(((userSS - bestSS) / (bestSS + 0.0001)) * 100));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-heading font-bold text-foreground">Regression Line Explorer</h3>
        <div className="flex gap-2 flex-wrap">
          <Badge className="font-mono text-xs" style={{ background: "#22c55e20", color: "#22c55e", borderColor: "#22c55e40" }}>
            R² = {r2.toFixed(3)}
          </Badge>
          <Badge className={`font-mono text-xs ${fitted ? "bg-green-500/20 text-green-500 border-green-500/40" : "bg-orange-500/20 text-orange-500 border-orange-500/40"}`}>
            {fitted ? "✓ Best fit!" : `SS residuals: ${userSS.toFixed(2)} (${diffPct}% worse)`}
          </Badge>
        </div>
      </div>
      <p className="text-sm text-muted-foreground">
        Drag the <span className="text-orange-400 font-medium">orange handles</span> to adjust your line.
        Drag <span className="text-blue-400 font-medium">blue points</span> to reposition them.
        Hit <strong>Fit for me!</strong> to snap to the least-squares solution.
      </p>

      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-3xl mx-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          aria-label="Regression line demo"
        >
          {/* Grid */}
          {[0.25, 0.5, 0.75].map((t) => (
            <g key={t}>
              <line x1={PAD + t * (W - 2 * PAD)} y1={PAD} x2={PAD + t * (W - 2 * PAD)} y2={H - PAD} stroke="#27272a" strokeWidth="1" />
              <line x1={PAD} y1={PAD + t * (H - 2 * PAD)} x2={W - PAD} y2={PAD + t * (H - 2 * PAD)} stroke="#27272a" strokeWidth="1" />
            </g>
          ))}

          {/* Axes */}
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#52525b" strokeWidth="1.5" />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#52525b" strokeWidth="1.5" />

          {/* Best fit line (shown as reference when fitted=true) */}
          {fitted && (
            <line x1={bestL1.x} y1={bestL1.y} x2={bestL2.x} y2={bestL2.y}
              stroke="#22c55e" strokeWidth="2" strokeDasharray="6 3" opacity={0.5} />
          )}

          {/* Residual lines */}
          {dataPoints.map((p, i) => {
            const pred = userSlope * p.x + userIntercept;
            const ptSvg = toSvg(p);
            const predSvg = toSvg({ x: p.x, y: pred });
            return (
              <line key={i}
                x1={ptSvg.x} y1={ptSvg.y}
                x2={predSvg.x} y2={predSvg.y}
                stroke={fitted ? "#22c55e" : "#f97316"}
                strokeWidth="1" strokeDasharray="3 2" opacity={0.6}
              />
            );
          })}

          {/* User line */}
          <line
            x1={svgL1.x} y1={svgL1.y}
            x2={svgL2.x} y2={svgL2.y}
            stroke={fitted ? "#22c55e" : "#f97316"} strokeWidth="2.5"
            className="cursor-ns-resize"
            onMouseDown={() => setDragTarget("line")}
          />

          {/* Data points */}
          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r={7}
              fill="#3b82f6" fillOpacity={0.8} stroke="white" strokeWidth="2"
              className="cursor-grab"
              onMouseDown={(e) => { e.stopPropagation(); setDragging(i); setFitted(false); }}
            />
          ))}

          {/* Line handles */}
          <circle cx={svgL1.x} cy={svgL1.y} r={10}
            fill="#f97316" fillOpacity={0.8} stroke="white" strokeWidth="2"
            className="cursor-ns-resize"
            onMouseDown={() => setDragTarget("start")}
          />
          <circle cx={svgL2.x} cy={svgL2.y} r={10}
            fill="#f97316" fillOpacity={0.8} stroke="white" strokeWidth="2"
            className="cursor-ns-resize"
            onMouseDown={() => setDragTarget("end")}
          />
        </svg>
      </div>

      <div className="flex gap-3 flex-wrap">
        <Button size="sm" onClick={fitLine} disabled={fitted}
          className="bg-green-500 hover:bg-green-600 text-white text-xs h-8">
          🎯 Fit it for me!
        </Button>
        <Button size="sm" variant="outline" onClick={reset} className="text-xs h-8">
          Reset
        </Button>
      </div>
    </div>
  );
}
