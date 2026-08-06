export interface Reference {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "video" | "tool" | "article";
  topic: "regression" | "classification" | "clustering" | "general";
}

export const references: Reference[] = [
  {
    id: "ref-1",
    title: "Linear Regression — StatQuest",
    description: "A clear visual walkthrough of linear regression, least squares, and R².",
    url: "https://www.youtube.com/watch?v=nk2CQITm_eo",
    type: "video",
    topic: "regression",
  },
  {
    id: "ref-2",
    title: "Pearson Correlation — StatQuest",
    description: "Explains Pearson's r formula and how it measures linear relationship strength.",
    url: "https://www.youtube.com/watch?v=xZ_z8KWkhXE",
    type: "video",
    topic: "regression",
  },
  {
    id: "ref-3",
    title: "K-Nearest Neighbours — StatQuest",
    description: "Visual guide to KNN classification with example walkthroughs.",
    url: "https://www.youtube.com/watch?v=HVXime0nQeI",
    type: "video",
    topic: "classification",
  },
  {
    id: "ref-4",
    title: "K-Means Clustering — StatQuest",
    description: "Step-by-step explanation of the K-Means algorithm with animations.",
    url: "https://www.youtube.com/watch?v=4b5d3muPQmA",
    type: "video",
    topic: "clustering",
  },
  {
    id: "ref-5",
    title: "Teachable Machine by Google",
    description: "Train your own ML model in the browser — no code needed. Great for hands-on exploration.",
    url: "https://teachablemachine.withgoogle.com/",
    type: "tool",
    topic: "general",
  },
  {
    id: "ref-6",
    title: "Visualise K-Means Clustering",
    description: "Interactive K-Means visualisation tool to see the algorithm step by step.",
    url: "https://www.naftaliharris.com/blog/visualizing-k-means-clustering/",
    type: "tool",
    topic: "clustering",
  },
  {
    id: "ref-7",
    title: "Seeing Theory — Probability & Statistics",
    description: "Beautiful interactive visualisations for probability and statistics concepts.",
    url: "https://seeing-theory.brown.edu/",
    type: "tool",
    topic: "general",
  },
];
