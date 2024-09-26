import React from "react";
import { MCard } from "../components/GameMode/Card";
import { Stack, Text } from "@chakra-ui/react";
import { MemoryCardType } from "../Types";

export const Quiz = ({
  currentQuestion,
}: {
  currentQuestion: MemoryCardType;
}) => {
  return (
    <Stack>
      <MCard text={currentQuestion.question} />
      <Stack>
        <Text>Réponse </Text>
        {currentQuestion.answers.map((answer) => {
          return <MCard onClick={() => {}} answer={answer} />;
        })}
      </Stack>
    </Stack>
  );
};

export default Quiz;
