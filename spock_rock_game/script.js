function main() {
  const gameResult = {
    lost: "You lost!",
    tie: "It's tie!",
    win: "Congrats! you won!",
  };

  const gameRules = {
    paper: ["rock", "spock"],
    spock: ["scissors", "rock"],
    scissors: ["paper", "lizard"],
    rock: ["lizard", "paper"],
    lizard: ["spock", "scisssors"],
  };

  const symbols = gameRules.keys();
}

window.onload = main;
