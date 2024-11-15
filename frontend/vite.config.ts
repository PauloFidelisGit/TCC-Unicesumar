import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // plugins: [react(), mkcert({
  // 	hosts: ["aeonsistemas.local"],
  // 	keyFileName: "aeonsistemas.local-key.pem",
  // 	certFileName: "aeonsistemas.local.pem",
  // })],
  resolve: {
    alias: {
      "@/": "/src/",
    },
  },
  server: {
    watch: {
      ignored: ["**/node_modules/**", "**/.git/**", "**/dist/**"],
    },
  },
});
