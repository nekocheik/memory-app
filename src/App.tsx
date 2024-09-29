import * as React from "react";
import { ChakraProvider, Stack } from "@chakra-ui/react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { HomePage } from "./pages/HomePage";
import { Card } from "./pages/Card";
import { GameModes } from "./pages/GameModes";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import ProtectedRoute from "./components/ProtectedRoute";

export const App = () => {
  return (
    <ChakraProvider>
      <Stack mx={3}>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/memory-card/:id"
            element={
              <ProtectedRoute>
                <Card />
              </ProtectedRoute>
            }
          />
          <Route
            path="/card/:id/:gameMode"
            element={
              <ProtectedRoute>
                <GameModes />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </Stack>
    </ChakraProvider>
  );
};
