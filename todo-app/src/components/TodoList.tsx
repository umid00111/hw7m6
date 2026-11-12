import { useQuery } from "@tanstack/react-query";
import { getTodos } from "../api/todosApi";
import TodoItem from "./TodoItem";

function TodoList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  if (isLoading) {
    return <h3>Загрузка...</h3>;
  }

  if (isError) {
    return <h3>Ошибка загрузки задач</h3>;
  }

  return (
    <div className="todo-list">
      {data?.map((todo) => (
        <TodoItem key={todo.id} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
