import { useState, useRef, useCallback } from "react";
import { Badge } from "@/components/ui/badge";
import { pearsonR, correlationLabel } from "@/lib/math/pearson";

interface DataPoint { x: number; y: number; }

const INITIAL_POINTS: DataPoint[] = [
  { x: 60, y: 220 }, { x: 100, y: 190 }, { x: 140, y: 160 },
  { x: 180, y: 130 }, { x: 220, y: 100 }, { x: 260, y: 140 },
  { x: 300, y: 110 }, { x: 340, y: 80 },
];

const W = 400, H = 300, PAD = 30;

export default function CorrelationScatterDemo() {
  const [points, setPoints] = useState<DataPoint[]>(INITIAL_POINTS);
  const [dragging, setDragging] = useState<number | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const xs = points.map((p) => p.x);
  const ys = points.map((p) => p.y);
  const r = pearsonR(xs, ys);
  const { label, color } = correlationLabel(r);

  const svgPoint = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const clientX = "touches" in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
    const clientY = "touches" in e ? e.touches[0].clientY : (e as React.MouseEvent).clientY;
    const x = ((clientX - rect.left) / rect.width) * W;
    const y = ((clientY - rect.top) / rect.height) * H;
    return {
      x: Math.max(PAD, Math.min(W - PAD, x)),
      y: Math.max(PAD, Math.min(H - PAD, y)),
    };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (dragging === null) return;
    const pt = svgPoint(e);
    if (!pt) return;
    setPoints((prev) => prev.map((p, i) => (i === dragging ? pt : p)));
  }, [dragging, svgPoint]);

  const handleMouseDown = (i: number) => setDragging(i);
  const handleMouseUp = () => setDragging(null);

  const handleSvgClick = (e: React.MouseEvent) => {
    if (dragging !== null) return;
    const pt = svgPoint(e);
    if (!pt) return;
    // Only add if click is not on an existing point
    const hit = points.find((p) => Math.hypot(p.x - pt.x, p.y - pt.y) < 14);
    if (!hit) setPoints((prev) => [...prev, pt]);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <p className="text-sm text-muted-foreground">
          Drag the points or click on the canvas to add new ones. Watch the correlation change live!
        </p>
        <div className="flex items-center gap-3">
          <Badge
            className="font-mono text-sm font-bold px-3 py-1"
            style={{ background: `${color}20`, color, borderColor: `${color}40` }}
          >
            r = {r.toFixed(3)}
          </Badge>
          <Badge
            style={{ background: `${color}15`, color, borderColor: `${color}30` }}
            className="text-xs px-3 py-1"
          >
            {label}
          </Badge>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-3xl mx-auto">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${W} ${H}`}
          className="w-full cursor-crosshair"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onClick={handleSvgClick}
          aria-label="Correlation scatter plot"
        >
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((t) => (
            <g key={t}>
              <line x1={W * t} y1={PAD} x2={W * t} y2={H - PAD} stroke="#27272a" strokeWidth="1" />
              <line x1={PAD} y1={H * t} x2={W - PAD} y2={H * t} stroke="#27272a" strokeWidth="1" />
            </g>
          ))}

          {/* Axes */}
          <line x1={PAD} y1={H - PAD} x2={W - PAD} y2={H - PAD} stroke="#52525b" strokeWidth="1.5" />
          <line x1={PAD} y1={PAD} x2={PAD} y2={H - PAD} stroke="#52525b" strokeWidth="1.5" />

          {/* Points */}
          {points.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r={dragging === i ? 10 : 8}
              fill={color}
              fillOpacity={0.85}
              stroke="white"
              strokeWidth="2"
              className="cursor-grab active:cursor-grabbing transition-all"
              onMouseDown={(e) => { e.stopPropagation(); handleMouseDown(i); }}
            />
          ))}
        </svg>
      </div>
      <p className="text-xs text-muted-foreground text-center">
        Click empty area to add a point • Drag points to reposition • {points.length} points
      </p>
    </div>
  );
}
