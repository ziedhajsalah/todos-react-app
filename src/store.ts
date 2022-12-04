import create from "zustand";
import {
  getTodos,
  createTodo,
  completeTodo,
  uncompleteTodo,
  deleteTodo,
} from "./api";

export interface Todo {
  id: number;
  title: string;
  checked: boolean;
}

interface TodosState {
  todos: Todo[];
  getTodos: () => Promise<void>;
  addTodo: (title: string) => Promise<void>;
  toggleTodo: (id: number, complete: boolean) => Promise<void>;
  deleteTodo: (id: number) => Promise<void>;
}

export const useTodosStore = create<TodosState>((set) => ({
  todos: [],
  getTodos: async () => {
    const todos = await getTodos();
    set({ todos: todos });
  },
  addTodo: async (title) => {
    const todo = await createTodo(title);
    set((state) => ({ todos: [...state.todos, todo] }));
  },
  toggleTodo: async (id, complete) => {
    const todo = complete ? await completeTodo(id) : await uncompleteTodo(id);
    set((state) => {
      const todoToUpdateIndex = state.todos.findIndex((t) => t.id === id);
      return {
        todos: [
          ...state.todos.slice(0, todoToUpdateIndex),
          todo,
          ...state.todos.slice(todoToUpdateIndex + 1),
        ],
      };
    });
  },
  deleteTodo: async (id) => {
    await deleteTodo(id);
    set((state) => {
      return { todos: state.todos.filter((todo) => todo.id !== id) };
    });
  },
}));
