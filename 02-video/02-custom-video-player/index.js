const video = document.querySelector('video');
const playBtn = document.querySelector('.play-pause');
const rateBtns = document.querySelectorAll('.rate');
const volumeBar = document.querySelector('input');
const current = document.querySelector('.current');
const duration = document.querySelector('.duration');

const updateProgress = () => {
  const percent = (video.currentTime / video.duration) * 100;
  const progressBar = document.querySelector('.bar');
  progressBar.style.width = `${percent}%`;

  if (video.ended) {
    pause();
  }
};

const formatting = (time) => {
  const sec = Math.floor(time % 60);
  const min = Math.floor(time / 60) % 60;
  const hour = Math.floor(time / 3600);

  const fSec = sec < 10 ? `0${sec}` : sec;
  const fMin = min < 10 ? `0${min}` : min;
  const fHour = hour < 10 ? `0${hour}` : hour;

  return `${fHour}:${fMin}:${fSec}`;
};

const updateTime = () => {
  current.innerText = formatting(video.currentTime);
};
const setVolume = (e) => {
  video.volume = e.target.value;
};

const setRate = (e) => {
  const { rate } = e.target.dataset;
  video.playbackRate = rate;
};

const play = () => {
  playBtn.innerText = '\u23F8';
  video.play();
};

const pause = () => {
  playBtn.innerText = '\u23F5';
  video.pause();
};

const togglePlay = () => {
  video.paused ? play() : pause();
};

current.innerText = '00:00:00';
duration.innerText = formatting(video.duration);
volumeBar.value = video.volume;

playBtn.addEventListener('click', togglePlay);
rateBtns.forEach((btn) => {
  btn.addEventListener('click', setRate);
});
volumeBar.addEventListener('change', setVolume);
video.addEventListener('timeupdate', updateTime);
video.addEventListener('timeupdate', updateProgress);
