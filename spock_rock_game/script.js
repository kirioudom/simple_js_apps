function GameView() {
  const playerSymbolNameElement = document.querySelector("#player-symbol");
  const computerSymbolNameElement = document.querySelector("#computer-symbol");
  const gameResultElement = document.querySelector("#resultGame");
  const updatePlayerSymbolName = (symbolName) =>
    (playerSymbolNameElement.innerText = symbolName);

  const updateComputerSymbolName = (symbolName) =>
    (computerSymbolNameElement.innerText = symbolName);

  const resetView = () => {
    playerSymbolNameElement.innerText = "";
    computerSymbolNameElement.innerText = "";

    gameResultElement.classList.add("hide");
  };

  const updateGameResult = (msg) => {
    if (gameResultElement.classList.contains("hide")) {
      gameResultElement.classList.remove("hide");
    }
    gameResultElement.innerText = msg;
  };

  return {
    resetView,
    updateComputerSymbolName,
    updatePlayerSymbolName,
    updateGameResult,
  };
}

function playerController(handler) {
  const symbolButtons = document.querySelectorAll("#controllerSymbol");

  const focusOnSymbol = (symbolName) => {
    symbolButtons.forEach((symbolButton) => {
      if (symbolButton.dataset.name === symbolName) {
        symbolButton.classList.add("btn-symbol-focus");
        return;
      }
      symbolButton.classList.remove("btn-symbol-focus");
    });
  };

  const resetPlayerController = () => {
    symbolButtons.forEach((symbol) => {
      symbol.classList.remove("btn-symbol-focus");
    });
  };

  symbolButtons.forEach((symbolButton) => {
    symbolButton.addEventListener("click", (event) => {
      focusOnSymbol(event.target.dataset.name);
      handler(event.target.dataset.name);
    });
  });

  return resetPlayerController;
}

function ComputerController() {
  const controllerSymbolsElements = document.querySelectorAll(
    "#computerPlayerSymbol"
  );

  const focusOnSymbol = (symbol) => {
    controllerSymbolsElements.forEach((computerPlayerSymbol) => {
      if (computerPlayerSymbol.dataset.name === symbol) {
        computerPlayerSymbol.classList.add("computer-player-symbol-focus");
        return;
      }
      computerPlayerSymbol.classList.remove("computer-player-symbol-focus");
    });
  };

  return {
    computerControllerReset: () => {
      controllerSymbolsElements.forEach((symbolEle) => {
        symbolEle.classList.remove("computer-player-symbol-focus");
      });
    },
    randomlySelectSymbol: (symbols) => {
      const selectedSymbol = ramdomSelectedSymbol(symbols);
      focusOnSymbol(selectedSymbol);
      return selectedSymbol;
    },
  };
}

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
  const gameView = GameView();
  const computerController = ComputerController();

  const resetPlayerController = playerController(function selectSymbolHandler(
    playerSelectedSymbol
  ) {
    const playerSelectedSymbolInfo = gameRules[playerSelectedSymbol];
    const computerSelectedSymbol =
      computerController.randomlySelectSymbol(symbols);

    gameView.updatePlayerSymbolName(playerSelectedSymbol);
    gameView.updateComputerSymbolName(computerSelectedSymbol);

    if (playerSelectedSymbolInfo.beat.includes(computerSelectedSymbol)) {
      gameView.updateGameResult(gameResult.win);
      return;
    }
    if (playerSelectedSymbolInfo.tie === computerSelectedSymbol) {
      gameView.updateGameResult(gameResult.tie);
      return;
    }

    gameView.updateGameResult(gameResult.lost);
  });

  document.querySelector("#resetGame").addEventListener("click", (event) => {
    gameView.resetView();
    computerController.computerControllerReset();
    resetPlayerController();
  });
}

window.onload = game;
