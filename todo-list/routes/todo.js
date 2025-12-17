const express = require("express")
const { body } = require("express-validator")
const router = express.Router()
const todoController = require("../controllers/todoController.js")

// Получение списка задач
router.get("/", todoController.getTodos)

// Создание задачи
router.post("/",
    [
        body("title").notEmpty().withMessage("Название задачи обязательно"),
        body("description").isLength({ max: 500 }).withMessage("Описание не должно превышать 500 символов")
    ],
    todoController.createTodo
)

// Обновление задачи
router.put("/update/:id",
    [
        body("title").notEmpty().withMessage("Название задачи обязательно"),
        body("description").isLength({ max: 500 }).withMessage("Описание не должно превышать 500 символов")
    ],
    todoController.updateTodo
)

// Удаление задачи
router.delete("/delete/:id", todoController.deleteTodo)

module.exports = router