const refs = {
  startButton: document.querySelector("[data-start]"),
  stopButton: document.querySelector("[data-stop]"),
};

let timerId;

refs.startButton.addEventListener("click", () => {
  if (timerId) {
    return;
  }
  timerId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopButton.addEventListener("click", () => {
  clearInterval(timerId);
  timerId = undefined;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
