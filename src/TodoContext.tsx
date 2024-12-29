import React, {
  createContext,
  useEffect,
  useState,
  ReactNode,
  FormEvent,
} from "react";

type Todo = {
  id: number;
  text: string;
  done: boolean;
};

type TodoContextProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  handleSaveTodo: (e: FormEvent) => void;
  toggleTodo: (id: number) => void;
  showAddModal: boolean;
  setShowAddModal: React.Dispatch<React.SetStateAction<boolean>>;
  newTodo: string;
  setNewTodo: React.Dispatch<React.SetStateAction<string>>;
  removeTodo: (id: number) => void;
};

export const TodoContext = createContext<TodoContextProps | undefined>(
  undefined
);

type TodoProviderProps = {
  children: ReactNode;
};

function TodoProvider({ children }: TodoProviderProps) {
  const defaultTodos: Todo[] = [
    { id: 1, text: "Clean my computer", done: false },
    { id: 2, text: "Buy a keyboard", done: false },
  ];

  const [todos, setTodos] = useState<Todo[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  useEffect(() => {
    // Load todos from localStorage, fallback to defaultTodos if none are saved
    const savedTodos: Todo[] = JSON.parse(
      localStorage.getItem("todos") || "[]"
    );
    console.log("savedTodos", savedTodos);

    setTodos(savedTodos);
    console.log("todos", todos);
    if (Array.isArray(savedTodos) && savedTodos.length > 0) {
      setTodos(savedTodos);
    } else {
      setTodos(defaultTodos);
    }
  }, []);

  useEffect(() => {
    // Save todos to localStorage whenever they are updated
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleSaveTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodo.trim()) {
      setTodos([...todos, { id: Date.now(), text: newTodo, done: false }]);
      setNewTodo("");
      setShowAddModal(false);
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo
      )
    );
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        handleSaveTodo,
        toggleTodo,
        showAddModal,
        setShowAddModal,
        newTodo,
        setNewTodo,
        removeTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export default TodoProvider;
