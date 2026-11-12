import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTodo } from "../api/todosApi";

function TodoForm() {
  const [title, setTitle] = useState("");
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTodo,

    onSuccess: (newTodo) => {
      queryClient.setQueryData(
        ["todos"],
        (oldTodos: any) => [newTodo, ...(oldTodos || [])]
      );

      setTitle("");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    mutation.mutate(title);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Введите задачу..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Добавление..." : "Добавить"}
      </button>

      {mutation.isError && <p>Ошибка добавления задачи</p>}
    </form>
  );
}

export default TodoForm;
