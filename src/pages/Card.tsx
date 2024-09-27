import { Button, Flex, Stack, Text } from "@chakra-ui/react";

import * as React from "react";

import { Header } from "../components/Header";
import { useParams } from "react-router-dom";

import { data } from "../data";
import type { KnowledgeSet } from "../Types/index";
import { ModeButtons } from "../components/ModeButtons";

export const Card = () => {
  let { id } = useParams();
  const card = (data as KnowledgeSet[]).find((card) => card._id == id);

  return (
    <>
      <Header openModal />
      <Stack>
        <Button width={40} height={14}>
          Retour
        </Button>

        <Stack>
          <Text pt={4} fontWeight={800} fontSize="2xl" textAlign={"center"}>
            {card?.name}
          </Text>
          <ModeButtons cardId={card?._id || null} />
        </Stack>
      </Stack>
    </>
  );
};
