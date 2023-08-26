import "./App.css";
import React from "react";
import { api } from "./api";

function App() {
  const [todos, setTodos] = React.useState([]);
  const [value, setValue] = React.useState([]);

  function handleSubmit(e) {
    e.preventDefault();
    // have now added a simulated api dependency
    api.createItem(value).then((persistedItem) => {
      setTodos([...todos, value]);
      setValue("");
    });
  }

  function TodoList(props) {
    return (
      <ul>
        {props.items.map((item, i) => (
          <li
            key={i}
            title="click to remove item"
            className="planner-item"
            onClick={(i) => removeTodo(i)}
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  const removeTodo = (index) => {
    let temp = [...todos];
    temp.splice(index, 1);
    setTodos(temp);
  };

  return (
    <div>
      <h1>TO-DO LIST</h1>
      <TodoList items={todos} />
      <form onSubmit={handleSubmit}>
        <label htmlFor="new-todo">Add todo: </label>
        <input
          id="new-todo"
          value={value}
          placeholder="Add Todo..."
          onChange={(e) => setValue(e.target.value)}
        />
        <button>Add #{todos.length + 1}</button>
      </form>
    </div>
  );
}

export default App;
