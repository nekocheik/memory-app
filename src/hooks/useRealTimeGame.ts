import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import useGameStore from "../store/gameStore";
import useUserStore from "../store";

const useRealTimeGame = (knowledgeSetId: string, sessionId?: string) => {
  const {
    setCurrentQuestion,
    setFeedback,
    setTotalQuestions,
    setCurrentQuestionIndex,
    setGameStateId,
  } = useGameStore();
  const userStore = useUserStore();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    if (!userStore.token) return;

    const socket: Socket = io("http://localhost:8000", {
      auth: {
        token: userStore.token,
      },
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      console.log("Connected to game socket");

      if (sessionId) {
        socket.emit("resumeGame", sessionId);
      } else {
        socket.emit("startGame", knowledgeSetId);
      }
    });

    socket.on("newQuestion", (data) => {
      console.log("Received newQuestion:", data);
      setCurrentQuestion(data);
      setCurrentQuestionIndex(data.currentQuestionIndex);
      setTotalQuestions(data.totalQuestions);
      setGameStateId(data.gameStateId || null);
      setFeedback(null); // Réinitialiser le feedback pour la nouvelle question
    });

    socket.on("feedback", (data) => {
      console.log("Received feedback:", data);
      setFeedback(data); // data doit correspondre au type FeedbackType
    });

    socket.on("gameOver", (data) => {
      console.log("Game over:", data);
      setFeedback({ correct: false, showNextButton: false }); // Vous pouvez ajuster selon vos besoins
    });

    socket.on("error", (errorMessage: string) => {
      console.error("Socket error:", errorMessage);
      setFeedback({ correct: false, showNextButton: false });
    });

    return () => {
      socket.disconnect();
    };
  }, [
    knowledgeSetId,
    sessionId,
    userStore.token,
    setCurrentQuestion,
    setFeedback,
    setTotalQuestions,
    setCurrentQuestionIndex,
    setGameStateId,
  ]);

  const handleAnswer = (answer: string) => {
    if (socketRef.current) {
      socketRef.current.emit("submitAnswer", { answer });
    }
  };

  const handleNextQuestion = () => {
    if (socketRef.current) {
      socketRef.current.emit("nextQuestion");
    }
  };

  return {
    gameTimer: 0,
    questionTimer: 0,
    handleAnswer,
    handleNextQuestion,
    gameStateId: useGameStore.getState().gameStateId,
  };
};

export default useRealTimeGame;
