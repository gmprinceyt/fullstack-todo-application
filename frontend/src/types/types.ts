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