const game = {
  playerHand: "",
  aiHand: "",
  winner: "",
};

const gameSummary = {
  rounds: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const hands = [...document.querySelectorAll(".hands img")];
const selectedCards = [...document.querySelectorAll(".hands > .selected-card")];
const startGameButton = document.querySelector(".start-game");
const playAgainButtons = document.querySelectorAll(".play-again");
const resultView = document.querySelector(".result");
const winView = document.querySelector(".result .five-wins");
const loseView = document.querySelector(".result .five-losses");

function clearSelectedCard() {
  selectedCards.forEach((card) => {
    card.style.border = "";
    card.style.filter = "";
  });
}

function cardGameSelected() {
  clearSelectedCard();
  this.style.border = "4px solid #348a00";
  this.style.filter =
    "invert(0%) sepia(0%) saturate(0%) hue-rotate(0) brightness(0%) contrast(105%)";
}

function playerHandSelected() {
  hands.forEach((hand) => {
    game.playerHand = this.dataset.option;
  });
}

function aiHandSelected() {
  return (game.aiHand =
    hands[Math.floor(Math.random() * hands.length)].dataset.option);
}

function checkGameResultRound(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "paper" && ai === "stone") ||
    (player === "scissors" && ai === "paper") ||
    (player === "stone" && ai === "scissors")
  ) {
    return "win";
  } else {
    return "lose";
  }
}

function showGameResult(player, ai, result) {
  document.querySelector('[data-summary="your-choise"]').textContent = player;
  document.querySelector('[ data-summary="computer-choise"]').textContent = ai;
  document.querySelector("span.rounds").textContent = ++gameSummary.rounds;

  if (result === "draw") {
    document.querySelector("span.draws").textContent = ++gameSummary.draws;
    document.querySelector('[data-summary="game-result"]').textContent =
      "Draw. Try again.";
  } else if (result === "win") {
    document.querySelector("span.wins").textContent = ++gameSummary.wins;
    document.querySelector('[data-summary="game-result"]').textContent =
      "You win. Keep going.";
  } else {
    document.querySelector("span.losses").textContent = ++gameSummary.losses;
    document.querySelector('[data-summary="game-result"]').textContent =
      "You lose.. Try again.";
  }
}

function endRoundGame() {
  clearSelectedCard();
  game.playerHand = "";
  game.aiHand = "";
}

function endGame() {
  if (gameSummary.wins === 5 || gameSummary.losses === 5) {
    resultView.classList.add("active");
    if (gameSummary.wins === 5) {
      winView.classList.add("active");
    } else if (gameSummary.losses === 5) {
      loseView.classList.add("active");
    }
  }
}

function startGame() {
  if (!game.playerHand) return alert("Chose your card!");

  game.aiHand = aiHandSelected();

  const gameResult = checkGameResultRound(game.playerHand, game.aiHand);

  showGameResult(game.playerHand, game.aiHand, gameResult);
  endRoundGame();
  endGame();
}

function startNewGame() {
  if (resultView.classList.contains("active")) {
    winView.classList.remove("active");
    loseView.classList.remove("active");
    resultView.classList.remove("active");
  }

  rounds = gameSummary.rounds = 0;
  wins = gameSummary.wins = 0;
  losses = gameSummary.losses = 0;
  drawns = gameSummary.draws = 0;
  document.querySelector("span.rounds").textContent = rounds;
  document.querySelector("span.draws").textContent = drawns;
  document.querySelector("span.losses").textContent = losses;
  document.querySelector("span.wins").textContent = wins;
}

selectedCards.forEach((card) => {
  card.addEventListener("click", cardGameSelected);
});

hands.forEach((hand) => {
  hand.addEventListener("click", playerHandSelected);
});

startGameButton.addEventListener("click", startGame);

playAgainButtons.forEach((button) => {
  button.addEventListener("click", startNewGame);
});
