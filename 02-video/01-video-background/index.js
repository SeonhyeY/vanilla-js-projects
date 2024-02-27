const btn = document.querySelector('button');

const togglePlay = () => {
  const video = document.querySelector('video');
  if (video.paused) {
    btn.innerText = 'Pause';
    video.play();
  } else {
    btn.innerText = 'Play';
    video.pause();
  }
};
btn.addEventListener('click', togglePlay);
