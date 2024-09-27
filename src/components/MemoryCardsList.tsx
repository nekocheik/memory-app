import { Stack, Card, CardBody, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import type { KnowledgeSets } from "../Types";

export const MemoryCardsList = ({
  memoryCards,
}: {
  memoryCards: KnowledgeSets;
}) => {
  console.log(memoryCards);
  return (
    <Stack mt={4}>
      {memoryCards.map((card) => (
        <NavLink key={card._id} to={`/memory-card/${card._id}`}>
          <Card onClick={() => console.log(card.name)}>
            <CardBody>
              <Text fontWeight={800}>{card.name}</Text>
            </CardBody>
          </Card>
        </NavLink>
      ))}
    </Stack>
  );
};
