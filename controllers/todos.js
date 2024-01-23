import { Todo } from "../models/todo.js";

class todoController {
    constructor() {
        this.TODOS = [];
    }

    createTodo(req, res) {
        // Get task from request
        const task = req.body.task;
        // Create new todo instance then push it to TODOS []
        const newTodo = new Todo(Math.random().toString(), task);
        this.TODOS.push(newTodo);

        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    getTodos(req, res) {
        res.json({ tasks: this.TODOS });
    }
}

export const TodoController = new todoController();