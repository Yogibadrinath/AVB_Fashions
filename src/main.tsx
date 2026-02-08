import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoaderProvider } from "./context/LoaderContext";
import { AuthProvider } from "./components/AuthContext";
import "animate.css/animate.compat.css"
import "./styles/animations.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <HashRouter>
        <LoaderProvider>
          <App />
        </LoaderProvider>
      </HashRouter >
    </AuthProvider>
  </React.StrictMode>
);
