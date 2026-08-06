import { useState } from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, useDraggable, useDroppable, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { motion, AnimatePresence } from "framer-motion";
import { wasteItems, wasteBins } from "@/data/wasteItems";
import { useProgressStore } from "@/store/progressStore";
import type { WasteItem } from "@/data/wasteItems";

function DraggableItem({ item, disabled }: { item: WasteItem; disabled?: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id: item.id, disabled });
  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={`flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-border bg-card cursor-grab active:cursor-grabbing transition-all select-none ${
        isDragging ? "opacity-30 scale-95" : "hover:scale-105 hover:shadow-lg hover:border-green-500/50"
      } ${disabled ? "opacity-40 pointer-events-none" : ""}`}
      style={transform ? { transform: `translate(${transform.x}px, ${transform.y}px)` } : undefined}
    >
      <span className="text-2xl">{item.emoji}</span>
      <span className="text-xs font-medium text-muted-foreground text-center leading-tight">{item.label}</span>
    </div>
  );
}

function DroppableBin({ bin, correct }: { bin: typeof wasteBins[0]; correct?: boolean | null }) {
  const { setNodeRef, isOver } = useDroppable({ id: bin.id });
  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all min-h-[90px] ${
        bin.color
      } ${
        isOver ? `border-white scale-105 shadow-lg` : `${bin.borderColor}`
      } ${
        correct === true ? "ring-2 ring-green-500" : correct === false ? "ring-2 ring-red-500" : ""
      }`}
    >
      <span className="text-2xl">{bin.emoji}</span>
      <p className="text-xs font-heading font-semibold text-foreground text-center">{bin.label}</p>
      <p className="text-[10px] text-muted-foreground text-center leading-tight">{bin.description}</p>
    </div>
  );
}

export default function WasteSortGame() {
  const [remaining, setRemaining] = useState<WasteItem[]>(wasteItems);
  const [activeItem, setActiveItem] = useState<WasteItem | null>(null);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ binId: string; correct: boolean } | null>(null);
  const [finished, setFinished] = useState(false);
  const setWasteSortScore = useProgressStore((s) => s.setWasteSortScore);

  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 5 } }));

  const handleDragStart = (event: DragStartEvent) => {
    const item = remaining.find((i) => i.id === event.active.id);
    setActiveItem(item ?? null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);
    if (!over) return;

    const item = remaining.find((i) => i.id === active.id);
    if (!item) return;

    const correct = item.correctBin === over.id;
    const newScore = correct ? score + 1 : score;
    setScore(newScore);
    setFeedback({ binId: over.id as string, correct });

    const newRemaining = remaining.filter((i) => i.id !== item.id);
    setRemaining(newRemaining);
    if (newRemaining.length === 0) {
      setFinished(true);
      setWasteSortScore(newScore, wasteItems.length);
    }

    setTimeout(() => {
      setFeedback(null);
    }, 800);
  };

  const reset = () => {
    setRemaining(wasteItems);
    setScore(0);
    setFinished(false);
    setFeedback(null);
  };

  if (finished) {
    const pct = Math.round((score / wasteItems.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12 space-y-4">
        <div className="text-6xl">{pct >= 80 ? "🏆" : pct >= 50 ? "👍" : "📚"}</div>
        <h3 className="font-heading text-2xl font-bold">
          {score}/{wasteItems.length} correct — {pct}%
        </h3>
        <p className="text-muted-foreground">{pct >= 80 ? "Excellent sorting!" : "Keep practising!"}</p>
        <button onClick={reset}
          className="px-6 py-2.5 bg-green-500 text-white rounded-xl font-semibold text-sm hover:bg-green-600 transition-colors">
          Play Again
        </button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h3 className="font-heading font-bold text-foreground">♻️ Waste Sorting Challenge</h3>
          <p className="text-sm text-muted-foreground">Drag each item to its correct bin!</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-foreground">{score}/{wasteItems.length - remaining.length} sorted</span>
          <button onClick={reset} className="text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-lg border border-border">
            Reset
          </button>
        </div>
      </div>

      <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
        {/* Bins */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {wasteBins.map((bin) => (
            <DroppableBin
              key={bin.id}
              bin={bin}
              correct={feedback?.binId === bin.id ? feedback.correct : null}
            />
          ))}
        </div>

        {/* Items */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
          <AnimatePresence>
            {remaining.map((item) => (
              <motion.div key={item.id} layout initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}>
                <DraggableItem item={item} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Drag overlay */}
        <DragOverlay>
          {activeItem && (
            <div className="flex flex-col items-center gap-1 p-3 rounded-xl border-2 border-green-500 bg-card shadow-2xl scale-110">
              <span className="text-2xl">{activeItem.emoji}</span>
              <span className="text-xs font-medium text-center">{activeItem.label}</span>
            </div>
          )}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
