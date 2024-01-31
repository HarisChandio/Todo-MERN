import { useState } from "react";

export function Todos({ todos }) {
    const [todosList, setTodosList] = useState(todos);

    async function markTodoAsCompleted(todoId) {
        await fetch(`http://localhost:3000/completed`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                id: todoId,
            }),
        });
        const updatedTodos = todosList.map((todo) =>
            todo._id === todoId ? { ...todo, completed: true } : todo
        );
        setTodosList(updatedTodos);
    }

    return (
        <div>
            {todosList.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => markTodoAsCompleted(todo._id)}>
                        {todo.completed ? "Completed" : "Mark as completed"}
                    </button>
                </div>
            ))}
        </div>
    );
}
