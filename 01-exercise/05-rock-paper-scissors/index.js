const btns = document.querySelectorAll('button');
const computerChoice = document.querySelector('.computer-choice');
const userChoice = document.querySelector('.user-choice');
const winner = document.querySelector('.result');

const result = ['Rock', 'Scissor', 'Paper'];

const play = (e) => {
  const randomIndex = Math.floor(Math.random() * 3);
  const computer = result[randomIndex];
  const user = e.target.innerText;

  game(user, computer);
};

const game = (user, computer) => {
  let message;
  if (user === computer) message = 'Tie😑';
  else {
    switch (user + computer) {
      case 'ScissorPaper':
      case 'RockScissor':
      case 'PaperRock':
        message = 'Win🎉';
        break;
      case 'ScissorRock':
      case 'RockPaper':
      case 'PaperScissor':
        message = 'Lose😢';
        break;
    }
  }
  show(user, computer, message);
};

const show = (user, computer, message) => {
  computerChoice.innerText = computer;
  userChoice.innerText = user;
  winner.innerText = message;
};

btns.forEach((btn) => {
  btn.addEventListener('click', play);
});
