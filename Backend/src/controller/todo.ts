import { Todo } from "../model/Todo.js";
import { TryCatch } from "../utils/Handlers.js";
import { ApiRespones, CoustomError } from "../utils/UtilsClass.js";
import { TodoSchema, TodoUpdateSchema } from "../utils/zod.js";

export const createTodo = TryCatch(async (req, res, next) => {
  // input Vaildation using Zod
  const vaildation = TodoSchema.safeParse(req.body);

  if (vaildation.success === false) {
    return next(new CoustomError(vaildation.error.message, 400));
  }

  const { title, description } = vaildation.data;

  const data = await Todo.create({
    title,
    description,
  });

  res.status(200).json(new ApiRespones("New Todo Added ", data));
});

export const upadeteTodo = TryCatch(async (req, res, next) => {
  const { id } = req.params;

  if (!id) {
    return next(new CoustomError("provide Todo Id", 400));
  }

  const todo = await Todo.findById(id);

  if (!todo) {
    return next(new CoustomError("Todo Not Find", 404));
  }

  // input Vaildation using Zod
  const vaildation = TodoUpdateSchema.safeParse(req.body);

  if (vaildation.success === false) {
    return next(new CoustomError(vaildation.error.message, 400));
  }

  const { title, description, complate } = vaildation.data;

  if (!title && !description && typeof complate === "undefined") {
    return next(new CoustomError("At least one field is required", 400));
  }

  if (typeof complate !== "undefined") todo.complate = complate;
  if (title) todo.title = title;
  if (description) todo.description = description;

  await todo.save();

  res.status(200).json(new ApiRespones("Todo Updated ", todo));
});

export const delateTodo = TryCatch(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CoustomError("provide Todo Id", 400));
  }

  const todo = await Todo.findByIdAndDelete(id);

  if (!todo) {
    return next(new CoustomError("Todo Not Find", 404));
  }

  res.status(200).json(new ApiRespones("Todo Deleted Successfully", {}));
});

export const getAllTodo = TryCatch(async (req, res, next) => {
  const todo = await Todo.find({});

  if (!todo) {
    return next(new CoustomError("Todo List Has Empty", 404));
  }

  res.status(200).json(new ApiRespones("Todo Fetched Successfully", todo));
});
