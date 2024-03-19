// import products from '../products.json' assert { type: 'json' };
import products from '../products.js';

const btn = document.querySelector('button');

const createItem = (product) => {
  const ul = document.querySelector('ul');
  const liEl = document.createElement('li');
  const h3El = document.createElement('h3');
  const divEl = document.createElement('div');

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(product.price);

  liEl.id = product.id;
  h3El.className = 'name';
  h3El.innerText = product.name;
  divEl.className = 'price';
  divEl.innerText = price;

  liEl.append(h3El, divEl);
  ul.append(liEl);
};

const importData = () => {
  products.data.map((product) => {
    if (!document.getElementById(product.id)) createItem(product);
  });
};

btn.addEventListener('click', importData);

const data = products.data;
