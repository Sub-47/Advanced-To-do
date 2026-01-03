import { useEffect, useState } from "react";
import TodoEdit from "./TodoEdit";

const TodoList = () => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5001/todos/${id}`, { method: 'DELETE' });
      setTodos(prev => prev.filter(todo => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message)
    }
  }

  const getTodos = async () => {
    try {
      const response = await fetch('http://localhost:5001/todos');
      const JSONdata = await response.json();
      setTodos(JSONdata);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => { getTodos() }, []);

  return (
    <>
      <table className="table-auto mt-5 text-center w-4/5 mx-auto bg-gray-900 text-yellow-300 rounded-lg overflow-hidden shadow-lg">
        <thead className="bg-gray-800 border-b border-yellow-500">
          <tr>
            <th className="p-4">Description</th>
            <th className="p-4">Edit</th>
            <th className="p-4">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map(todo => {
            if (!todo.description || todo.description.trim() === "") return null;
            return (
              <tr key={todo.todo_id} className="border-b border-gray-700 hover:bg-gray-700 transition">
                <td className="p-3">{todo.description}</td>
                <td className="p-3"><TodoEdit todo={todo} /></td>
                <td className="p-3">
                  <button
                    onClick={() => deleteTodo(todo.todo_id)}
                    className="bg-red-700 px-3 py-1 rounded hover:bg-red-800 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}

export default TodoList;
