import React, { useEffect, useState } from "react";
import { VStack, Text, Button, Stack } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";

interface RepetitionChoiceModeProps {
  knowledgeSetId: string;
}

const RepetitionChoiceMode: React.FC<RepetitionChoiceModeProps> = ({
  knowledgeSetId,
}) => {
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isAnswered, setIsAnswered] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
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

  const onAnswerClick = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
    setIsAnswered(true);
    const isCorrect = currentQuestion.answers.some(
      (a: any) => a.text === answer && a.isCorrect
    );
    setFeedback(isCorrect ? "Correct!" : "Incorrect.");
  };

  const onNextClick = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setIsAnswered(false);
      setFeedback("");
      setSelectedAnswer(null);
    } else {
      // Fin des questions
      setFeedback("Vous avez terminé toutes les questions!");
    }
  };

  return (
    <VStack spacing={4}>
      <Text fontSize="xl">{currentQuestion.question}</Text>
      <Stack width="100%">
        {currentQuestion.answers.map((answer: any, index: number) => (
          <Button
            key={index}
            onClick={() => onAnswerClick(answer.text)}
            colorScheme={
              isAnswered
                ? answer.isCorrect
                  ? "green"
                  : selectedAnswer === answer.text
                  ? "red"
                  : "gray"
                : "blue"
            }
            disabled={isAnswered}
            width="100%"
          >
            {answer.text}
          </Button>
        ))}
      </Stack>
      {feedback && (
        <>
          <Text>{feedback}</Text>
          <Button onClick={onNextClick}>Question Suivante</Button>
        </>
      )}
    </VStack>
  );
};

export default RepetitionChoiceMode;
