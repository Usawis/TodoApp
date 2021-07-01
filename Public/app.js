// my selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

// my event listerners:
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
document.addEventListener("DOMContentLoaded", getTodos);

// my functions:
function addTodo(event) {
  // it prevent the form from submitting when button is clicked
  event.preventDefault();
  // Todo div:
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  // creating li:
  const newTodo = document.createElement("li");
  newTodo.innerText = todoInput.value;
  newTodo.classList.add("todo-item");
  todoDiv.appendChild(newTodo);
  // adding todos to my local storage
  saveLocalTodos(todoInput.value);
  // the check btn
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"></>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  // the trash button
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"></>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  // append todo list:
  todoList.appendChild(todoDiv);
  // clearing todo input:
  todoInput.value = "";
}

// delete function
function deleteCheck(e) {
  const item = e.target;
  // delete the todos
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    // animation for removing a todo:
    todo.classList.add("fall");
    removeLocalTodos(todo);
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  // check mark:
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(function (todo) {
    // Todo div:
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    // save local todo
    // saveLocalTodos(todoInput.value);
    // creating li:
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // the check btn
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);
    // the trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    // append todo list:
    todoList.appendChild(todoDiv);
  });
}

function removeLocalTodos(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex, 1));
  localStorage.setItem("todos", JSON.stringify(todos));
}
