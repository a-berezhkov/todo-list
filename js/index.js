import { renderTask } from "./render.js";
import {
  todoInput,
  todoButton,
  todoButtonDelCompleted,
  todoButtonDelAll,
  todoList,
  todoMain,
} from "./create.js";

const url = "http://localhost:5000";

//функция рендера
const render = (arr) => {
  todoList.innerHTML = "";

  arr.forEach((task) => {
    renderTask(task.text, task.id, task.checked);
  });
  //если массив пустой - скрываем мэйн
  arr.length
    ? todoMain.classList.remove("todo__hidden")
    : todoMain.classList.add("todo__hidden");
};

//получаем с сервера
const getData = () => {
  fetch(url, {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      render(data);
    });
};

//сохраняем на сервер
const setData = (newTask) => {
  fetch(url + "/one", {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(newTask),
  })
    .then((response) => response.json())
    .then((data) => {
      render(data);
    });
};

//создать таск
const createTask = () => {
  const id = Date.now().toString();

  const task = {};
  task.text = todoInput.value.trim();
  task.checked = false;
  task.id = id;

  if (todoInput.value.length) {
    setData(task);
  }

  todoInput.value = "";
};

//удалить все
const deleteAllTasks = () => {
  fetch(url + "/all", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      render(data);
    });
};

//меняем статус чекбокса
const checkedTask = (e) => {
  if (e.target.classList.contains("todo__task-checkbox")) {
    const idTask = e.target.id;

    fetch(url + "/check", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: idTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        render(data);
      });
  }
};

const deleteCheckedTasks = () => {
  fetch(url + "/checkeds", {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      render(data);
    });
};

const deleteTask = (e) => {
  if (e.target.classList.contains("todo__task-del")) {
    const idTask = e.target.parentNode.parentNode.querySelector(
      ".todo__task-checkbox"
    ).id;

    fetch(url + "/one", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ id: idTask }),
    })
      .then((response) => response.json())
      .then((data) => {
        render(data);
      });
  }
};

const editTask = (e) => {
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

    //убираем активность всех остальных кнопок пока редактируется таска
    const checkboxAll = todoList.querySelectorAll(".todo__task-checkbox");
    const delBtnAll = todoList.querySelectorAll(".todo__task-del");
    const editBtnAll = todoList.querySelectorAll(".todo__task-edit");
    checkboxAll.forEach((elem) => {
      elem.disabled = true;
    });
    delBtnAll.forEach((elem) => {
      elem.disabled = true;
    });
    editBtnAll.forEach((elem) => {
      elem.disabled = true;
    });

    //добавляем кнопку галочку и инпут
    e.target.parentNode.prepend(todoItemEditDone);
    todoBox.append(input);

    //записываем в инпут текст из лeйбла
    input.value = text;

    todoItemEditDone.addEventListener("click", () => {
      //текст из инпута сохраняем в text
      const newText = input.value;
      // text = newText;

      //удаляем созданные ноды
      input.remove();
      todoItemEditDone.remove();

      //показываем кнопку карандаша и лейбл
      label.classList.remove("todo__hidden");
      e.target.classList.remove("todo__hidden");

      //получаем айди таска
      const idTask = label.parentNode.firstChild.id;

      fetch(url + "/edit", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: idTask, text: newText }),
      })
        .then((response) => response.json())
        .then((data) => {
          render(data);
        });
    });
  }
};


todoList.addEventListener("click", checkedTask);
todoList.addEventListener("click", deleteTask);
todoList.addEventListener("click", editTask);
todoButton.addEventListener("click", createTask);
todoButtonDelAll.addEventListener("click", deleteAllTasks);
todoButtonDelCompleted.addEventListener("click", deleteCheckedTasks);

getData();
