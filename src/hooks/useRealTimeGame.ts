import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import useGameStore from "../store/gameStore";

const SOCKET_SERVER_URL =
  process.env.REACT_APP_SOCKET_SERVER_URL || "http://localhost:8000";

interface UseRealTimeGameReturn {
  gameTimer: number;
  questionTimer: number;
  handleAnswer: (answer: string) => void;
  handleNextQuestion: () => void;
}

const useRealTimeGame = (
  knowledgeSetId: string,
  sessionId?: string
): UseRealTimeGameReturn => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    setCurrentQuestion,
    setQuestionTimer,
    setFeedback,
    setShowNextButton,
    setCorrectAnswer,
    setCurrentQuestionIndex,
    setTotalQuestions,
    questionTimer,
    gameTimer,
    setGameTimer,
  } = useGameStore();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const newSocket = io(SOCKET_SERVER_URL, {
      auth: {
        token: token,
      },
    });
    setSocket(newSocket);

    newSocket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    if (sessionId) {
      newSocket.emit("resumeGame", sessionId);
    } else {
      newSocket.emit("startGame", knowledgeSetId);
    }

    newSocket.on("newQuestion", (questionData: any) => {
      console.log("Received newQuestion:", questionData);
      setCurrentQuestion({
        _id: questionData._id,
        question: questionData.question,
        answers: questionData.answers,
        answer: "",
        isResolve: false,
      });
      setFeedback("");
      setShowNextButton(false);

      setCurrentQuestionIndex(questionData.currentQuestionIndex);
      setTotalQuestions(questionData.totalQuestions);

      const { timeRemaining } = questionData;
      setQuestionTimer(timeRemaining);
    });

    newSocket.on("feedback", (result: any) => {
      console.log("Received feedback:", result);
      if (result.timeUp) {
        setFeedback(
          "Temps écoulé ! La bonne réponse était : " + result.correctAnswer
        );
      } else {
        setFeedback(
          result.correct
            ? "Correct !"
            : `Incorrect. La bonne réponse était : ${result.correctAnswer}`
        );
      }
      setCorrectAnswer(result.correctAnswer);
      setShowNextButton(result.showNextButton);
    });

    newSocket.on("gameOver", (data: any) => {
      console.log("Received gameOver:", data);
      setFeedback("Partie terminée ! Votre score : " + data.score);
      setGameTimer(0);
    });

    newSocket.on("error", (message: string) => {
      console.error("Socket error:", message);
      setFeedback("Erreur : " + message);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [
    knowledgeSetId,
    sessionId,
    setCurrentQuestion,
    setQuestionTimer,
    setFeedback,
    setShowNextButton,
    setCurrentQuestionIndex,
    setTotalQuestions,
    setGameTimer,
    setCorrectAnswer,
  ]);

  useEffect(() => {
    if (questionTimer <= 0) return;

    const interval = setInterval(() => {
      setQuestionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [questionTimer, setQuestionTimer]);

  useEffect(() => {
    if (gameTimer <= 0) return;

    const interval = setInterval(() => {
      setGameTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, [gameTimer, setGameTimer]);

  const handleAnswer = useCallback(
    (answer: string) => {
      console.log("Submitting answer:", answer);
      socket?.emit("submitAnswer", {
        answer,
      });
    },
    [socket]
  );

  const handleNextQuestion = useCallback(() => {
    console.log("Requesting next question");
    socket?.emit("nextQuestion");
    setCorrectAnswer(null); // Réinitialise la bonne réponse
  }, [socket, setCorrectAnswer]);

  return {
    gameTimer,
    questionTimer,
    handleAnswer,
    handleNextQuestion,
  };
};

export default useRealTimeGame;
