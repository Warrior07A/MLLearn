import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import QuizEngine from "@/components/playground/QuizEngine";
import GameCard from "@/components/playground/GameCard";

const games = [
  {
    title: "Waste Sorter",
    description: "Drag waste items into the correct recycling bin. Can you get them all right?",
    emoji: "♻️",
    href: "/supervised#classification",
    color: "#22c55e",
  },
  {
    title: "Regression Line Explorer",
    description: "Adjust the best-fit line manually and see how far you are from the true least-squares solution.",
    emoji: "📈",
    href: "/supervised#regression",
    color: "#3b82f6",
  },
  {
    title: "KNN Classifier",
    description: "Place a new point and adjust K to see how the neighbourhood vote changes the prediction.",
    emoji: "🎯",
    href: "/supervised#knn",
    color: "#a855f7",
  },
  {
    title: "K-Means Playground",
    description: "Step through the K-Means algorithm on random data. Change K and watch the clusters form.",
    emoji: "🔮",
    href: "/unsupervised#kmeans",
    color: "#f97316",
  },
];

export default function PlaygroundPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Quiz Section */}
      <ScrollReveal>
        <div className="space-y-8">
          <SectionHeading
            tag="🧠 Knowledge Check"
            title="ML Quiz"
            subtitle="10 questions covering Supervised, Unsupervised, and Reinforcement Learning. How well do you know your ML?"
            accentColor="#a855f7"
            align="center"
          />
          <QuizEngine />
        </div>
      </ScrollReveal>

      {/* Mini Games */}
      <ScrollReveal>
        <div className="space-y-6">
          <SectionHeading
            tag="🎮 Interactive Games"
            title="Hands-On Experiments"
            subtitle="Jump directly into any of the interactive demos from the course."
            accentColor="#a855f7"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {games.map((game) => (
              <GameCard key={game.title} {...game} />
            ))}
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}
