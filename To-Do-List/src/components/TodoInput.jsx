import React, { useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch('http://localhost:5001/todos', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      window.location = '/';
      console.log(await response.json());
      setDescription("");
    } catch (error) {
      console.log(error.message);
    }
  }
  
  return (
    <div className="flex flex-col items-center gap-6 mt-10">
      <h1 className="bg-gray-900 text-yellow-500 px-6 py-2 rounded shadow text-xl">
        Todo List
      </h1>

      <form className="flex gap-2" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="bg-gray-800 text-yellow-300 border border-yellow-500 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-yellow-500"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="What are your plans today?"
        />

        <button
          type="submit"
          className="bg-yellow-500 text-black px-4 py-2 rounded hover:bg-yellow-600 transition"
        >
          Add
        </button>

        <button
          type="button"
          className="bg-red-700 text-white px-4 py-2 rounded hover:bg-red-800 transition"
        >
          ❌
        </button>
      </form>
    </div>
  );
};

export default TodoInput;
