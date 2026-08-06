import { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { assign, recomputeCentroids, hasConverged, randomPoints, initCentroids } from "@/lib/math/kmeans";
import { COLORS } from "@/lib/constants";

const W = 480, H = 320;
const N_POINTS = 40;

interface KMeansState {
  points: { x: number; y: number }[];
  centroids: { x: number; y: number }[];
  assignments: number[];
  iteration: number;
  converged: boolean;
}

function initState(k: number): KMeansState {
  const points = randomPoints(N_POINTS, W, H);
  const centroids = initCentroids(points, k);
  const assignments = assign(points, centroids);
  return { points, centroids, assignments, iteration: 0, converged: false };
}

export default function KMeansPlayground() {
  const [k, setK] = useState(3);
  const [state, setState] = useState<KMeansState>(() => initState(3));
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const step = useCallback(() => {
    setState((prev) => {
      if (prev.converged) { setIsPlaying(false); return prev; }
      const newCentroids = recomputeCentroids(prev.points, prev.assignments, k);
      const newAssignments = assign(prev.points, newCentroids);
      const converged = hasConverged(prev.assignments, newAssignments);
      if (converged) setIsPlaying(false);
      return {
        ...prev,
        centroids: newCentroids,
        assignments: newAssignments,
        iteration: prev.iteration + 1,
        converged,
      };
    });
  }, [k]);

  const reset = useCallback(() => {
    setIsPlaying(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    setState(initState(k));
  }, [k]);

  useEffect(() => { reset(); }, [k]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(step, 600);
    } else {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [isPlaying, step]);

  // Count reassigned between last two steps (approximate)
  const clusterCounts = state.centroids.map((_, ci) =>
    state.assignments.filter((a) => a === ci).length
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="font-heading font-bold text-foreground text-lg">K-Means Playground</h3>
          <p className="text-sm text-muted-foreground">Watch the algorithm assign points and move centroids step by step.</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <Badge className="font-mono text-xs" style={{ background: "#f9731620", color: "#f97316", borderColor: "#f9731640" }}>
            Iteration {state.iteration}
          </Badge>
          {state.converged && (
            <Badge className="text-xs" style={{ background: "#22c55e20", color: "#22c55e", borderColor: "#22c55e40" }}>
              ✓ Converged
            </Badge>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">K =</span>
          <Slider min={2} max={6} step={1} value={[k]}
            onValueChange={([v]) => setK(v)}
            className="w-28" id="kmeans-k-slider" />
          <span className="font-mono font-bold text-foreground w-4">{k}</span>
        </div>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={step} disabled={state.converged || isPlaying}
            className="text-xs h-8">Step</Button>
          <Button size="sm" onClick={() => setIsPlaying((p) => !p)} disabled={state.converged}
            className="text-xs h-8 bg-orange-500 hover:bg-orange-600 text-white">
            {isPlaying ? "⏸ Pause" : "▶ Auto-Play"}
          </Button>
          <Button size="sm" variant="outline" onClick={reset} className="text-xs h-8">Reset</Button>
        </div>
      </div>

      {/* Canvas */}
      <div className="rounded-xl border border-border bg-card overflow-hidden max-w-3xl mx-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="K-Means visualisation">
          {/* Voronoi-like background color cells (simplified) */}
          {state.points.map((p, i) => (
            <circle key={`point-${i}`}
              cx={p.x} cy={p.y} r={6}
              fill={COLORS.clusters[state.assignments[i]] ?? "#888"}
              fillOpacity={0.75} stroke="white" strokeWidth="1.5"
            />
          ))}
          {/* Centroid lines to closest point (show territory) */}
          {state.centroids.map((c, ci) => {
            const clusterPoints = state.points.filter((_, i) => state.assignments[i] === ci);
            return clusterPoints.map((p, j) => (
              <line key={`${ci}-${j}`}
                x1={c.x} y1={c.y} x2={p.x} y2={p.y}
                stroke={COLORS.clusters[ci] ?? "#888"}
                strokeWidth="0.6" opacity={0.2}
              />
            ));
          })}
          {/* Centroids */}
          {state.centroids.map((c, i) => (
            <g key={`centroid-${i}`}>
              <circle cx={c.x} cy={c.y} r={14}
                fill={COLORS.clusters[i] ?? "#888"} fillOpacity={0.2}
                stroke={COLORS.clusters[i] ?? "#888"} strokeWidth="2" />
              <text x={c.x} y={c.y + 1} textAnchor="middle" dominantBaseline="middle"
                fontSize="9" fontWeight="700" fontFamily="Outfit" fill="white">
                C{i + 1}
              </text>
            </g>
          ))}
        </svg>
      </div>

      {/* Cluster stats */}
      <div className="flex flex-wrap gap-3">
        {state.centroids.map((_, i) => (
          <div key={i} className="flex items-center gap-2 text-xs">
            <span className="w-3 h-3 rounded-full" style={{ background: COLORS.clusters[i] }} />
            <span className="text-muted-foreground">Cluster {i + 1}:</span>
            <span className="font-mono font-bold text-foreground">{clusterCounts[i]} pts</span>
          </div>
        ))}
      </div>
    </div>
  );
}
