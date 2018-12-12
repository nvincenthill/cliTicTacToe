const inquirer = require("inquirer");
const Player = require("./Player");
class Game {
  constructor() {
    this.playerOne = null;
    this.playerTwo = null;
    this.board = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
    this.isPlaying = true;
    this.result = null;
    this.nextPlayer = 1;
  }

  async startGame() {
    this.printBoard();
    const playerOneName = await this.getPlayerName("Player One");
    this.playerOne = new Player(playerOneName);
    const playerTwoName = await this.getPlayerName("Player Two");
    this.playerTwo = new Player(playerTwoName);
    this.startGameLoop();
  }

  async startGameLoop() {
    this.clearBoard();
    while (this.isPlaying) {
      this.printBoard();
      const nextPlayerName =
        this.nextPlayer === 1 ? this.playerOne.name : this.playerTwo.name;
      const nextMove = await this.getPlayerMove(nextPlayerName);
    }
  }

  getPlayerName(playerName) {
    return inquirer
      .prompt([{ name: "name", message: `What is ${playerName}'s name?` }])
      .then(answers => {
        return answers.name;
      });
  }

  getPlayerMove(playerName) {
    return inquirer
      .prompt([{ name: "move", message: `Your turn, ${playerName}!` }])
      .then(answers => {
        return answers.move;
      });
  }

  printBoard() {
    console.log(
      `\n  ${this.board[0]}  |  ${this.board[1]}  |  ${this.board[2]}\n` +
        `-----|-----|------\n` +
        `  ${this.board[3]}  |  ${this.board[4]}  |  ${this.board[5]}\n` +
        `-----|-----|------\n` +
        `  ${this.board[6]}  |  ${this.board[7]}  |  ${this.board[8]}  \n`
    );
  }

  clearBoard() {
    for (let i = 0; i < this.board.length; i++) {
      this.board[i] = i;
    }
  }
}

module.exports = Game;
