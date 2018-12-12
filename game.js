const inquirer = require("inquirer");

class Game {
  constructor() {
    this.playerNames = [];
    this.isFinished = false;
    this.result = null;
  }

  startGame() {
    console.log("Starting a new game");
  }

  getPlayerName() {
    inquirer
      .prompt([{ name: "name", message: "What is your name?" }])
      .then(answers => {
        console.log(answers);
      });
  }
}

export default Game;
