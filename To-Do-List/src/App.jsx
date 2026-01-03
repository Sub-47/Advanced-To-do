import TodoInput from "./components/TodoInput"
import TodoList from "./components/TodoList"
export default function App(){
    return(
        <>
        <div className="min-h-screen bg-gray-400">
        <TodoInput/>
        <TodoList/>
        </div>
        
        </>
    )
}