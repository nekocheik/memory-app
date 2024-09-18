import { SimpleGrid, Button } from "@chakra-ui/react";

export const ModeButtons = () => {
  return (
    <SimpleGrid spacing={4}>
      <Button fontSize={23} height={24} w="100%">
        QUIZ
      </Button>
      <Button fontSize={23} height={24} w="100%">
        REPETITION
      </Button>
      <Button fontSize={23} height={24} w="100%">
        SUIVI
      </Button>
    </SimpleGrid>
  );
};
