import React, { createContext, useContext, useState } from 'react';
import { Plus, Trash2, Edit2, Check, X, CheckCircle2, Circle } from 'lucide-react';

// TodoContext
const TodoContext = createContext();

export const useTodoContext = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodoContext must be used within TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([
    { id: 1, text: 'Build an amazing todo app', completed: false, priority: 'high' },
    { id: 2, text: 'Study for exams', completed: false, priority: 'medium' },
    { id: 3, text: 'Complete React project', completed: true, priority: 'low' }
  ]);

  const addTodo = (text, priority = 'medium') => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      priority
    };
    setTodos(prev => [newTodo, ...prev]);
  };

  const deleteTodo = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const updateTodo = (id, text, priority) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, text, priority } : todo
    ));
  };

  return (
    <TodoContext.Provider value={{ todos, addTodo, deleteTodo, toggleTodo, updateTodo }}>
      {children}
    </TodoContext.Provider>
  );
};

// TodoInput Component
const TodoInput = () => {
  const [text, setText] = useState('');
  const [priority, setPriority] = useState('medium');
  const { addTodo } = useTodoContext();

  const handleSubmit = () => {
    if (text.trim()) {
      addTodo(text.trim(), priority);
      setText('');
      setPriority('medium');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="mb-8">
      <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 shadow-xl border border-white/20">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="What needs to be done?"
            className="flex-1 bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-purple-400 transition-all"
          >
            <option value="low" className="bg-gray-800">Low Priority</option>
            <option value="medium" className="bg-gray-800">Medium Priority</option>
            <option value="high" className="bg-gray-800">High Priority</option>
          </select>
          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-6 py-3 rounded-xl flex items-center justify-center gap-2 transition-all transform hover:scale-105 shadow-lg"
          >
            <Plus size={20} />
            <span className="hidden sm:inline">Add Task</span>
          </button>
        </div>
      </div>
    </div>
  );
};

// TodoItems Component
const TodoItems = ({ todo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const { deleteTodo, toggleTodo, updateTodo } = useTodoContext();

  const handleUpdate = () => {
    if (editText.trim()) {
      updateTodo(todo.id, editText.trim(), editPriority);
      setIsEditing(false);
    }
  };

  const priorityColors = {
    low: 'from-green-400 to-emerald-400',
    medium: 'from-yellow-400 to-orange-400',
    high: 'from-red-400 to-pink-400'
  };

  const priorityBorders = {
    low: 'border-green-400/50',
    medium: 'border-yellow-400/50',
    high: 'border-red-400/50'
  };

  return (
    <div className={`bg-white/10 backdrop-blur-lg rounded-xl p-4 shadow-lg border-l-4 ${priorityBorders[todo.priority]} hover:bg-white/15 transition-all transform hover:scale-[1.02] mb-3`}>
      {isEditing ? (
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-1 bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
          <select
            value={editPriority}
            onChange={(e) => setEditPriority(e.target.value)}
            className="bg-white/20 border border-white/30 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          >
            <option value="low" className="bg-gray-800">Low</option>
            <option value="medium" className="bg-gray-800">Medium</option>
            <option value="high" className="bg-gray-800">High</option>
          </select>
          <div className="flex gap-2">
            <button
              onClick={handleUpdate}
              className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-lg transition-all"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-lg transition-all"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <button
            onClick={() => toggleTodo(todo.id)}
            className="flex-shrink-0 transition-transform hover:scale-110"
          >
            {todo.completed ? (
              <CheckCircle2 size={24} className="text-green-400" />
            ) : (
              <Circle size={24} className="text-white/60 hover:text-white" />
            )}
          </button>
          <div className="flex-1 min-w-0">
            <p className={`text-white text-lg break-words ${todo.completed ? 'line-through text-white/50' : ''}`}>
              {todo.text}
            </p>
            <span className={`inline-block mt-1 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${priorityColors[todo.priority]}`}>
              {todo.priority.toUpperCase()}
            </span>
          </div>
          <div className="flex gap-2 flex-shrink-0">
            <button
              onClick={() => setIsEditing(true)}
              className="text-blue-400 hover:text-blue-300 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <Edit2 size={18} />
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="text-red-400 hover:text-red-300 p-2 hover:bg-white/10 rounded-lg transition-all"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

// TodoList Component
const TodoList = ({ filter }) => {
  const { todos } = useTodoContext();

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  if (filteredTodos.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">📝</div>
        <p className="text-white/60 text-lg">No tasks found</p>
        <p className="text-white/40 text-sm mt-2">Add a new task to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {filteredTodos.map(todo => (
        <TodoItems key={todo.id} todo={todo} />
      ))}
    </div>
  );
};

// TodoApp Component
const TodoApp = () => {
  const [filter, setFilter] = useState('all');
  const { todos } = useTodoContext();

  const stats = {
    total: todos.length,
    active: todos.filter(t => !t.completed).length,
    completed: todos.filter(t => t.completed).length
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-2 drop-shadow-lg">
            ✨ My Tasks
          </h1>
          <p className="text-white/80 text-lg">Organize your life, one task at a time</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 mb-8 shadow-xl border border-white/20">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-white">{stats.total}</p>
              <p className="text-white/60 text-sm">Total</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-yellow-400">{stats.active}</p>
              <p className="text-white/60 text-sm">Active</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-green-400">{stats.completed}</p>
              <p className="text-white/60 text-sm">Completed</p>
            </div>
          </div>
          
          <div className="flex gap-2 flex-wrap justify-center">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'all' 
                  ? 'bg-white text-purple-900' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter('active')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'active' 
                  ? 'bg-white text-purple-900' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Active
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === 'completed' 
                  ? 'bg-white text-purple-900' 
                  : 'bg-white/20 text-white hover:bg-white/30'
              }`}
            >
              Completed
            </button>
          </div>
        </div>

        <TodoInput />
        <TodoList filter={filter} />
      </div>
    </div>
  );
};

// App Component (Root)
export default function App() {
  return (
    <TodoProvider>
      <TodoApp />
    </TodoProvider>
  );
}