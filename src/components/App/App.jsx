import "./App.css";
import AddTodos from "../addTodo/AddTodos";
import TodosList from "../todoList/TodosList";
import SignIn from "../Firebase/SignIn/SignIn";
import SignUp from "../Firebase/SignUp/SignUp";
import PasswordReset from "../Firebase/PasswordReset/PasswordReset";
import AppLogic from "./AppLogic";

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
  } = AppLogic();

  return user ? (
    <div className="App">
      <header>
        <div className="App__userInfo">
          <p>{user?.displayName || user?.email}</p>
          <p onClick={handleSignOutUser}>Sign out</p>
        </div>
        <h1 className="App__title">Todo app</h1>
        <AddTodos
          handleAddTodo={handleAddTodo}
          handleInputChange={handleInputChange}
          inputTodo={inputTodo}
        />
      </header>
      <TodosList todos={todos} user={user} />
    </div>
  ) : displaySignIn ? (
    <SignIn
      handleClickSignUp={handleClickSignUp}
      handleClickForgotPassword={handleClickForgotPassword}
    />
  ) : displaySignUp ? (
    <SignUp handleClickSignIn={handleClickSignIn} />
  ) : displayPasswordReset ? (
    <PasswordReset handleClickSignIn={handleClickSignIn} />
  ) : null;
}

export default App;
