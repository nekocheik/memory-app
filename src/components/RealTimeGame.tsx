import React from "react";
import { Box, Text, Button, VStack, HStack, Progress } from "@chakra-ui/react";
import useRealTimeGame from "../hooks/useRealTimeGame";
import useGameStore from "../store/gameStore";
import { MCard } from "./GameMode/Card";

interface RealTimeGameProps {
  knowledgeSetId: string;
  sessionId: string | null;
}

const RealTimeGame: React.FC<RealTimeGameProps> = ({
  knowledgeSetId,
  sessionId,
}) => {
  const { gameTimer, questionTimer, handleAnswer, handleNextQuestion } =
    useRealTimeGame(knowledgeSetId, sessionId || undefined);
  const { currentQuestion, feedback, showNextButton } = useGameStore();

  if (!currentQuestion) {
    return <Text>Waiting for the game to start...</Text>;
  }

  return (
    <VStack spacing={4} align="stretch">
      <Box>
        <Text fontWeight="bold">Game Time Remaining:</Text>
        <Text>
          {Math.floor(gameTimer / 60)}:
          {(gameTimer % 60).toString().padStart(2, "0")}
        </Text>
        <Progress value={(gameTimer / 300) * 100} />
      </Box>

      <MCard text={currentQuestion.question} />

      <Box>
        <Text fontWeight="bold">Time Remaining for this Question:</Text>
        <Text>{Math.ceil(questionTimer)} seconds</Text>
        <Progress value={(questionTimer / 10) * 100} colorScheme="green" />
      </Box>

      <HStack spacing={4} wrap="wrap" justify="center">
        {currentQuestion.answers.map((answer, index) => (
          <Button
            key={index}
            onClick={() => handleAnswer(answer.text)}
            colorScheme="blue"
            isDisabled={questionTimer === 0 || showNextButton}
          >
            {answer.text}
          </Button>
        ))}
      </HStack>

      {feedback && (
        <Box
          p={3}
          bg={feedback.includes("Correct") ? "green.100" : "red.100"}
          borderRadius="md"
        >
          <Text fontWeight="bold">{feedback}</Text>
        </Box>
      )}

      {showNextButton && (
        <Button onClick={handleNextQuestion} colorScheme="teal">
          Next Question
        </Button>
      )}
    </VStack>
  );
};

export default RealTimeGame;
