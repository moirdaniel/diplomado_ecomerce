import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

// Conectamos React con el contenedor root de index.html.
// StrictMode ayuda a detectar problemas durante el desarrollo.
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
