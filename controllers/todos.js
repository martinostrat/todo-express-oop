import { fileManager } from "../files.js";
import { Todo } from "../models/todo.js";

class todoController {
    constructor() {
        this.initTodos();
    }

    async createTodo(req, res) {
        // Get task from request
        const task = req.body.task;
        // Create new todo instance then push it to TODOS []
        const newTodo = new Todo(Math.random().toString(), task);
        this.TODOS.push(newTodo);

        // add todo to local json file (data/todos.json)
        await fileManager.writeFile('./data/todos.json', this.TODOS)

        res.json({
            message: 'created new todo object',
            newTask: newTodo
        })
    }

    async initTodos() {
        const todosData = await fileManager.readFile('./data/todos.json');

        // If data was accessible then add data to TODO [] else return empty TODO []
        if (todosData !== null) {
            this.TODOS = todosData;
        } else {
            this.TODOS = [];
        }
    }

    getTodos(req, res) {
        res.json({ tasks: this.TODOS });
    }

    async updateTodo(req, res) {
        const todoId = req.params.id;
        const updatedTask = req.body.task;
        // Finds index from TODOS [] where todo ids match
        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId);

        // If index is not found (returns -1) then throw error
        if (todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such index'
            });
            throw new Error('Could not find todo');
        }

        // Overwrite todo where index matched (id stays the same, task is updated)
        this.TODOS[todoIndex] = new Todo(this.TODOS[todoIndex].id, updatedTask);
        // Write changes to todos.json file
        await fileManager.writeFile('./data/todos.json', this.TODOS);

        res.json({
            message: 'Updated todo',
            updatedTask: this.TODOS[todoIndex]
        })
    }

    async deleteTodo(req, res) {
        const todoId = req.params.id;
        // Find index from TODO[]
        const todoIndex = this.TODOS.findIndex(todo => todo.id === todoId);

        // If index is not found (returns -1) then throw error
        if (todoIndex < 0) {
            res.json({
                message: 'Could not find todo with such index'
            });
            throw new Error('Could not find todo');
        }

        // Remove todo from TODOS []
        this.TODOS.splice(todoIndex, 1);
        // Remove todo from todos.json file
        await fileManager.writeFile('./data/todos.json', this.TODOS);

        res.json({
            message: 'Deleted todo'
        })
    }
}

export const TodoController = new todoController();