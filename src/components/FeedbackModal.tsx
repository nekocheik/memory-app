import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Textarea,
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { useApi } from "../hooks/useApi";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  cardId: string;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  cardId,
}) => {
  const [feedback, setFeedback] = useState("");
  const { sendFeedback } = useApi();

  const handleSubmit = async () => {
    await sendFeedback(cardId, feedback);
    setFeedback("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Envoyer un Feedback</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Textarea
            placeholder="Votre feedback..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit} colorScheme="blue" mr={3}>
            Envoyer
          </Button>
          <Button onClick={onClose}>Annuler</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default FeedbackModal;
