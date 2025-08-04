import type { EditMode, EditValues, Todo, TodoResponse, ToggleEdit } from "@/types/types";
import { memo, useCallback, useState } from "react";

import toast from "react-hot-toast";
import TodoItem from "./TodoItem";

const TodoList = ({
  todos,
  setTodo,
}: {
  todos: Todo[];
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const [editMode, setEditMode] = useState<EditMode>({});
  const [editValues, setEditValues] = useState<EditValues>({});

  const complateTodoHandler = useCallback(
    async (id: string, value: boolean) => {
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
        setTodo((prev) =>
          prev.map((todo) =>
            todo._id === id ? { ...todo, complate: value } : todo
          )
        );

        toast.success(value ? "Todo Completed" : "Todo Pending");

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Failed To Complate Todo");
      }
    },
    [setTodo]
  );

  const DeleteTodoHandler = useCallback(
    async (id: string) => {
      try {
        await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
          method: "DELETE",
        });

        setTodo((prev) => prev.filter((todo) => todo._id !== id));
        toast.success("Todo Deleted");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Todo Not Delete yet!");
      }
    },
    [setTodo]
  );

  const UpdateTodo = useCallback(
    async function (id: string) {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/todo/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(editValues[id]),
        });

        const data: TodoResponse = await res.json();
        
        if (data.success === false) {
          toast.error("Enter All Fiels & Min 5 letter");
          return;
        }

        setTodo((prev) =>
          prev.map((todo) => (todo._id === id ? data.data : todo))
        );

        setEditMode((prev) => ({
          ...prev,
          [id]: { title: false, description: false },
        }));
        setEditValues((prev) => ({ ...prev, [id]: {} }));
        toast.success("Todo Updated");
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
      } catch (error) {
        toast.error("Todo Not Updated!");
      }
    },
    [editValues, setTodo]
  );

  const toggleEdit:ToggleEdit  = useCallback(
    (
      id: string,
      field: "title" | "description",
      value: boolean,
      current: string
    ) => {
      setEditMode((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: value },
      }));
      setEditValues((prev) => ({
        ...prev,
        [id]: { ...prev[id], [field]: current },
      }));
    },
    []
  );


  return (
    <>
      {todos.map((todo, index) => {
       return  <TodoItem
          key={todo._id}
          todo={todo}
          editMode={editMode[todo._id]}
          editValue={editValues[todo._id]}
          toggleEdit={toggleEdit}
          UpdateTodo={UpdateTodo}
          DeleteTodoHandler={DeleteTodoHandler}
          complateTodoHandler={complateTodoHandler}
          setEditValues={setEditValues}
          i={index}
        />
      })}
    </>
  );
};

export default memo(TodoList);
