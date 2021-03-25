import "./Todo.css";
import { MdClear, MdDeleteForever, MdDone } from "react-icons/md";
import TodoLogic from "./TodoLogic";

const Todo = ({ text, completed, id, timestamp, user }) => {
  const { handleDelete, handleCompleted } = TodoLogic(
    text,
    completed,
    id,
    timestamp,
    user
  );

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
