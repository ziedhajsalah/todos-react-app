import image from "../delete.svg";

export function TodoItem({
  title,
  checked,
  toggleTodo,
  deleteTodo,
}: {
  title: string;
  checked: boolean;
  toggleTodo: () => void;
  deleteTodo: () => void;
}): JSX.Element {
  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          toggleTodo();
        }}
      />
      <div>{title}</div>
      <img
        src={image}
        alt=""
        onClick={() => {
          deleteTodo();
        }}
      />
    </div>
  );
}
