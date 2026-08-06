export const mlTypes = [
  {
    id: "supervised",
    label: "Supervised Learning",
    color: "#22c55e",
    tagline: "Learns from labeled data.",
    bullets: ["Labeled data", "Direct feedback", "Predict outcome/future"],
    examples: ["Linear regression", "Decision trees", "SVM", "Neural networks"],
    description:
      "The algorithm learns from a training dataset that includes both input features and correct output labels. Like a student learning with an answer key.",
  },
  {
    id: "unsupervised",
    label: "Unsupervised Learning",
    color: "#f97316",
    tagline: "Finds hidden structure in unlabeled data.",
    bullets: ["No labels", "No feedback", "Find hidden structure"],
    examples: ["K-means", "Hierarchical clustering", "PCA", "Autoencoders"],
    description:
      "The algorithm explores data without predefined labels, discovering natural patterns, clusters, and relationships on its own.",
  },
  {
    id: "reinforcement",
    label: "Reinforcement Learning",
    color: "#3b82f6",
    tagline: "Learns via trial, error, and reward.",
    bullets: ["Decision process", "Reward system", "Learn series of actions"],
    examples: ["Q-learning", "Deep Q-networks", "Policy gradients", "AlphaGo"],
    description:
      "An agent interacts with an environment, taking actions and receiving rewards or penalties. Over time, it learns the optimal strategy to maximise cumulative reward.",
  },
] as const;

export type MLTypeId = "supervised" | "unsupervised" | "reinforcement";
