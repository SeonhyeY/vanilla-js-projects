const form = document.querySelector('form');
const input = document.querySelector('input');
const ul = document.querySelector('ul');

let todos = [];
/**
 * 1. Delete Button
 * 2. Save in localstorage
 * 3. Delete data from local storage
 */

const save = () => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

const formHandler = (e) => {
  e.preventDefault();

  const todo = {
    id: Date.now(),
    text: input.value,
  };

  todos.push(todo);
  if (input.value !== '') {
    addItem(todo);
    save();
    input.value = '';
  }
};

const addItem = (todo) => {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  const span = document.createElement('span');

  span.innerText = todo.text;
  btn.innerText = 'Delete';
  btn.addEventListener('click', deleteItem);

  li.appendChild(span);
  li.appendChild(btn);

  ul.appendChild(li);

  li.id = todo.id;
};

const deleteItem = (event) => {
  const target = event.target.parentElement;
  todos = todos.filter((todo) => todo.id !== Number(target.id));
  save();

  target.remove();
};

const init = () => {
  const userTodos = JSON.parse(localStorage.getItem('todos'));
  if (userTodos) {
    userTodos.forEach((todo) => {
      addItem(todo);
    });
    todos = userTodos;
  }
};
init();

form.addEventListener('submit', formHandler);
