import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

// 👇 Exporta a configuração corretamente
export default defineConfig({
  plugins: [
    react(),
    svgr(), 
  ],
});
