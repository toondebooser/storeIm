import { useAuth } from "../context/AuthContext";
import Validation from "./Validation";
import ValidationAlert from "./validationAlert";

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
  const handleValidation = (event, patternType, inputType) => {
    const userInput = event.target.value;
    const validate = Validation(patternType, userInput);

    setUnvalidResults((prev) => ({
      ...prev,
      [inputType]: validate,
    }));
  };
  console.log(unvalidResults);
  const confirmPassword = () => {
    if (passwordRef.current.value !== passwordConfirmationRef.current.value) {
      setUnvalidResults((prev) => ({
        ...prev,
        passwordConfirm: true,
      }));
    } else {
      setUnvalidResults((prev) => ({
        ...prev,
        passwordConfirm: false,
      }));
    }
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
              required
              autoComplete="given-name"
              type="text"
              name="name"
              id="name"
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
              required
              autoComplete="family-name"
              type="text"
              name="lastName"
              id="lastName"
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
              autoComplete="email"
              type="email"
              name="email"
              id="email"
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
              required
              type="password"
              name="password"
              id="password"
              ref={passwordRef}
              onChange={
                showValidationAlert
                  ? null
                  : (e) => handleValidation(e, "password", "password")
              }
            />
          </span>

          <span className="passwordConfirmation">
            <label
              className={
                unvalidResults.passwordConfirm
                  ? "unvalid passwordConfirm"
                  : "passwordConfirm"
              }
              htmlFor="passwordConfirmation"
            >
              Password Confirmation
            </label>
            <br />
            <input
              required
              type="password"
              name="passwordConfirmation"
              id="passwordConfirmation"
              ref={passwordConfirmationRef}
              onChange={confirmPassword}
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
