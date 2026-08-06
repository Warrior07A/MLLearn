import { useState } from "react";
import { pearsonR, correlationLabel } from "@/lib/math/pearson";
import { pearsonExample } from "@/data/pearsonExample";
import { Badge } from "@/components/ui/badge";

export default function PearsonCalculator() {
  const [rows, setRows] = useState(pearsonExample.rows.map((r) => ({ ...r })));

  const xs = rows.map((r) => r.x);
  const ys = rows.map((r) => r.y);
  const r = pearsonR(xs, ys);
  const { label, color } = correlationLabel(r);

  const update = (i: number, field: "x" | "y", value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return;
    setRows((prev) => prev.map((row, idx) => idx === i ? { ...row, [field]: num } : row));
  };

  const addRow = () => setRows((prev) => [...prev, { x: 0, y: 0 }]);
  const removeRow = (i: number) => setRows((prev) => prev.filter((_, idx) => idx !== i));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h3 className="font-heading font-bold text-foreground">{pearsonExample.title}</h3>
        <div className="flex gap-2">
          <Badge style={{ background: `${color}20`, color, borderColor: `${color}40` }} className="font-mono text-sm">
            r = {r.toFixed(4)}
          </Badge>
          <Badge style={{ background: `${color}15`, color, borderColor: `${color}30` }} className="text-xs">
            {label}
          </Badge>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-muted/50">
            <tr>
              <th className="px-4 py-2 text-left font-heading font-semibold text-muted-foreground">#</th>
              <th className="px-4 py-2 text-left font-heading font-semibold text-green-500">
                {pearsonExample.xLabel}
              </th>
              <th className="px-4 py-2 text-left font-heading font-semibold text-blue-500">
                {pearsonExample.yLabel}
              </th>
              <th className="px-4 py-2" />
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {rows.map((row, i) => (
              <tr key={i} className="hover:bg-muted/30 transition-colors">
                <td className="px-4 py-2 text-muted-foreground text-xs">{i + 1}</td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.x}
                    onChange={(e) => update(i, "x", e.target.value)}
                    className="w-24 bg-transparent border-b border-green-500/30 focus:border-green-500 outline-none px-1 py-0.5 text-sm font-mono text-foreground"
                    id={`pearson-x-${i}`}
                  />
                </td>
                <td className="px-4 py-2">
                  <input
                    type="number"
                    value={row.y}
                    onChange={(e) => update(i, "y", e.target.value)}
                    className="w-24 bg-transparent border-b border-blue-500/30 focus:border-blue-500 outline-none px-1 py-0.5 text-sm font-mono text-foreground"
                    id={`pearson-y-${i}`}
                  />
                </td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => removeRow(i)}
                    className="text-xs text-muted-foreground hover:text-red-500 transition-colors"
                    aria-label="Remove row"
                  >
                    ×
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-muted/30">
            <tr>
              <td colSpan={4} className="px-4 py-2">
                <button
                  onClick={addRow}
                  className="text-xs text-green-500 hover:text-green-400 transition-colors font-medium"
                >
                  + Add row
                </button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Edit any value — r recalculates instantly. The current dataset shows the Age vs Weight example from the PDF.
      </p>
    </div>
  );
}
