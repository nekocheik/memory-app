import React, { useState, useEffect } from "react";
import { Stack, Text, Button, VStack, Box } from "@chakra-ui/react";
import { MCard } from "./GameMode/Card";
import useGameStore from "../store/gameStore";
import useRealTimeGame from "../hooks/useRealTimeGame";

interface QuizProps {
  knowledgeSetId: string;
  sessionId: string | null;
}

export const Quiz: React.FC<QuizProps> = ({ knowledgeSetId, sessionId }) => {
  const {
    currentQuestion,
    feedback,
    correctAnswer,
    setCorrectAnswer,
    currentQuestionIndex,
    totalQuestions,
  } = useGameStore();
  const { gameTimer, questionTimer, handleAnswer, handleNextQuestion } =
    useRealTimeGame(knowledgeSetId, sessionId || undefined);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);

  // Vérifier la valeur de correctAnswer
  useEffect(() => {
    console.log("Correct Answer:", correctAnswer);
  }, [correctAnswer]);

  if (!currentQuestion) {
    return <Text>Chargement de la question...</Text>;
  }

  const onAnswerClick = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    handleAnswer(answer);
  };

  const onNextClick = () => {
    handleNextQuestion();
    setSelectedAnswer(null);
    setIsAnswered(false);
    setCorrectAnswer(null); // Réinitialise la bonne réponse
  };

  return (
    <VStack spacing={4}>
      <MCard text={currentQuestion.question} />
      <Text>
        Temps de jeu : {Math.floor(gameTimer / 60)}:
        {(gameTimer % 60).toString().padStart(2, "0")}
      </Text>
      <Text>
        Temps pour cette question : {Math.ceil(questionTimer)} secondes
      </Text>
      <Text>
        Question {currentQuestionIndex + 1} sur {totalQuestions}
      </Text>
      <Stack width="100%">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => onAnswerClick(answer.text)}
            colorScheme={
              isAnswered
                ? answer.isCorrect
                  ? "green"
                  : selectedAnswer === answer.text
                  ? "red"
                  : "gray"
                : "blue"
            }
            disabled={isAnswered}
            width="100%"
          >
            {answer.text}
          </Button>
        ))}
      </Stack>
      {isAnswered && (
        <Box width="100%" textAlign="center">
          <Text fontWeight="bold" mb={2}>
            {feedback}
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
