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
  task.text = todoInput.value.trim();
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
//удаляем таску
function deleteTask(e) {
  if (e.target.classList.contains("todo__task-del")) {
    const id = e.target.parentNode.parentNode.querySelector(
      ".todo__task-checkbox"
    ).id;

    tasks = tasks.filter((obj) => obj.id !== id);
    setData();
    render();
  }
}

function editTask(e) {
  if (e.target.classList.contains("todo__task-edit")) {
    //создаем инпут
    //создаем кнопку
    //создаем переменная для хранения текста
    const todoItemEditDone = document.createElement("button");
    todoItemEditDone.classList.add("todo__task-edit-done");
    todoItemEditDone.textContent = "✅";
    const input = document.createElement("input");
    input.classList.add("todo__input-edit");
    let text;

    //выбираем лейбл с текстом таски
    //забираем текст из лейбла
    const parentDiv = e.target.parentNode.parentNode;
    const label = parentDiv.querySelector(".todo__task-label");
    text = label.textContent;

    //находим родителя кнопок
    const todoBox = parentDiv.querySelector(".todo__box");

    //скрываем кнопку карандаша и лейбл
    e.target.classList.add("todo__hidden");
    label.classList.add("todo__hidden");

    const checkbox = parentDiv.querySelector(".todo__task-checkbox");
    const delBtn = parentDiv.querySelector(".todo__task-del");
    checkbox.disabled = true
    delBtn.disabled = true;

    //добавляем кнопку галочку и инпут
    e.target.parentNode.prepend(todoItemEditDone);
    todoBox.append(input);

    //записываем в инпут текст из лeйбла
    input.value = text;

    todoItemEditDone.addEventListener("click", () => {
      //текст из инпута сохраняем в text
      const newText = input.value;
      text = newText;

      //удаляем созданные ноды
      input.remove();
      todoItemEditDone.remove();

      //показываем кнопку карандаша и лейбл
      label.classList.remove("todo__hidden");
      e.target.classList.remove("todo__hidden");

      //получаем айди таска
      const id = label.parentNode.firstChild.id


      tasks.forEach(obj => {
        if (obj.id === id) {
          obj.text = text;
        }
      })
      setData();
      render();
    });
  }
}

todoList.addEventListener("click", checkedTask);
todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", editTask);
todoButton.addEventListener("click", createTask);
todoButtonDelAll.addEventListener("click", deleteAllTasks);
todoButtonDelCompleted.addEventListener("click", deleteCheckedTasks);

render();
