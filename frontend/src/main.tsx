import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "leaflet/dist/leaflet.css"; // <-- Add this
import "./index.css";

import App from "./App";
import { VehicleProvider } from "./context/VehicleProvider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <VehicleProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </VehicleProvider>
  </StrictMode>,
);
