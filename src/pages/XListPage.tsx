import React, { useEffect, useState } from "react";
import { Box, Text, Button, VStack } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import { IX } from "../Types"; // Import du type IX

export const XListPage: React.FC = () => {
  const [xList, setXList] = useState<IX[]>([]);
  const { getAllX } = useApi();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchXList = async () => {
      try {
        const response = await getAllX();
        setXList(response.data);
      } catch (error) {
        console.error(
          "Erreur lors de la récupération de la liste des X:",
          error
        );
      }
    };
    fetchXList();
  }, [getAllX]);

  const handleView = (id: string) => {
    navigate(`/x/${id}`);
  };

  return (
    <VStack spacing={4}>
      {xList.map((x: IX) => (
        <Box key={x._id} borderWidth="1px" borderRadius="md" p={4} w="100%">
          <Text>Objet X: {x._id}</Text>
          <Button onClick={() => handleView(x._id)}>Voir</Button>
        </Box>
      ))}
    </VStack>
  );
};

export default XListPage;
