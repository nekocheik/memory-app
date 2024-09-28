import { create } from "zustand";
import { MemoryCardType } from "../Types";

interface GameState {
  currentQuestion: MemoryCardType | null;
  gameTimer: number;
  questionTimer: number;
  feedback: string;
  setCurrentQuestion: (question: MemoryCardType) => void;
  setGameTimer: (timer: number | ((prev: number) => number)) => void;
  setQuestionTimer: (timer: number | ((prev: number) => number)) => void;
  setFeedback: (feedback: string) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentQuestion: null,
  gameTimer: 300, // 5 minutes in seconds
  questionTimer: 10,
  feedback: "",
  setCurrentQuestion: (question) => set({ currentQuestion: question }),
  setGameTimer: (timer) =>
    set((state) => ({
      gameTimer: typeof timer === "function" ? timer(state.gameTimer) : timer,
    })),
  setQuestionTimer: (timer) =>
    set((state) => ({
      questionTimer:
        typeof timer === "function" ? timer(state.questionTimer) : timer,
    })),
  setFeedback: (feedback) => set({ feedback }),
}));

export default useGameStore;
