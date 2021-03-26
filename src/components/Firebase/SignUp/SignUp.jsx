import SignBtn from "../SignBtn/SignBtn";
import SignUpLogic from "./SignUpLogic";

const SignUp = ({ handleClickSignIn }) => {
  const {
    error,
    displayName,
    onChangeHandler,
    email,
    password,
    createUserWithEmailAndPasswordHandler,
  } = SignUpLogic();
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
                autoComplete="current-password"
                placeholder="Your Password"
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
