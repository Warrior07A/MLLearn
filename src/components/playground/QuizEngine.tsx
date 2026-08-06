import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { quizQuestions } from "@/data/quizQuestions";
import { useProgressStore } from "@/store/progressStore";
import { Badge } from "@/components/ui/badge";

const TOPIC_COLORS: Record<string, string> = {
  supervised: "#22c55e",
  unsupervised: "#f97316",
  reinforcement: "#3b82f6",
  general: "#a855f7",
};

export default function QuizEngine() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [localScore, setLocalScore] = useState(0);

  const setQuizScore = useProgressStore((s) => s.setQuizScore);
  const setQuizCompleted = useProgressStore((s) => s.setQuizCompleted);
  const recordAnswer = useProgressStore((s) => s.recordAnswer);
  const resetQuiz = useProgressStore((s) => s.resetQuiz);

  const q = quizQuestions[currentIndex];
  const progress = ((currentIndex) / quizQuestions.length) * 100;
  const color = TOPIC_COLORS[q.topic];

  const handleSelect = (i: number) => {
    if (revealed) return;
    setSelected(i);
  };

  const handleReveal = () => {
    if (selected === null) return;
    const correct = selected === q.correctIndex;
    if (correct) setLocalScore((s) => s + 1);
    recordAnswer(q.id, selected);
    setRevealed(true);
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex((i) => i + 1);
      setSelected(null);
      setRevealed(false);
    } else {
      const finalScore = localScore + (selected === q.correctIndex && revealed ? 0 : 0);
      setQuizScore(finalScore);
      setQuizCompleted(true);
      setCompleted(true);
    }
  };

  const handleReset = () => {
    resetQuiz();
    setCurrentIndex(0);
    setSelected(null);
    setRevealed(false);
    setCompleted(false);
    setLocalScore(0);
  };

  if (completed) {
    const pct = Math.round((localScore / quizQuestions.length) * 100);
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        className="text-center py-16 space-y-6 max-w-lg mx-auto">
        <div className="text-7xl">{pct >= 80 ? "🏆" : pct >= 60 ? "🎯" : "📚"}</div>
        <h2 className="font-heading text-3xl font-bold text-foreground">
          {localScore}/{quizQuestions.length} Correct!
        </h2>
        <div className="w-full bg-muted rounded-full h-3">
          <motion.div
            className="h-3 rounded-full"
            style={{ background: pct >= 80 ? "#22c55e" : pct >= 60 ? "#f97316" : "#ef4444" }}
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, delay: 0.3 }}
          />
        </div>
        <p className="text-muted-foreground">
          {pct >= 80 ? "Excellent! You have a solid grasp of ML fundamentals." :
           pct >= 60 ? "Good job! Review the sections you found tricky." :
           "Keep exploring the lessons and try again!"}
        </p>
        <Button onClick={handleReset} className="bg-green-500 hover:bg-green-600 text-white px-8">
          Try Again
        </Button>
      </motion.div>
    );
  }

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Question {currentIndex + 1} of {quizQuestions.length}</span>
          <span>{localScore} correct so far</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      {/* Question card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.25 }}
          className="rounded-2xl border border-border bg-card p-6 space-y-5"
          style={{ borderTopColor: color, borderTopWidth: 3 }}
        >
          <div className="flex items-center gap-2">
            <Badge style={{ background: `${color}20`, color, borderColor: `${color}40` }} className="text-xs capitalize">
              {q.topic}
            </Badge>
          </div>
          <h3 className="font-heading text-xl font-bold text-foreground leading-snug">{q.question}</h3>

          <div className="space-y-3">
            {q.options.map((option, i) => {
              let style = "border-border bg-muted/30 text-muted-foreground hover:bg-muted/60 hover:text-foreground";
              if (selected === i && !revealed) style = "border-blue-500 bg-blue-500/10 text-foreground";
              if (revealed && i === q.correctIndex) style = "border-green-500 bg-green-500/10 text-green-500 font-semibold";
              if (revealed && i === selected && i !== q.correctIndex) style = "border-red-500 bg-red-500/10 text-red-500";

              return (
                <button
                  key={i}
                  onClick={() => handleSelect(i)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 text-sm transition-all ${style} ${revealed ? "cursor-default" : "cursor-pointer"}`}
                  id={`quiz-option-${currentIndex}-${i}`}
                >
                  <span className="font-mono text-xs mr-2 opacity-60">
                    {String.fromCharCode(65 + i)}.
                  </span>
                  {option}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          <AnimatePresence>
            {revealed && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                className="p-4 rounded-xl bg-muted/50 border border-border text-sm text-muted-foreground overflow-hidden">
                <strong className="text-foreground">💡 Explanation: </strong>
                {q.explanation}
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex gap-3 pt-2">
            {!revealed ? (
              <Button onClick={handleReveal} disabled={selected === null}
                className="bg-green-500 hover:bg-green-600 text-white px-6">
                Check Answer
              </Button>
            ) : (
              <Button onClick={handleNext}
                className="bg-green-500 hover:bg-green-600 text-white px-6">
                {currentIndex < quizQuestions.length - 1 ? "Next Question →" : "See Results →"}
              </Button>
            )}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
