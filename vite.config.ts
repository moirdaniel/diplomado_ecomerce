import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Activa el soporte de React y la actualización de la vista al editar componentes.
export default defineConfig({
  plugins: [react()],
});
