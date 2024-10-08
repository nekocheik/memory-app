import React, { useEffect, useState } from "react";
import { Text, Flex, Stack, Progress, Button, Box } from "@chakra-ui/react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Header } from "../components/Header";
import { Quiz } from "../components/Quiz";
import RealTimeGame from "../components/RealTimeGame";
import { useApi } from "../hooks/useApi";
import useGameStore from "../store/gameStore";
import { KnowledgeSet } from "../Types";
import useProgressStore from "../store/progressStore";

export const GameModes = () => {
  const { gameMode = "Quiz", id = "0" } = useParams<{
    gameMode: string;
    id: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const sessionId = new URLSearchParams(location.search).get("sessionId");
  const {
    gameTimer,
    feedback,
    setGameTimer,
    setQuestions,
    currentQuestionIndex,
    totalQuestions,
    questions,
  } = useGameStore();
  const { getKnowledgeSetById } = useApi();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [knowledgeSet, setKnowledgeSet] = useState<KnowledgeSet | null>(null);

  const { score, correctAnswers, badges, setTotalQuestions } =
    useProgressStore();

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("Fetching knowledge set with id:", id);
        setIsLoading(true);
        const response = await getKnowledgeSetById(id);
        const data = response.data as KnowledgeSet;
        if (data && data.cards && data.cards.length > 0) {
          setKnowledgeSet(data);
          setQuestions(data.cards);
          setGameTimer(data.timeLimit || 300);
          setTotalQuestions(data.cards.length);
        } else {
          setError("No questions found in this knowledge set.");
        }
      } catch (err) {
        console.error("Failed to load knowledge set:", err);
        setError("Failed to load questions. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id, getKnowledgeSetById, setQuestions, setGameTimer, setTotalQuestions]);

  const handleEndGame = () => {
    navigate("/");
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text color="red.500">{error}</Text>;

  return (
    <Stack spacing={4}>
      <Header hiddenButton={true} />
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          {knowledgeSet?.name}
        </Text>
        <Text>
          Temps de jeu : {Math.floor(gameTimer / 60)}:
          {(gameTimer % 60).toString().padStart(2, "0")}
        </Text>
      </Flex>
      <Progress value={(gameTimer / (knowledgeSet?.timeLimit || 300)) * 100} />

      {gameMode === "Quiz" && (
        <Quiz knowledgeSetId={id} sessionId={sessionId} />
      )}
      {gameMode === "RealTime" && (
        <RealTimeGame knowledgeSetId={id} sessionId={sessionId} />
      )}

      {feedback && (
        <Text mt={4}>
          {feedback.correct
            ? "Bonne réponse !"
            : feedback.timeUp
            ? "Temps écoulé !"
            : "Mauvaise réponse."}
        </Text>
      )}

      <Flex justify="space-between">
        <Text>
          Question {currentQuestionIndex + 1} sur {totalQuestions}
        </Text>
        <Button onClick={handleEndGame} colorScheme="red">
          Terminer la partie
        </Button>
      </Flex>
      <Box>
        <Text>Score: {score}</Text>
        <Text>
          Progression: {correctAnswers} / {totalQuestions}
        </Text>
        <Text>Badges débloqués: {badges.join(", ")}</Text>
      </Box>
    </Stack>
  );
};

export default GameModes;
