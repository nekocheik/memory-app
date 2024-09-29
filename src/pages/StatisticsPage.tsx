import React from "react";
import { Box, Text } from "@chakra-ui/react";
import useProgressStore from "../store/progressStore";

export const StatisticsPage = () => {
  const { performance } = useProgressStore();

  console.log("Performance data:", performance);

  if (Object.keys(performance).length === 0) {
    return <Text>Aucune donnée de performance disponible.</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl" fontWeight="bold">
        Statistiques
      </Text>
      {Object.entries(performance).map(([questionId, data]) => (
        <Box key={questionId} p={2} borderWidth="1px" borderRadius="md" mt={2}>
          <Text>
            <strong>Question ID:</strong> {questionId}
          </Text>
          <Text>
            <strong>Correct:</strong> {data.isCorrect ? "Oui" : "Non"}
          </Text>
          <Text>
            <strong>Tentatives:</strong> {data.attempts}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default StatisticsPage;
