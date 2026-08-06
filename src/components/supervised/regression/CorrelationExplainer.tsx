import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { correlationTypes } from "@/data/correlationTypes";

export default function CorrelationExplainer() {
  return (
    <div className="space-y-6">
      <SectionHeading
        tag="Regression"
        title="What is Correlation?"
        subtitle="Correlation measures the strength and direction of the linear relationship between two variables. It's the foundation of regression analysis."
        accentColor="#22c55e"
      />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {correlationTypes.map((type, i) => (
          <motion.div
            key={type.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="p-5 rounded-xl border border-border bg-card text-center"
            style={{ borderTopColor: type.color, borderTopWidth: 3 }}
          >
            <div
              className="inline-flex items-center justify-center w-10 h-10 rounded-lg mb-3 text-lg"
              style={{ background: `${type.color}20` }}
            >
              {type.id === "positive" ? "↗" : type.id === "negative" ? "↘" : "→"}
            </div>
            <h4 className="font-heading font-bold text-sm mb-1" style={{ color: type.color }}>
              {type.label}
            </h4>
            <p className="text-xs text-muted-foreground mb-2">{type.description}</p>
            <div className="text-xs font-mono rounded-md px-2 py-1 inline-block"
              style={{ background: `${type.color}15`, color: type.color }}
            >
              r: {type.rRange}
            </div>
            <p className="text-xs text-muted-foreground mt-2 italic">e.g. {type.example}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
