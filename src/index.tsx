import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import reportWebVitals from "./reportWebVitals";
import * as serviceWorker from "./serviceWorker";
import useUserStore from "./store";

const container = document.getElementById("root");
if (!container) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(container);

// Initialiser le token à partir du localStorage
const token = localStorage.getItem("access_token");
if (token) {
  useUserStore.getState().setToken(token);
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

// Reste de votre code...
serviceWorker.unregister();
reportWebVitals();
