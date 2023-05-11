import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function PrivateRoute({ children }) {
  const { currentUser} = useAuth();

  return currentUser? children :<Navigate to="/" />;

}

function App() {
  const {currentUser, loggedOut}= useAuth()
  console.log(loggedOut);
  return (
    <>
        <div className="content">
            <Routes>
              <Route path="/Login" element={!loggedOut? <Dashboard /> :<LoginForm/>} />
              <Route exact path="/" element={<Home/>} />
              <Route path="/dashboard" element={loggedOut?<LoginForm/>:  <Dashboard />} />
              <Route path="/Signup" element={<Signup/>} />
            </Routes>
        </div>
    </>
  );
}

export default App;
