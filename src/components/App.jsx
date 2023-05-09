import { useState } from "react";
import "../App.css";
import Home from "./Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path="/Login" Component={LoginForm}/>
        <Route exact path="/" Component={Home}/>
        <Route path="/Dashboard" Component={Dashboard}/>
      </Routes>
      </Router>
    </>
  );
}

export default App;
