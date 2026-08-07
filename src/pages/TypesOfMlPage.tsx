import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";
import MLTriangleDiagram from "@/components/types-of-ml/MLTriangleDiagram";
import MLTypeDetailPanel from "@/components/types-of-ml/MLTypeDetailPanel";
import ComparisonTable from "@/components/types-of-ml/ComparisonTable";
import type { MLTypeId } from "@/data/mlTypes";

import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { mlTypes } from "@/data/mlTypes";
import { MagicCard } from "@/components/ui/magic-card";

const pageLinks: Record<string, string> = {
  supervised: "/supervised",
  unsupervised: "/unsupervised",
  reinforcement: "/",
};

const emojis: Record<string, string> = {
  supervised: "🎯",
  unsupervised: "🔍",
  reinforcement: "🎮",
};

export default function TypesOfMlPage() {
  const [selected, setSelected] = useState<MLTypeId | null>(null);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8  space-y-20">

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
      {/* <ScrollReveal>
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
      </ScrollReveal> */}
       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {mlTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.12 }}
            whileHover={{ y: -6 }}
          >
            <Link to={pageLinks[type.id] ?? "/"}>
              <MagicCard className="h-full group cursor-pointer flex flex-col" gradientColor={`${type.color}15`}>
                {/* Top accent bar */}
                <div
                  className="h-1 w-full"
                  style={{ background: type.color }}
                />
                <div className="p-6 flex flex-col gap-4 h-full flex-1">
                  {/* Icon */}
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ background: `${type.color}20` }}
                  >
                    {emojis[type.id]}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3
                      className="font-heading text-xl font-bold mb-2"
                      style={{ color: type.color }}
                    >
                      {type.label}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                      {type.description}
                    </p>
                    <ul className="flex flex-col gap-1.5">
                      {type.bullets.map((b) => (
                        <li
                          key={b}
                          className="flex items-center gap-2 text-xs text-muted-foreground"
                        >
                          <span
                            className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                            style={{ background: type.color }}
                          />
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA */}
                  <div
                    className="flex items-center gap-1 text-sm font-semibold mt-2 transition-gap group-hover:gap-2"
                    style={{ color: type.color }}
                  >
                    Learn more
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </MagicCard>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
