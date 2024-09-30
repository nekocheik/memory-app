import { create } from "zustand";
import { MemoryCardType } from "../Types";

// Définir le type FeedbackType
interface FeedbackType {
  correct?: boolean;
  correctAnswer?: string;
  showNextButton?: boolean;
  timeUp?: boolean;
}

const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

interface GameState {
  currentQuestion: MemoryCardType | null;
  questions: MemoryCardType[];
  currentQuestionIndex: number;
  gameTimer: number;
  questionTimer: number;
  feedback: FeedbackType | null; // Mettre à jour le type ici
  showNextButton: boolean;
  correctAnswer: string | null;
  totalQuestions: number;
  gameStateId: string | null;
  setCurrentQuestion: (question: MemoryCardType) => void;
  setFeedback: (feedback: FeedbackType | null) => void; // Mettre à jour le type ici
  setCorrectAnswer: (answer: string | null) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setTotalQuestions: (total: number) => void;
  setGameStateId: (id: string | null) => void;
  setGameTimer: (timer: number | ((prev: number) => number)) => void;
  setQuestionTimer: (timer: number | ((prev: number) => number)) => void;
  setShowNextButton: (show: boolean) => void;
  nextQuestion: () => void;
  setQuestions: (questions: MemoryCardType[]) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentQuestion: null,
  questions: [],
  currentQuestionIndex: 0,
  gameTimer: 300,
  questionTimer: 10,
  feedback: null, // Initialiser à null
  showNextButton: false,
  correctAnswer: null,
  totalQuestions: 0,
  gameStateId: null,
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setFeedback: (feedback) => set({ feedback }),
  setCorrectAnswer: (answer) => set({ correctAnswer: answer }),
  setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
  setTotalQuestions: (total) => set({ totalQuestions: total }),
  setGameStateId: (id) => set({ gameStateId: id }),
  setGameTimer: (timer) =>
    set((state) => ({
      gameTimer: typeof timer === "function" ? timer(state.gameTimer) : timer,
    })),
  setQuestionTimer: (timer) =>
    set((state) => ({
      questionTimer:
        typeof timer === "function" ? timer(state.questionTimer) : timer,
    })),
  setShowNextButton: (show) => set({ showNextButton: show }),
  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < state.questions.length) {
        return {
          currentQuestionIndex: nextIndex,
          currentQuestion: state.questions[nextIndex],
          questionTimer: 10,
          showNextButton: false,
          correctAnswer: null,
        };
      }
      return state;
    }),
  setQuestions: (questions) =>
    set({
      questions,
      currentQuestion: questions[0],
      totalQuestions: questions.length,
    }),
}));

export default useGameStore;
