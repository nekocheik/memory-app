import React, { useState } from "react";
import { VStack, Text, Button, HStack, Box } from "@chakra-ui/react";
import useGameStore from "../store/gameStore";
import useRealTimeGame from "../hooks/useRealTimeGame";

interface RealTimeGameProps {
  knowledgeSetId: string;
  sessionId: string | null;
}

const RealTimeGame: React.FC<RealTimeGameProps> = ({
  knowledgeSetId,
  sessionId,
}) => {
  const { currentQuestion, feedback } = useGameStore();
  const { handleAnswer, handleNextQuestion } = useRealTimeGame(
    knowledgeSetId,
    sessionId || undefined
  );
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const onAnswerClick = (answer: string) => {
    if (selectedAnswer) return;
    setSelectedAnswer(answer);
    handleAnswer(answer);
  };

  if (!currentQuestion) {
    return <Text>Chargement de la question...</Text>;
  }

  return (
    <VStack spacing={4}>
      <Text fontSize="xl">{currentQuestion.question}</Text>
      <HStack spacing={4}>
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => onAnswerClick(answer.text)}
            colorScheme={
              feedback && feedback.correctAnswer === answer.text
                ? "green"
                : selectedAnswer === answer.text
                ? "red"
                : "blue"
            }
            disabled={!!selectedAnswer}
          >
            {answer.text}
          </Button>
        ))}
      </HStack>

      {feedback && (
        <Box
          p={3}
          bg={feedback.correct ? "green.100" : "red.100"}
          borderRadius="md"
        >
          <Text fontWeight="bold">
            {feedback.correct ? "Bonne réponse !" : "Mauvaise réponse."}
          </Text>
          {!feedback.correct && feedback.correctAnswer && (
            <Text>La bonne réponse était : {feedback.correctAnswer}</Text>
          )}
        </Box>
      )}

      {feedback && feedback.showNextButton && (
        <Button onClick={handleNextQuestion} colorScheme="teal">
          Question Suivante
        </Button>
      )}
    </VStack>
  );
};

export default RealTimeGame;
