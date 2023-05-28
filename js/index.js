import { renderTask } from "./render.js";
import {
  todoInput,
  todoButton,
  todoButtonDelCompleted,
  todoButtonDelAll,
  todoList,
  todoMain,
} from "./create.js";

let tasks = getData();

//получаем из локал, если пусто - получаем пустой массив
function getData() {
  return JSON.parse(localStorage.getItem("tasks")) ?? [];
}

//записываем в локал
function setData() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

//создаем задачу
function createTask() {
  const id = Date.now().toString();

  const task = {};
  task.text = todoInput.value;
  task.checked = false;
  task.id = id;

  todoInput.value !== ""
    ? tasks.push(task)
    : (todoInput.style.border = "1px solid #DC3545");

  todoInput.value = "";
  setData();
  render();
}

//отрисовываем список задач
function render() {
  todoList.innerHTML = "";

  tasks.forEach((task) => {
    renderTask(task.text, task.id, task.checked);
  });
  //если массив пустой - скрываем мэйн
  tasks.length
    ? todoMain.classList.remove("todo__hidden")
    : todoMain.classList.add("todo__hidden");
}

//удаляем все задачи
function deleteAllTasks() {
  localStorage.removeItem("tasks");
  tasks = getData();
  render();
}

//меняем статус задачи на "выполнено" и наоборот
function checkedTask(e) {
  if (e.target.classList.contains("todo__task-checkbox")) {
    const id = e.target.id;

    tasks.forEach((obj) => {
      if (obj.id === id) {
        if (obj.checked === false) {
          obj.checked = true;
        } else {
          obj.checked = false;
        }
      }
    });
    setData();
    render();
  }
}
//удаляем чекнутые
function deleteCheckedTasks() {
  tasks = tasks.filter((obj) => obj.checked === false);

  setData();
  render();
}

todoList.addEventListener("click", checkedTask);
todoButton.addEventListener("click", createTask);
todoButtonDelAll.addEventListener("click", deleteAllTasks);
todoButtonDelCompleted.addEventListener("click", deleteCheckedTasks);

render();
