import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {
  const { emailRef, passwordRef, loginUser } = useAuth();
  return (
    <>
      <div className="card">
        <h2 className="formTitle">Log in</h2>

        <form onSubmit={loginUser} >
          <span className="email">
            <label htmlFor="email">Email</label> <br />
            <input
            autoComplete="email"
              required
              type="email"
              id="email"
              name="email"
              ref={emailRef}
            />
          </span>

          <span className="password">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
            />
          </span>

          <span className="submit">
            <input className="submitButton" type="submit" value="Login" />
          </span>
        </form>
      </div>
      <div className="haveNoAccount">Don't have an account?</div>
      <br />
      <Link className="goToSignup" to={"/Signup"}>
        Create one
      </Link>
    </>
  );
}
