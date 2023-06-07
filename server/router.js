import Router from "express";
import TaskController from "./TaskController.js";

const router = new Router();

//Получаем все таски
router.get("/", TaskController.getAllTasks);

//Добавляем новый таск
router.post("/add", TaskController.addTask);

//Изменяем текст таска по id
router.put("/edit/:id", TaskController.editTask);

//Изменяем чекбокс таска по id
router.put("/toggle/:id", TaskController.toggleCheckTask);

//Удаляем один таск по id
router.delete("/one/:id", TaskController.deleteTask);

//Удаляем все чекнутые таски
router.delete("/all/checked", TaskController.deleteAllCheckedTask);

//Удаляем все таски
router.delete("/all", TaskController.deleteAllTasks);

export default router;
