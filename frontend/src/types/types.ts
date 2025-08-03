export type Todo = {
  complate: boolean;
  description: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  _id: string;
};

export interface TodoResponse {
  message: string;
  data: Todo;
}

export type EditMode = {
  [id: string]: { title: boolean; description: boolean };
};
export type EditValues = {
  [id: string]: { title?: string; description?: string };
};
export type ToggleEdit = (
  id: string,
  field: "title" | "description",
  value: boolean,
  current: string
) => void;
