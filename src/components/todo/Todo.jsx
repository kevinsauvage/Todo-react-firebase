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
        borderLeft: completed
          ? "2px solid rgba(23, 136, 115, 1)"
          : "2px solid rgba(244, 56, 98, 1)",
      }}>
      <div className="todo__wrapper">
        {completed ? (
          <MdDone color="rgba(23, 136, 115, 1)" size={20} />
        ) : (
          <MdClear color="rgba(244, 56, 98, 1)" size={20} />
        )}
        <li className="todo__item">{text}</li>
      </div>
      <div className="todo__btn">
        <MdDeleteForever
          size={20}
          color={completed ? "rgba(23, 136, 115, 1)" : "rgba(244, 56, 98, 1)"}
          onClick={handleDelete}
        />
      </div>
    </div>
  );
};

export default Todo;
