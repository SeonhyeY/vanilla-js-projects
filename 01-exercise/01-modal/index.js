const openButton = document.querySelector('.open');
const closeButton = document.querySelector('.close');
const container = document.querySelector('.container');

openButton.addEventListener('click', () => {
  container.style.display = 'flex';
  openButton.style.display = 'none';
});

closeButton.addEventListener('click', () => {
  container.style.display = 'none';
  openButton.style.display = 'block';
});
