//create header
const headerDiv = document.createElement("div");
headerDiv.classList.add("header");

const containerHeaderDiv = document.createElement("div");
containerHeaderDiv.classList.add("container");

const headerTitle = document.createElement("h1");
headerTitle.classList.add("header__title");
headerTitle.innerHTML = "ToDo List";

containerHeaderDiv.append(headerTitle);
headerDiv.append(containerHeaderDiv);
root.append(headerDiv);

//create main
const mainDiv = document.createElement("div");
mainDiv.classList.add("main");

const containerMainDiv = document.createElement("div");
containerMainDiv.classList.add("container");

const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

const todoTopDiv = document.createElement("div");
todoTopDiv.classList.add("todo__top");

const todoInput = document.createElement("input");
todoInput.type = "text";
todoInput.placeholder = "Задача";
todoInput.classList.add("todo__input");

const todoButton = document.createElement("button");
todoButton.classList.add("todo__button");
todoButton.textContent = "Добавить";

todoTopDiv.append(todoInput);
todoTopDiv.append(todoButton);
todoDiv.append(todoTopDiv);

const todoList = document.createElement("ul");
todoList.classList.add("todo__list");

todoDiv.append(todoList);

const todoBottom = document.createElement("div");
todoBottom.classList.add("todo__bottom");

const todoButtonDelCompleted = document.createElement("button");
todoButtonDelCompleted.classList.add("todo__del-completed");
todoButtonDelCompleted.textContent = "Удалить завершенные";

const todoButtonDelAll = document.createElement("button");
todoButtonDelAll.classList.add("todo__del-all");
todoButtonDelAll.textContent = "Удалить все";

todoBottom.append(todoButtonDelCompleted);
todoBottom.append(todoButtonDelAll);
todoDiv.append(todoBottom);

containerMainDiv.append(todoDiv);
mainDiv.append(containerMainDiv);
root.append(mainDiv);
