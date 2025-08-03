import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import type { Todo } from "@/types/types";
import { useState } from "react";

const Create = ({
  setTodo,
}: {
  setTodo: React.Dispatch<React.SetStateAction<Todo[]>>;
}) => {
  const [title, setTitle] = useState<string | undefined>(undefined);
  const [description, setDescription] = useState<string | undefined>(undefined);

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
      setTodo((prev) => [...prev, data.data]);

      toast.success("New Added");
      setTitle("");
      setDescription("");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Todo Creation Failed");
    }
  }
  return (
    <>
      <div className="rounded-lg  p-3 dark:bg-gray-900 dark:text-gray-100 shadow-md bg-gray-100 mt-2 text-gray-900 mb-1">
        <div className="flex gap-1">
          <Input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Enter Title "
            className="mb-2"
            value={title || ""}
          />
          <Button onClick={AddTodoHandler} className="cursor-pointer">
            Add
          </Button>
        </div>
        <Textarea
          value={description || ""}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Type your message here."
        />
      </div>
    </>
  );
};

export default Create;
