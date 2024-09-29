import { create } from "zustand";

interface Performance {
  [questionId: string]: {
    isCorrect: boolean;
    attempts: number;
  };
}

interface ProgressState {
  score: number;
  correctAnswers: number;
  totalQuestions: number;
  badges: string[];
  performance: Performance;
  incrementScore: () => void;
  setTotalQuestions: (total: number) => void;
  addBadge: (badge: string) => void;
  recordPerformance: (questionId: string, isCorrect: boolean) => void;
}

const useProgressStore = create<ProgressState>((set) => ({
  score: 0,
  correctAnswers: 0,
  totalQuestions: 0,
  badges: [],
  performance: {},
  incrementScore: () =>
    set((state) => {
      const newCorrectAnswers = state.correctAnswers + 1;
      const newScore = state.score + 10;
      const newBadges = [...state.badges];

      // Débloquer un badge tous les 5 bonnes réponses
      if (newCorrectAnswers % 5 === 0) {
        newBadges.push(`Badge ${newCorrectAnswers / 5}`);
      }

      return {
        score: newScore,
        correctAnswers: newCorrectAnswers,
        badges: newBadges,
      };
    }),
  setTotalQuestions: (total) => set({ totalQuestions: total }),
  addBadge: (badge) =>
    set((state) => ({
      badges: [...state.badges, badge],
    })),
  recordPerformance: (questionId, isCorrect) =>
    set((state) => {
      console.log(
        "Recording performance for questionId:",
        questionId,
        "isCorrect:",
        isCorrect
      );
      const currentPerformance = state.performance[questionId] || {
        isCorrect: false,
        attempts: 0,
      };
      const updatedPerformance = {
        ...state.performance,
        [questionId]: {
          isCorrect: currentPerformance.isCorrect || isCorrect,
          attempts: currentPerformance.attempts + 1,
        },
      };
      return { performance: updatedPerformance };
    }),
}));

export default useProgressStore;
