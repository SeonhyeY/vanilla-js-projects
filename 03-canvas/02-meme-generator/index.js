const canvas = document.querySelector('canvas');
const imageFile = document.querySelector('#image-file');
const textInputs = document.querySelectorAll('.text');
const textTopInput = document.querySelector('#top-text');
const textBottomInput = document.querySelector('#bottom-text');

const ctx = canvas.getContext('2d');
textTopInput.value = '';
textBottomInput.value = '';

let image;
let width;
let height;

let textTop = '';
let textBottom = '';

const showInputs = () => {
  textInputs.forEach((input) => {
    input.style.display = 'block';
  });
};

const uploadImage = () => {
  width = image.width;
  height = image.height;

  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(image, 0, 0);
  showInputs();
};

const createImage = (e) => {
  const imageUrl = URL.createObjectURL(e.target.files[0]);

  image = document.createElement('img');
  image.src = imageUrl;
  image.addEventListener('load', uploadImage);
};
imageFile.addEventListener('change', createImage);

const drawText = () => {
  const offsetY = height / 20;
  const fontSize = width / 10;

  ctx.font = `${fontSize}px sans-serif`;
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = fontSize / 5;
  ctx.lineJoin = 'round';

  ctx.textBasline = 'top';
  ctx.strokeText(textTop, width / 2, offsetY + fontSize);
  ctx.fillText(textTop, width / 2, offsetY + fontSize);

  ctx.textBasline = 'bottom';
  ctx.strokeText(textBottom, width / 2, height - offsetY);
  ctx.fillText(textBottom, width / 2, height - offsetY);
};

const updateTopText = (event) => {
  ctx.clearRect(0, 0, width, height / 2);
  uploadImage();
  textTop = event.target.value;
  drawText();
};
const updateBottomText = (event) => {
  ctx.clearRect(0, height / 2, width, height);
  uploadImage();
  textBottom = event.target.value;
  drawText();
};
textTopInput.addEventListener('change', updateTopText);
textBottomInput.addEventListener('change', updateBottomText);
