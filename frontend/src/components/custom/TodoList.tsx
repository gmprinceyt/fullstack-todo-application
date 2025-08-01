import { Checkbox } from "@/components/ui/checkbox";
import type { Todo, TodoResponse } from "@/types/types";
import { Pencil, SaveIcon, Trash2 } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const TodoList = ({
  todos,
  setTodo,
}: {
  todos: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
const [editMode, setEditMode] = useState<{[id: string]: {title:boolean, description:boolean}}>({});
const [editValues, setEditValues] = useState<{[id: string]: {title?:string, description?:string}}>({});

  async function complateTodoHandler(id: string, value: boolean) {
    try {
      fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          complate: value,
        }),
      });
      setTodo(
        todos.map((todo) =>
          todo._id === id ? { ...todo, complate: value } : todo
        )
      );

      toast.success(value ? "Todo Completed" : "Todo Pending");

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed To Complate Todo");
    }
  }

  async function DeleteTodoHandler(id: string) {
    try {
      await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: "DELETE",
      });

      setTodo(todos.filter((todo) => todo._id !== id));
      toast.success("Todo Deleted");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Todo Not Delete yet!");
    }
  }

  async function UpdateTodo(id: string) {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editValues[id]),
      });

      const data: TodoResponse = await res.json();
      
      setTodo(todos.map((todo) => (todo._id === id ? data.data : todo)));

      setEditMode((prev)=> ({...prev, [id]: {title: false, description:false}}));
      setEditValues((prev) => ({ ...prev, [id]: {} }));
      toast.success("Todo Updated");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Todo Not Updated!");
    }
  };

    const toggleEdit = (id: string, field: "title" | "description", value: boolean, current: string) => {
    setEditMode((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: value },
    }));
    setEditValues((prev) => ({
      ...prev,
      [id]: { ...prev[id], [field]: current },
    }));
  };

  return (
    <div>
      {todos ? (
        todos.map((todo, i) => {
          const isEditing = editMode[todo._id] || {};
          const edits  = editValues[todo._id] || {};
          return (
            <div
              key={todo._id}
              className="flex gap-1 mb-1 items-center shadow-md p-1.5  rounded-md"
            >
              <div
                className={`hover:bg-accent/50 w-sm flex items-start gap-3 rounded-lg border p-3 ${
                  todo.complate
                    ? "has-[[aria-checked=true]]:line-through  has-[[aria-checked=true]]:border-green-600 has-[[aria-checked=true]]:bg-green-50 dark:has-[[aria-checked=true]]:border-green-900 dark:has-[[aria-checked=true]]:bg-green-950"
                    : ""
                }`}
              >
                <Checkbox
                  id="toggle-2"
                  checked={todo.complate}
                  onCheckedChange={(checked) =>
                    !isEditing.title && !isEditing.description
                      ? complateTodoHandler(todo._id, Boolean(checked))
                      : toast.error("Update Todo After Complate")
                  }
                  className="data-[state=checked]:border-green-600 data-[state=checked]:bg-green-600 data-[state=checked]:text-white dark:data-[state=checked]:border-green-700 dark:data-[state=checked]:bg-green-700"
                />
                <div className="grid gap-1.5 font-normal">
                  <div className="flex gap-1 items-center">
                    <b>{i + 1}. </b>

                    {isEditing.title ? (
                      <div className="flex items-center gap-1 ">
                        <Input
                          value={edits.title ?? ""}
                          onChange={(e) => setEditValues((prev)=> ({...prev, [todo._id]: { ...prev[todo._id], title: e.target.value }}))}
                        />
                        <span
                          onClick={() => UpdateTodo(todo._id)}
                          className="bg-yellow-900 p-1.5 cursor-pointer  rounded-md text-yellow-400 hover:bg-orange-700"
                        >
                          <SaveIcon size={14} strokeWidth={3} />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 justify-between">
                        <small className="text-xs leading-none font-medium flex gap-2">
                          {todo.title}
                        </small>
                        <span
                          onClick={() => {
                            toggleEdit(todo._id, "title", true, todo.title)
                          }}
                          className="bg-yellow-900 p-1 cursor-pointer rounded-md text-yellow-400 hover:bg-orange-700"
                        >
                          <Pencil size={11} strokeWidth={3} />
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="">
                    {isEditing.description ? (
                      <div className="flex items-center gap-1 ">
                        <Textarea
                          value={
                            edits.description ?? ""
                          }
                          onChange={(e) => setEditValues((prev)=> ({...prev, [todo._id]: {...prev[todo._id], description: e.target.value}}))}
                        />
                        <span
                          onClick={() => UpdateTodo(todo._id)}
                          className="bg-yellow-900 p-1.5 cursor-pointer  rounded-md text-yellow-400 hover:bg-orange-700"
                        >
                          <SaveIcon size={14} strokeWidth={3} />
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1 justify-between">
                        <p className="text-xs text-muted-foreground">
                          {todo.description}
                        </p>
                        <span
                          onClick={() => {
                            toggleEdit(todo._id, "description", true, todo.description)
                          }}
                          className="bg-yellow-900 p-1 cursor-pointer rounded-md text-yellow-400 hover:bg-orange-700"
                        >
                          <Pencil size={11} strokeWidth={3} />
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <span
                onClick={() => DeleteTodoHandler(todo._id)}
                className="text-red-500 bg-red-950 py-4 px-3 rounded-sm cursor-pointer hover:bg-red-900"
              >
                <Trash2 />
              </span>
            </div>
          );
        })
      ) : (
        <p>Not Added</p>
      )}
    </div>
  );
};

export default TodoList;
