import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import Validation from "./Validation";
import { validate } from "uuid";

export default function Signup() {
  const {
    passwordConfirmationRef,
    emailRef,
    nameRef,
    lastNameRef,
    passwordRef,
    createUser,
  } = useAuth();
  const [unvalidResults, setUnvalidResults] = useState([
    {name: false},
    {lastName: false},
    {email: false},
    {password: false}
  ]);



  const handleValidation = (event, patternType, inputType) => {
    const userInput = event.target.value;
    const validate = Validation(patternType, userInput);
    setUnvalidResults((prev)=>{
      const updateInputValidationResult = prev.map((item)=>({
        ...item,[inputType]: validate
      }))
      return updateInputValidationResult;
    })
  };


  return (
    <>
      <div className="card">
        <h2 className="formTitle">Sign up</h2>

        <form onSubmit={createUser}>
          <span className="formElement">
            <label
              className={unvalidResults[0].name ? "unvalid label" : "label"}
              htmlFor="name"
            >
              Name {unvalidResults[0].name && "* unvalid name"}
            </label>
            <br />
            <input
              type="text"
              name="name"
              ref={nameRef}
              onChange={(e) => handleValidation(e, "letters", "name")}
            />
          </span>

          <span className="formElement">
            <label htmlFor="lastName" className={unvalidResults[0].lastName?"unvalid label" : "label"}>
              LastName {unvalidResults[0].lastName && "* unvalid last name"}
            </label>
            <br />
            <input type="text" name="lastName" ref={lastNameRef} onChange={(e)=> handleValidation(e, "letters", "lastName")} />
          </span>

          <span className="email">
            <label htmlFor="email" className={unvalidResults[0].email? "unvalid email": 'email'}>Email</label> <br />
            <input required type="email" name="email" ref={emailRef} onChange={(e)=>handleValidation(e, "email", "email")} />
          </span>

          <span className="password">
            <label htmlFor="password">Password</label>
            <br />
            <input type="password" name="password" ref={passwordRef} />
          </span>

          <span className="passwordConfirmation">
            <label htmlFor="passwordConfirmation">Password Confirmation</label>
            <br />
            <input
              type="password"
              name="passwordConfirmation"
              ref={passwordConfirmationRef}
            />
          </span>

          <span className="submit">
            <input className="submitButton" type="submit" value="Sign up" />
          </span>
        </form>
      </div>
    </>
  );
}
