import React, { useState } from "react";
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

export const SignupPage = () => {
  const [form, setForm] = useState({ username: "", email: "", password: "" });
  const { signup } = useApi();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSignup = async () => {
    const connexion = await signup(form);
    console.log("Inscription réussie avec", form, connexion);
    // Appelle ici une API pour inscrire l'utilisateur
  };

  return (
    <Box maxW="md" mx="auto" mt="10" p="6" borderWidth="1px" borderRadius="lg">
      <VStack spacing="6">
        <Heading>Inscription</Heading>
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
        <FormControl id="email">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleInputChange}
            placeholder="Email"
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
        <Button colorScheme="teal" width="full" onClick={handleSignup}>
          Inscription
        </Button>
      </VStack>
    </Box>
  );
};

export default SignupPage;
