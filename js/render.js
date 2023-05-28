import { todoList } from "./create.js";

function renderTask(text, id, checked) {
  const todoItem = document.createElement("li");
  todoItem.classList.add("todo__item");

  const todoItemCheckbox = document.createElement("input");
  todoItemCheckbox.classList.add("todo__task-checkbox");
  todoItemCheckbox.type = "checkbox";
  todoItemCheckbox.setAttribute("id", id);
  todoItemCheckbox.checked = checked;

  const todoItemLabel = document.createElement("label");
  todoItemLabel.classList.add("todo__task-label");
  todoItemLabel.setAttribute("for", id);
  todoItemLabel.innerHTML = text;

  const todoBox = document.createElement("div");
  todoBox.classList.add("todo__box");

  const todoBtnBox = document.createElement("div");
  todoBtnBox.classList.add("todo__box-btn");


  const todoItemDelete = document.createElement("button");
  todoItemDelete.classList.add("todo__task-del");
  todoItemDelete.textContent = "❌";

  const todoItemEdit = document.createElement("button");
  todoItemEdit.classList.add("todo__task-edit");
  todoItemEdit.textContent = "✏️";

  todoBox.append(todoItemCheckbox);
  todoBox.append(todoItemLabel);

  todoBtnBox.append(todoItemEdit);
  todoBtnBox.append(todoItemDelete);
  

  todoItem.append(todoBox);
  todoItem.append(todoBtnBox);

  todoList.append(todoItem);
}

export { renderTask };
