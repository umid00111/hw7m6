import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateTodo, type Todo } from "../api/todosApi";

interface Props {
  todo: Todo;
}

function TodoItem({ todo }: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (completed: boolean) =>
      updateTodo(todo.id, completed),

    onSuccess: (updatedTodo) => {
      queryClient.setQueryData<Todo[]>(["todos"], (oldTodos) =>
        oldTodos?.map((item) =>
          item.id === updatedTodo.id
            ? { ...item, completed: updatedTodo.completed }
            : item
        )
      );
    },
  });

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        disabled={mutation.isPending}
        onChange={(e) => mutation.mutate(e.target.checked)}
      />

      <span className={todo.completed ? "completed" : ""}>
        {todo.title}
      </span>

      {mutation.isPending && <small>Сохранение...</small>}

      {mutation.isError && <small>Ошибка обновления</small>}
    </div>
  );
}

export default TodoItem;
