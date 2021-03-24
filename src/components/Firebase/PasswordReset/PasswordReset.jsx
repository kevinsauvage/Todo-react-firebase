import React, { useState } from "react";
import { auth } from "../../../firebase";

const PasswordReset = ({ handleClickSignIn }) => {
  const [email, setEmail] = useState("");
  const [emailHasBeenSent, setEmailHasBeenSent] = useState(false);
  const [error, setError] = useState(null);

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    if (name === "userEmail") {
      setEmail(value);
    }
  };
  const sendResetEmail = (event) => {
    event.preventDefault();
    auth
      .sendPasswordResetEmail(email)
      .then(function () {
        setEmailHasBeenSent(true);
      })
      .catch(function (error) {
        setError(error);
      });
  };
  return (
    <div className="reset">
      <div className="reset__wrapper">
        <h1 className="reset__title">Reset your Password</h1>
        <div className="reset__formWrapper">
          <form action="">
            {emailHasBeenSent && (
              <div className="emailSent__confirmation">
                An email has been sent to you!
              </div>
            )}
            {error !== null && (
              <div className="resetPassword__error">{error}</div>
            )}
            <div className="reset__formRow">
              <label htmlFor="userEmail" className="w-full block">
                Email:
              </label>
              <input
                type="email"
                name="userEmail"
                id="userEmail"
                value={email}
                placeholder="Input your email"
                onChange={onChangeHandler}
              />
            </div>
            <button className="reset__btn reset--btn" onClick={sendResetEmail}>
              Send me a reset link
            </button>
          </form>
          <button
            className="reset__btn signIn--btn"
            onClick={handleClickSignIn}>
            back to sign in page
          </button>
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
