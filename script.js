"use strict";
//score elements
const scoreP0 = document.getElementById("score--0");
const scoreP1 = document.getElementById("score--1");
const currentP0 = document.getElementById("current--0");
const currentP1 = document.getElementById("current--1");
const playerEl0 = document.querySelector(".player--0");
const playerEl1 = document.querySelector(".player--1");
// button actions
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");
//dice Elements
const diceEl = document.querySelector(".dice");

let score, currentScore, activePlayer, playingGame;

// function to reset  the game
const resetGame = () => {
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playingGame = true;

  scoreP0.textContent = 0;
  scoreP1.textContent = 0;
  currentP0.textContent = 0;
  currentP1.textContent = 0;
  diceEl.classList.add("hidden");

  playerEl0.classList.add("player--active");
  playerEl1.classList.remove("player--active");
  playerEl0.classList.remove("player--winner");
  playerEl1.classList.remove("player--winner");
};
resetGame();
// function to reset the game
btnNew.addEventListener("click", resetGame);

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  playerEl0.classList.toggle("player--active");
  playerEl1.classList.toggle("player--active");
};

// start
// role functionality

btnRoll.addEventListener("click", function () {
  if (playingGame) {
    // generate a random dice
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    // condition if dice  == 1
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playingGame) {
    //  score of the game
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    //   condition  if it scores 100
    if (score[activePlayer] >= 100) {
      playingGame = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
  }
});
