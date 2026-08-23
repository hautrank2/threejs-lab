import path from "node:path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Cho phép harness/CI chỉ định cổng qua PORT; mặc định vẫn là 5173 của Vite.
  server: { port: Number(process.env.PORT) || 5173 },
  resolve: {
    alias: { "~": path.resolve(import.meta.dirname, "./src") },
  },
});
