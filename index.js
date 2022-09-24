//Global variables
let computerSequence = [];
let playerSequence = [];
let level = 0;
const colors = ["red", "blue", "yellow", "green"];

//Selecting Elements
const startButton = document.querySelector(".start");

//Functions
//Activate tile
function activateTile(color) {
  const tile = document.querySelector(`[data-color='${color}']`);

  tile.classList.add("activated");

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

//Start Game
function startGame() {
  nextRound();
}
startButton.addEventListener("click", startGame);
