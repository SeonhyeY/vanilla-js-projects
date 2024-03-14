const canvas = document.querySelector('canvas');
const color = document.querySelector('#color');
const width = document.querySelector('#width');
const clearBtn = document.querySelector('.clear');
const saveBtn = document.querySelector('.save');

const ctx = canvas.getContext('2d');
ctx.fillStyle = 'white';
ctx.fillRect(0, 0, canvas.width, canvas.height);
color.value = '#000000';
width.value = 5;

let isPainting = false;
let lineWidth = 5;

color.addEventListener('change', (e) => {
  console.log(e.target.value);
  ctx.strokeStyle = e.target.value;
});
width.addEventListener('change', (e) => {
  lineWidth = e.target.value;
});
clearBtn.addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
saveBtn.addEventListener('click', () => {
  canvas.toBlob((blob) => {
    const a = document.createElement('a');

    a.href = URL.createObjectURL(blob);
    a.download = 'drawing.jpg';

    a.click();
  });
});

canvas.addEventListener('mouseout', (e) => {
  isPainting = false;
});

canvas.addEventListener('mousedown', (e) => {
  isPainting = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
});

canvas.addEventListener('mouseup', (e) => {
  isPainting = false;
});

canvas.addEventListener('mousemove', (e) => {
  if (!isPainting) return;

  ctx.lineWidth = lineWidth;
  ctx.lineCap = 'round';

  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
});
