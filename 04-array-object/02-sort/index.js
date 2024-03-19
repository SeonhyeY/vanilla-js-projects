// import products from '../products.json' assert { type: 'json' };
import products from '../products.js';

const loadBtn = document.querySelector('button');
const asceBtn = document.querySelector('.ascending');
const desceBtn = document.querySelector('.descending');

const removeItems = () => {
  const items = document.querySelectorAll('li');
  items.forEach((item) => {
    item.remove();
  });
};

const sortAsce = () => {
  products.data.sort((a, b) => {
    return a.price - b.price;
  });

  removeItems();
  products.data.forEach((product) => {
    createItem(product);
  });
};
const sortDesce = () => {
  products.data
    .sort((a, b) => {
      return a.price - b.price;
    })
    .reverse();

  removeItems();
  products.data.forEach((product) => {
    createItem(product);
  });
};

const createItem = (product) => {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(product.price);

  li.id = product.id;
  h3.className = 'name';
  h3.innerText = product.name;
  div.className = 'price';
  div.innerText = price;

  li.append(h3, div);
  ul.append(li);
};

const importData = () => {
  products.data.sort((a, b) => {
    return a.id - b.id;
  });
  removeItems();

  products.data.map((product) => {
    if (!document.getElementById(product.id)) createItem(product);
  });
};

loadBtn.addEventListener('click', importData);
asceBtn.addEventListener('click', sortAsce);
desceBtn.addEventListener('click', sortDesce);
