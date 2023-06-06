import Router from "express";
import TaskController from "./TaskController.js";

const router = new Router();

//Получаем все таски
router.get("/", TaskController.getAllTasks);

//Добавляем новый таск
router.post("/add", TaskController.addTask);

//Изменяем таск по id
router.put("/edit/:id", TaskController.editTask);

//Удаляем один таск по id
router.delete("/delete/:id", TaskController.deleteTask);

//Удаляем все чекнутые таски
router.delete("/delete/checked", TaskController.deleteAllCheckedTask);

//Удаляем все таски
router.delete("/delete/all", TaskController.deleteAllTasks);

export default router;
