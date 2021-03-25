import "./App.css";
import AddTodos from "../addTodo/AddTodos";
import TodosList from "../todoList/TodosList";
import SignIn from "../Firebase/SignIn/SignIn";
import SignUp from "../Firebase/SignUp/SignUp";
import PasswordReset from "../Firebase/PasswordReset/PasswordReset";
import AppLogic from "./AppLogic";
import Header from "../Header/Header";
import Landing from "../Landing/Landing";

function App() {
  const {
    user,
    handleSignOutUser,
    handleAddTodo,
    handleInputChange,
    inputTodo,
    todos,
    displaySignIn,
    handleClickSignUp,
    handleClickForgotPassword,
    displaySignUp,
    handleClickSignIn,
    displayPasswordReset,
    displayLanding,
  } = AppLogic();

  return (
    <div className="App">
      <Header
        user={user}
        handleClickSignIn={handleClickSignIn}
        handleClickSignUp={handleClickSignUp}
        handleSignOutUser={handleSignOutUser}
      />
      {displayLanding ? (
        <Landing handleClickSignUp={handleClickSignUp} />
      ) : user ? (
        <>
          <AddTodos
            handleAddTodo={handleAddTodo}
            handleInputChange={handleInputChange}
            inputTodo={inputTodo}
          />

          <TodosList todos={todos} user={user} />
        </>
      ) : displaySignIn ? (
        <SignIn
          handleClickSignUp={handleClickSignUp}
          handleClickForgotPassword={handleClickForgotPassword}
        />
      ) : displaySignUp ? (
        <SignUp handleClickSignIn={handleClickSignIn} />
      ) : displayPasswordReset ? (
        <PasswordReset handleClickSignIn={handleClickSignIn} />
      ) : null}
    </div>
  );
}

export default App;
