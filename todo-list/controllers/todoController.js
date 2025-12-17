const { body, validationResult } = require("express-validator")
const Todo = require("../models/todo")

// Получение списка задач
module.exports.getTodos = async (req, res) => {
    try {
        const todos = await Todo.find()
        res.render("todos", { todos, errors: null })
    } catch (error) {
        console.log("error getTodos", error);
        res.status(500).send(error)
    }
}

// Создание задачи
module.exports.createTodo = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const todos = await Todo.find()
        return res.status(400).render("todos", { todos, errors: errors.array() })
    }

    const { title, description } = req.body
    const newTodo = new Todo({ title, description })

    try {
        await newTodo.save()
        res.redirect("/todos")
    } catch (error) {
        console.log("error createTodo");
        res.status(500).send(error)
    }
}

// Обновление задачи
module.exports.updateTodo = async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        const todos = await Todo.find()
        return res.status(400).render("todos", { todos, errors: errors.array() })
    }

    const { id } = req.params
    const { title, description, completed } = req.body

    try {
        await Todo.findByIdAndUpdate(id, { title, description, completed: completed === "on" })
        res.redirect("/todos")
    } catch (error) {
        console.log("error updateTodo");
        res.status(500).send(error)
    }
}

// Удаление задачи
module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params

    try {
        await Todo.findByIdAndDelete(id)
        res.redirect("/todos")
    } catch (error) {
        console.log("error deleteTodo");
        res.status(500).send(error)
    }
}