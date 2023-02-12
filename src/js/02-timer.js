'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const ref = {
  startButton: document.querySelector('button[data-start]'),
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
  inputDate: document.querySelector('#datetime-picker'),
};

let selectDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);

    if (selectedDates[0] < Date.now()) {
      ref.startButton.disabled = true;

      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      ref.startButton.disabled = false;
      selectDate = selectedDates[0];
    }
  },
};

flatpickr(ref.inputDate, options);

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

// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

class Timer {
  constructor() {
    this.isActive = false;
    this.intervalId = null;
    ref.startButton.disabled = true;
  }

  startTimer() {
    if (this.isActive) {
      return;
    }

    this.isActive = true;
    this.intervalId = setInterval(() => {
      ref.startButton.disabled = true;
      const currentTime = Date.now();
      const time = selectDate - currentTime;
      const convertTime = convertMs(time);

      ref.days.textContent = convertTime.days;
      ref.hours.textContent = convertTime.hours;
      ref.minutes.textContent = convertTime.minutes;
      ref.seconds.textContent = convertTime.seconds;

      if (time <= 0) {
        this.stopTimer();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.intervalId);
  }
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

const timer = new Timer();

ref.startButton.addEventListener('click', () => {
  timer.startTimer();
});
