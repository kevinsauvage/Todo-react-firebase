import React from "react";
import "./AddTodos.css";
const AddTodos = ({ handleInputChange, handleAddTodo, inputTodo }) => {
  return (
    <form className="addTodo">
      <input
        className="addTodo__input"
        value={inputTodo}
        onChange={handleInputChange}
      />
      <button
        className="addTodo__btn"
        style={{ opacity: inputTodo ? "1" : "0.5" }}
        type="submit"
        onClick={handleAddTodo}>
        Add
      </button>
    </form>
  );
};

export default AddTodos;
