const inquirer = require("inquirer");
const Player = require("./Player");
class Game {
  constructor() {
    this.playerOne = null;
    this.playerOneToken = "X";
    this.playerTwo = null;
    this.playerTwoToken = "O";
    this.board = ["T", "I", "C", "T", "A", "C", "T", "O", "E"];
    this.isPlaying = true;
    this.result = null;
    this.currentPlayer = 1;
    this.winCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  async startGame() {
    this.printBoard();
    const playerOneName = await this.getPlayerName("Player One");
    this.playerOne = new Player(playerOneName);
    const playerTwoName = await this.getPlayerName("Player Two");
    this.playerTwo = new Player(playerTwoName);
    this.startGameLoop();
  }

  endGame() {
    console.log("validating moves");
  }

  async startGameLoop() {
    this.clearBoard();
    while (this.isPlaying) {
      this.printBoard();
      const nextPlayerName =
        this.currentPlayer === 1 ? this.playerOne.name : this.playerTwo.name;
      const nextMove = await this.getPlayerMove(nextPlayerName);
      this.placePiece(nextMove);
      this.togglePlayer();
      // add correct token to board by player
      // check for victories or draws
    }
    this.endGame();
  }

  validateMoves() {
    console.log("validating moves");
  }

  handleWin() {
    console.log("handling a win");
  }

  handleDraw() {
    console.log("handling a draw");
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  placePiece(location) {
    this.board[location] =
      this.currentPlayer === 1 ? this.playerOneToken : this.playerTwoToken;
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
      .prompt([{ name: "move", message: `Your move, ${playerName}!` }])
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
