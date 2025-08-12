import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    host: "0.0.0.0", // Lauscht auf allen IPs im Netzwerk
    port: 5173, // Falls du den Port fix setzen willst
  },
});
