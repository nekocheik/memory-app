// src/pages/GameModes.tsx
import { Text, Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { Header } from "../components/Header";
import { Quiz } from "../components/Quiz";
import RealTimeGame from "../components/RealTimeGame";
import { useApi } from "../hooks/useApi";
import useGameStore from "../store/gameStore";

export const GameModes = () => {
  const { gameMode = "Quiz", id = "0" } = useParams<{
    gameMode: string;
    id: string;
  }>();
  const { currentQuestion, setCurrentQuestion } = useGameStore();
  const { getKnowledgeSetById } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getKnowledgeSetById(id);
        setCurrentQuestion(data?.data);
      } catch (err) {
        console.error("Failed to load knowledge set:", err);
      }
    };
    fetchData();
  }, [id, getKnowledgeSetById, setCurrentQuestion]);

  if (!currentQuestion) return <Text>Loading...</Text>;

  return (
    <Stack>
      <Header hiddenButton={true} />
      <Flex py={10} justify={"space-between"}>
        <Text pr={20}>{gameMode}</Text>
      </Flex>

      {gameMode === "Quiz" && <Quiz currentQuestion={currentQuestion} />}
      {gameMode === "RealTime" && <RealTimeGame knowledgeSetId={id} />}
      {/* Add conditions for other game modes if needed */}
    </Stack>
  );
};
