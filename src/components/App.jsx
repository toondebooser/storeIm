import "../App.css";
import { BrowserRouter as Router, Link, Route, Routes,Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

export function PrivateRoute({ children }) {
  const { currentUser } = useAuth();

  return currentUser? children : <Navigate to="/login" />;
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
