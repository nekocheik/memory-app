import * as React from "react";
import { useState, useCallback } from "react";

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
import { ModalAddNewData } from "../components/modals/addData";
import { MemoryCardsList } from "../components/MemoryCardsList";
import { ModeButtons } from "../components/ModeButtons";

import { data } from "../data";

const HomePage = () => {
  const [openModal, setOpenModal] = useState<(() => void) | null>(null);
  const [memoryCards] = useState(data);

  return (
    <>
      <ModalAddNewData openModal={(fn) => setOpenModal} />
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
