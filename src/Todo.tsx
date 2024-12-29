// Todo.tsx
import React from "react";
import { MdOutlineDelete } from "react-icons/md";

interface TodoProps {
  todo: { id: number; text: string; done: boolean };
  toggleTodo: (id: number) => void;
  removeTodo: (id: number) => void;
}

const Todo: React.FC<TodoProps> = ({ todo, toggleTodo, removeTodo }) => {
  return (
    <div className="relative flex items-start">
      <div className="flex items-center h-5">
        <input
          id={todo.id.toString()}
          type="checkbox"
          checked={todo.done}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4 text-yellow-600 border-gray-300 rounded focus:ring-yellow-500"
        />
      </div>
      <div className="ml-3 text-sm">
        {todo.done ? (
          <div className="flex items-center gap-2">
            <MdOutlineDelete
              onClick={() => removeTodo(todo.id)}
              className="text-lg"
            />
            <label
              htmlFor={todo.id.toString()}
              className="font-medium text-gray-700"
            >
              {todo.text}
            </label>
          </div>
        ) : (
          <label
            htmlFor={todo.id.toString()}
            className="font-medium text-gray-700"
          >
            {todo.text}
          </label>
        )}
      </div>
    </div>
  );
};

export default Todo;
