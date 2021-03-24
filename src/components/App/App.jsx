import { useEffect, useState } from "react";
import "./App.css";
import AddTodos from "../addTodo/AddTodos";
import TodosList from "../todoList/TodosList";
import { firestore, auth } from "../../firebase";
import firebase from "firebase";
import SignIn from "../Firebase/SignIn/SignIn";
import SignUp from "../Firebase/SignUp/SignUp";
import PasswordReset from "../Firebase/PasswordReset/PasswordReset";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [displaySignIn, setDisplaySignIn] = useState(true);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);

  useEffect(() => {
    auth &&
      auth.onAuthStateChanged((userAuth) => {
        console.log(userAuth);
        setUser(userAuth);
        setDisplaySignUp(false);
        setDisplayPasswordReset(false);
      });
  }, []);

  useEffect(() => {
    const db = firestore.collection("users").doc(user?.uid);
    db.collection("todos")
      .orderBy("timestamp", "desc")
      .onSnapshot((Snapshot) => {
        let todos = [];
        Snapshot.docs.map((doc) => {
          console.log(Snapshot);
          let data = { ...doc.data(), id: doc.id };
          todos.push(data);
        });
        setTodos(todos);
      });
  }, [user]);

  const handleInputChange = (e) => {
    setInputTodo(e.target.value);
  };

  const handleAddTodo = (e) => {
    e.preventDefault();
    if (inputTodo === "") return;
    setTodos([...todos, { todo: inputTodo, completed: false }]);
    addToDatabase();
    setInputTodo("");
  };

  const addToDatabase = () => {
    const db = firestore.collection("users").doc(user.uid);
    db.collection("todos")
      .add({
        todo: inputTodo,
        completed: false,
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      })
      .then((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  };

  const handleClickSignUp = () => {
    setDisplaySignIn(false);
    setDisplayPasswordReset(false);
    setDisplaySignUp(true);
  };
  const handleClickSignIn = () => {
    setDisplayPasswordReset(false);
    setDisplaySignUp(false);
    setDisplaySignIn(true);
  };

  const handleClickForgotPassword = () => {
    setDisplayPasswordReset(true);
    setDisplaySignUp(false);
    setDisplaySignIn(false);
  };

  const handleSignOutUser = () => {
    auth.signOut().catch((error) => {
      alert(error);
    });
  };
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
