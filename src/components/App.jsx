import "../App.css";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Link, Route, Routes,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function PrivateRoute({ children }) {
  const { currentUser } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    
    currentUser === null ? setTimeout(() => {
      setIsLoading(false);
    }, 2000) : setIsLoading(false)

    return ;
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return currentUser ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <>
        <div className="content">
            <Routes>
              <Route path="/Login" element={<LoginForm/>} />
              <Route exact path="/" element={<Home/>} />
              <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
              <Route path="/Signup" element={<Signup/>} />
            </Routes>
        </div>
    </>
  );
}

export default App;
