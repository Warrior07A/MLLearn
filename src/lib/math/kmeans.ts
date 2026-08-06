export type Point = { x: number; y: number };

/** Assigns each point to its nearest centroid, returns array of cluster indices. */
export function assign(points: Point[], centroids: Point[]): number[] {
  return points.map((p) => {
    let best = 0;
    let bestDist = Infinity;
    centroids.forEach((c, i) => {
      const d = (p.x - c.x) ** 2 + (p.y - c.y) ** 2;
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    return best;
  });
}

/** Recomputes centroids as the mean of all assigned points. */
export function recomputeCentroids(
  points: Point[],
  assignments: number[],
  k: number
): Point[] {
  return Array.from({ length: k }, (_, i) => {
    const cluster = points.filter((_, idx) => assignments[idx] === i);
    if (!cluster.length) {
      // Reinitialise empty cluster to a random point
      return points[Math.floor(Math.random() * points.length)] ?? { x: 200, y: 150 };
    }
    const x = cluster.reduce((a, p) => a + p.x, 0) / cluster.length;
    const y = cluster.reduce((a, p) => a + p.y, 0) / cluster.length;
    return { x, y };
  });
}

/** Returns true if assignments didn't change between iterations. */
export function hasConverged(prev: number[], next: number[]): boolean {
  return prev.length === next.length && prev.every((v, i) => v === next[i]);
}

/** Generates N random points within a bounding box. */
export function randomPoints(n: number, width: number, height: number, padding = 20): Point[] {
  return Array.from({ length: n }, () => ({
    x: padding + Math.random() * (width - padding * 2),
    y: padding + Math.random() * (height - padding * 2),
  }));
}

/** Picks K random points from the dataset as initial centroids. */
export function initCentroids(points: Point[], k: number): Point[] {
  const shuffled = [...points].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, k);
}
