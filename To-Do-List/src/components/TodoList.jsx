import { useEffect,useState } from "react";
import TodoEdit from "./TodoEdit";


const TodoList=()=>{
  const [todos,setTodos]=useState([])
  const deleteTodo=async(id)=>{
    try {
      const deletetodo =await fetch(`http://localhost:5001/todos/${id}`,{
        method:'DELETE',
    });
    setTodos(setTodos(prev => prev.filter(todo => todo.todo_id !== id)));
    console.log(deletetodo);

  } catch (error) {
    console.error(error.message)
  }
}
const getTodos=async()=>{
  try {
    const response =await fetch('http://localhost:5001/todos')
    const JSONdata=await response.json()

    setTodos(JSONdata);
  } catch (error) {
    console.error(error.message);
  }
}
useEffect(()=>{
  getTodos();
},[])

return (
  <>
  <table className="table mt-5 text-center">
    <thead>
      <tr>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Description
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Edit
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70">
            Delete
          </p>
        </th>
        <th className="p-4 border-b border-blue-gray-100 bg-blue-gray-50">
        <p className="block font-sans text-sm antialiased font-normal leading-none text-blue-gray-900 opacity-70"></p>
        </th>
      </tr>
    </thead>
    <tbody>
      {/* <tr>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            John Michael
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            Manager
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <p className="block font-sans text-sm antialiased font-normal leading-normal text-blue-gray-900">
            23/04/18
          </p>
        </td>
        <td className="p-4 border-b border-blue-gray-50">
          <a href="#" className="block font-sans text-sm antialiased font-medium leading-normal text-blue-gray-900">
            Edit
          </a>
        </td>
      </tr> */}
      {todos.map(todo => {
        if (!todo.description || todo.description.trim() === "") return null;

          return (
            <tr key={todo.todo_id}>
            <td>{todo.description}</td>
            <td><TodoEdit todo={todo} /></td>
              <td>
                <button type="button" onClick={() => deleteTodo(todo.todo_id)}>
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