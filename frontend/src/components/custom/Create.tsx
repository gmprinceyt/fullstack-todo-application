import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import toast from "react-hot-toast";
import type { Todo } from "@/types/types";
import { memo, useCallback, useState } from "react";
import { type  TodoSchemaF } from "@gmprincedev/common";
import useDebounce from "@/hooks/useDebounce";

const Create = memo(
  ({ setTodo }: { setTodo: React.Dispatch<React.SetStateAction<Todo[]>> }) => {
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const Dtitle = useDebounce(title)
    const Ddescription = useDebounce(description)

    const AddTodoHandler = useCallback(
      async function () {
        const RequestData: TodoSchemaF = {
          title: Dtitle,
          description: Ddescription,
        };
        try {
          const res = await fetch("http://localhost:3000/api/v1/todo/new", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(RequestData),
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
        } catch (error) {
          toast.error("Todo Creation Failed");
          console.log(error)
        }
      },
      [Ddescription, setTodo, Dtitle]
    );
    return (
      <>
        <div className="rounded-lg  p-3 dark:bg-gray-900 dark:text-gray-100 shadow-md bg-gray-100 mt-2 text-gray-900 mb-1">
          <div className="flex gap-1">
            <Input
              onChange={(e) => {
                setTitle(e.target.value);

              }}
              value={title}
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
              setDescription(e.target.value);
            }}
            value={description}
            placeholder="Type your message here."
          />
        </div>
      </>
    );
  }
);

export default Create;
