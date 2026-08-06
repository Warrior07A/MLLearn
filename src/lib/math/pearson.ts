/** Computes Pearson's r correlation coefficient from two equal-length arrays. */
export function pearsonR(x: number[], y: number[]): number {
  const n = x.length;
  if (n === 0) return 0;
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
  const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);
  const sumY2 = y.reduce((a, yi) => a + yi * yi, 0);

  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt(
    (n * sumX2 - sumX ** 2) * (n * sumY2 - sumY ** 2)
  );
  return denominator === 0 ? 0 : numerator / denominator;
}

/** Returns a label for r value */
export function correlationLabel(r: number): { label: string; color: string } {
  const abs = Math.abs(r);
  if (abs < 0.1) return { label: "No Correlation", color: "#a1a1aa" };
  if (abs < 0.4) return { label: r > 0 ? "Weak Positive" : "Weak Negative", color: r > 0 ? "#86efac" : "#fca5a5" };
  if (abs < 0.7) return { label: r > 0 ? "Moderate Positive" : "Moderate Negative", color: r > 0 ? "#4ade80" : "#f87171" };
  return { label: r > 0 ? "Strong Positive" : "Strong Negative", color: r > 0 ? "#22c55e" : "#ef4444" };
}
