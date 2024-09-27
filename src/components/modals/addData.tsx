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
} from "@chakra-ui/react";
import { useApi } from "../../hooks/useApi";

export function ModalAddKnowledgeSet({
  openModal,
}: {
  openModal: (fn: () => void) => void;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { addKnowledgeSet } = useApi();
  const [KnowledgeSet, setKnowledgeSet] = useState({
    name: "",
    cards: [],
  });
  const [cardsInput, setCardsInput] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const parsedCards = JSON.parse(cardsInput);
      setKnowledgeSet({ ...KnowledgeSet, cards: parsedCards });
      await addKnowledgeSet({ ...KnowledgeSet, cards: parsedCards });
      setErrorMessage("");
      onClose();
    } catch (error) {
      setErrorMessage("Invalid JSON format. Please correct it.");
    }
  };

  useEffect(() => {
    openModal(() => onOpen);
  }, []);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add New Knowledge Set</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="Set Name"
                value={KnowledgeSet.name}
                onChange={(e) =>
                  setKnowledgeSet({ ...KnowledgeSet, name: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Cards (in JSON format)</FormLabel>
              <Textarea
                placeholder='Add cards as a JSON array (e.g., [{"question": "What is 2+2?", "answer": "4"}])'
                value={cardsInput}
                onChange={(e) => setCardsInput(e.target.value)} // Just update the string state
              />
            </FormControl>

            {errorMessage && (
              <p style={{ color: "red" }}>{errorMessage}</p> // Display the error message
            )}
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" onClick={handleSubmit} mr={3}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
