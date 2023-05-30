import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Header />
    <App />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
