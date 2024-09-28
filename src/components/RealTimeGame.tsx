import React from "react";
import { Box, Text, Button, VStack, HStack, Progress } from "@chakra-ui/react";
import useRealTimeGame from "../hooks/useRealTimeGame";
import useGameStore from "../store/gameStore";

interface RealTimeGameProps {
  knowledgeSetId: string;
}

const RealTimeGame: React.FC<RealTimeGameProps> = ({ knowledgeSetId }) => {
  const { gameTimer, questionTimer, handleAnswer } =
    useRealTimeGame(knowledgeSetId);
  const { currentQuestion, feedback } = useGameStore();

  return (
    <Box>
      <Text>
        Game Time Remaining: {Math.floor(gameTimer / 60)}:{gameTimer % 60}
      </Text>
      <Progress value={(gameTimer / 300) * 100} />

      {currentQuestion && (
        <VStack spacing={4}>
          <Text>{currentQuestion.question}</Text>
          <Text>Time Remaining: {questionTimer}</Text>
          <Progress value={(questionTimer / 10) * 100} />
          <HStack spacing={4}>
            {currentQuestion.answers.map((answer, index) => (
              <Button key={index} onClick={() => handleAnswer(answer.text)}>
                {answer.text}
              </Button>
            ))}
          </HStack>
        </VStack>
      )}

      <Text mt={4}>{feedback}</Text>
    </Box>
  );
};

export default RealTimeGame;
