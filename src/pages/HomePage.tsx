import React, { useEffect, useState } from "react";
import {
  Stack,
  Divider,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  Input,
  Box,
  Text,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import { ModalAddKnowledgeSet } from "../components/modals/addData";
import { MemoryCardsList } from "../components/MemoryCardsList";
import { ModeButtons } from "../components/ModeButtons";
import { useApi } from "../hooks/useApi";

interface ActiveSession {
  gameStateId: string;
  knowledgeSetId: string;
  knowledgeSetName: string;
  currentQuestionIndex: number;
  score: number;
  startTime: string;
}

const HomePage = () => {
  const [openModal, setOpenModal] = useState<(() => void) | null>(null);
  const [memoryCards, setMemoryCards] = useState([]);
  const [activeSessions, setActiveSessions] = useState<ActiveSession[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const { getUserKnowledgeSets, getActiveSessions } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const knowledgeSets = await getUserKnowledgeSets();
      setMemoryCards(knowledgeSets.data);

      const sessions = await getActiveSessions();
      setActiveSessions(sessions.data);
    }

    fetchData();
  }, [getUserKnowledgeSets, getActiveSessions]);

  const resumeSession = (sessionId: string, knowledgeSetId: string) => {
    navigate(`/card/${knowledgeSetId}/Quiz?sessionId=${sessionId}`);
  };

  const filteredMemoryCards = memoryCards.filter((card: any) =>
    card.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ModalAddKnowledgeSet openModal={setOpenModal} />
      <Stack>
        <Header />
        <Divider mt={2} />
        <Tabs>
          <TabList>
            <Tab>Mode</Tab>
            <Tab>Mes Cartes</Tab>
            <Tab>Sessions Actives</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ModeButtons />
            </TabPanel>
            <TabPanel>
              <Input
                borderRadius={40}
                placeholder="Rechercher"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MemoryCardsList memoryCards={filteredMemoryCards} />
            </TabPanel>
            <TabPanel>
              {activeSessions.map((session) => (
                <Box
                  key={session.gameStateId}
                  borderWidth="1px"
                  borderRadius="lg"
                  p={4}
                  mb={4}
                >
                  <Text fontWeight="bold">{session.knowledgeSetName}</Text>
                  <Text>Question: {session.currentQuestionIndex + 1}</Text>
                  <Text>Score: {session.score}</Text>
                  <Button
                    onClick={() =>
                      resumeSession(session.gameStateId, session.knowledgeSetId)
                    }
                  >
                    Reprendre
                  </Button>
                </Box>
              ))}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Stack>
    </>
  );
};

export { HomePage };
