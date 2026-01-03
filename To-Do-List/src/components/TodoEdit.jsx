import { useState } from "react";

function TodoEdit({ todo }) {
  const [description, setDescription] = useState(todo.description);
  const [isOpen, setIsOpen] = useState(false);

  const updateDescription = async () => {
    try {
      const body = { description };
      const response = await fetch(`https://todo-backend-62g79xtpk-subhams-projects-96c6d44c.vercel.app/todos/${todo.todo_id}`, {
        method: 'PUT',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = '/';
      console.log(response);
    } 
    catch (error) {
      console.error(error.message)
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-yellow-500 text-black px-4 py-2 rounded shadow hover:bg-yellow-600 transition"
      >
        Edit
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
          <div className="bg-gray-900 text-yellow-300 rounded-lg shadow-2xl w-96 p-6 border-2 border-yellow-500">
            <h2 className="text-xl font-bold mb-4 text-center">Edit Todo</h2>

            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-gray-800 text-yellow-300 border border-yellow-500 px-3 py-2 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  updateDescription();
                  setIsOpen(false);
                }}
                className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
              >
                Save
              </button>

              <button
                onClick={() => {
                  setDescription(todo.description);
                  setIsOpen(false)
                }}
                className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
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
