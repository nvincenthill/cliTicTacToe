const inquirer = require("inquirer");
const clear = require("clear");

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
    this.moveCount = 0;
    this.winCombos = [
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
    clear();
    this.printBoard();
    if (this.result === "DRAW") {
      console.log("The game was drawn");
    } else if (this.result === "WIN") {
      const winner =
        this.currentPlayer === 2 ? this.playerOne.name : this.playerTwo.name;
      console.log(`${winner} won the game!`);
    }
  }

  async startGameLoop() {
    clear();
    this.clearBoard();
    while (this.isPlaying) {
      this.printBoard();
      const nextPlayerName =
        this.currentPlayer === 1 ? this.playerOne.name : this.playerTwo.name;

      await this.makeMove(nextPlayerName);
      this.validateBoard();
    }
    this.endGame();
  }

  async makeMove(nextPlayerName) {
    const nextMove = await this.getPlayerMove(nextPlayerName);

    const isValidInput = this.validateInput(nextMove);
    let isValidMove = false;

    if (isValidInput) {
      isValidMove = this.validateMove(nextMove);
    }

    if (isValidInput && isValidMove) {
      this.placePiece(nextMove);
      this.togglePlayer();
    } else {
      console.log("\n" + "Invalid move - please pick again!");
    }
  }

  validateMove(move) {
    if (
      this.board[move] === this.playerOneToken ||
      this.board[move] === this.playerTwoToken
    ) {
      return false;
    } else {
      return true;
    }
  }

  validateInput(move) {
    let singleDigit = /[0-9]/;
    if (!singleDigit.test(move.toString())) {
      return false;
    } else {
      return true;
    }
  }

  validateBoard() {
    for (let i = 0; i < this.winCombos.length; i++) {
      if (
        this.board[this.winCombos[i][0]] === this.board[this.winCombos[i][1]] &&
        this.board[this.winCombos[i][1]] === this.board[this.winCombos[i][2]]
      ) {
        this.handleWin();
        return;
      }
    }
    if (this.moveCount === 9) {
      this.handleDraw();
    }
  }

  handleWin() {
    this.isPlaying = false;
    this.result = "WIN";
  }

  handleDraw() {
    this.isPlaying = false;
    this.result = "DRAW";
  }

  togglePlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  placePiece(location) {
    this.board[location] =
      this.currentPlayer === 1 ? this.playerOneToken : this.playerTwoToken;
    this.moveCount += 1;
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
      .prompt([{ name: "move", message: `Your move, ${playerName}...` }])
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
