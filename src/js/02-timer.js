import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const timer = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let selectedDate = null;
let timerId = null;

startBtn.setAttribute('disabled', 'disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const date = new Date();
    if (selectedDates[0] <= date) {
      Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled', 'disabled');
      selectedDate = selectedDates;
    }
  },
};

flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', onBtnStartClick);

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function onBtnStartClick() {
  timerId = setInterval(updateInterface, 1000);
  const date = new Date();
  const dataTimer = selectedDate[0] - date;
  setTimeout(endTime, dataTimer);
}

function updateInterface() {
  const date = new Date();
  const dataTimer = selectedDate[0] - date;
  const { days, hours, minutes, seconds } = convertMs(dataTimer);
  timer.days.textContent = days;
  timer.hours.textContent = hours;
  timer.minutes.textContent = minutes;
  timer.seconds.textContent = seconds;
}

function endTime() {
  clearInterval(timerId);
  Notify.success('Time is over!');
}
