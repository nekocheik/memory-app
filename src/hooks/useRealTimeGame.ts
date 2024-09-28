import { useState, useEffect, useCallback } from "react";
import { io, Socket } from "socket.io-client";
import { MemoryCardType } from "../Types";
import useGameStore from "../store/gameStore";

const useRealTimeGame = (knowledgeSetId: string) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const {
    setCurrentQuestion,
    setGameTimer,
    setQuestionTimer,
    setFeedback,
    gameTimer,
    questionTimer,
  } = useGameStore();

  useEffect(() => {
    const newSocket = io("http://localhost:3000"); // Replace with your server URL
    setSocket(newSocket);

    newSocket.emit("startGame", knowledgeSetId);

    newSocket.on("newQuestion", (question: MemoryCardType) => {
      setCurrentQuestion(question);
      setQuestionTimer(10);
    });

    newSocket.on(
      "feedback",
      (result: { correct: boolean; message: string }) => {
        setFeedback(
          result.correct ? "Correct!" : "Incorrect. " + result.message
        );
      }
    );

    newSocket.on("gameOver", () => {
      setFeedback("Game Over!");
      // Handle game over logic
    });

    return () => {
      newSocket.disconnect();
    };
  }, [knowledgeSetId, setCurrentQuestion, setQuestionTimer, setFeedback]);

  useEffect(() => {
    const timer = setInterval(() => {
      setGameTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, [setGameTimer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimer((prev) => {
        if (prev > 0) {
          return prev - 1;
        } else {
          socket?.emit("timeUp");
          return 0;
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [socket, setQuestionTimer]);

  const handleAnswer = useCallback(
    (answer: string) => {
      socket?.emit("submitAnswer", {
        questionId: useGameStore.getState().currentQuestion?._id,
        answer,
      });
    },
    [socket]
  );

  return {
    gameTimer,
    questionTimer,
    handleAnswer,
  };
};

export default useRealTimeGame;
