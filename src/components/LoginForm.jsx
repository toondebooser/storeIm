import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export default function LoginForm() {
  const {
    currentUser,
    passwordConfirmationRef,
    emailRef,
    passwordRef,
    loginUser,
  } = useAuth();

  return (
    <>
      <div className="card">
        <h2 className="formTitle">Log in</h2>

        <form onSubmit={loginUser}>
          <span className="email">
            <label htmlFor="email">Email</label> <br />
            <input required type="email" name="email" ref={emailRef} />
          </span>

          <span className="password">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" ref={passwordRef} />
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
