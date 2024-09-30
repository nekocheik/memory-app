import React, { useEffect } from "react";
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
import useNotification from "./hooks/useNotification";
import StatisticsPage from "./pages/StatisticsPage";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import RepetitionMode from "./components/RepetitionMode";
import useUserStore from "./store";
import SummaryPage from "./pages/SummaryPage"; // Importez la nouvelle page
import { XListPage } from "./pages/XListPage";
import { XDetailPage } from "./pages/XDetailPage";
import { XForm } from "./components/XForm";

export const App = () => {
  const { showNotification } = useNotification();
  const setToken = useUserStore((state) => state.setToken);

  useEffect(() => {
    // Initialiser le token à partir du localStorage
    const token = localStorage.getItem("access_token");
    if (token) {
      setToken(token);
    }

    let inactivityTimeout: NodeJS.Timeout;

    const resetTimer = () => {
      clearTimeout(inactivityTimeout);
      inactivityTimeout = setTimeout(() => {
        showNotification("Revenez vite !", {
          body: "Vous avez des cartes à réviser.",
        });
      }, 1000 * 60 * 60 * 24); // 24 heures d'inactivité
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    resetTimer();

    return () => {
      clearTimeout(inactivityTimeout);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [showNotification, setToken]);

  return (
    <ThemeSwitcher>
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
            <Route
              path="/statistics"
              element={
                <ProtectedRoute>
                  <StatisticsPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/summary"
              element={
                <ProtectedRoute>
                  <SummaryPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/card/:id/Repetition"
              element={
                <ProtectedRoute>
                  <RepetitionMode />
                </ProtectedRoute>
              }
            />
            <Route
              path="/x"
              element={
                <ProtectedRoute>
                  <XListPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/x/new"
              element={
                <ProtectedRoute>
                  <XForm />
                </ProtectedRoute>
              }
            />
            <Route
              path="/x/:id"
              element={
                <ProtectedRoute>
                  <XDetailPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/x/:id/edit"
              element={
                <ProtectedRoute>
                  <XForm />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Stack>
      </ChakraProvider>
    </ThemeSwitcher>
  );
};
