import React, { useState } from "react";
import { Button, VStack, Text } from "@chakra-ui/react";
import RepetitionChoiceMode from "./RepetitionChoiceMode";
import RepetitionTextInputMode from "./RepetitionTextInputMode";
import { useParams } from "react-router-dom";

const RepetitionMode: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mode, setMode] = useState<"choice" | "textInput" | null>(null);

  if (mode === "choice") {
    return <RepetitionChoiceMode knowledgeSetId={id!} />;
  }

  if (mode === "textInput") {
    return <RepetitionTextInputMode knowledgeSetId={id!} />;
  }

  return (
    <VStack spacing={4}>
      <Text fontSize="2xl" fontWeight="bold">
        Choisissez le mode de répétition
      </Text>
      <Button onClick={() => setMode("choice")} colorScheme="blue">
        Mode Choix
      </Button>
      <Button onClick={() => setMode("textInput")} colorScheme="green">
        Mode Saisie de Texte
      </Button>
    </VStack>
  );
};

export default RepetitionMode;
