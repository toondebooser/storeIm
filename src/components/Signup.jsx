import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import Validation from "./Validation";
import ValidationAlert from "./validationAlert";
import { validate } from "uuid";

export default function Signup() {
  const {
    passwordConfirmationRef,
    emailRef,
    nameRef,
    lastNameRef,
    passwordRef,
    createUser,
    unvalidResults,
    setUnvalidResults,
    showValidationAlert,
  } = useAuth();
  console.log(showValidationAlert);

  const handleValidation = (event, patternType, inputType) => {
    const userInput = event.target.value;
    const validate = Validation(patternType, userInput);

    setUnvalidResults((prev) => ({
      ...prev,
      [inputType]: validate,
    }));
  };

  return (
    <>
      {showValidationAlert && <ValidationAlert />}
      <div className="card">
        <h2 className="formTitle">Sign up</h2>

        <form onSubmit={createUser}>
          <span className="formElement">
            <label
              className={unvalidResults.name ? "unvalid label" : "label"}
              htmlFor="name"
            >
              Name {unvalidResults.name && "* unvalid name"}
            </label>
            <br />
            <input
              type="text"
              name="name"
              ref={nameRef}
              onChange={
                showValidationAlert
                  ? null
                  : (e) => handleValidation(e, "letters", "name")
              }
            />
          </span>

          <span className="formElement">
            <label
              htmlFor="lastName"
              className={unvalidResults.lastName ? "unvalid label" : "label"}
            >
              LastName {unvalidResults.lastName && "* unvalid last name"}
            </label>
            <br />
            <input
              type="text"
              name="lastName"
              ref={lastNameRef}
              onChange={
                showValidationAlert
                  ? null
                  : (e) => handleValidation(e, "letters", "lastName")
              }
            />
          </span>

          <span className="email">
            <label
              htmlFor="email"
              className={unvalidResults.email ? "unvalid email" : "email"}
            >
              Email {unvalidResults.email && "* unvalid email"}
            </label>{" "}
            <br />
            <input
              required
              type="email"
              name="email"
              ref={emailRef}
              onChange={
                showValidationAlert
                  ? null
                  : (e) => handleValidation(e, "email", "email")
              }
            />
          </span>

          <span className="password">
            <label
              htmlFor="password"
              className={
                unvalidResults.password ? "unvalid password" : "password"
              }
            >
              Password
            </label>
            <br />
            <input
              type="password"
              name="password"
              ref={passwordRef}
              onChange={
                showValidationAlert
                  ? null
                  : (e) => handleValidation(e, "password", "password")
              }
            />
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
