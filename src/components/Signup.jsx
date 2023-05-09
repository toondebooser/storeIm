import { useRef, useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Signup() {
//   const [userEmail, setUserEmail] = useState('');
//   const [userPassword, setUserPassword] = useState('');
  // const passwordConfirmationRef = useRef()
const emailRef = useRef()
const passwordRef = useRef()

  const handleSubmit = (e) => {
    e.preventDefault();
    createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
      .then((userCredential) => {
        console.log(userCredential);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div className="card">
        <h2 className="formTitle">Sign up</h2>

        <form onSubmit={handleSubmit}>
          <span className="email">
            <label htmlFor="email">Email</label> <br />
            <input
              required
              type="email"
              name="email"
              ref={emailRef}
            //   value={userEmail}
            //   onChange={(e)=>setUserEmail(e.target.value)}
            />
          </span>

          <span className="password">
            <label htmlFor="password">Password</label>
            <br />
            <input
              type="password"
              name="password"
              ref={passwordRef}
            //   value={userPassword}
            //   onChange={(e)=>setUserPassword(e.target.value)}
            />
          </span>

          {/* <span className="passwordConfirmation">
                <label htmlFor="passwordConfirmation">Password Confirmation</label><br />
                <input onSubmit={handleSubmit} type="password" name='passwordConfirmation'  />
            </span> */}

          <span className="submit">
            <input className="submitButton" type="submit" value="Sign up" />
          </span>
        </form>
      </div>
    </>
  );
}
