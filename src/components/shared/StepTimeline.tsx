import { motion } from "framer-motion";

interface Step {
  title: string;
  description: string;
}

interface StepTimelineProps {
  steps: Step[];
  color?: string;
}

export function StepTimeline({ steps, color = "#22c55e" }: StepTimelineProps) {
  return (
    <div className="relative flex flex-col gap-0">
      {steps.map((step, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1, duration: 0.4 }}
          className="flex gap-4 relative"
        >
          {/* Line */}
          {i < steps.length - 1 && (
            <div
              className="absolute left-[19px] top-10 w-0.5 h-full -z-0"
              style={{ background: `${color}30` }}
            />
          )}
          {/* Number bubble */}
          <div
            className="relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold font-heading text-white shadow-lg"
            style={{ background: color }}
          >
            {i + 1}
          </div>
          {/* Content */}
          <div className="pb-8 pt-1">
            <h4 className="font-heading font-semibold text-foreground mb-1">{step.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
