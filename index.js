//Global variables
let computerSequence = [];
let playerSequence = [];
let level = 0;
const colors = ["red", "blue", "yellow", "green"];

//Selecting Elements
const startButton = document.querySelector(".start");
const box = document.querySelector(".box");
const info = document.querySelector(".info_text");
const resetButton = document.querySelector(".reset")

//Functions
//Reset button
function resetClick() {
  computerSequence = [];
  playerSequence = [];
  level = 0;
  info.textContent = `Turn ${level}`;
}
//Game reset
function resetGame(text) {
  alert(text);
  computerSequence = [];
  playerSequence = [];
  level = 0;
}
//Changing the info text
function playerTurn(level) {
  info.textContent = `Turn ${level} `;
}
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

  computerSequence = [...nextSequence];
  setTimeout(() => {
    playerTurn(level);
  }, level * 600 + 1000);
}

//Recive the user clicks
function handleClick(color) {
  const index = playerSequence.push(color) - 1;
  const sound = document.querySelector(`[data-sound='${color}']`);
  sound.play();

  const remainingClicks = computerSequence.length - playerSequence.length;

  if (playerSequence[index] !== computerSequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (playerSequence.length === computerSequence.length) {
    if (playerSequence.length === 20) {
      resetGame('Congrats! You completed all the levels');
      return
    }
  }

  if (playerSequence.length === computerSequence.length) {
    playerSequence = [];
    info.textContent = "Well done! Keep going!";
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
  info.textContent = `Turn ${level}    `;
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
resetButton.addEventListener("click", resetClick);