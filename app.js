
//file name -app.js
const express = require('express');
const app = express();
const port = 3000;


app.use(express.json());


let tasks = [];
let nextId = 1;   

app.get('/', (req, res) => {
    res.send('Welcome to the Task Management API! Visit /tasks to manage tasks.');
});


app.get('/tasks', (req, res) => {
    res.json(tasks);
});


app.post('/tasks', (req, res) => {
    const { title, description } = req.body;

    if (!title || !description) {
        return res.status(400).json({ error: 'Title and description are required' });
    }

    const newTask = {
        id: nextId++,
        title,
        description,
        completed: false
    };
    tasks.push(newTask);
    res.status(201).json(newTask);
});


app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, description, completed } = req.body;

    const task = tasks.find(t => t.id === taskId);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    if (title) task.title = title;
    if (description) task.description = description;
    if (typeof completed === 'boolean') task.completed = completed;

    res.json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === taskId);

    if (taskIndex === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(taskIndex, 1);
    res.status(200).json({ message: 'Task successfully deleted' });
});

app.listen(port, () => {
    console.log(`Task API listening at http://localhost:${port}`);
});