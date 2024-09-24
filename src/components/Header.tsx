import * as React from "react";

//import { PlusSquareIcon } from "@chakra-ui/icons";

import { Flex, Text, Spacer, Button } from "@chakra-ui/react";

export const Header = ({
  openModal,
  hiddenButton,
}: {
  hiddenButton?: boolean;
  openModal?: any;
}) => (
  <Flex mt={10}>
    <Text fontWeight={800} fontSize="2xl">
      |MEMORY-CARD|
    </Text>
    <Spacer />
    {!hiddenButton ? <Button onClick={openModal}>Ajouter</Button> : ""}
  </Flex>
);
