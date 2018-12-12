const program = require("commander");
const Game = require("./game");

program.version("1.0.0").parse(process.argv);

console.log("Starting Tic-Tac-Toe...");

let newGame = new Game();
newGame.start();
