const refs = {
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};
let timerColor = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

refs.stop.setAttribute('disabled', 'true');
refs.start.addEventListener('click', onBtnStartClick);
refs.stop.addEventListener('click', onBtnStopClick);

function onBtnStartClick() {
  timerColor = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.start.toggleAttribute('disabled');
  refs.stop.toggleAttribute('disabled');
}

function onBtnStopClick() {
  refs.start.toggleAttribute('disabled');
  refs.stop.toggleAttribute('disabled');
  clearInterval(timerColor);
}
