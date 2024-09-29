import { SimpleGrid, Button } from "@chakra-ui/react";

import type { GameMode } from "../Types/index";

export const ModeButtons = ({ cardId }: { cardId?: string | null }) => {
  function selectMode(mode: GameMode) {
    console.log({ cardId });
    const newPath = `/card/${cardId}/${mode}`;
    window.location.href = newPath;
  }

  return (
    <SimpleGrid spacing={4}>
      <Button
        onClick={() => selectMode("Quiz")}
        fontSize={23}
        height={24}
        w="100%"
      >
        QUIZ
      </Button>
      <Button
        onClick={() => selectMode("Repetition")}
        fontSize={23}
        height={24}
        w="100%"
      >
        REPETITION
      </Button>
      <Button
        onClick={() => selectMode("FollowUp")}
        fontSize={23}
        height={24}
        w="100%"
      >
        SUIVI
      </Button>
    </SimpleGrid>
  );
};
