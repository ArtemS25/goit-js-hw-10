import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('.form');
form.addEventListener('submit', onFirmSubmit);

function onFirmSubmit(event) {
  event.preventDefault();
  const formElements = event.target.elements;
  let delay = Number(formElements.delay.value);
  const step = Number(formElements.step.value);
  const amount = Number(formElements.amount.value);
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise(() => {
    setTimeout(() => {
      if (shouldResolve) {
        // Fulfill
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        // Reject
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });

  return promise;
}
