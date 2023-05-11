import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginForm() {


    const {
      currentUser,
      passwordConfirmationRef,
      emailRef,
      passwordRef,
      createUser,
      loginUser
    } = useAuth()
  
  
  
    return (
      <>
        <div className="card">
          <h2 className="formTitle">Log in</h2>
  
          <form onSubmit={loginUser}>
            <span className="email">
              <label htmlFor="email">Email</label> <br />
              <input
                required
                type="email"
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
                ref={passwordRef}
             
              />
            </span>
  
            <span className="submit">
              <input className="submitButton" type="submit" value="Login" />
            </span>
          </form>
          
        <span>Don't have an account?</span><br />
        <span className="goToSignup">
          <Link  to={"/Signup"}> Create one </Link>
        </span>
        </div>
      </>
    );
  }
  

