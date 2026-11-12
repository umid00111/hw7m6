import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1>Мои задачи</h1>

      <TodoForm />

      <TodoList />
    </div>
  );
}

export default App;
