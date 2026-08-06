import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FormulaBlock } from "@/components/shared/FormulaBlock";

const types = [
  {
    id: "simple",
    label: "Simple Linear Regression",
    emoji: "📈",
    description: "One independent variable predicts one dependent variable. The relationship is modelled as a straight line.",
    formula: String.raw`\hat{y} = a + bx`,
    variables: ["ŷ = predicted output", "x = input feature", "a = y-intercept", "b = slope"],
    example: "Predicting salary (y) from years of experience (x)",
    color: "#22c55e",
  },
  {
    id: "multiple",
    label: "Multiple Linear Regression",
    emoji: "📊",
    description: "Multiple independent variables collectively predict one dependent variable. Extended to n-dimensional space.",
    formula: String.raw`\hat{y} = a + b_1x_1 + b_2x_2 + \cdots + b_nx_n`,
    variables: ["ŷ = predicted output", "x₁…xₙ = input features", "b₁…bₙ = coefficients", "a = intercept"],
    example: "Predicting house price from size, location, age, rooms",
    color: "#3b82f6",
  },
];

export default function LinearRegressionTypes() {
  const [active, setActive] = useState("simple");
  const current = types.find((t) => t.id === active)!;

  return (
    <div className="space-y-5">
      <h3 className="font-heading font-bold text-foreground text-lg">Types of Linear Regression</h3>

      {/* Toggle */}
      <div className="inline-flex p-1 bg-muted rounded-xl gap-1">
        {types.map((t) => (
          <button
            key={t.id}
            onClick={() => setActive(t.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              active === t.id ? "text-white shadow-md" : "text-muted-foreground hover:text-foreground"
            }`}
            style={active === t.id ? { background: t.color } : undefined}
          >
            {t.emoji} {t.label.split(" ")[0]}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="rounded-xl border border-border bg-card p-6 space-y-4"
          style={{ borderTopColor: current.color, borderTopWidth: 3 }}
        >
          <div className="flex items-center gap-3">
            <span className="text-3xl">{current.emoji}</span>
            <h4 className="font-heading font-bold" style={{ color: current.color }}>{current.label}</h4>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{current.description}</p>
          <FormulaBlock math={current.formula} />
          <div className="grid grid-cols-2 gap-2">
            {current.variables.map((v) => (
              <div key={v} className="text-xs px-3 py-1.5 rounded-lg bg-muted border border-border font-mono text-muted-foreground">
                {v}
              </div>
            ))}
          </div>
          <div className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
            <span className="text-base">💡</span>
            <p className="text-xs text-muted-foreground"><strong className="text-foreground">Example:</strong> {current.example}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
