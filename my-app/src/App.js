import "./App.css";
import { useEffect, useState } from "react";
import uniqid from "uniqid";

function App() {
  const [todos, setTodos] = useState([]);
  const [currentTodoText, setCurrentTodoText] = useState("");
  const [error, setError] = useState(null);
  useEffect(() => {
    fetch("http://localhost:3001/todos")
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setTodos(res);
      })
      .catch((err) => {
        console.log(err);

        setError(err);
      });
    return () => {
      if (!todos.length) {
        return;
      }
      debugger;
      // persist all todos in db
      fetch("http://localhost:3001/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(todos),
      })
        .then((res) => {
          return res.json();
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }, []);

  if (error) {
    return <div>There is some error</div>;
  }

  const handleAddTodo = (event) => {
    const text = event.target.value;
    if (!text) {
      return;
    }
    //create todos
    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-GB");

    const todo = {
      id: uniqid(),
      text: text,
      date: formattedDate,
      completed: false,
    };

    // persist this new todo
    setTodos((todos) => [...todos, todo]);
    setCurrentTodoText("");
  };
  const handleTodoComplete = (id) => {
    // status update for todo
    const tIndex = todos.findIndex((t) => t.id === id);
    if (tIndex > -1) {
      const newTodos = [...todos]; // create a copy of the array
      newTodos[tIndex].completed = !newTodos[tIndex].completed;
      setTodos(newTodos);
    }
  };
  const formattedDate = (isoDate) => {
    const date = new Date(isoDate);
    const formattedDate = date.toLocaleDateString("en-GB");

    return formattedDate;
  };
  return (
    <div className="App">
      <header className="App-header">
        <h4>Todos</h4>
        <input
          type="text"
          value={currentTodoText}
          onBlur={handleAddTodo}
          onChange={(event) => setCurrentTodoText(event.target.value)}
          style={{ padding: 20 }}
        />

        <div
          style={{ display: "flex", flexDirection: "column", marginTop: 20 }}
        >
          {todos.map((todo) => (
            <div key={todo.id} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", gap: 10 }}>
                <input
                  type="checkbox"
                  id={todo.id}
                  name={todo.id}
                  onChange={() => handleTodoComplete(todo.id)}
                />
                <span>{todo.text}</span>
                <span>{formattedDate(todo.date)}</span>
                <span style={{ marginLeft: 50 }}>
                  {todo.completed ? "✔" : "✖"}
                </span>
              </div>
            </div>
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
