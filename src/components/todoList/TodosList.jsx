import React from "react";
import Todo from "../todo/Todo";
import "./TodosList.css";

const TodosList = ({ todos, user }) => {
  return (
    <div className="todoList">
      <ul>
        {todos &&
          todos.map((todo) => (
            <Todo
              key={todo.id}
              user={user}
              text={todo.todo}
              completed={todo.completed}
              id={todo.id}
              timestamp={todo.timestamp}
            />
          ))}
      </ul>
    </div>
  );
};

export default TodosList;
