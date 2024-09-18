import { Stack, Card, CardBody, Text } from "@chakra-ui/react";

interface MemoryCardsListProps {
  memoryCards: Array<{ name: string }>;
}

export const MemoryCardsList: React.FC<MemoryCardsListProps> = ({
  memoryCards,
}) => {
  return (
    <Stack mt={4}>
      {memoryCards.map((card, index) => (
        <Card key={index} onClick={() => console.log(card.name)}>
          <CardBody>
            <Text fontWeight={800}>{card.name}</Text>
          </CardBody>
        </Card>
      ))}
    </Stack>
  );
};
