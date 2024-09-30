import React, { useState } from "react";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  VStack,
  HStack,
  Select,
  Checkbox,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";
import { IProperty, IX } from "../Types"; // Import des types appropriés
import { useNavigate } from "react-router-dom";

const propertyTypes = [
  "Date",
  "Texte",
  "Nombre",
  "ID",
  "Couleur",
  "Audio",
  "Image",
  "Zone de texte",
  "Minuteur",
  "Page",
  "Fonction JavaScript",
];

interface XFormProps {
  existingX?: IX;
}

export const XForm: React.FC<XFormProps> = ({ existingX }) => {
  const [properties, setProperties] = useState<IProperty[]>(
    existingX?.properties || []
  );
  const { createX, updateX } = useApi();
  const navigate = useNavigate();

  const addProperty = () => {
    setProperties([
      ...properties,
      { name: "", value: "", type: "Texte", isList: false, required: false },
    ]);
  };

  const handlePropertyChange = (
    index: number,
    field: keyof IProperty,
    value: any
  ) => {
    const updatedProperties = [...properties];
    updatedProperties[index][field] = value;
    setProperties(updatedProperties);
  };

  const handleSubmit = async () => {
    const xData = { properties };
    try {
      if (existingX) {
        await updateX(existingX._id, xData);
      } else {
        await createX(xData);
      }
      // Rediriger vers la liste après la création/mise à jour
      navigate("/x");
    } catch (error) {
      console.error("Erreur lors de la soumission du formulaire X:", error);
    }
  };

  return (
    <Box>
      <VStack spacing={4}>
        {properties.map((prop: IProperty, index: number) => (
          <Box key={index} borderWidth="1px" borderRadius="md" p={4} w="100%">
            <FormControl>
              <FormLabel>Nom de la propriété</FormLabel>
              <Input
                value={prop.name}
                onChange={(e) =>
                  handlePropertyChange(index, "name", e.target.value)
                }
              />
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Type de la propriété</FormLabel>
              <Select
                value={prop.type}
                onChange={(e) =>
                  handlePropertyChange(index, "type", e.target.value)
                }
              >
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </Select>
            </FormControl>
            <FormControl mt={2}>
              <FormLabel>Valeur</FormLabel>
              <Input
                value={prop.value}
                onChange={(e) =>
                  handlePropertyChange(index, "value", e.target.value)
                }
              />
            </FormControl>
            <HStack mt={2}>
              <Checkbox
                isChecked={prop.isList || false}
                onChange={(e) =>
                  handlePropertyChange(index, "isList", e.target.checked)
                }
              >
                Est une liste
              </Checkbox>
              <Checkbox
                isChecked={prop.required || false}
                onChange={(e) =>
                  handlePropertyChange(index, "required", e.target.checked)
                }
              >
                Requise
              </Checkbox>
            </HStack>
          </Box>
        ))}
        <Button onClick={addProperty}>Ajouter une propriété</Button>
        <Button colorScheme="blue" onClick={handleSubmit}>
          {existingX ? "Mettre à jour" : "Créer"}
        </Button>
      </VStack>
    </Box>
  );
};

export default XForm;
