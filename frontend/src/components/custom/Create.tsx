import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import type { Todo } from "@/types/types";
import { memo, useCallback, useState } from "react";
import useDebounce from "@/hooks/useDebounce";

const Create = memo(
  ({ setTodo }: { setTodo: React.Dispatch<React.SetStateAction<Todo[]>> }) => {
    const [title, setTitle] = useState<string | undefined>(undefined);
    const [description, setDescription] = useState<string | undefined>(
      undefined
    );
    const [Debounce] = useDebounce();

    const AddTodoHandler = useCallback(
      async function () {
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

          if (data.success === false) {
            toast.error("Enter All Fiels & Min 5 letter");
            return;
          }

          setTodo((prev) => [...prev, data.data]);

          toast.success("New Added");
          setTitle("");
          setDescription("");
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
          toast.error("Todo Creation Failed");
        }
      },
      [description, setTodo, title]
    );
    return (
      <>
        <div className="rounded-lg  p-3 dark:bg-gray-900 dark:text-gray-100 shadow-md bg-gray-100 mt-2 text-gray-900 mb-1">
          <div className="flex gap-1">
            <Input
              onChange={(e) => {
                Debounce(setTitle, e.target.value);
              }}
              type="text"
              placeholder="Enter Title "
              className="mb-2"
            />
            <Button onClick={AddTodoHandler} className="cursor-pointer">
              Add
            </Button>
          </div>
          <Textarea
            onChange={(e) => {
              Debounce(setDescription, e.target.value);
            }}
            placeholder="Type your message here."
          />
        </div>
      </>
    );
  }
);

export default Create;
