import { useState } from "react";

export function CreateTodo({setTodos}) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    return (
        <div>
            <h3>Add a Todo !</h3>
            <input style={{padding: 10, margin:10}} type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input><br />
            <input style={{padding: 10, margin:10}} type="text" placeholder="Description" onChange={(e) => setDescription(e.target.value)}></input><br />
            <button style={{padding: 10, margin:10}} onClick={() => {handleAddTodo(title, description, setTodos)}}>Add Todo</button>
        </div>
    )
}

function handleAddTodo(title, description, setTodos) {
    console.log(title, description);
    fetch("http://localhost:3000/todo", 
    {
        method: "POST", 
        body: JSON.stringify({title, description}), 
        headers: {"Content-Type": "application/json"}
    })
    .then(async(res) => {
        const data = await res.json();
        console.log(data);
        if (res.status === 200) {
            console.log("Todo added successfully");
            fetchTodos(setTodos); // Refetch todos to render on main screen
        } else {
            console.log("Todo not added");
        }
    })
}

function fetchTodos(setTodos) {
    fetch("http://localhost:3000/todos")
    .then(async(res) => {
        const todos = await res.json();
        console.log(todos);
        setTodos(todos);
    })
}