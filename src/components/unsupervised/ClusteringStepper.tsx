import { SectionHeading } from "@/components/shared/SectionHeading";
import { StepTimeline } from "@/components/shared/StepTimeline";

const steps = [
  {
    title: "Prepare Data",
    description: "Collect raw, unlabeled data and normalise features so all dimensions contribute equally to distance calculations.",
  },
  {
    title: "Choose Similarity Metric",
    description: "Select how to measure 'closeness' — Euclidean distance, cosine similarity, or Manhattan distance, depending on the data type.",
  },
  {
    title: "Run the Algorithm",
    description: "Apply a clustering method (K-Means, DBSCAN, Hierarchical) that groups similar points and separates dissimilar ones.",
  },
  {
    title: "Interpret Clusters",
    description: "Analyse what makes each cluster unique — label them with domain knowledge to turn raw groupings into actionable insights.",
  },
];

export default function ClusteringStepper() {
  return (
    <div className="space-y-6">
      <SectionHeading
        tag="How it Works"
        title="The Clustering Process"
        subtitle="Unsupervised clustering follows four key stages from raw data to meaningful groups."
        accentColor="#f97316"
      />
      <StepTimeline steps={steps} color="#f97316" />
    </div>
  );
}
