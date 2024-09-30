import React, { useEffect, useState } from "react";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { useParams } from "react-router-dom";

export const XDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [xData, setXData] = useState<any>(null);
  const { getXById } = useApi();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getXById(id!);
      setXData(data.data);
    };
    fetchData();
  }, [id, getXById]);

  if (!xData) {
    return <Text>Chargement...</Text>;
  }

  return (
    <Box>
      <Text fontSize="2xl">Détails de l'objet X</Text>
      <VStack spacing={4} mt={4}>
        {xData.properties.map((prop: any, index: number) => (
          <Box key={index} borderWidth="1px" borderRadius="md" p={4} w="100%">
            <Text>Nom: {prop.name}</Text>
            <Text>Type: {prop.type}</Text>
            <Text>Valeur: {prop.value}</Text>
            <Text>Est une liste: {prop.isList ? "Oui" : "Non"}</Text>
            <Text>Requise: {prop.required ? "Oui" : "Non"}</Text>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
