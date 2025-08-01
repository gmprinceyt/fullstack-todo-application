import express from 'express';
import { GlobalMiddleware } from './middleware/error.js';
import morgan from 'morgan';
import cors from 'cors'

const app = express();

// Defind Middleware 
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));

// Route
import Todo from './routes/todo.js';
import { Connect } from './config/database.connec.js';
app.use("/api/v1/todo", Todo);



// Error Middleware 
app.use(GlobalMiddleware); // Global Middlerware Adding on after Routes Middlerwares so that its works


Connect().then(()=> {
    app.listen(3000, ()=>{
    console.log("Server Started on http://localhost:3000")
});
})