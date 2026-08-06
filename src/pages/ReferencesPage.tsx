import { motion } from "framer-motion";
import { ExternalLink, Youtube, Wrench, BookOpen } from "lucide-react";
import { references } from "@/data/references";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { ScrollReveal } from "@/components/shared/ScrollReveal";

const TOPIC_LABELS: Record<string, string> = {
  regression: "Regression",
  classification: "Classification",
  clustering: "Clustering",
  general: "General ML",
};

const TOPIC_COLORS: Record<string, string> = {
  regression: "#22c55e",
  classification: "#3b82f6",
  clustering: "#f97316",
  general: "#a855f7",
};

const TYPE_ICONS: Record<string, typeof Youtube> = {
  video: Youtube,
  tool: Wrench,
  article: BookOpen,
};

export default function ReferencesPage() {
  const grouped = references.reduce<Record<string, typeof references>>((acc, ref) => {
    (acc[ref.topic] ??= []).push(ref);
    return acc;
  }, {});

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <ScrollReveal>
        <SectionHeading
          tag="Resources"
          title="References & Further Learning"
          subtitle="Curated videos, tools, and resources to deepen your understanding of machine learning."
          accentColor="#64748b"
          align="center"
        />
      </ScrollReveal>

      {Object.entries(grouped).map(([topic, refs], gi) => (
        <ScrollReveal key={topic} delay={gi * 0.1}>
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span
                className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: `${TOPIC_COLORS[topic]}20`, color: TOPIC_COLORS[topic] }}
              >
                {TOPIC_LABELS[topic]}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {refs.map((ref, i) => {
                const Icon = TYPE_ICONS[ref.type] ?? BookOpen;
                const color = TOPIC_COLORS[topic];
                return (
                  <motion.a
                    key={ref.id}
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.4 }}
                    whileHover={{ y: -3, scale: 1.01 }}
                    className="flex gap-4 p-5 rounded-xl border border-border bg-card hover:shadow-lg transition-all group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 transition-all group-hover:scale-110"
                      style={{ background: `${color}20` }}
                    >
                      <Icon size={18} style={{ color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-heading font-semibold text-sm text-foreground leading-snug">{ref.title}</h4>
                        <ExternalLink size={13} className="text-muted-foreground flex-shrink-0 mt-0.5 group-hover:text-foreground transition-colors" />
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{ref.description}</p>
                      <span
                        className="inline-block mt-2 text-xs px-2 py-0.5 rounded-full"
                        style={{ background: `${color}15`, color }}
                      >
                        {ref.type}
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      ))}

      {/* Credit */}
      <ScrollReveal>
        <div className="text-center p-8 rounded-2xl border border-border bg-card/50">
          <p className="text-2xl mb-3">📚</p>
          <h3 className="font-heading font-bold text-foreground mb-2">Keep Learning!</h3>
          <p className="text-sm text-muted-foreground max-w-md mx-auto">
            These resources are curated to complement the interactive content on this site.
            ML is vast — stay curious and keep experimenting!
          </p>
        </div>
      </ScrollReveal>
    </div>
  );
}
