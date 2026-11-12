import axios from "axios";

const API = "https://jsonplaceholder.typicode.com/todos";

export interface Todo {
  id: number;
  title: string;
  completed: boolean;
  userId: number;
}


export const getTodos = async (): Promise<Todo[]> => {
  const response = await axios.get(`${API}?_limit=10`);
  return response.data;
};

export const addTodo = async (title: string): Promise<Todo> => {
  const response = await axios.post(API, {
    title,
    completed: false,
    userId: 1,
  });

  return response.data;
};


export const updateTodo = async (
  id: number,
  completed: boolean
): Promise<Todo> => {
  const response = await axios.patch(`${API}/${id}`, {
    completed,
  });

  return response.data;
};
