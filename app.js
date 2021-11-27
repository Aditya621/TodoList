//Selector

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//event listeners
document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteTodo);
filterOption.addEventListener('click', filterTodo);

//function

function addTodo(event) {
  event.preventDefault();

  //create div
  const todoDiv = document.createElement('div');
  todoDiv.classList.add('todo');

  //create list element
  const newTodoList = document.createElement('li');
  newTodoList.innerText = todoInput.value;
  newTodoList.classList.add('todo-item');
  todoDiv.appendChild(newTodoList);
  //Add to Local localStorage
  saveLocalStorage(todoInput.value);

  //create 1st button element
  const completeButton = document.createElement('button');
  completeButton.innerHTML = '<i class = "fas fa-check"></i>';
  completeButton.classList.add('complete-btn');
  todoDiv.appendChild(completeButton);

  //create 2nd button element
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
  trashButton.classList.add('trash-btn');
  todoDiv.appendChild(trashButton);

  //add todoDiv in the list
  todoList.appendChild(todoDiv);
  //Clear Inputs
  todoInput.value = '';
}

function deleteTodo(e) {
  const items = e.target;

  //deleteTodo
  if (items.classList[0] === 'trash-btn') {
    const todo = items.parentElement;
    todo.classList.add('fall');
    removesLocalTodos(todo);
    todo.addEventListener('transitionend', function () {
      todo.remove();
    });
    // todo.remove();
  }
  //Check Mark
  if (items.classList[0] === 'complete-btn') {
    const todo = items.parentElement;
    todo.classList.toggle('completed');
  }
}

function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) {
    switch (e.target.value) {
      case 'all':
        todo.style.display = 'flex';
        break;
      case 'Completed':
        if (todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
      case 'UnCompleted':
        if (!todo.classList.contains('completed')) {
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
    }
  });
}

function saveLocalStorage(todo) {
  //CHECK
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  //CHECK
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  todos.forEach(function (todo) {
    //create div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');

    //create list element
    const newTodoList = document.createElement('li');
    newTodoList.innerText = todo;
    newTodoList.classList.add('todo-item');
    todoDiv.appendChild(newTodoList);

    //create 1st button element
    const completeButton = document.createElement('button');
    completeButton.innerHTML = '<i class = "fas fa-check"></i>';
    completeButton.classList.add('complete-btn');
    todoDiv.appendChild(completeButton);

    //create 2nd button element
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class = "fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);

    //add todoDiv in the list
    todoList.appendChild(todoDiv);
  });
}

function removesLocalTodos(todo) {
  //CHECK
  let todos;
  if (localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }

  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}
