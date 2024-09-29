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
    set((state) => ({
      score: state.score + 10, // Exemple : 10 points par bonne réponse
      correctAnswers: state.correctAnswers + 1,
    })),
  setTotalQuestions: (total) => set({ totalQuestions: total }),
  addBadge: (badge) =>
    set((state) => ({
      badges: [...state.badges, badge],
    })),
  recordPerformance: (questionId, isCorrect) =>
    set((state) => ({
      performance: {
        ...state.performance,
        [questionId]: {
          isCorrect,
          attempts: state.performance[questionId]
            ? state.performance[questionId].attempts + 1
            : 1,
        },
      },
    })),
}));

export default useProgressStore;
