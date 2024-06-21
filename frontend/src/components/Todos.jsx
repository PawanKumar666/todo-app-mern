import { fetchTodos } from "./CreateTodo";  

export function Todos({ todos, setTodos }) {
    return (
      <div>
        {todos.map((todo) => (
          <div key={todo._id}>
            <h3>{todo.title}</h3>
            <p>{todo.description}</p>
            <button onClick={() => {handleMarkAsComplete(todo._id, todo.title, todo.description, setTodos)}}>
              {todo.completed === true ? 'Completed' : 'Mark as Complete'}
            </button>
          </div>
        ))}
      </div>
    );
  }

function handleMarkAsComplete(id, title, description, setTodos) {
    console.log(id, title, description);
    fetch(`http://localhost:3000/todo/${id}`, 
    {method: "POST", 
    body: JSON.stringify({title, description, completed: true}), headers: {'Content-Type' : 'application/json'}})
    .then(async (res) => {
      const data = await res.json();
      console.log(data);
      if (res.status === 200) {
        console.log("Todo marked as complete");
        fetchTodos(setTodos);
       } 
      else console.log("Todo not marked as complete");
    })
}