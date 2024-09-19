import * as React from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { HomePage } from "./pages/HomePage";
import { Card } from "./pages/Card";

export const App = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/memory-card/:id" element={<Card />} />
      <Route path="*" element={<div>404 - Page not found</div>} />
    </Routes>
  );
};
