import { useState } from "react";
import { motion } from "framer-motion";
import { mlTypes, type MLTypeId } from "@/data/mlTypes";

interface MLTriangleDiagramProps {
  selected: MLTypeId | null;
  onSelect: (id: MLTypeId | null) => void;
}

// Expanded viewBox: 440 x 420 — gives breathing room for bottom labels
const VERTICES: Record<MLTypeId, { x: number; y: number }> = {
  supervised:    { x: 220, y: 50  },
  unsupervised:  { x: 40,  y: 330 },
  reinforcement: { x: 400, y: 330 },
};

// Label positions — pulled away from the edges so text isn't clipped
const LABEL_OFFSETS: Record<MLTypeId, { x: number; y: number }> = {
  supervised:    { x: 220, y: 10  },   // above the top vertex
  unsupervised:  { x: 72,  y: 366 },   // bottom-left: shifted right so text fits
  reinforcement: { x: 368, y: 366 },   // bottom-right: shifted left so text fits
};

const POLYGON_POINTS = Object.values(VERTICES)
  .map((v) => `${v.x},${v.y}`)
  .join(" ");

export default function MLTriangleDiagram({ selected, onSelect }: MLTriangleDiagramProps) {
  const [hovered, setHovered] = useState<MLTypeId | null>(null);

  const handleClick = (id: MLTypeId) => {
    onSelect(selected === id ? null : id);
  };

  return (
    <div className="flex items-center justify-center">
      <svg
        viewBox="0 0 440 420"
        className="w-full max-w-sm select-none"
        aria-label="ML Types Triangle Diagram"
      >
        {/* Triangle body */}
        <motion.polygon
          points={POLYGON_POINTS}
          fill="none"
          className="stroke-zinc-300 dark:stroke-zinc-500"
          strokeWidth="1.5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Inner glow triangle fill */}
        <polygon
          points={POLYGON_POINTS}
          fill="url(#triGrad)"
          opacity={0.07}
        />

        <defs>
          <radialGradient id="triGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.2" />
          </radialGradient>
        </defs>

        {/* Center label */}
        <text
          x="220"
          y="200"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#71717a"
          fontSize="12"
          fontFamily="Inter, sans-serif"
        >
          Machine
        </text>
        <text
          x="220"
          y="216"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="#71717a"
          fontSize="12"
          fontFamily="Inter, sans-serif"
        >
          Learning
        </text>

        {/* Vertices */}
        {mlTypes.map((type) => {
          const id = type.id as MLTypeId;
          const v = VERTICES[id];
          const lv = LABEL_OFFSETS[id];
          const isActive = selected === id || hovered === id;

          // Each label has two lines: e.g. "Supervised" + "Learning"
          const words = type.label.split(" ");
          const line1 = words[0];
          const line2 = words.slice(1).join(" ");

          return (
            <g
              key={id}
              onClick={() => handleClick(id)}
              onMouseEnter={() => setHovered(id)}
              onMouseLeave={() => setHovered(null)}
              className="cursor-pointer"
              role="button"
              aria-label={type.label}
            >
              {/* Outer glow ring */}
              <motion.circle
                cx={v.x}
                cy={v.y}
                r={isActive ? 32 : 24}
                fill={type.color}
                opacity={isActive ? 0.15 : 0.08}
                animate={{ r: isActive ? 32 : 24 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              {/* Main circle */}
              <motion.circle
                cx={v.x}
                cy={v.y}
                r={isActive ? 20 : 16}
                fill={type.color}
                animate={{ r: isActive ? 20 : 16 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              />

              {/* Label — line 1 */}
              <text
                x={lv.x}
                y={lv.y}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={isActive ? type.color : "#71717a"}
                fontSize="13"
                fontWeight={isActive ? "700" : "600"}
                fontFamily="Outfit, sans-serif"
              >
                {line1}
              </text>

              {/* Label — line 2 (only if there's a second word) */}
              {line2 && (
                <text
                  x={lv.x}
                  y={lv.y + 16}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? type.color : "#71717a"}
                  fontSize="13"
                  fontWeight={isActive ? "700" : "600"}
                  fontFamily="Outfit, sans-serif"
                >
                  {line2}
                </text>
              )}
            </g>
          );
        })}
      </svg>
    </div>
  );
}
