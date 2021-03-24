import { useState } from "react";
import { auth, firestore } from "../../../firebase";
import SignBtn from "../SignBtn/SignBtn";

const SignUp = ({ handleClickSignIn }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        var user = userCredential.user;
        user.updateProfile({
          displayName: displayName,
        });
        const db = firestore;
        db.collection("users").doc(user.uid).set({
          email: email,
          emailVertified: false,
          name: displayName,
          password: password,
        });
      })

      .catch((error) => {
        setError(error.message);
      });

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    } else if (name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div className="signUp">
      <div className="signUp__wrapper">
        <h1 className="singUp__title">Sign Up</h1>
        <div className="signUp__fromWrapper">
          {error !== null && <div className="signUp__formError">{error}</div>}
          <form>
            <div className="signUp__FormRow">
              <label htmlFor="displayName" className="block">
                Display Name:
              </label>
              <input
                type="text"
                name="displayName"
                value={displayName}
                placeholder="E.g: Faruq"
                id="displayName"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="signUp__FormRow">
              <label htmlFor="userEmail" className="block">
                Email:
              </label>
              <input
                type="email"
                name="userEmail"
                value={email}
                placeholder="E.g: faruq123@gmail.com"
                id="userEmail"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <div className="signUp__FormRow">
              <label htmlFor="userPassword" className="block">
                Password:
              </label>
              <input
                type="password"
                name="userPassword"
                value={password}
                placeholder="Your Password"
                id="userPassword"
                onChange={(event) => onChangeHandler(event)}
              />
            </div>
            <SignBtn
              className="signUp__Btn signUp--btn"
              onClick={(event) => {
                createUserWithEmailAndPasswordHandler(event, email, password);
              }}
              text="Sign up"
            />
          </form>
          <SignBtn
            className="signIn__Btn signIn--btn"
            onClick={handleClickSignIn}
            text="Sign in here"
          />
        </div>
      </div>
    </div>
  );
};
export default SignUp;
