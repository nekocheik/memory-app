import * as React from "react";

import { ChakraProvider, Stack } from "@chakra-ui/react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

///memory-card/:id

import { HomePage } from "./pages/HomePage";
import { Card } from "./pages/Card";
import { GameModes } from "./pages/GameModes";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";

export const App = () => {
  return (
    <ChakraProvider>
      <Stack mx={3}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="/memory-card/:id" element={<Card />} />
          <Route path="/card/:id/:gameMode" element={<GameModes />} />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </Stack>
    </ChakraProvider>
  );
};
