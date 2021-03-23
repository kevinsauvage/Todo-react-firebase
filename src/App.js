import { useEffect, useState } from "react";
import "./App.css";
import AddTodos from "./components/addTodo/AddTodos";
import TodosList from "./components/todoList/TodosList";
import { db } from "./firebase";
import firebase from "firebase";

function App() {
  const [inputTodo, setInputTodo] = useState("");
  const [todos, setTodos] = useState([]);

  useEffect(() => {
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
  }, []);

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

  return (
    <div className="App">
      <header>
        <h1 className="App__title">Todo app</h1>
        <AddTodos
          handleAddTodo={handleAddTodo}
          handleInputChange={handleInputChange}
          inputTodo={inputTodo}
        />
      </header>
      <TodosList todos={todos} />
    </div>
  );
}

export default App;
