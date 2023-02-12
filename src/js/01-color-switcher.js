'use strict';

const ref = {
  startButton: document.querySelector('button[data-start]'),
  stopButton: document.querySelector('button[data-stop]'),
  bgBody: document.querySelector('body'),
};

let time = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {
  ref.bgBody.style.backgroundColor = getRandomHexColor();
}

ref.startButton.addEventListener('click', function () {
  ref.startButton.disabled = true;
  ref.stopButton.disabled = false;

  time = setInterval(changeColor, 1000);
});

ref.stopButton.addEventListener('click', function () {
  ref.startButton.disabled = false;
  ref.stopButton.disabled = true;

  clearInterval(time);
});
