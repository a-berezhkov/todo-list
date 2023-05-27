import { todoList } from "./create.js";

function renderTask(text, id) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo__item");

  const todoItemCheckbox = document.createElement("input");
  todoItemCheckbox.classList.add("todo__task-checkbox");
  todoItemCheckbox.type = "checkbox";
  todoItemCheckbox.setAttribute("id", `"${id}"`);

  const todoItemLabel = document.createElement("label");
  todoItemLabel.classList.add("todo__task-label");
  todoItemLabel.setAttribute("for", `"${id}"`);
  todoItemLabel.innerHTML = text;

  const todoBox = document.createElement("div");
  todoBox.classList.add("todo__box");

  const todoItemDelete = document.createElement("button");
  todoItemDelete.classList.add("todo__task-del");
  todoItemDelete.textContent = "❌";

  todoBox.append(todoItemCheckbox);
  todoBox.append(todoItemLabel);
  todoItem.append(todoBox);
  todoItem.append(todoItemDelete);

  todoList.append(todoItem);
}

export { renderTask };
