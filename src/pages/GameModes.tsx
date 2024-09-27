import { Text, Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Header } from "../components/Header";
import { Quiz } from "../components/Quiz";
import { useApi } from "../hooks/useApi";
import { MemoryCardType } from "../Types";

export const GameModes = () => {
  const { gameMode = "Quiz", id = "0" } = useParams<{
    gameMode: string;
    id: string;
  }>();
  const [knowledgeSet, setKnowledgeSet] = useState<MemoryCardType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { getKnowledgeSetById } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await getKnowledgeSetById(id);
        setKnowledgeSet(data?.data);
        setError(null);
      } catch (err) {
        setError("Failed to load knowledge set.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, getKnowledgeSetById]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>{error}</Text>;

  return (
    <Stack>
      <Header hiddenButton={true} />
      <Flex py={10} justify={"space-between"}>
        <Text pr={20}>{gameMode}</Text>
        <Text>10s</Text>
      </Flex>

      {gameMode === "Quiz" && knowledgeSet && (
        <Quiz currentQuestion={knowledgeSet} />
      )}
      {/* Add conditions for other game modes if needed */}
    </Stack>
  );
};
