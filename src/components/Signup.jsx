import { useState } from "react";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const {
    passwordConfirmationRef,
    emailRef,
    nameRef,
    lastNameRef,
    passwordRef,
    createUser,
  } = useAuth();

  return (
    <>
      <div className="card">
        <h2 className="formTitle">Sign up</h2>

        <form onSubmit={createUser}>
          <span className="formElement">
            <label htmlFor="name" className="label">
              Name
            </label>{" "}
            <br />
            <input type="text" name="name" ref={nameRef} />
          </span>

          <span className="formElement">
            <label htmlFor="lastName" className="label">
              LastName
            </label>{" "}
            <br />
            <input type="text" name="lastName" ref={lastNameRef} />
          </span>

          <span className="email">
            <label htmlFor="email">Email</label> <br />
            <input required type="email" name="email" ref={emailRef} />
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
