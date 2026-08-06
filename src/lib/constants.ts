// ML Explorer — colour palette constants (mirrors CSS custom properties)
export const COLORS = {
  supervised: "#22c55e",
  unsupervised: "#f97316",
  reinforcement: "#3b82f6",

  // Cluster palette for K-Means (up to 8 clusters)
  clusters: [
    "#22c55e",
    "#3b82f6",
    "#f97316",
    "#a855f7",
    "#ec4899",
    "#14b8a6",
    "#eab308",
    "#ef4444",
  ],
} as const;

export const ANIMATION = {
  springStiff: 300,
  springDamp: 25,
  durationFast: 0.15,
  durationMed: 0.3,
  durationSlow: 0.6,
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
} as const;
