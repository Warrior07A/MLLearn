export const classificationTypes = [
  {
    id: "binary",
    label: "Binary Classification",
    description: "Only two possible output classes.",
    examples: ["Spam / Not Spam", "Fraud / Legitimate", "Pass / Fail"],
    color: "#22c55e",
  },
  {
    id: "multiclass",
    label: "Multi-Class Classification",
    description: "More than two exclusive output classes.",
    examples: ["Animal species", "Handwritten digits 0-9", "Disease types"],
    color: "#3b82f6",
  },
  {
    id: "multilabel",
    label: "Multi-Label Classification",
    description: "Multiple labels can apply to a single instance.",
    examples: ["Movie genres", "News article tags", "Medical conditions"],
    color: "#a855f7",
  },
  {
    id: "imbalanced",
    label: "Imbalanced Classification",
    description: "One class dominates the dataset significantly.",
    examples: ["Fraud detection", "Rare disease detection", "Defect detection"],
    color: "#f97316",
  },
] as const;
