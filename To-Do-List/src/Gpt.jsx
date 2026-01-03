/* =========================================================
   FILE: TodoContext.jsx
   PURPOSE: Global state management (Brain 🧠)
========================================================= */

import { createContext, useContext, useState } from "react";

const TodoContext = createContext();

export const useTodo = () => useContext(TodoContext);

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);

  const addTodo = (text) => {
    if (!text.trim()) return;
    setTodos((prev) => [
      ...prev,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const toggleTodo = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{ todos, addTodo, toggleTodo, deleteTodo }}
    >
      {children}
    </TodoContext.Provider>
  );
};



/* =========================================================
   FILE: TodoInput.jsx
   PURPOSE: Input box + Add button ✍️
========================================================= */

import { useState } from "react";
import { useTodo } from "./TodoContext";

export const TodoInput = () => {
  const [text, setText] = useState("");
  const { addTodo } = useTodo();

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo(text);
    setText("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2 w-full"
    >
      <input
        type="text"
        placeholder="What needs to be done?"
        className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-indigo-400"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-indigo-500 text-white hover:bg-indigo-600 active:scale-95 transition"
      >
        Add
      </button>
    </form>
  );
};



/* =========================================================
   FILE: TodoItem.jsx
   PURPOSE: Single todo card 🧩
========================================================= */

import { useTodo } from "./TodoContext";

export const TodoItem = ({ todo }) => {
  const { toggleTodo, deleteTodo } = useTodo();

  return (
    <div
      className={`flex items-center justify-between p-3 rounded-lg shadow-sm transition
      ${todo.completed ? "bg-green-100" : "bg-white"}`}
    >
      <span
        onClick={() => toggleTodo(todo.id)}
        className={`flex-1 cursor-pointer select-none
        ${todo.completed ? "line-through text-gray-500" : ""}`}
      >
        {todo.text}
      </span>

      <button
        onClick={() => deleteTodo(todo.id)}
        className="ml-3 text-red-500 hover:text-red-700"
      >
        ✕
      </button>
    </div>
  );
};



/* =========================================================
   FILE: TodoList.jsx
   PURPOSE: Render list of todos 📋
========================================================= */

import { useTodo } from "./TodoContext";
import { TodoItem } from "./TodoItem";

export const TodoList = () => {
  const { todos } = useTodo();

  if (todos.length === 0) {
    return (
      <p className="text-center text-gray-400 mt-6">
        No tasks yet. Your list is peacefully empty 🌱
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-3 mt-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
};



/* =========================================================
   FILE: TodoApp.jsx
   PURPOSE: Page layout + composition 🏗️
========================================================= */

import { TodoInput } from "./TodoInput";
import { TodoList } from "./TodoList";

export const TodoApp = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-indigo-600">
          My To-Do List
        </h1>

        <div className="mt-6">
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </div>
  );
};



/* =========================================================
   FILE: App.jsx
   PURPOSE: Context wrapper 🌐
========================================================= */

import { TodoProvider } from "./TodoContext";
import { TodoApp } from "./TodoApp";

function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}

export default App;



/* =========================================================
   FILE: main.jsx
   PURPOSE: React entry point 🚪
========================================================= */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css"; // Tailwind CSS

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
