import { useEffect, useState } from "react";
import { firestore, auth } from "../../firebase";
import firebase from "firebase";

const AppLogic = () => {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [user, setUser] = useState(null);
  const [displaySignIn, setDisplaySignIn] = useState(false);
  const [displaySignUp, setDisplaySignUp] = useState(false);
  const [displayPasswordReset, setDisplayPasswordReset] = useState(false);
  const [displayLanding, setDisplayLanding] = useState(true);

  useEffect(() => {
    auth &&
      auth.onAuthStateChanged((userAuth) => {
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
    setDisplayLanding(false);
    setDisplayPasswordReset(false);
    setDisplaySignUp(true);
  };

  const handleClickSignIn = () => {
    setDisplayPasswordReset(false);
    setDisplaySignUp(false);
    setDisplayLanding(false);
    setDisplaySignIn(true);
  };

  const handleClickForgotPassword = () => {
    setDisplayPasswordReset(true);
    setDisplaySignUp(false);
    setDisplaySignIn(false);
  };

  const handleSignOutUser = () => {
    setDisplaySignIn(false);
    setDisplaySignUp(false);
    setDisplayPasswordReset(false);
    setDisplayLanding(true);
    auth.signOut().catch((error) => {
      alert(error);
    });
  };

  return {
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
  };
};

export default AppLogic;
