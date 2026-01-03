import { useState } from "react";

function TodoEdit({ todo }) {
    const [description, setDescription] = useState(todo.description);
    const [isOpen, setIsOpen] = useState(false);
    const updateDescription=async ()=>{
      
      try {
        const body={description};
        const response=await fetch(`http://localhost:5001/todos/${todo.todo_id}`,{
          method:'PUT',
          headers:{"Content-Type":"application/json"},
          body:JSON.stringify(body)
      })
      window.location='/';
      console.log(response);

    } catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
    <button
    onClick={() => setIsOpen(true)}
    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
    >
    Edit
  </button>

  {isOpen && (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
      <h2 className="text-xl font-bold mb-4">Edit Todo</h2>

        <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border px-3 py-2 rounded mb-4"
        />

        <div className="flex justify-end gap-2">
          <button
          onClick={() => {
            updateDescription();
            setIsOpen(false);
        }}
        className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600"
        >
        Save
      </button>


      <button
      onClick={() => {
        setDescription(todo.description);
        setIsOpen(false)}}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
      >
      Close
    </button>
  </div>
</div>
</div>
)}
</>
);
}

export default TodoEdit;
