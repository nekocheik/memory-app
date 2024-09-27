import * as React from "react";
import { useEffect, useState, useCallback } from "react";

import {
  Stack,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Input,
} from "@chakra-ui/react";

import { Header } from "../components/Header";
import { ModalAddKnowledgeSet } from "../components/modals/addData";
import { MemoryCardsList } from "../components/MemoryCardsList";
import { ModeButtons } from "../components/ModeButtons";

import type { KnowledgeSets } from "../Types";
import { useApi } from "../hooks/useApi";

const HomePage = () => {
  const [openModal, setOpenModal] = useState<(() => void) | null>(null);
  const [memoryCards, setMemoryCards] = useState<KnowledgeSets>([]);
  const { getUserKnowledgeSets } = useApi();

  useEffect(() => {
    async function fetchData() {
      const knowledgeSets = await getUserKnowledgeSets(); // Appel à l'API
      setMemoryCards(knowledgeSets.data); // Mise à jour de l'état avec les données récupérées
    }

    fetchData();
  }, []);

  return (
    <>
      <ModalAddKnowledgeSet openModal={(fn) => setOpenModal(fn)} />
      <Stack>
        <Header openModal={openModal} />
        <Divider mt={2} />
        <Tabs>
          <TabList>
            <Tab>Mode</Tab>
            <Tab>Mes Carts</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ModeButtons />
            </TabPanel>
            <TabPanel>
              <Input borderRadius={40} placeholder="Filtre" />
              <MemoryCardsList memoryCards={memoryCards} />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
};

export { HomePage };
