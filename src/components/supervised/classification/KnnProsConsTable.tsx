const pros = [
  "Simple to understand — no training phase needed",
  "Naturally handles multi-class problems",
  "Adapts to new training data instantly (lazy learning)",
  "No assumptions about data distribution",
];

const cons = [
  "Slow prediction — must compute all distances at inference time",
  "High memory usage — stores entire training set",
  "Sensitive to irrelevant features and scale",
  "Poor performance in very high dimensions (curse of dimensionality)",
];

export default function KnnProsConsTable() {
  return (
    <div className="space-y-4">
      <h3 className="font-heading font-bold text-foreground">KNN: Pros & Cons</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="p-5 rounded-xl border border-green-500/30 bg-green-500/5">
          <h4 className="font-heading font-semibold text-green-500 mb-3 flex items-center gap-2">
            <span>✅</span> Advantages
          </h4>
          <ul className="space-y-2">
            {pros.map((pro) => (
              <li key={pro} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-green-500 mt-0.5 flex-shrink-0">+</span>
                {pro}
              </li>
            ))}
          </ul>
        </div>
        <div className="p-5 rounded-xl border border-red-500/30 bg-red-500/5">
          <h4 className="font-heading font-semibold text-red-500 mb-3 flex items-center gap-2">
            <span>⚠️</span> Limitations
          </h4>
          <ul className="space-y-2">
            {cons.map((con) => (
              <li key={con} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="text-red-500 mt-0.5 flex-shrink-0">−</span>
                {con}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
