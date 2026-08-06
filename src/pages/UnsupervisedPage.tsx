import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import FruitClusterAnimation from "@/components/unsupervised/FruitClusterAnimation";
import ClusteringStepper from "@/components/unsupervised/ClusteringStepper";
import ClusteringTypeTabs from "@/components/unsupervised/ClusteringTypeTabs";
import KMeansPlayground from "@/components/unsupervised/KMeansPlayground";
import DendrogramAnimation from "@/components/unsupervised/DendrogramAnimation";
import ClusteringApplications from "@/components/unsupervised/ClusteringApplications";

export default function UnsupervisedPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      <ScrollReveal>
        <SectionHeading
          tag="Unsupervised Learning"
          title="Finding Patterns Without Labels"
          subtitle="Unsupervised learning discovers hidden structure in unlabeled data. No answers provided — the algorithm must find the patterns itself."
          accentColor="#f97316"
          align="center"
        />
      </ScrollReveal>

      <ScrollReveal>
        <FruitClusterAnimation />
      </ScrollReveal>

      <ScrollReveal>
        <ClusteringStepper />
      </ScrollReveal>

      <ScrollReveal>
        <ClusteringTypeTabs />
      </ScrollReveal>

      <ScrollReveal>
        <div className="space-y-4">
          <SectionHeading
            tag="K-Means Algorithm"
            title="K-Means Playground"
            subtitle="Watch the K-Means algorithm converge step by step. Adjust K, then hit Step or Auto-Play."
            accentColor="#f97316"
          />
          <KMeansPlayground />
        </div>
      </ScrollReveal>

      <ScrollReveal>
        <DendrogramAnimation />
      </ScrollReveal>

      <ScrollReveal>
        <ClusteringApplications />
      </ScrollReveal>
    </div>
  );
}
