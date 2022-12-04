import { useState } from "react";
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
  const [showDeleteButton, setShowDeleteButton] = useState<boolean>(false);

  return (
    <div
      className="todo-item"
      onMouseEnter={() => {
        setShowDeleteButton(true);
      }}
      onMouseLeave={() => {
        setShowDeleteButton(false);
      }}
    >
      <input
        type="checkbox"
        checked={checked}
        onChange={() => {
          toggleTodo();
        }}
      />
      <div>{title}</div>
      {showDeleteButton && (
        <img
          src={image}
          alt=""
          onClick={() => {
            deleteTodo();
          }}
        />
      )}
    </div>
  );
}
