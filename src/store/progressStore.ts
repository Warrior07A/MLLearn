import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ProgressState {
  // Quiz
  quizScore: number;
  quizCompleted: boolean;
  quizAnswers: Record<string, number>; // questionId -> selectedIndex

  // Pages visited
  pagesVisited: Set<string>;

  // Game scores
  wasteSortScore: number;
  wasteSortTotal: number;

  // Actions
  setQuizScore: (score: number) => void;
  setQuizCompleted: (done: boolean) => void;
  recordAnswer: (questionId: string, selectedIndex: number) => void;
  visitPage: (path: string) => void;
  setWasteSortScore: (score: number, total: number) => void;
  resetQuiz: () => void;
}

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      quizScore: 0,
      quizCompleted: false,
      quizAnswers: {},
      pagesVisited: new Set<string>(),
      wasteSortScore: 0,
      wasteSortTotal: 0,

      setQuizScore: (score) => set({ quizScore: score }),
      setQuizCompleted: (done) => set({ quizCompleted: done }),
      recordAnswer: (questionId, selectedIndex) =>
        set((state) => ({
          quizAnswers: { ...state.quizAnswers, [questionId]: selectedIndex },
        })),
      visitPage: (path) =>
        set((state) => ({
          pagesVisited: new Set([...state.pagesVisited, path]),
        })),
      setWasteSortScore: (score, total) =>
        set({ wasteSortScore: score, wasteSortTotal: total }),
      resetQuiz: () =>
        set({ quizScore: 0, quizCompleted: false, quizAnswers: {} }),
    }),
    {
      name: "ml-explorer-progress",
      // Sets are not JSON-serializable, so convert to/from array
      partialize: (state) => ({
        ...state,
        pagesVisited: Array.from(state.pagesVisited),
      }),
      merge: (persisted: unknown, current) => ({
        ...current,
        ...(persisted as object),
        pagesVisited: new Set(
          (persisted as { pagesVisited?: string[] }).pagesVisited ?? []
        ),
      }),
    }
  )
);
