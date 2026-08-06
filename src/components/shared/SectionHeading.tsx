interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  accentColor?: string;
  align?: "left" | "center";
  tag?: string;
}

export function SectionHeading({
  title,
  subtitle,
  accentColor = "#22c55e",
  align = "left",
  tag,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "items-center text-center" : "items-start";

  return (
    <div className={`flex flex-col gap-3 ${alignment}`}>
      {tag && (
        <span
          className="text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full inline-block"
          style={{ background: `${accentColor}20`, color: accentColor }}
        >
          {tag}
        </span>
      )}
      <h2 className="font-heading text-4xl md:text-5xl font-extrabold text-foreground leading-tight tracking-tight">
        {title}
      </h2>
      <div
        className="h-1 w-16 rounded-full"
        style={{ background: `linear-gradient(90deg, ${accentColor}, ${accentColor}60)` }}
      />
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
