import { create } from "zustand";
import { MemoryCardType } from "../Types";

interface GameState {
  currentQuestion: MemoryCardType | null;
  questions: MemoryCardType[];
  currentQuestionIndex: number;
  totalQuestions: number;
  gameTimer: number;
  questionTimer: number;
  feedback: string;
  showNextButton: boolean;
  correctAnswer: string | null;
  setCurrentQuestion: (question: MemoryCardType) => void;
  setGameTimer: (timer: number | ((prev: number) => number)) => void;
  setQuestionTimer: (timer: number | ((prev: number) => number)) => void;
  setFeedback: (feedback: string) => void;
  setShowNextButton: (show: boolean) => void;
  setCorrectAnswer: (answer: string | null) => void;
  setCurrentQuestionIndex: (index: number) => void;
  setTotalQuestions: (total: number) => void;
  nextQuestion: () => void;
  setQuestions: (questions: MemoryCardType[]) => void;
}

const useGameStore = create<GameState>((set) => ({
  currentQuestion: null,
  questions: [],
  currentQuestionIndex: 0,
  totalQuestions: 0,
  gameTimer: 300,
  questionTimer: 10,
  feedback: "",
  showNextButton: false,
  correctAnswer: null,
  setCurrentQuestion: (question) => {
    console.log("Setting currentQuestion:", question);
    set({ currentQuestion: question });
  },
  setGameTimer: (timer) =>
    set((state) => {
      const newTimer =
        typeof timer === "function" ? timer(state.gameTimer) : timer;
      console.log("Setting gameTimer:", newTimer);
      return { gameTimer: newTimer };
    }),
  setQuestionTimer: (timer) =>
    set((state) => {
      const newTimer =
        typeof timer === "function" ? timer(state.questionTimer) : timer;
      console.log("Setting questionTimer:", newTimer);
      return { questionTimer: newTimer };
    }),
  setFeedback: (feedback) => {
    console.log("Setting feedback:", feedback);
    set({ feedback });
  },
  setShowNextButton: (show) => {
    console.log("Setting showNextButton:", show);
    set({ showNextButton: show });
  },
  setCorrectAnswer: (answer) => {
    console.log("Setting correctAnswer:", answer);
    set({ correctAnswer: answer });
  },
  setCurrentQuestionIndex: (index) => {
    console.log("Setting currentQuestionIndex:", index);
    set({ currentQuestionIndex: index });
  },
  setTotalQuestions: (total) => {
    console.log("Setting totalQuestions:", total);
    set({ totalQuestions: total });
  },
  nextQuestion: () =>
    set((state) => {
      const nextIndex = state.currentQuestionIndex + 1;
      if (nextIndex < state.questions.length) {
        console.log("Moving to next question, index:", nextIndex);
        return {
          currentQuestionIndex: nextIndex,
          currentQuestion: state.questions[nextIndex],
          questionTimer: 10,
          showNextButton: false,
        };
      }
      return state;
    }),
  setQuestions: (questions) => {
    console.log("Setting questions:", questions);
    set({ questions, currentQuestion: questions[0] });
  },
}));

export default useGameStore;
