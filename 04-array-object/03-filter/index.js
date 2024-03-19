import products from '../products.js';
const button = document.querySelector('button');
const select = document.querySelector('select');

let myProducts;

const removeItems = () => {
  const items = document.querySelectorAll('li');

  items.forEach((item) => {
    item.remove();
  });
};

const createItem = (product) => {
  const ul = document.querySelector('ul');
  const li = document.createElement('li');
  const h3 = document.createElement('h3');
  const div = document.createElement('div');

  li.id = product.id;

  h3.className = 'name';
  h3.innerText = product.name;

  const price = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'CAD',
  }).format(product.price);

  div.className = 'price';
  div.innerText = price;

  li.append(h3, div);
  ul.append(li);
};

const importData = () => {
  if (products) {
    select.selectedIndex = 0;
    myProducts = products.data;

    myProducts.map((product) => {
      if (!document.getElementById(product.id)) {
        createItem(product);
      }
    });
  }
};

const selectCategory = (e) => {
  if (!myProducts) {
    alert('Please load wish list first!');
    select.selectedIndex = 0;
    return;
  }
  const { selectedIndex } = e.target.options;
  const { value } = e.target.options[selectedIndex];

  const filtered = products.data.filter((product) => {
    return product.category === value;
  });

  removeItems();
  filtered.forEach((item) => {
    createItem(item);
  });
};

button.addEventListener('click', importData);
select.addEventListener('change', selectCategory);
