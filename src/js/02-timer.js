import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';
require('flatpickr/dist/themes/dark.css');

const startButton = document.querySelector('[data-start]');
const timeContainer = document.querySelector('.timer');
timeContainer.style.display = 'flex';
timeContainer.style.gap = '30px';

const days = document.querySelector('.value[data-days]');
const hours = document.querySelector('.value[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
let options;
let timerId;
days.style.display = 'grid';
hours.style.display = 'grid';
minutes.style.display = 'grid';
seconds.style.display = 'grid';

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
flatpickr(
  'input#datetime-picker',
  (options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      startButton.disabled = true;
      const date = new Date();
      if (selectedDates[0] > date) {
        console.log(selectedDates[0]);
        startButton.disabled = false;
      } else {
        Notiflix.Notify.failure('Please choose a date in the future');
      }
    },
  })
);
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
  const endDate = document.querySelector('#datetime-picker');
  const pickedDate = new Date(endDate.value).getTime();
  const thisDate = new Date().getTime();
  let timeToSelectedDate = pickedDate - thisDate;
  if (timeToSelectedDate <= 0) {
    return;
  }

  const timeUpdate = () => {
    const timeLeft = convertMs(timeToSelectedDate);
    days.textContent = addLeadingZero(timeLeft.days);
    hours.textContent = addLeadingZero(timeLeft.hours);
    minutes.textContent = addLeadingZero(timeLeft.minutes);
    seconds.textContent = addLeadingZero(timeLeft.seconds);
    if (timeToSelectedDate <= 0) {
      clearInterval(timerId);
    }
    timeToSelectedDate -= 1000;
  };
  timerId = setInterval(timeUpdate, 1000);
});
