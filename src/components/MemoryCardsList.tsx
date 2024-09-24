import { Card, CardBody, Stack, Text } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

import type { StructureType } from "../Types/index";

export const MemoryCardsList = ({
  memoryCards,
}: {
  memoryCards: StructureType[];
}) => {
  return (
    <Stack mt={4}>
      {memoryCards.map((card, index) => (
        <NavLink to={`/memory-card/${card.id}`}>
          <Card key={index} onClick={() => console.log(card.name)}>
            <CardBody>
              <Text fontWeight={800}>{card.name}</Text>
            </CardBody>
          </Card>
        </NavLink>
      ))}
    </Stack>
  );
};
