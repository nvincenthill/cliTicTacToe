const inquirer = require("inquirer");

class Game {
  constructor() {
    this.playerNames = [];
    this.isFinished = false;
    this.result = null;
  }

  startGame() {
    let playerOne = new Player();
  }

  getPlayerName() {
    inquirer
      .prompt([{ name: "name", message: "What is your name?" }])
      .then(answers => {
        console.log(answers);
      });
  }
}

module.exports = Game;
