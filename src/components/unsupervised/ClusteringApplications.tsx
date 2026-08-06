import { SectionHeading } from "@/components/shared/SectionHeading";
import { IconGrid } from "@/components/shared/IconGrid";

const applications = [
  { emoji: "🛒", label: "Customer Segmentation", description: "Group shoppers by behaviour" },
  { emoji: "🏥", label: "Medical Imaging", description: "Detect anomalies in scans" },
  { emoji: "💬", label: "Topic Modelling", description: "Cluster news articles by topic" },
  { emoji: "🎵", label: "Music Recommendation", description: "Group similar songs together" },
  { emoji: "🔐", label: "Anomaly Detection", description: "Identify fraud and outliers" },
  { emoji: "📍", label: "Geospatial Analysis", description: "Find city neighbourhood patterns" },
];

export default function ClusteringApplications() {
  return (
    <div className="space-y-6">
      <SectionHeading
        tag="Real World"
        title="Applications of Clustering"
        subtitle="Unsupervised clustering powers discovery across diverse domains."
        accentColor="#f97316"
      />
      <IconGrid items={applications} color="#f97316" columns={3} />
    </div>
  );
}
