import {
  todoInput,
  todoButton,
  todoButtonDelCompleted,
  todoButtonDelAll,
  todoList,
} from "./create.js";

function createTask() {
  todoButton.addEventListener("click", () => {
    const id = String(Date.now());
    let tasks = localStorage.getItem("tasks");

    //если localStorage пустой то записываем  в него пустой масив
    //иначе получаем массив с объектами
    tasks === null ? (tasks = []) : (tasks = JSON.parse(tasks));

    let task = {};
    task.text = todoInput.value.trim();
    task.cheked = false;
    task.id = id;

    //если инпут не пустой то пушим объект в localStorage
    todoInput.value !== ""
      ? tasks.push(task)
      : (todoInput.style.border = "1px solid #DC3545");
    localStorage.setItem("tasks", JSON.stringify(tasks));

    todoInput.value = "";
    console.log(tasks);
  });
}
createTask();
