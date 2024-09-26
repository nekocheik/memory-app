import { CardBody, Card, Text } from "@chakra-ui/react";
import React from "react";
import { Answer } from "../../Types";

export const MCard = ({
  onClick,
  answer,
  text = "",
}: {
  onClick?: () => void;
  text?: string;
  answer?: Answer;
}) => {
  return (
    <Card cursor={onClick ? "pointer" : ""} onClick={onClick}>
      <CardBody>
        <Text>{text || answer?.text}</Text>
      </CardBody>
    </Card>
  );
};

export default MCard;
