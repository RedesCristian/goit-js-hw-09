import Notiflix from 'notiflix';

const button = document.querySelector('button');
const firstDelay = document.querySelector('input[name="delay"]');
const delayStep = document.querySelector('input[name="step"]');
const amount = document.querySelector('input[name="amount"]');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

button.addEventListener('submit', e => {
  e.preventDefault();
  const delayValue = parseInt(firstDelay.value);
  const stepValue = parseInt(delayStep.value);
  const amountValue = parseInt(amount.value);
  const promises = [];

  for (let i = 0; i < amountValue; i++) {
    const position = i + 1;
    const delay = stepValue * i + delayValue;
    promises.push(createPromise(position, delay));
  }

  promises.forEach(promise => {
    promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  });
});
