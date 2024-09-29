import React, { useEffect, useState } from "react";
import { VStack, Text, Button, Input } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";

interface RepetitionTextInputModeProps {
  knowledgeSetId: string;
}

const RepetitionTextInputMode: React.FC<RepetitionTextInputModeProps> = ({
  knowledgeSetId,
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const { getKnowledgeSetById } = useApi();

  useEffect(() => {
    const fetchQuestions = async () => {
      const response = await getKnowledgeSetById(knowledgeSetId);
      const data = response.data;
      if (data && data.cards) {
        setQuestions(data.cards);
      }
    };
    fetchQuestions();
  }, [knowledgeSetId, getKnowledgeSetById]);

  if (questions.length === 0) {
    return <Text>Chargement des questions...</Text>;
  }

  const currentQuestion = questions[currentQuestionIndex];

  const onSubmit = () => {
    if (isAnswered) return;
    setIsAnswered(true);
    const correctAnswers = currentQuestion.answers
      .filter((a: any) => a.isCorrect)
      .map((a: any) => a.text.toLowerCase());
    const isCorrect = correctAnswers.includes(userAnswer.trim().toLowerCase());
    setFeedback(
      isCorrect
        ? "Correct!"
        : `Incorrect. La bonne réponse était: ${correctAnswers.join(", ")}`
    );
  };

  const onNextClick = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setFeedback("");
      setUserAnswer("");
    } else {
      // Fin des questions
      setFeedback("Vous avez terminé toutes les questions!");
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl">{currentQuestion.question}</Text>
      <Input
        placeholder="Votre réponse"
        value={userAnswer}
        onChange={(e) => setUserAnswer(e.target.value)}
        isDisabled={isAnswered}
      />
      {!isAnswered && (
        <Button onClick={onSubmit} colorScheme="blue">
          Soumettre
        </Button>
      )}
      {feedback && (
        <>
          <Text>{feedback}</Text>
          <Button onClick={onNextClick}>Question Suivante</Button>
        </>
      )}
    </VStack>
  );
};

export default RepetitionTextInputMode;
