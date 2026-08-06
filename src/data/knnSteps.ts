export const knnSteps = [
  {
    step: 1,
    title: "Choose K",
    description: "Select the number of nearest neighbours (K) to consider. Small K = noisy, large K = smoother boundaries.",
  },
  {
    step: 2,
    title: "Measure Distance",
    description: "Calculate the Euclidean distance from the new point to every training point: √((x₂-x₁)² + (y₂-y₁)²).",
  },
  {
    step: 3,
    title: "Find K Nearest",
    description: "Sort all distances and pick the K points with the smallest distances to the new point.",
  },
  {
    step: 4,
    title: "Majority Vote",
    description: "Look at the class labels of those K neighbours. The most common label becomes the predicted class.",
  },
  {
    step: 5,
    title: "Assign Class",
    description: "The new point is classified into the winning class. For regression tasks, take the average value instead.",
  },
];
