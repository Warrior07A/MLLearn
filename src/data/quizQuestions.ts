export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  topic: "supervised" | "unsupervised" | "reinforcement" | "general";
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: "q1",
    question: "Which type of ML uses labeled training data?",
    options: ["Unsupervised Learning", "Supervised Learning", "Reinforcement Learning", "None of the above"],
    correctIndex: 1,
    explanation: "Supervised Learning trains on data that includes both input features AND correct output labels (the 'answer key').",
    topic: "supervised",
  },
  {
    id: "q2",
    question: "K-Means clustering belongs to which category?",
    options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Semi-supervised Learning"],
    correctIndex: 2,
    explanation: "K-Means is an unsupervised algorithm that groups data into clusters without using labels.",
    topic: "unsupervised",
  },
  {
    id: "q3",
    question: "The Pearson correlation coefficient r = -0.92 indicates:",
    options: ["Weak positive correlation", "Strong positive correlation", "No correlation", "Strong negative correlation"],
    correctIndex: 3,
    explanation: "A value close to -1 (like -0.92) indicates a strong negative correlation — as X increases, Y decreases significantly.",
    topic: "supervised",
  },
  {
    id: "q4",
    question: "In KNN, what does K represent?",
    options: ["The number of features", "The number of training examples", "The number of nearest neighbours to check", "The number of output classes"],
    correctIndex: 2,
    explanation: "K is the number of nearest neighbours whose votes/values are used to predict the class or value of a new point.",
    topic: "supervised",
  },
  {
    id: "q5",
    question: "Which statement is TRUE about unsupervised learning?",
    options: ["It requires labeled data", "It learns from rewards and penalties", "It finds hidden patterns without labels", "It always predicts a numeric output"],
    correctIndex: 2,
    explanation: "Unsupervised learning explores data structure without predefined labels, discovering patterns and clusters organically.",
    topic: "unsupervised",
  },
  {
    id: "q6",
    question: "What does the regression line minimise?",
    options: ["Sum of all x values", "Number of outliers", "Sum of squared residuals", "Mean of y values"],
    correctIndex: 2,
    explanation: "The least-squares regression line minimises the sum of squared residuals (differences between actual and predicted values).",
    topic: "supervised",
  },
  {
    id: "q7",
    question: "Which ML type is used to train game-playing AI like AlphaGo?",
    options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Transfer Learning"],
    correctIndex: 2,
    explanation: "Reinforcement Learning agents learn to play games by trying actions and receiving rewards (winning) or penalties (losing).",
    topic: "reinforcement",
  },
  {
    id: "q8",
    question: "Binary classification outputs:",
    options: ["Exactly 3 classes", "A continuous numeric value", "Exactly 2 classes", "Multiple simultaneous labels"],
    correctIndex: 2,
    explanation: "Binary classification predicts one of exactly two classes, e.g. spam/not-spam or pass/fail.",
    topic: "supervised",
  },
  {
    id: "q9",
    question: "DBSCAN is an example of which clustering method?",
    options: ["Partitioning", "Hierarchical", "Distribution-Based", "Density-Based"],
    correctIndex: 3,
    explanation: "DBSCAN (Density-Based Spatial Clustering) groups closely packed points and marks outliers as noise.",
    topic: "unsupervised",
  },
  {
    id: "q10",
    question: "What is the purpose of a dendrogram?",
    options: ["Show regression coefficients", "Visualise hierarchical cluster merging", "Plot correlation values", "Display neural network weights"],
    correctIndex: 1,
    explanation: "A dendrogram is a tree diagram showing how data points are progressively merged into clusters in hierarchical clustering.",
    topic: "unsupervised",
  },
];
