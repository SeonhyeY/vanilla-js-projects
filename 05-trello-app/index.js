const form = document.querySelector('form');
const blocks = document.querySelectorAll('.list');

let from, to;

let todoList = [],
  doingList = [],
  doneList = [];

const lists = {
  todo: todoList,
  doing: doingList,
  done: doneList,
};

const saveList = (listId) => {
  localStorage.setItem(listId, JSON.stringify(lists[listId]));
};

const dragStart = (e) => {
  from = e.target.parentElement.id;
  to = from;
};

const dragOver = (e) => {
  e.preventDefault();

  const { id: targetId } = e.target;
  const listIds = Object.keys(lists);

  if (listIds.includes(targetId)) {
    to = targetId;
  }
};

const dragEnd = (e) => {
  if (from === to) return;

  const { id } = e.target;

  e.target.remove();
  lists[from] = lists[from].filter((item) => {
    if (item.id !== id) {
      return item;
    } else {
      createElement(to, item);
    }
  });
  saveList(from);
  saveList(to);
};

const removeTodo = (e) => {
  e.preventDefault();

  const { id } = e.target;
  const { id: listId } = e.target.parentElement;

  e.target.remove();
  lists[listId] = lists[listId].filter((item) => {
    return item.id !== id;
  });

  saveList(listId);
};

const createElement = (listId, todoItem) => {
  const list = document.querySelector(`#${listId}`);
  const item = document.createElement('div');

  item.id = todoItem.id;
  item.innerText = todoItem.text;
  item.className = 'item';
  item.draggable = true;

  item.addEventListener('dragstart', dragStart);
  item.addEventListener('dragend', dragEnd);
  item.addEventListener('contextmenu', removeTodo);

  list.append(item);

  lists[listId].push(todoItem);
};

const createTodo = (e) => {
  e.preventDefault();

  const input = document.querySelector('input');
  const id = uuidv4();

  const newTodo = {
    id,
    text: input.value,
  };

  createElement('todo', newTodo);
  input.value = '';
  saveList('todo');
};

const loadList = () => {
  const userTodoList = JSON.parse(localStorage.getItem('todo'));
  const userDoingList = JSON.parse(localStorage.getItem('doing'));
  const userDoneList = JSON.parse(localStorage.getItem('done'));

  if (!userTodoList) return;
  if (!userDoingList) return;
  if (!userDoneList) return;

  userTodoList.forEach((item) => {
    createElement('todo', item);
  });
  userDoingList.forEach((item) => {
    createElement('doing', item);
  });
  userDoneList.forEach((item) => {
    createElement('done', item);
  });
};
loadList();

form.addEventListener('submit', createTodo);
blocks.forEach((block) => {
  block.addEventListener('dragover', dragOver);
});
