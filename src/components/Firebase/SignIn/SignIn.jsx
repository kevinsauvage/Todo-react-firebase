import { useState } from "react";
import { auth } from "../../../firebase";
import SignBtn from "../SignBtn/SignBtn";
import "../SignStyle.css";

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
                autoComplete="username"
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
                autoComplete="current-password"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <SignBtn
              className="signIn__Btn signIn--btn"
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
              text="Sign In"
            />
          </form>
          <p>
            <SignBtn
              className="signIn__Btn signUp--btn"
              onClick={handleClickSignUp}
              text="Sign up here"
            />
            <br />
            <SignBtn
              className="signIn__Btn signOut--btn"
              onClick={handleClickForgotPassword}
              text="Forgot Password?"
            />
          </p>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
