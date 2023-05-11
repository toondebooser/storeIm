import "../App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function App() {
  return (
    <>
        <div className="content">
            <Routes>
              <Route path="/Login" element={<LoginForm/>} />
              <Route exact path="/" element={<Home/>} />
              <Route path="/Dashboard" element={<Dashboard/>} />
              <Route path="/Signup" element={<Signup/>} />
            </Routes>
        </div>
    </>
  );
}

export default App;
