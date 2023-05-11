import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const {
    currentUser,
    passwordConfirmationRef,
    emailRef,
    passwordRef,
    createUser,
  } = useAuth()

 currentUser !== null ? console.log(currentUser.email): console.log("Loading");;

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
                <input type="password" name='passwordConfirmation'  ref={passwordConfirmationRef} />
            </span>

          <span className="submit">
            <input className="submitButton" type="submit" value="Sign up" />
          </span>
        </form>
      </div>
    </>
  );
}
