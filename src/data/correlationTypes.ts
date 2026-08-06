export const correlationTypes = [
  {
    id: "positive",
    label: "Positive Correlation",
    description: "As X increases, Y also increases.",
    rRange: "0.5 to 1.0",
    example: "Height vs. Weight",
    color: "#22c55e",
  },
  {
    id: "negative",
    label: "Negative Correlation",
    description: "As X increases, Y decreases.",
    rRange: "-1.0 to -0.5",
    example: "Temperature vs. Heating cost",
    color: "#ef4444",
  },
  {
    id: "zero",
    label: "Zero / No Correlation",
    description: "No consistent relationship between X and Y.",
    rRange: "-0.3 to 0.3",
    example: "Shoe size vs. Intelligence",
    color: "#a1a1aa",
  },
] as const;
