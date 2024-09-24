import { CardBody, Card, Text } from "@chakra-ui/react";
import React from "react";

export const MCard = ({ text }: { text: string }) => {
  return (
    <Card>
      <CardBody>
        <Text>{text}</Text>
      </CardBody>
    </Card>
  );
};

export default MCard;
