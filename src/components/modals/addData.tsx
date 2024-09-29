import React, { useState, useEffect } from "react";
import {
  FormControl,
  FormLabel,
  Textarea,
  Input,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Box,
  VStack,
  HStack,
  Checkbox,
  IconButton,
  NumberInput,
  NumberInputField,
  useToast,
} from "@chakra-ui/react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { useApi } from "../../hooks/useApi";

export function ModalAddKnowledgeSet({
  openModal,
}: {
  openModal: (fn: () => void) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addKnowledgeSet } = useApi();
  const toast = useToast();

  const [mode, setMode] = useState<"text" | "form">("form");

  // États pour le mode formulaire
  const [knowledgeSetName, setKnowledgeSetName] = useState("");
  const [knowledgeSetTimeLimit, setKnowledgeSetTimeLimit] = useState(300);
  const [cards, setCards] = useState([
    {
      question: "",
      answers: [{ text: "", isCorrect: false }],
      timeLimit: 15,
    },
  ]);

  // État pour le mode texte
  const [jsonInput, setJsonInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  useEffect(() => {
    openModal(() => onOpen);
  }, []);

  // Synchroniser les données lorsque le mode change
  useEffect(() => {
    if (mode === "text") {
      // Convertir les données du formulaire en JSON
      const knowledgeSet = {
        name: knowledgeSetName,
        timeLimit: knowledgeSetTimeLimit,
        cards: cards,
      };
      setJsonInput(JSON.stringify(knowledgeSet, null, 2));
    } else if (mode === "form") {
      // Tenter de parser le JSON et mettre à jour les états du formulaire
      try {
        if (jsonInput.trim() !== "") {
          const parsedData = JSON.parse(jsonInput);
          setKnowledgeSetName(parsedData.name || "");
          setKnowledgeSetTimeLimit(parsedData.timeLimit || 300);
          setCards(parsedData.cards || []);
          setErrorMessage("");
        }
      } catch (error) {
        setErrorMessage(
          "Le format JSON est invalide. Veuillez corriger les erreurs avant de passer en mode formulaire."
        );
        // Rester en mode texte si le JSON est invalide
        setMode("text");
        toast({
          title: "Erreur de format JSON",
          description:
            "Le format JSON est invalide. Veuillez corriger les erreurs avant de passer en mode formulaire.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode]);

  // Fonction pour gérer le changement de mode
  const handleModeChange = (index: number) => {
    const newMode = index === 0 ? "form" : "text";
    setMode(newMode);
  };

  // Fonction de validation des cartes
  const validateCards = (cards: any[]) => {
    for (const card of cards) {
      if (!card.question || card.question.trim() === "") {
        setErrorMessage("Chaque carte doit avoir une question.");
        return false;
      }
      if (!Array.isArray(card.answers) || card.answers.length === 0) {
        setErrorMessage("Chaque carte doit avoir au moins une réponse.");
        return false;
      }
      const hasCorrectAnswer = card.answers.some((a: any) => a.isCorrect);
      if (!hasCorrectAnswer) {
        setErrorMessage(
          "Chaque carte doit avoir au moins une réponse correcte."
        );
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async () => {
    try {
      let knowledgeSetData;
      if (mode === "text") {
        knowledgeSetData = JSON.parse(jsonInput);
        // Valider les données du JSON
        if (!knowledgeSetData.name || knowledgeSetData.name.trim() === "") {
          setErrorMessage("Le nom du knowledge set est requis.");
          return;
        }
        if (!Array.isArray(knowledgeSetData.cards)) {
          setErrorMessage("Les cartes doivent être un tableau.");
          return;
        }
        if (!validateCards(knowledgeSetData.cards)) {
          return;
        }
      } else {
        // Mode formulaire
        knowledgeSetData = {
          name: knowledgeSetName,
          timeLimit: knowledgeSetTimeLimit,
          cards: cards,
        };
        // Valider les données du formulaire
        if (!knowledgeSetName || knowledgeSetName.trim() === "") {
          setErrorMessage("Le nom du knowledge set est requis.");
          return;
        }
        if (!validateCards(cards)) {
          return;
        }
      }

      await addKnowledgeSet(knowledgeSetData);
      setErrorMessage("");
      onClose();
      toast({
        title: "Succès",
        description: "Le knowledge set a été ajouté avec succès.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error(error);
      setErrorMessage(
        "Une erreur est survenue lors de l'ajout du knowledge set."
      );
    }
  };

  // Fonctions pour gérer les cartes et les réponses en mode formulaire
  const addCard = () => {
    setCards([
      ...cards,
      {
        question: "",
        answers: [{ text: "", isCorrect: false }],
        timeLimit: 15,
      },
    ]);
  };

  const removeCard = (index: number) => {
    const newCards = [...cards];
    newCards.splice(index, 1);
    setCards(newCards);
  };

  const handleCardChange = (index: number, field: string, value: any) => {
    const newCards = [...cards];
    (newCards as any)[index][field] = value;
    setCards(newCards);
  };

  const addAnswer = (cardIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].answers.push({ text: "", isCorrect: false });
    setCards(newCards);
  };

  const removeAnswer = (cardIndex: number, answerIndex: number) => {
    const newCards = [...cards];
    newCards[cardIndex].answers.splice(answerIndex, 1);
    setCards(newCards);
  };

  const handleAnswerChange = (
    cardIndex: number,
    answerIndex: number,
    field: string,
    value: any
  ) => {
    const newCards = [...cards];
    (newCards as any)[cardIndex].answers[answerIndex][field] = value;
    setCards(newCards);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl" scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Ajouter un Nouveau Knowledge Set</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Tabs
            mt={4}
            variant="enclosed"
            isFitted
            onChange={handleModeChange}
            index={mode === "form" ? 0 : 1}
          >
            <TabList>
              <Tab>Mode Formulaire</Tab>
              <Tab>Mode Texte</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {/* Mode Formulaire */}
                <FormControl>
                  <FormLabel>Nom du Set</FormLabel>
                  <Input
                    placeholder="Nom du Set"
                    value={knowledgeSetName}
                    onChange={(e) => setKnowledgeSetName(e.target.value)}
                  />
                </FormControl>

                <FormControl mt={4}>
                  <FormLabel>Temps Total (secondes)</FormLabel>
                  <NumberInput
                    min={1}
                    value={knowledgeSetTimeLimit}
                    onChange={(valueString) =>
                      setKnowledgeSetTimeLimit(parseInt(valueString))
                    }
                  >
                    <NumberInputField />
                  </NumberInput>
                </FormControl>

                {cards.map((card, cardIndex) => (
                  <Box
                    key={cardIndex}
                    borderWidth="1px"
                    borderRadius="md"
                    p={4}
                    mt={4}
                  >
                    <HStack justifyContent="space-between">
                      <FormLabel>Carte {cardIndex + 1}</FormLabel>
                      <IconButton
                        icon={<DeleteIcon />}
                        aria-label="Supprimer la carte"
                        size="sm"
                        onClick={() => removeCard(cardIndex)}
                        isDisabled={cards.length === 1}
                      />
                    </HStack>
                    <FormControl mt={2}>
                      <FormLabel>Question</FormLabel>
                      <Input
                        placeholder="Question"
                        value={card.question}
                        onChange={(e) =>
                          handleCardChange(
                            cardIndex,
                            "question",
                            e.target.value
                          )
                        }
                      />
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Limite de Temps (secondes)</FormLabel>
                      <NumberInput
                        min={1}
                        value={card.timeLimit}
                        onChange={(valueString) =>
                          handleCardChange(
                            cardIndex,
                            "timeLimit",
                            parseInt(valueString)
                          )
                        }
                      >
                        <NumberInputField />
                      </NumberInput>
                    </FormControl>
                    <FormControl mt={2}>
                      <FormLabel>Réponses</FormLabel>
                      {card.answers.map((answer, answerIndex) => (
                        <HStack key={answerIndex} mt={2}>
                          <Input
                            placeholder="Réponse"
                            value={answer.text}
                            onChange={(e) =>
                              handleAnswerChange(
                                cardIndex,
                                answerIndex,
                                "text",
                                e.target.value
                              )
                            }
                          />
                          <Checkbox
                            isChecked={answer.isCorrect}
                            onChange={(e) =>
                              handleAnswerChange(
                                cardIndex,
                                answerIndex,
                                "isCorrect",
                                e.target.checked
                              )
                            }
                          >
                            Correcte
                          </Checkbox>
                          <IconButton
                            icon={<DeleteIcon />}
                            aria-label="Supprimer la réponse"
                            size="sm"
                            onClick={() => removeAnswer(cardIndex, answerIndex)}
                            isDisabled={card.answers.length === 1}
                          />
                        </HStack>
                      ))}
                      <Button
                        mt={2}
                        size="sm"
                        onClick={() => addAnswer(cardIndex)}
                        leftIcon={<AddIcon />}
                      >
                        Ajouter une Réponse
                      </Button>
                    </FormControl>
                  </Box>
                ))}
                <Button
                  mt={4}
                  onClick={addCard}
                  leftIcon={<AddIcon />}
                  colorScheme="blue"
                >
                  Ajouter une Carte
                </Button>
              </TabPanel>
              <TabPanel>
                {/* Mode Texte */}
                <FormControl mt={4}>
                  <FormLabel>Knowledge Set (au format JSON)</FormLabel>
                  <Textarea
                    placeholder='{"name": "Nom du Set", "timeLimit": 300, "cards": [...]}'
                    value={jsonInput}
                    onChange={(e) => setJsonInput(e.target.value)}
                    height="400px"
                  />
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>

          {errorMessage && (
            <p style={{ color: "red", marginTop: "10px" }}>{errorMessage}</p>
          )}
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" onClick={handleSubmit} mr={3}>
            Enregistrer
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
