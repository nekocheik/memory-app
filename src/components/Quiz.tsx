import React from "react";
import { MCard } from "../components/GameMode/Card";
import { Stack, Text } from "@chakra-ui/react";

export const Quiz = ({ currentQuestion }: any) => {
  return (
    <Stack>
      <MCard text={currentQuestion.question} />
      <Stack>
        <Text>Réponse </Text>
        <MCard text={currentQuestion.answers[0].text} />
        <MCard text={currentQuestion.answers[1].text} />
        <MCard text={currentQuestion.answers[2].text} />
      </Stack>
    </Stack>
  );
};

export default Quiz;
