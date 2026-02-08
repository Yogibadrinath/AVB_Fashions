// src/App.tsx
import AppRoutes from "./routes/AppRoutes";
import "./App.css"
import "./styles/animations.css"

function App() {
  console.log("import.meta.env.VITE_ENCRYPTED_ADMIN_PW", import.meta.env.VITE_ENCRYPTED_ADMIN_PW);
  return <AppRoutes />;
}

export default App;
