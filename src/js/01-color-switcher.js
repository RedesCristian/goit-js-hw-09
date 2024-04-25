const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
let timerId;
const body = document.querySelector('body');
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  clearInterval(timerId);
});
