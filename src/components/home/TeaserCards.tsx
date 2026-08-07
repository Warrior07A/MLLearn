import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mlTypes } from "@/data/mlTypes";
import { MagicCard } from "@/components/ui/magic-card";

const pageLinks: Record<string, string> = {
  supervised: "/supervised",
  unsupervised: "/unsupervised",
  reinforcement: "/types-of-ml",
};

const emojis: Record<string, string> = {
  supervised: "🎯",
  unsupervised: "🔍",
  reinforcement: "🎮",
};

export default function TeaserCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
          The Three Pillars of ML
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Machine learning falls into three fundamental learning paradigms — each with a unique approach to finding patterns in data.
        </p>
      </div>

     
    </section>
  );
}
