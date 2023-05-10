import { useRef,useContext,useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const {
    currentUser,
    emailRef,
    passwordRef,
    createUser,
  } = useAuth()

  console.log(createUser); 
// const emailRef = useRef()
// const passwordRef = useRef()
// const passwordConfirmationRef = useRef()

//   const handleSubmit = (e) => {
//     e.preventDefault();

    
      
    
//     createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
//       .then((userCredential) => {
//         console.log(userCredential);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

  return (
    <>
      <div className="card">
        <h2 className="formTitle">Sign up</h2>

        <form onSubmit={createUser}>
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

          <span className="passwordConfirmation">
                <label htmlFor="passwordConfirmation">Password Confirmation</label><br />
                <input type="password" name='passwordConfirmation'   />
            </span>

          <span className="submit">
            <input className="submitButton" type="submit" value="Sign up" />
          </span>
        </form>
      </div>
    </>
  );
}
