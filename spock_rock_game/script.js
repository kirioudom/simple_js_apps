function gameView() {
  const playerSymbolName = document.querySelector("#player-symbol");
  const computerSymbolName = document.querySelector("#computer-symbol");

  const updatePlayerSymbolName = (symbolName) =>
    (playerSymbolName.innerText = symbolName);

  const updateComputerSymbolName = (symbolName) =>
    (computerSymbolName.innerText = symbolName);

  const resetView = () => {
    playerSymbolName.innerText = "";
    computerSymbolName.innerText = "";
  };

  return { resetView, updateComputerSymbolName, updatePlayerSymbolName };
}

function controller(handler) {
  const symbolButtons = document.querySelectorAll("#controllerSymbol");

  const resetFocus = () => {
    symbolButtons.forEach((symbolButton) => {
      symbolButton.classList.remove("btn-symbol-focus");
    });
  };

  symbolButtons.forEach((symbolButton) => {
    symbolButton.addEventListener("click", (event) => {
      resetFocus();
      handler(symbolButton.dataset.name);
      symbolButton.classList.add("btn-symbol-focus");
    });
  });
}

function computerController() {}

function ramdomSelectedSymbol(symbols) {
  const ramdomIndex = Math.floor(Math.random() * symbols.length);
  return symbols[ramdomIndex];
}

function game() {
  const gameResult = {
    lost: "Game Over!",
    tie: "It's tie!",
    win: "Congrats! you won!",
  };
  //key access to what symbol they beat.
  const gameRules = {
    rock: { beat: ["lizard", "scissors"], tie: "rock" },
    paper: { beat: ["rock", "spock"], tie: "paper" },
    scissors: { beat: ["paper", "lizard"], tie: "scissors" },
    lizard: { beat: ["spock", "paper"], tie: "lizard" },
    spock: { beat: ["scissors", "rock"], tie: "spock" },
  };

  const symbols = Object.keys(gameRules);
  const gameView = gameView();

  controller((symbolName) => {});
}

window.onload = game;
