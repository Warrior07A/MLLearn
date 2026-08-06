export const clusteringMethods = [
  {
    id: "partitioning",
    label: "Partitioning",
    subtitle: "e.g. K-Means",
    description:
      "Divides data into K non-overlapping clusters. Each point belongs to exactly one cluster. Requires specifying K upfront.",
    characteristics: ["Flat structure", "Requires K upfront", "Minimises within-cluster variance", "Fast & scalable"],
    color: "#22c55e",
  },
  {
    id: "density",
    label: "Density-Based",
    subtitle: "e.g. DBSCAN",
    description:
      "Forms clusters based on dense regions of points. Can find arbitrarily shaped clusters and identifies outliers as noise.",
    characteristics: ["No K needed", "Finds outliers automatically", "Arbitrary cluster shapes", "Sensitive to ε & minPts"],
    color: "#f97316",
  },
  {
    id: "distribution",
    label: "Distribution-Based",
    subtitle: "e.g. Gaussian Mixture Models",
    description:
      "Assumes data is generated from a mixture of probability distributions. Points belong to clusters with a probability score.",
    characteristics: ["Probabilistic membership", "Soft cluster boundaries", "Assumes known distributions", "Uses EM algorithm"],
    color: "#a855f7",
  },
  {
    id: "hierarchical",
    label: "Hierarchical",
    subtitle: "e.g. Agglomerative",
    description:
      "Builds a tree-like structure (dendrogram) of clusters. No need to specify K — you choose the cut-point to get any number of clusters.",
    characteristics: ["No K required", "Creates dendrogram", "Deterministic", "O(n²) complexity"],
    color: "#3b82f6",
  },
] as const;
