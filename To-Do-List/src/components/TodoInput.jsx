import React, { useState } from "react";

const TodoInput = () => {
  const [description, setDescription] = useState("");
 const onSubmitForm = async (e) => {
  e.preventDefault();
  try {
    const body = { description };
    const response = await fetch('http://localhost:5001/todos', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body)
    });
    window.location='/';
    console.log(await response.json());
    setDescription("");
    
  } catch (error) {
    console.log(error.message);
  }
}

  return (
    <>
      <div className="flex justify-center text-center flex-col gap-6">
        <div className="flex justify-center text-center">
          <h1 className="bg-gray-700 w-sm text-white inline-block text-xl">
            Input Todo
          </h1>
        </div>

        <form className="flex gap-2" onSubmit={onSubmitForm}>
          <input
            type="text"
            className="bg-gray-300 w-64 px-2 py-1"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
             placeholder="What are your plans today"
          />

          <button
            type="submit"
            className="bg-blue-700 text-green-500 hover:bg-red-500 text-xl"
          >
            Add
          </button>
       
          <button
            type="submit"
            className="bg-yellow-200 text-red-500 hover:bg-green-600 text-xl"
          >
            ❌
          </button>
        </form>
      </div>
    </>
  );
};
export default TodoInput;
