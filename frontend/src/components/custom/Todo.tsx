import toast, { Toaster } from "react-hot-toast";
import { ModeToggle } from "../ToggleMode.tsx";
import { useEffect, useState } from "react";
import type { Todo } from "@/types/types.ts";
import TodoList from "./TodoList.tsx";
import Create from "./Create.tsx";

const Todos = () => {
  const [todos, setTodo] = useState<Todo[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/v1/todo/all")
      .then((res) => {
        return res.json();
      })
      .then((data) => setTodo(data.data))
      .catch(() => {
        toast.error("Data Not Loaded!");
      });
  }, []);

  return (
    <div className="w-1/4">
      <Toaster />
      <ModeToggle />
      <Create setTodo={setTodo}/>
      <TodoList todos={todos} setTodo={setTodo} />
    </div>
  );
};

export default Todos;
