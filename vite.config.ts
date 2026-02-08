import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/AVB_Fashions/",
  optimizeDeps: {
    include: [
      'react-notification-alert',
      'react-notifications',
      'react-confirm-alert',
      'reactstrap' // Add this
    ]
  },
  // If the error persists, add this define block
  define: {
    'global': {},
  },
});
