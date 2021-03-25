import SignBtn from "../Firebase/SignBtn/SignBtn";
import "./Header.css";

const Header = ({
  user,
  handleClickSignIn,
  handleClickSignUp,
  handleSignOutUser,
}) => {
  return (
    <header>
      <div className="header__userInfo">
        <h1 className="header__title">Tsks.</h1>
        <p className="header__name">
          Welcome {user?.displayName || user?.email}
        </p>
      </div>
      <div className="header__btns">
        {user ? (
          <SignBtn
            onClick={handleSignOutUser}
            text="Sign Out"
            className="signOut--btn"
          />
        ) : (
          <>
            <SignBtn
              text="Sign In"
              className="signIn--btn"
              onClick={handleClickSignIn}
            />
            <SignBtn
              text="Sign Up"
              className="signUp--btn"
              onClick={handleClickSignUp}
            />
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
