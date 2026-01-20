import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  base: "/AVB_Fashions/",
  plugins: [react()],
});
