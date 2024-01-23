import express, { Router } from 'express';
import { TodoController } from '../controllers/todos.js';

const router = Router();

// Get new todo task 
router.post('/new-todo', (req, res) => TodoController.createTodo(req, res));
// Display all todo tasks
router.get('/', (req, res) => TodoController.getTodos(req, res));
// Update todo
router.patch('/:id', (req, res) => TodoController.updateTodo(req, res));
// Delete todo
router.delete('/:id', (req, res) => TodoController.deleteTodo(req, res));

export default router;