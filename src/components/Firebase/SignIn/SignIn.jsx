import { useState } from "react";
import { auth } from "../../../firebase";
import "./SignIn.css";

const SignIn = ({ handleClickSignUp, handleClickForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError(error.message);
    });
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div className="signIn">
      <div className="signIn__wrapper">
        <h1 className="signIn__title">Sign In</h1>
        <div className="signIn__fromWrapper">
          {error !== null && <div>{error}</div>}
          <form className="signIn__form">
            <div className="signIn__FormRow">
              <label htmlFor="userEmail">Email:</label>
              <input
                type="email"
                name="userEmail"
                value={email}
                placeholder="E.g: faruq123@gmail.com"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="signIn__FormRow">
              <label htmlFor="userPassword">Password:</label>
              <input
                type="password"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <button
              className="signIn__Btn signIn--btn"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}>
              Sign in
            </button>
          </form>
          <p>
            <button
              className="signIn__Btn signUp--btn"
              onClick={handleClickSignUp}>
              Sign up here
            </button>
            <br />
            <button
              className="signIn__Btn signOut--btn"
              onClick={handleClickForgotPassword}>
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
