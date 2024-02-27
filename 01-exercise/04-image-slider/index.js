const images = document.querySelectorAll('.item');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

let index = 0;
let lastIndex = images.length - 1;

const updateImage = () => {
  images.forEach((img) => {
    img.classList.remove('show');
  });
  images[index].classList.add('show');
};

const moveToPrev = () => {
  index === 0 ? (index = lastIndex) : index--;
  updateImage();
};

const moveToNext = () => {
  index === lastIndex ? (index = 0) : index++;
  updateImage();
};

prevBtn.addEventListener('click', moveToPrev);
nextBtn.addEventListener('click', moveToNext);
