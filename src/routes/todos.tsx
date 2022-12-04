import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "../components/Input";
import { Layout } from "../components/Layout";
import { TodoItem } from "../components/TodoItem";
import { useTodosStore, Todo } from "../store";

export function Todos(): JSX.Element {
  const todos = useTodosStore((state) => state.todos);
  const getTodos = useTodosStore((state) => state.getTodos);
  const addTodo = useTodosStore((state) => state.addTodo);
  const toggleTodo = useTodosStore((state) => state.toggleTodo);
  const deleteTodo = useTodosStore((state) => state.deleteTodo);
  const [filter, setFilter] = useState<"all" | "completed" | "incompleted">(
    "all"
  );
  const [todosToDisplay, setTodosToDisplay] = useState<Todo[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!window.localStorage.getItem("token")) navigate("login");
  }, [navigate]);

  useEffect(() => {
    getTodos();
  }, [getTodos]);

  useEffect(() => {
    setTodosToDisplay(() => {
      if (filter === "completed") return todos.filter((todo) => todo.checked);
      if (filter === "incompleted")
        return todos.filter((todo) => !todo.checked);
      return todos;
    });
  }, [todos, filter]);

  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: async (values, { resetForm }) => {
      await addTodo(values.title);
      resetForm();
    },
  });
  return (
    <Layout title="Todo List">
      <form onSubmit={formik.handleSubmit}>
        <div className="form-field">
          <Input
            id="title"
            name="title"
            type="text"
            onChange={formik.handleChange}
            value={formik.values.title}
            placeholder="Add a new todo"
          />
        </div>
      </form>
      <div className="todos">
        {todosToDisplay.map((todo) => (
          <TodoItem
            key={todo.id}
            title={todo.title}
            checked={todo.checked}
            toggleTodo={() => {
              toggleTodo(todo.id, !todo.checked);
            }}
            deleteTodo={() => {
              deleteTodo(todo.id);
            }}
          />
        ))}
      </div>
      <div className="filter">
        <span>Show:</span>
        <span
          className={filter !== "all" ? "clickable" : ""}
          onClick={() => {
            setFilter("all");
          }}
        >
          all
        </span>
        <span
          className={filter !== "completed" ? "clickable" : ""}
          onClick={() => {
            setFilter("completed");
          }}
        >
          completed
        </span>
        <span
          className={filter !== "incompleted" ? "clickable" : ""}
          onClick={() => {
            setFilter("incompleted");
          }}
        >
          incompleted
        </span>
      </div>
    </Layout>
  );
}
