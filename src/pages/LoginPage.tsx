import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  Heading,
  VStack,
} from "@chakra-ui/react";
import { useApi } from "../hooks/useApi";

export const LoginPage = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();
  const { login } = useApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleLogin = async () => {
    try {
      const response = await login(form);

      if (response) {
        navigate("/");
      } else {
        alert("Identifiants incorrects");
      }
    } catch (error) {
      console.error("Erreur de connexion:", error);
      alert("Erreur lors de la connexion");
    }
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg">
      <VStack spacing="6">
        <Heading>Connexion</Heading>
        <FormControl id="username">
          <FormLabel>Nom d'utilisateur</FormLabel>
          <Input
            type="text"
            name="username"
            value={form.username}
            onChange={handleInputChange}
            placeholder="Nom d'utilisateur"
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Mot de passe</FormLabel>
          <Input
            type="password"
            name="password"
            value={form.password}
            onChange={handleInputChange}
            placeholder="Mot de passe"
          />
        </FormControl>
        <Button colorScheme="teal" width="full" onClick={handleLogin}>
          Connexion
        </Button>
        <Button width="full" onClick={() => navigate("/signup")}>
          Inscription
        </Button>
      </VStack>
    </Box>
  );
};

export default LoginPage;
