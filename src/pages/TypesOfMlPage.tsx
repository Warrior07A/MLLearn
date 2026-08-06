import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import MLTriangleDiagram from "@/components/types-of-ml/MLTriangleDiagram";
import MLTypeDetailPanel from "@/components/types-of-ml/MLTypeDetailPanel";
import ComparisonTable from "@/components/types-of-ml/ComparisonTable";
import type { MLTypeId } from "@/data/mlTypes";

export default function TypesOfMlPage() {
  const [selected, setSelected] = useState<MLTypeId | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20">
      {/* Header */}
      <ScrollReveal>
        <SectionHeading
          tag="ML Fundamentals"
          title="Types of Machine Learning"
          subtitle="Machine Learning is broadly categorised into three paradigms. Click any vertex of the triangle to explore each type in depth."
          accentColor="#3b82f6"
          align="center"
        />
      </ScrollReveal>

      {/* Triangle + Detail Panel */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <MLTriangleDiagram selected={selected} onSelect={setSelected} />
          <div className="min-h-[280px] flex items-center">
            {selected ? (
              <MLTypeDetailPanel selected={selected} onClose={() => setSelected(null)} />
            ) : (
              <div className="text-center text-muted-foreground p-8 border border-dashed border-border rounded-2xl w-full">
                <p className="text-4xl mb-3">👆</p>
                <p className="font-heading font-medium text-foreground mb-1">Click a vertex</p>
                <p className="text-sm">Select Supervised, Unsupervised, or Reinforcement Learning to explore its details.</p>
              </div>
            )}
          </div>
        </div>
      </ScrollReveal>

      {/* Comparison Table */}
      <ScrollReveal delay={0.01}>
        <div className="space-y-6">
          <SectionHeading
            tag="Comparison"
            title="Classical vs Data-Driven ML"
            subtitle="How does traditional programming differ from machine learning approaches?"
            accentColor="#3b82f6"
          />
          <ComparisonTable />
        </div>
      </ScrollReveal>

      {/* Quick Summary Cards */}
      <ScrollReveal>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              color: "#22c55e",
              label: "Supervised",
              icon: "🎯",
              text: 'Has a "teacher" — the algorithm is given input-output pairs and learns to map one to the other.',
            },
            {
              color: "#f97316",
              label: "Unsupervised",
              icon: "🔍",
              text: "No teacher — the algorithm discovers its own patterns, clusters, and structure in raw data.",
            },
            {
              color: "#3b82f6",
              label: "Reinforcement",
              icon: "🎮",
              text: "Learns by trial and error — an agent takes actions in an environment and gets rewards or penalties.",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="p-5 rounded-xl border border-border bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg"
              style={{ borderTopColor: item.color, borderTopWidth: 3 }}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xl">{item.icon}</span>
                <span className="font-heading font-bold" style={{ color: item.color }}>
                  {item.label}
                </span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </ScrollReveal>
    </div>
  );
}
