export interface LineParams {
  slope: number;
  intercept: number;
  r2: number;
}

/** Computes slope and intercept of the least-squares regression line. */
export function leastSquares(x: number[], y: number[]): LineParams {
  const n = x.length;
  if (n < 2) return { slope: 0, intercept: 0, r2: 0 };

  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((a, xi, i) => a + xi * y[i], 0);
  const sumX2 = x.reduce((a, xi) => a + xi * xi, 0);

  const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX ** 2);
  const intercept = (sumY - slope * sumX) / n;

  // R² = 1 - SS_res / SS_tot
  const meanY = sumY / n;
  const ssTot = y.reduce((a, yi) => a + (yi - meanY) ** 2, 0);
  const ssRes = x.reduce((a, xi, i) => {
    const yPred = slope * xi + intercept;
    return a + (y[i] - yPred) ** 2;
  }, 0);
  const r2 = ssTot === 0 ? 0 : 1 - ssRes / ssTot;

  return { slope, intercept, r2 };
}

/** Predicts y for a given x using slope and intercept. */
export function predict(x: number, slope: number, intercept: number): number {
  return slope * x + intercept;
}
