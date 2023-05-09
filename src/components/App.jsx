import "../App.css";
import Home from "./Home";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function App() {
  return (
    <>
        <div className="content">
          <Router>
            <Routes>
              <Route path="/Login" Component={LoginForm} />
              <Route exact path="/" Component={Home} />
              <Route path="/Dashboard" Component={Dashboard} />
              <Route path="/Signup" Component={Signup} />
            </Routes>
          </Router>
        </div>
    </>
  );
}

export default App;
