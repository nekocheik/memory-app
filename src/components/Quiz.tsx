import React, { useState, useEffect } from "react";
import { Stack, Text, Button, VStack, Box } from "@chakra-ui/react";
import { MCard } from "../components/GameMode/Card";
import useGameStore from "../store/gameStore";
import useRealTimeGame from "../hooks/useRealTimeGame";
import { useNavigate } from "react-router-dom";

interface QuizProps {
  knowledgeSetId: string;
  sessionId: string | null;
}

export const Quiz: React.FC<QuizProps> = ({ knowledgeSetId, sessionId }) => {
  const { currentQuestion, feedback, currentQuestionIndex, totalQuestions } =
    useGameStore();
  const { handleAnswer, handleNextQuestion } = useRealTimeGame(
    knowledgeSetId,
    sessionId || undefined
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (feedback && feedback.correct !== undefined) {
      // Gérer le feedback ici
    }
  }, [feedback]);

  const onAnswerClick = (answer: string) => {
    if (selectedAnswer) return; // Empêche de répondre plusieurs fois
    setSelectedAnswer(answer);
    handleAnswer(answer);
  };

  const onNextClick = () => {
    setSelectedAnswer(null);
    handleNextQuestion();
  };

  if (!currentQuestion) {
    return <Text>Chargement de la question...</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <MCard text={currentQuestion.question} />
      <Text>
        Question {currentQuestionIndex + 1} sur {totalQuestions}
      </Text>
      <Stack width="100%" spacing={2}>
        {currentQuestion.answers.map((answer, index) => {
          let colorScheme = "blue";
          if (feedback && selectedAnswer) {
            if (feedback.correctAnswer === answer.text) {
              colorScheme = "green";
            } else if (selectedAnswer === answer.text) {
              colorScheme = "red";
            } else {
              colorScheme = "gray";
            }
          }
          return (
            <Button
              key={index}
              onClick={() => onAnswerClick(answer.text)}
              colorScheme={colorScheme}
              disabled={!!selectedAnswer}
              width="100%"
            >
              {answer.text}
            </Button>
          );
        })}
      </Stack>
      {feedback && feedback.showNextButton && (
        <Box width="100%" textAlign="center">
          <Text fontWeight="bold" mb={2}>
            {feedback.correct ? "Bonne réponse !" : "Mauvaise réponse."}
          </Text>
          <Button colorScheme="blue" onClick={onNextClick} width="100%">
            Question Suivante
          </Button>
        </Box>
      )}
    </VStack>
  );
};

export default Quiz;
