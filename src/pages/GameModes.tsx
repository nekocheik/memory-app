import { Text, Flex, Stack } from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import type { GameMode, StructureType, MemoryCardType } from "../Types/index";

import { Header } from "../components/Header";

import { Quiz } from "../components/Quiz";
import { useQuery } from "../hooks/useQuery";

import { data } from "../data";
let data2 = data as StructureType[];

function getStructure({ id }: { id: string }): StructureType {
  console.log(id);
  return data2.find(({ id: idC }) => idC === id) as StructureType;
}

const useViewMode = (gameMode: GameMode, id: string) => {
  const { Q }: { Q: string } = useQuery();

  const question = getQuestion(
    getMemoryCard({
      cards: getStructure({ id }),
      Q: Q,
    })
  );

  if (gameMode === "Quiz") {
    return <Quiz currentQuestion={question} />;
  } else if (gameMode === "Repetition") {
    return <div>Mode 2 view</div>;
  } else {
    return <div>Unknown game mode</div>;
  }
};

const getMemoryCard = ({ cards, Q }: { cards: StructureType; Q: string }) => {
  if (Q) {
    return cards.cards[Q as any];
  } else {
    return cards.cards[0];
  }
};

const getQuestion = (card: MemoryCardType): MemoryCardType => {
  return card;
};

export const GameModes = () => {
  const { gameMode = "Quiz", id = "0" } = useParams<{
    gameMode: GameMode;
    id: string;
  }>();

  return (
    <Stack>
      <Header hiddenButton={true} />
      <Flex py={10} justify={"space-between"}>
        <Text pr={20}>{gameMode}</Text>
        <Text>10s</Text>
      </Flex>

      {useViewMode(gameMode, id)}
    </Stack>
  );
};
