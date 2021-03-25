import SignBtn from "../SignBtn/SignBtn";
import PasswordResetLogic from "./PasswordResetLogic";

const PasswordReset = ({ handleClickSignIn }) => {
  const {
    emailHasBeenSent,
    error,
    email,
    onChangeHandler,
    sendResetEmail,
  } = PasswordResetLogic();

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
            <SignBtn
              className="reset__btn reset--btn"
              onClick={sendResetEmail}
              text="Send me a reset link"
            />
          </form>
          <SignBtn
            className="reset__btn signIn--btn"
            onClick={handleClickSignIn}
            text="back to sign in page"
          />
        </div>
      </div>
    </div>
  );
};
export default PasswordReset;
