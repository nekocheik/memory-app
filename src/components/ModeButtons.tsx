import { HStack, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";

interface ModeButtonsProps {
  cardId?: string | null;
}

export const ModeButtons: React.FC<ModeButtonsProps> = ({ cardId = "0" }) => {
  return (
    <HStack spacing={4}>
      <Link to={`/card/${cardId}/Quiz`}>
        <Button colorScheme="blue">Quiz</Button>
      </Link>
      <Link to={`/card/${cardId}/RealTime`}>
        <Button colorScheme="green">Temps Réel</Button>
      </Link>
      <Link to={`/card/${cardId}/Repetition`}>
        <Button colorScheme="purple">Répétition</Button>
      </Link>
    </HStack>
  );
};

export default ModeButtons;
