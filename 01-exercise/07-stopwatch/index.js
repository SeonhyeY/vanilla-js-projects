const startBtn = document.querySelector('.start');
const stopBtn = document.querySelector('.stop');
const resetBtn = document.querySelector('.reset');

let timerId;

let [csec, sec, min] = [0, 0, 0];

const displayTimer = () => {
  const time = document.querySelector('.time');

  const fMin = min < 10 ? `0${min}` : min;
  const fSec = sec < 10 ? `0${sec}` : sec;
  const fCsec = csec < 10 ? `0${csec}` : csec;

  time.innerText = `${fMin} : ${fSec} : ${fCsec}`;
};

const timer = () => {
  csec++;

  if (csec === 100) {
    csec = 0;
    sec++;

    if (sec === 60) {
      sec = 0;
      min++;
    }
  }

  displayTimer();
};

const start = () => {
  !timerId ? (timerId = setInterval(timer, 10)) : timerId;
};

const stop = () => {
  clearInterval(timerId);
  timerId = null;
};

const reset = () => {
  stop();
  [csec, sec, min] = [0, 0, 0];
  displayTimer();
};

startBtn.addEventListener('click', start);
stopBtn.addEventListener('click', stop);
resetBtn.addEventListener('click', reset);
