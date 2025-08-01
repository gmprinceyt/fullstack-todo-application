import express from "express";
import { createTodo, delateTodo, upadeteTodo, getAllTodo } from "../controller/todo.js";

const app = express.Router();

// /api/v1/todo/new
app.route("/all").get(getAllTodo);
app.route("/new").post(createTodo);
app.route("/:id").patch(upadeteTodo).delete(delateTodo);

export default app;
