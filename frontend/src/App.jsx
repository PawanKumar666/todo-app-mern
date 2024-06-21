import { useState, useEffect } from 'react'
import './App.css'
import {CreateTodo} from "./components/CreateTodo";
import {Todos} from "./components/Todos";

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos").then(async (res) => {
      const jsonRes = await res.json();
      setTodos(jsonRes);
    }).catch((err) => {
      console.log("Error fetching todos: ", err);
    })
  }, []);

  return (
    <div>
      <CreateTodo setTodos={setTodos}/>
      {todos && <Todos todos={todos} />}
    </div>
  )
}

export default App
