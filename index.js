//Global variables
let computerSequence = [];
let playerSequence = [];
let level = 0;
const colors = ["red", "blue", "yellow", "green"];

//Selecting Elements
const startButton = document.querySelector(".start");
const box = document.querySelector(".box");

//Functions
//Activate tile
function activateTile(color) {
  const tile = document.querySelector(`[data-color='${color}']`);

  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add("activated");
  sound.play();

  setTimeout(() => {
    tile.classList.remove("activated");
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

//Selecting a random tile color
function computerChoice() {
  const choice = colors[Math.floor(Math.random() * 4)];

  return choice;
}

//Counting the rounds
function nextRound() {
  level += 1;

  const nextSequence = [...computerSequence];
  nextSequence.push(computerChoice());
  playRound(nextSequence);
}

//Recive the user clicks
function handleClick(color) {
  const index = playerSequence.push(color) - 1;
  const sound = document.querySelector(`[data-sound='${color}']`);
  sound.play();
}
//Start Game
function startGame() {
  nextRound();
}

//Events
startButton.addEventListener("click", startGame);

box.addEventListener("click", (event) => {
  const { color } = event.target.dataset;

  if (color) handleClick(color);
});
