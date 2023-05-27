import { renderTask } from "./render.js";
import {
  todoInput,
  todoButton,
  todoButtonDelCompleted,
  todoButtonDelAll,
  todoList,
  todoMain,
} from "./create.js";

let tasks = JSON.parse(localStorage.getItem("tasks"));

function createTask() {
  todoButton.addEventListener("click", () => {
    const id = String(Date.now());

    const task = {};
    task.text = todoInput.value;
    task.cheked = false;
    task.id = id;

    todoInput.value !== ""
      ? tasks.push(task)
      : (todoInput.style.border = "1px solid #DC3545");

    localStorage.setItem("tasks", JSON.stringify(tasks));
    todoList.innerHTML = "";
    todoInput.value = "";

    render();
  });
}
createTask();

function render() {
  tasks === null
    ? (tasks = [])
    : tasks && todoMain.classList.remove("todo__hidden");

  tasks.forEach((task) => {
    renderTask(task.text, task.id);
  });
}

todoButtonDelAll.addEventListener("click", deleteAllTasks);

function deleteAllTasks() {
  localStorage.clear();
  todoMain.classList.add("todo__hidden");
  tasks = [];
}

render();
