import { useEffect, useState } from "preact/hooks";
import NewTodoForm from "./NewTodoForm";
import "./styles.css";
import TodoList from "./TodoList";

export function App() {
  // cannot call hooks conditionally
  const [newItem, setNewItem] = useState("");
  // can only update state variable using "setNewItem"
  const [seminaut, setSeminaut] = useState(false);
  setSeminaut(true);
  console.log(seminaut);

  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue == null) return [];
    return JSON.parse(localValue);
  });
  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}

//It saves developers time on writing basic CSS code themselves.
// Developers can utilize this framework to apply predefined classes directly on markups
