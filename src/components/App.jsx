import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";
function App() {
  const { currentUser } = useAuth();

function PrivateRoute({ children }) {
  return currentUser ? children : <Navigate to="/" />;
}

  return (
    <>
        <div className="content">
            <Routes>
              <Route path="/Login" element={<PrivateRoute><LoginForm/></PrivateRoute>} />
              <Route exact path="/" element={<Home/>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/Signup" element={<Signup/>} />
            </Routes>
        </div>
    </>
  );
}

export default App;
