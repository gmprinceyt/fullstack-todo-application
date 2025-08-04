import { Checkbox } from "@/components/ui/checkbox";
import { Pencil, SaveIcon, Trash2 } from "lucide-react";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { memo } from "react";
import type { EditValues, Todo, ToggleEdit } from "@/types/types";
import toast from "react-hot-toast";

const TodoItem = memo(
  ({
    todo,
    editMode,
    editValue,
    toggleEdit,
    UpdateTodo,
    DeleteTodoHandler,
    complateTodoHandler,
    setEditValues,
    i,
  }: {
    todo: Todo;
    editMode: { title: boolean; description: boolean };
    editValue: { title?: string; description?: string };
    toggleEdit: ToggleEdit;
    UpdateTodo: (id: string) => Promise<void>;
    DeleteTodoHandler: (id: string) => Promise<void>;
    complateTodoHandler: (id: string, value: boolean) => Promise<void>;
    setEditValues: React.Dispatch<React.SetStateAction<EditValues>>;
    i: number;
  }) => {
    const isEditing = editMode || {};
    const edits = editValue || {};

    return (
      <>
        <div className="flex gap-1 mb-1 items-center shadow-md p-1.5  rounded-md">
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
                      value={edits.title}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          [todo._id]: {
                            ...prev[todo._id],
                            title: e.target.value,
                          },
                        }))
                      }
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
                        toggleEdit(todo._id, "title", true, todo.title);
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
                      value={edits.description ?? ""}
                      onChange={(e) =>
                        setEditValues((prev) => ({
                          ...prev,
                          [todo._id]: {
                            ...prev[todo._id],
                            description: e.target.value,
                          },
                        }))
                      }
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
                        toggleEdit(
                          todo._id,
                          "description",
                          true,
                          todo.description
                        );
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
      </>
    );
  }
);

export default TodoItem;
