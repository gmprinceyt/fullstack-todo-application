import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import toast, { Toaster } from "react-hot-toast";
import { ModeToggle } from "../ToggleMode.tsx";
import { useEffect, useState } from "react";
import type { Todo } from "@/types/types.ts";
import TodoList from "./TodoList.tsx";

const CreateTodo = () => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);
  const [todos, setTodo] = useState<Todo[]>([]);


  async function AddTodoHandler() {
    try {
      const res = await fetch("http://localhost:3000/api/v1/todo/new", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          description: description,
        }),
      });
      const data = await res.json();
      setTodo((prev)=> [...prev, data.data]);

      toast.success("New Added");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Todo Creation Failed");
    }
  };


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
      <div className="rounded-lg  p-3 dark:bg-gray-900 dark:text-gray-100 shadow-md bg-gray-100 mt-2 text-gray-900 mb-1">
        <div className="flex gap-1">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title "
            className="mb-2"
          />
          <Button onClick={AddTodoHandler} className="cursor-pointer">
            Add
          </Button>
        </div>
        <Textarea
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message here."
        />
      </div>
      <TodoList todos={todos} setTodo={setTodo} />
    </div>
  );
};

export default CreateTodo;
