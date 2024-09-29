import React, { useEffect, useState } from "react";
import { Box, Text, VStack, Button, Spinner, Stack } from "@chakra-ui/react";
import { useNavigate, useLocation } from "react-router-dom";
import { useApi } from "../hooks/useApi";

interface PerformanceEntry {
  questionId: string;
  isCorrect: boolean;
  attempts: number;
}

interface SummaryData {
  score: number;
  performance: PerformanceEntry[];
  totalQuestions: number;
  knowledgeSetName: string;
}

export const SummaryPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const gameStateId = queryParams.get("gameStateId");

  const [summaryData, setSummaryData] = useState<SummaryData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { getGamePerformance } = useApi(); // Utiliser useApi pour récupérer les performances

  useEffect(() => {
    const fetchSummary = async () => {
      if (!gameStateId || gameStateId === "null") {
        setError("Identifiant de session manquant ou invalide.");
        setLoading(false);
        return;
      }

      try {
        const response = await getGamePerformance(gameStateId);
        if (response.error) {
          setError(
            response.message || "Erreur lors de la récupération des données."
          );
        } else {
          setSummaryData(response.data);
        }
      } catch (err) {
        console.error(err);
        setError("Erreur lors de la récupération des données.");
      } finally {
        setLoading(false);
      }
    };

    fetchSummary();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameStateId]);

  const handleReturnHome = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <Box textAlign="center" mt="10">
        <Spinner size="xl" />
        <Text mt={4}>Chargement des données...</Text>
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" mt="10">
        <Text color="red.500">{error}</Text>
        <Button mt={4} colorScheme="blue" onClick={handleReturnHome}>
          Retour à l'Accueil
        </Button>
      </Box>
    );
  }

  return (
    <Box maxW="lg" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg">
      <VStack spacing="6" align="start">
        <Text fontSize="2xl" fontWeight="bold">
          Résumé de la Partie
        </Text>
        <Text>Nom du Set: {summaryData?.knowledgeSetName}</Text>
        <Text>Score Total: {summaryData?.score}</Text>
        <Text>
          Réponses Correctes:{" "}
          {summaryData?.performance.filter((p) => p.isCorrect).length} /{" "}
          {summaryData?.totalQuestions}
        </Text>
        <Box w="100%">
          <Text fontWeight="bold" mb={2}>
            Détails des Questions:
          </Text>
          <Stack>
            {summaryData?.performance.map((entry) => (
              <Box
                key={entry.questionId}
                p={2}
                borderWidth="1px"
                borderRadius="md"
                mt={2}
              >
                <Text>Question ID: {entry.questionId}</Text>
                <Text>Correcte: {entry.isCorrect ? "Oui" : "Non"}</Text>
                <Text>Tentatives: {entry.attempts}</Text>
              </Box>
            ))}
          </Stack>
        </Box>
        <Button colorScheme="blue" onClick={handleReturnHome}>
          Retour à l'Accueil
        </Button>
      </VStack>
    </Box>
  );
};

export default SummaryPage;
