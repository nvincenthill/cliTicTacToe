const program = require("commander");
const Game = require("./components/Game");
const clear = require("clear");

program.version("1.0.0").parse(process.argv);

let newGame = new Game();
newGame.startGame();
