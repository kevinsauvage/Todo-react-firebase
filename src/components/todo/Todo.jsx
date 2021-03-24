import React from "react";
import "./Todo.css";
import { firestore } from "../../firebase";
import { MdClear, MdDeleteForever, MdDone } from "react-icons/md";

const Todo = ({ text, completed, id, timestamp, user }) => {
  console.log(id, timestamp);
  const handleDelete = () => {
    const db = firestore.collection("users").doc(user?.uid);

    db.collection("todos")
      .doc(id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  const handleCompleted = () => {
    const db = firestore.collection("users").doc(user?.uid);
    db.collection("todos").doc(id).update({
      todo: text,
      completed: !completed,
      timestamp: timestamp,
    });
  };

  return (
    <div
      onClick={handleCompleted}
      className="todo"
      style={{
        borderLeft: completed ? "2px solid green" : "2px solid red",
        backgroundColor: completed ? "#9ddfd3" : "#ffc93c",
      }}>
      <div className="todo__wrapper">
        {completed ? (
          <MdDone color="green" size={20} />
        ) : (
          <MdClear color="red" size={20} />
        )}
        <li className="todo__item">{text}</li>
      </div>
      <div className="todo__btn">
        <MdDeleteForever
          size={20}
          color={completed ? "green" : "red"}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
