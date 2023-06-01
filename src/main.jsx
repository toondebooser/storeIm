import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/footer.jsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Header />
    <App />
    <Footer />
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
