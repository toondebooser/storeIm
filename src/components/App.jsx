import "../App.css";
import {
  Route,
  Routes,
} from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Home from "./Home";
import LoginForm from "./LoginForm";
import Dashboard from "./Dashboard";
import Signup from "./Signup";

function App() {
  const { loggedOut } = useAuth();
  return (
    <>
      <div className="content">
        <Routes>
          <Route
            path="/Login"
            element={!loggedOut ? <Dashboard /> : <LoginForm />}
          />
          <Route exact path="/" element={<Home />} />
          <Route
            path="/dashboard"
            element={loggedOut ? <LoginForm /> : <Dashboard />}
          />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
