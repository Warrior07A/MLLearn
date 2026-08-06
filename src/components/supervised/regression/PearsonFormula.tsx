import { FormulaBlock } from "@/components/shared/FormulaBlock";

export default function PearsonFormula() {
  return (
    <div className="space-y-4">
      <h3 className="font-heading font-bold text-lg text-foreground">Pearson's r Formula</h3>
      <FormulaBlock
        math={String.raw`r = \frac{n\sum xy - (\sum x)(\sum y)}{\sqrt{[n\sum x^2 - (\sum x)^2][n\sum y^2 - (\sum y)^2]}}`}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
        {[
          { sym: "n", def: "Number of data points" },
          { sym: "∑xy", def: "Sum of products of paired values" },
          { sym: "∑x, ∑y", def: "Sum of x and y values" },
          { sym: "∑x², ∑y²", def: "Sum of squared values" },
        ].map((item) => (
          <div key={item.sym} className="flex items-start gap-2 p-3 rounded-lg bg-muted/50 border border-border">
            <code className="text-green-500 font-mono font-bold text-xs px-1.5 py-0.5 rounded bg-green-500/10 flex-shrink-0">
              {item.sym}
            </code>
            <span className="text-muted-foreground text-xs">{item.def}</span>
          </div>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">
        <strong className="text-foreground">Interpretation:</strong> r ranges from -1 (perfect negative) to +1 (perfect positive). r = 0 means no linear relationship.
      </p>
    </div>
  );
}
