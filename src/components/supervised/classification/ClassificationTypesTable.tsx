import { classificationTypes } from "@/data/classificationTypes";

export default function ClassificationTypesTable() {
  return (
    <div className="space-y-4">
      <h3 className="font-heading font-bold text-foreground">Types of Classification</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {classificationTypes.map((type) => (
          <div
            key={type.id}
            className="p-5 rounded-xl border border-border bg-card"
            style={{ borderLeftColor: type.color, borderLeftWidth: 3 }}
          >
            <div className="flex items-center gap-2 mb-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ background: type.color }}
              />
              <h4 className="font-heading font-semibold text-sm" style={{ color: type.color }}>
                {type.label}
              </h4>
            </div>
            <p className="text-sm text-muted-foreground mb-3">{type.description}</p>
            <div className="flex flex-wrap gap-1.5">
              {type.examples.map((ex) => (
                <span
                  key={ex}
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: `${type.color}15`, color: type.color }}
                >
                  {ex}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
